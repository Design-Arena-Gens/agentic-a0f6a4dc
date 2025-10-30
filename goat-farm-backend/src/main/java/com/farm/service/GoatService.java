package com.farm.service;

import com.farm.dto.GoatCreateRequest;
import com.farm.dto.GoatDto;
import com.farm.entity.Farm;
import com.farm.entity.Goat;
import com.farm.exception.BadRequestException;
import com.farm.exception.NotFoundException;
import com.farm.repository.FarmRepository;
import com.farm.repository.GoatRepository;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GoatService {

    private final GoatRepository goatRepository;
    private final FarmRepository farmRepository;

    public GoatService(GoatRepository goatRepository, FarmRepository farmRepository) {
        this.goatRepository = goatRepository;
        this.farmRepository = farmRepository;
    }

    public List<GoatDto> listGoats(Long farmId) {
        List<Goat> goats = farmId == null ? goatRepository.findAll() : goatRepository.findAllByFarmId(farmId);
        return goats.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public GoatDto registerGoat(GoatCreateRequest request) {
        goatRepository
                .findByTagId(request.tagId())
                .ifPresent(goat -> {
                    throw new BadRequestException("Tag already exists");
                });
        Goat goat = new Goat();
        goat.setTagId(request.tagId());
        goat.setGender(request.gender());
        goat.setDateOfBirth(request.dateOfBirth());
        goat.setColor(request.color());
        goat.setPhotoUrl(request.photoUrl());
        Goat sire = resolveParent(request.sireId());
        Goat dam = resolveParent(request.damId());
        goat.setSire(sire);
        goat.setDam(dam);
        goat.setFarm(resolveFarm(request.farmId()));
        goat.setBreedComposition(calculateBreedComposition(request.breedComposition(), sire, dam));
        goat.setGeneration(calculateGeneration(sire, dam));
        return toDto(goatRepository.save(goat));
    }

    private Map<String, Double> normalizeBreed(Map<String, Double> composition) {
        if (composition == null || composition.isEmpty()) {
            return Map.of();
        }
        double total = composition.values().stream().mapToDouble(Double::doubleValue).sum();
        if (total == 0) {
            throw new BadRequestException("Breed composition cannot sum to zero");
        }
        return composition.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> Math.round((entry.getValue() / total * 100.0) * 100.0) / 100.0));
    }

    private Map<String, Double> calculateBreedComposition(Map<String, Double> provided, Goat sire, Goat dam) {
        if (sire == null || dam == null) {
            return normalizeBreed(provided);
        }
        Map<String, Double> sireBreed = sire.getBreedComposition() == null ? Map.of() : sire.getBreedComposition();
        Map<String, Double> damBreed = dam.getBreedComposition() == null ? Map.of() : dam.getBreedComposition();
        var breeds = new HashSet<String>();
        breeds.addAll(sireBreed.keySet());
        breeds.addAll(damBreed.keySet());
        var result = new HashMap<String, Double>();
        for (String breed : breeds) {
            double sirePercent = sireBreed.getOrDefault(breed, 0.0);
            double damPercent = damBreed.getOrDefault(breed, 0.0);
            result.put(breed, Math.round(((sirePercent + damPercent) / 2) * 100.0) / 100.0);
        }
        if (provided != null) {
            provided.forEach(result::putIfAbsent);
        }
        return normalizeBreed(result);
    }

    private Integer calculateGeneration(Goat sire, Goat dam) {
        int sireGeneration = sire != null && sire.getGeneration() != null ? sire.getGeneration() : 0;
        int damGeneration = dam != null && dam.getGeneration() != null ? dam.getGeneration() : 0;
        return Math.max(sireGeneration, damGeneration) + 1;
    }

    private Farm resolveFarm(Long farmId) {
        if (farmId == null) {
            return null;
        }
        return farmRepository
                .findById(farmId)
                .orElseThrow(() -> new NotFoundException("Farm not found"));
    }

    private Goat resolveParent(Long goatId) {
        if (goatId == null) {
            return null;
        }
        return goatRepository
                .findById(goatId)
                .orElseThrow(() -> new NotFoundException("Goat not found: " + goatId));
    }

    private GoatDto toDto(Goat goat) {
        return new GoatDto(
                goat.getId(),
                goat.getTagId(),
                goat.getGender(),
                goat.getDateOfBirth(),
                goat.getColor(),
                goat.getPhotoUrl(),
                goat.getBreedComposition(),
                goat.getGeneration(),
                goat.getFarm() != null ? goat.getFarm().getId() : null,
                goat.getSire() != null ? goat.getSire().getId() : null,
                goat.getDam() != null ? goat.getDam().getId() : null);
    }
}
