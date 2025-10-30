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
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "breeding_records")
@Getter
@Setter
public class BreedingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doe_id")
    @JsonIgnore
    private Goat doe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buck_id")
    @JsonIgnore
    private Goat buck;

    @Column(nullable = false)
    private String breedingType;

    private LocalDate breedingDate;
    private LocalDate expectedKiddingDate;
    private LocalDate actualKiddingDate;

    private Integer kidsBorn;
    private Integer kidsWeaned;

    private Double fertilityPercent;
    private Double conceptionPercent;
    private Double prolificacyPercent;

    @Column(length = 1000)
    private String notes;
}
