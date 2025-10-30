package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.BreedingRecord;
import com.farm.service.BreedingService;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/breeding")
public class BreedingController {

    private final BreedingService breedingService;

    public BreedingController(BreedingService breedingService) {
        this.breedingService = breedingService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','VERIFIER','VET')")
    public ResponseEntity<ApiResponse<List<BreedingRecord>>> listBreedingRecords() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Breeding records", breedingService.listBreedingRecords()));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','VET')")
    public ResponseEntity<ApiResponse<BreedingRecord>> createBreedingRecord(@RequestBody Map<String, Object> payload) {
        Long doeId = ((Number) payload.get("doeId")).longValue();
        Long buckId = ((Number) payload.get("buckId")).longValue();
        BreedingRecord record = new BreedingRecord();
        record.setBreedingType((String) payload.getOrDefault("breedingType", "NATURAL"));
        Number kidsBorn = (Number) payload.getOrDefault("kidsBorn", 0);
        Number kidsWeaned = (Number) payload.getOrDefault("kidsWeaned", 0);
        record.setKidsBorn(kidsBorn == null ? 0 : kidsBorn.intValue());
        record.setKidsWeaned(kidsWeaned == null ? 0 : kidsWeaned.intValue());
        record.setNotes((String) payload.getOrDefault("notes", ""));
        if (payload.get("breedingDate") != null) {
            record.setBreedingDate(java.time.LocalDate.parse(payload.get("breedingDate").toString()));
        }
        return ResponseEntity.ok(new ApiResponse<>(true, "Breeding record created", breedingService.createRecord(doeId, buckId, record)));
    }
}
