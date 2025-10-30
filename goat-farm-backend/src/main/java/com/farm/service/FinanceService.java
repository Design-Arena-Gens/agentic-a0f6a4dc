package com.farm.service;

import com.farm.entity.Farm;
import com.farm.entity.FinanceRecord;
import com.farm.exception.NotFoundException;
import com.farm.repository.FarmRepository;
import com.farm.repository.FinanceRecordRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FinanceService {

    private final FinanceRecordRepository financeRecordRepository;
    private final FarmRepository farmRepository;

    public FinanceService(FinanceRecordRepository financeRecordRepository, FarmRepository farmRepository) {
        this.financeRecordRepository = financeRecordRepository;
        this.farmRepository = farmRepository;
    }

    @Transactional
    public FinanceRecord createRecord(FinanceRecord record) {
        if (record.getFarm() != null && record.getFarm().getId() != null) {
            Farm farm = farmRepository
                    .findById(record.getFarm().getId())
                    .orElseThrow(() -> new NotFoundException("Farm not found"));
            record.setFarm(farm);
        }
        return financeRecordRepository.save(record);
    }

    public List<FinanceRecord> listRecords(Long farmId, LocalDate start, LocalDate end) {
        if (farmId == null) {
            return financeRecordRepository.findAll().stream()
                    .filter(record -> {
                        LocalDate date = record.getRecordDate();
                        return date != null && !date.isBefore(start) && !date.isAfter(end);
                    })
                    .toList();
        }
        return financeRecordRepository.findByFarmIdAndRecordDateBetween(farmId, start, end);
    }
}
