package com.farm.repository;

import com.farm.entity.FarmTask;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmTaskRepository extends JpaRepository<FarmTask, Long> {

    List<FarmTask> findByFarmIdAndDueDateBetween(Long farmId, LocalDate start, LocalDate end);
}
