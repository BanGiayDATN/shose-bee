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

import java.util.List;


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
            WHERE 
                ( :#{#req.code} IS NULL 
                    OR :#{#req.code} LIKE '' 
                    OR code LIKE %:#{#req.code}% ) 
            AND 
                ( :#{#req.name} IS NULL 
                    OR :#{#req.name} LIKE '' 
                    OR name LIKE %:#{#req.name}% ) 
            GROUP BY p.id
            ORDER BY p.last_modified_date DESC  
            """, nativeQuery = true)
    List<ProductResponse> getAll(@Param("req") FindProductRequest req);

    @Query("SELECT p FROM Product p WHERE p.code =:code")
    Product getOneByCode (@Param("code") String code);

    @Query("SELECT p FROM Product p WHERE p.name =:name")
    Product getOneByName (@Param("name") String name);

    @Query("SELECT s FROM Product s WHERE s.code =:code AND s.id <> :id")
    Product getByNameExistence(@Param("code") String code, @Param("id") String id);

    @Query("SELECT p FROM Product p where p.status = 'DANG_SU_DUNG'")
    List<Product> getProductUse();
}
