package com.example.shose.server.repository;

import com.example.shose.server.entity.HistoryPoin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryPoinRepository extends JpaRepository<HistoryPoin, String> {
}
