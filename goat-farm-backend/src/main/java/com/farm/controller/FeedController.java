package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.entity.FeedSchedule;
import com.farm.entity.FeedStock;
import com.farm.service.FeedService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
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
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;

    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("/stock")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<List<FeedStock>>> listStock(@RequestParam(required = false) Long farmId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Feed stock", feedService.listStock(farmId)));
    }

    @PostMapping("/stock")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','APPROVER')")
    public ResponseEntity<ApiResponse<FeedStock>> createStock(@RequestBody FeedStock stock) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Feed stock saved", feedService.createFeedStock(stock)));
    }

    @GetMapping("/schedule/{goatId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<List<FeedSchedule>>> listSchedule(
            @PathVariable Long goatId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Feed schedule", feedService.listSchedules(goatId, start, end)));
    }

    @PostMapping("/schedule")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','WORKER')")
    public ResponseEntity<ApiResponse<FeedSchedule>> createSchedule(@RequestBody FeedSchedule schedule) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Feed schedule saved", feedService.createFeedSchedule(schedule)));
    }
}
