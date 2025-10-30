package com.farm.repository;

import com.farm.entity.FeedStock;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedStockRepository extends JpaRepository<FeedStock, Long> {

    List<FeedStock> findByFarmId(Long farmId);
}
