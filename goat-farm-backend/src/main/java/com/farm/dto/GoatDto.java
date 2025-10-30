package com.farm.dto;

import java.time.LocalDate;
import java.util.Map;

public record GoatDto(
        Long id,
        String tagId,
        String gender,
        LocalDate dateOfBirth,
        String color,
        String photoUrl,
        Map<String, Double> breedComposition,
        Integer generation,
        Long farmId,
        Long sireId,
        Long damId) {
}
