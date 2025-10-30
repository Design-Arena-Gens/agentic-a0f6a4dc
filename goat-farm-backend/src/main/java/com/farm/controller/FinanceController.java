package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.FinanceRecord;
import com.farm.service.FinanceService;
import java.time.LocalDate;
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
@RequestMapping("/api/finance")
public class FinanceController {

    private final FinanceService financeService;

    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','APPROVER')")
    public ResponseEntity<ApiResponse<FinanceRecord>> createRecord(@RequestBody FinanceRecord record) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Finance record saved", financeService.createRecord(record)));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','VERIFIER')")
    public ResponseEntity<ApiResponse<List<FinanceRecord>>> listRecords(
            @RequestParam Long farmId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Finance records", financeService.listRecords(farmId, start, end)));
    }
}
