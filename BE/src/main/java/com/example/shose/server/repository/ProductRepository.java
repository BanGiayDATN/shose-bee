package com.example.shose.server.repository;

import com.example.shose.server.dto.request.product.FindProductRequest;
import com.example.shose.server.dto.response.ProductResponse;
import com.example.shose.server.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * @author Nguyễn Vinh
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY p.last_modified_date DESC ) AS stt,
                p.id AS id,
                p.code AS code,
                p.name AS name,
                p.status AS status,
                p.created_date AS createdDate,
                p.last_modified_date AS lastModifiedDate
            FROM product p
            """, countQuery = """
            SELECT count(1)            
            FROM product p
            """, nativeQuery = true)
    Page<ProductResponse> getAll(Pageable pageable, FindProductRequest req);

    @Query("SELECT p FROM Product p WHERE p.code =:code")
    Product getOneByCode (@Param("code") String code);
}
