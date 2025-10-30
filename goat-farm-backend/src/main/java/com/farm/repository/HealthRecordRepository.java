package com.farm.repository;

import com.farm.entity.HealthRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {

    List<HealthRecord> findByGoatId(Long goatId);
}
