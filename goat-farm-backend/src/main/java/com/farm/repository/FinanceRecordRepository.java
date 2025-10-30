package com.farm.repository;

import com.farm.entity.FinanceRecord;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinanceRecordRepository extends JpaRepository<FinanceRecord, Long> {

    List<FinanceRecord> findByFarmIdAndRecordDateBetween(Long farmId, LocalDate start, LocalDate end);
}
