package com.farm.dto;

import java.math.BigDecimal;
import java.util.Map;

public record DashboardMetrics(
        Long farmId,
        Long totalGoats,
        Long activeGoats,
        Double mortalityRate,
        Double fertilityRate,
        Double feedCostPerKgGain,
        BigDecimal monthlyRevenue,
        BigDecimal monthlyExpenses,
        Map<String, Double> breedCompositionAverages,
        Map<String, Double> kpiValues) {
}
