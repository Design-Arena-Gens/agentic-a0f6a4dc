package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.SensorData;
import com.farm.repository.SensorDataRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    private final SensorDataRepository sensorDataRepository;

    public SensorController(SensorDataRepository sensorDataRepository) {
        this.sensorDataRepository = sensorDataRepository;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<SensorData>> ingest(@RequestBody SensorData data) {
        data.setRecordedAt(data.getRecordedAt() == null ? LocalDateTime.now() : data.getRecordedAt());
        return ResponseEntity.ok(new ApiResponse<>(true, "Sensor data ingested", sensorDataRepository.save(data)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<List<SensorData>>> list(
            @RequestParam Long farmId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Sensor data", sensorDataRepository.findByFarmIdAndRecordedAtBetween(farmId, start, end)));
    }
}
