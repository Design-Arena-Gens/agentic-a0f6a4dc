package com.farm.repository;

import com.farm.entity.Goat;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GoatRepository extends JpaRepository<Goat, Long> {

    Optional<Goat> findByTagId(String tagId);

    @Query("select g from Goat g where g.farm.id = :farmId")
    List<Goat> findAllByFarmId(Long farmId);
}
