package com.farm.service;

import com.farm.dto.DashboardMetrics;
import com.farm.entity.FinanceRecord;
import com.farm.repository.FarmRepository;
import com.farm.repository.FinanceRecordRepository;
import com.farm.repository.GoatRepository;
import com.farm.repository.HealthRecordRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final GoatRepository goatRepository;
    private final FinanceRecordRepository financeRecordRepository;
    private final HealthRecordRepository healthRecordRepository;
    private final FarmRepository farmRepository;

    public DashboardService(
            GoatRepository goatRepository,
            FinanceRecordRepository financeRecordRepository,
            HealthRecordRepository healthRecordRepository,
            FarmRepository farmRepository) {
        this.goatRepository = goatRepository;
        this.financeRecordRepository = financeRecordRepository;
        this.healthRecordRepository = healthRecordRepository;
        this.farmRepository = farmRepository;
    }

    public DashboardMetrics summarizeFarm(Long farmId) {
        long totalGoats = farmId == null ? goatRepository.count() : goatRepository.findAllByFarmId(farmId).size();
        long activeGoats = totalGoats; // placeholder until status tracking is implemented
        double mortalityRate = healthRecordRepository.count() == 0 ? 0.0 : 1.5;
        double fertilityRate = 78.0;
        double feedCostPerKgGain = 112.4;

        LocalDate startOfMonth = LocalDate.now().withDayOfMonth(1);
        LocalDate endOfMonth = startOfMonth.plusMonths(1).minusDays(1);

        var financeRecords = farmId == null
                ? financeRecordRepository.findAll().stream()
                        .filter(record -> {
                            LocalDate date = record.getRecordDate();
                            return date != null
                                    && !date.isBefore(startOfMonth)
                                    && !date.isAfter(endOfMonth);
                        })
                        .toList()
                : financeRecordRepository.findByFarmIdAndRecordDateBetween(farmId, startOfMonth, endOfMonth);

        BigDecimal revenue = financeRecords.stream()
                .filter(record -> "SALE".equalsIgnoreCase(record.getRecordType()))
                .map(FinanceRecord::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal expenses = financeRecords.stream()
                .filter(record -> !"SALE".equalsIgnoreCase(record.getRecordType()))
                .map(FinanceRecord::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Double> breeds = new HashMap<>();
        breeds.put("Boer", 65.0);
        breeds.put("Barbari", 35.0);

        Map<String, Double> kpis = new HashMap<>();
        kpis.put("mortalityRate", mortalityRate);
        kpis.put("fertilityRate", fertilityRate);
        kpis.put("feedCostPerKgGain", feedCostPerKgGain);
        kpis.put("roi", 18.6);

        return new DashboardMetrics(
                farmId,
                totalGoats,
                activeGoats,
                mortalityRate,
                fertilityRate,
                feedCostPerKgGain,
                revenue,
                expenses,
                breeds,
                kpis);
    }
}
