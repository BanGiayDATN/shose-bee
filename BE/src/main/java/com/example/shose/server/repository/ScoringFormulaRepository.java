package com.example.shose.server.repository;

import com.example.shose.server.entity.ScoringFormula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoringFormulaRepository extends JpaRepository<ScoringFormula, String> {
}
