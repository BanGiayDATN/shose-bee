package com.example.shose.server.repository;

import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.entity.Size;
import com.example.shose.server.entity.SizeProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SizeProductDetailRepository extends JpaRepository<SizeProductDetail , String> {

    Optional<SizeProductDetail> findBySizeAndProductDetail(Size size, ProductDetail productDetail);
}
