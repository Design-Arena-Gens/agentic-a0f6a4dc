package com.farm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Map;

public record GoatCreateRequest(
        @NotBlank String tagId,
        @NotBlank String gender,
        @NotNull LocalDate dateOfBirth,
        String color,
        String photoUrl,
        Map<String, Double> breedComposition,
        Long farmId,
        Long sireId,
        Long damId) {
}
