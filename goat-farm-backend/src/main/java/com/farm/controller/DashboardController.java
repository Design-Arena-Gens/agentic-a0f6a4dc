package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.dto.DashboardMetrics;
import com.farm.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','VERIFIER','APPROVER')")
    public ResponseEntity<ApiResponse<DashboardMetrics>> getSummary(@RequestParam(required = false) Long farmId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Dashboard metrics", dashboardService.summarizeFarm(farmId)));
    }
}
