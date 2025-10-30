package com.farm.repository;

import com.farm.entity.SensorData;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorDataRepository extends JpaRepository<SensorData, Long> {

    List<SensorData> findByFarmIdAndRecordedAtBetween(Long farmId, LocalDateTime start, LocalDateTime end);
}
