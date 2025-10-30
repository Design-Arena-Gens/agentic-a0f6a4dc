package com.farm.controller;

import com.farm.dto.ApiResponse;
import com.farm.dto.GoatCreateRequest;
import com.farm.dto.GoatDto;
import com.farm.service.GoatService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/goats")
public class GoatController {

    private final GoatService goatService;

    public GoatController(GoatService goatService) {
        this.goatService = goatService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','VERIFIER','APPROVER','WORKER','VET')")
    public ResponseEntity<ApiResponse<List<GoatDto>>> listGoats(@RequestParam(required = false) Long farmId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Goats", goatService.listGoats(farmId)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','FARM_MANAGER','APPROVER','VET')")
    public ResponseEntity<ApiResponse<GoatDto>> registerGoat(@Valid @RequestBody GoatCreateRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Goat registered", goatService.registerGoat(request)));
    }
}
