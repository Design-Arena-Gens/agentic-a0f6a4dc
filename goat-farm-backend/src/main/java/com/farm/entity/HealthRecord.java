package com.farm.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "health_records")
@Getter
@Setter
public class HealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "goat_id")
    @JsonIgnore
    private Goat goat;

    private LocalDate recordDate;

    private String recordType;

    private String diagnosis;

    private String treatment;

    private String medication;

    private Double temperature;
    private Double pulse;
    private Double respiration;
    private Double weightKg;

    private Boolean mortality;

    private String veterinarian;

    @Column(length = 1000)
    private String remarks;

    private LocalDateTime createdAt = LocalDateTime.now();
}
