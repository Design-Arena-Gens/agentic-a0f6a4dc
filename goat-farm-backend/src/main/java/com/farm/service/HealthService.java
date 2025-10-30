package com.farm.service;

import com.farm.entity.Goat;
import com.farm.entity.HealthRecord;
import com.farm.exception.NotFoundException;
import com.farm.repository.GoatRepository;
import com.farm.repository.HealthRecordRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HealthService {

    private final HealthRecordRepository healthRecordRepository;
    private final GoatRepository goatRepository;

    public HealthService(HealthRecordRepository healthRecordRepository, GoatRepository goatRepository) {
        this.healthRecordRepository = healthRecordRepository;
        this.goatRepository = goatRepository;
    }

    public List<HealthRecord> listHealthRecords(Long goatId) {
        return goatId == null ? healthRecordRepository.findAll() : healthRecordRepository.findByGoatId(goatId);
    }

    @Transactional
    public HealthRecord createHealthRecord(Long goatId, HealthRecord record) {
        Goat goat = goatRepository
                .findById(goatId)
                .orElseThrow(() -> new NotFoundException("Goat not found"));
        record.setGoat(goat);
        if (record.getRecordDate() == null) {
            record.setRecordDate(java.time.LocalDate.now());
        }
        return healthRecordRepository.save(record);
    }
}
