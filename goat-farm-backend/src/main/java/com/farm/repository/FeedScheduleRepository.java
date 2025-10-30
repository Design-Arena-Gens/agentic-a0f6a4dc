package com.farm.repository;

import com.farm.entity.FeedSchedule;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedScheduleRepository extends JpaRepository<FeedSchedule, Long> {

    List<FeedSchedule> findByGoatIdAndScheduleDateBetween(Long goatId, LocalDate start, LocalDate end);
}
