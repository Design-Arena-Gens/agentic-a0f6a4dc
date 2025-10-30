package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.HealthRecord;
import com.farm.service.HealthService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER','VET')")
    public ResponseEntity<ApiResponse<List<HealthRecord>>> listHealthRecords(@RequestParam(required = false) Long goatId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Health records", healthService.listHealthRecords(goatId)));
    }

    @PostMapping("/{goatId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','VET')")
    public ResponseEntity<ApiResponse<HealthRecord>> createRecord(
            @PathVariable Long goatId, @Valid @RequestBody HealthRecord record) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Health record created", healthService.createHealthRecord(goatId, record)));
    }
}
