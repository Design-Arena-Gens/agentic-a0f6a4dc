package com.farm.service;

import com.farm.entity.BreedingRecord;
import com.farm.entity.Goat;
import com.farm.exception.NotFoundException;
import com.farm.repository.BreedingRecordRepository;
import com.farm.repository.GoatRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BreedingService {

    private final BreedingRecordRepository breedingRecordRepository;
    private final GoatRepository goatRepository;

    public BreedingService(BreedingRecordRepository breedingRecordRepository, GoatRepository goatRepository) {
        this.breedingRecordRepository = breedingRecordRepository;
        this.goatRepository = goatRepository;
    }

    public List<BreedingRecord> listBreedingRecords() {
        return breedingRecordRepository.findAll();
    }

    @Transactional
    public BreedingRecord createRecord(Long doeId, Long buckId, BreedingRecord record) {
        Goat doe = goatRepository
                .findById(doeId)
                .orElseThrow(() -> new NotFoundException("Doe not found"));
        Goat buck = goatRepository
                .findById(buckId)
                .orElseThrow(() -> new NotFoundException("Buck not found"));
        record.setDoe(doe);
        record.setBuck(buck);
        if (record.getExpectedKiddingDate() == null && record.getBreedingDate() != null) {
            record.setExpectedKiddingDate(record.getBreedingDate().plusDays(150));
        }
        if (record.getBreedingDate() == null) {
            record.setBreedingDate(LocalDate.now());
        }
        return breedingRecordRepository.save(record);
    }
}
