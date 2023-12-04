package com.example.shose.server.entity;

import com.example.shose.server.entity.base.PrimaryEntity;
import com.example.shose.server.infrastructure.constant.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "scoring_formula")
@AllArgsConstructor
@NoArgsConstructor
public class ScoringFormula extends PrimaryEntity {

    @Column(name = "exchange_rate_poin")
    private Integer exchangeRatePoin;

    @Column(name = "exchange_rate_money")
    private BigDecimal exchangeRateMoney;

    @Enumerated(EnumType.STRING)
    private Status status;
}
