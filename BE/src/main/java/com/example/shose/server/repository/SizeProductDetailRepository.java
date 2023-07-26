package com.example.shose.server.repository;

import com.example.shose.server.entity.SizeProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeProductDetailRepository extends JpaRepository<SizeProductDetail , String> {
}
