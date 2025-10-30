package com.farm.repository;

import com.farm.entity.BreedingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreedingRecordRepository extends JpaRepository<BreedingRecord, Long> {
}
