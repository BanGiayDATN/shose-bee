package com.example.shose.server.repository;

import com.example.shose.server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface ProductRepository extends JpaRepository<Product,String> {
}
