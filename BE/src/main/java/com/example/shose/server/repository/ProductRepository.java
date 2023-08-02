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
                ROW_NUMBER() OVER (ORDER BY p.last_modified_date DESC) AS stt,
                p.id AS id,
                p.code AS code,
                p.name AS nameProduct,
                p.status AS status,
                SUM(pd.quantity) AS totalQuantity
            FROM product p
            JOIN product_detail pd ON p.id = pd.id_product
            WHERE (
                          :#{#req.keyword} IS NULL OR :#{#req.keyword} = ''\s
                          OR p.code LIKE %:#{#req.keyword}% 
                          OR p.name LIKE %:#{#req.keyword}%
                      )
            AND  ( :#{#req.status} IS NULL   OR :#{#req.status} LIKE '' OR p.status LIKE :#{#req.status} )
            AND  ( :#{#req.minQuantity} IS NULL OR pd.quantity >= :#{#req.minQuantity} ) 
            AND  ( :#{#req.maxQuantity} IS NULL OR pd.quantity <= :#{#req.maxQuantity} )
            GROUP BY  p.id, p.status
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

    @Query(value = """ 
        SELECT p.name FROM product p WHERE ( :name IS NULL   OR :name LIKE '' OR p.name LIKE %:name% )
 """,nativeQuery = true)
    List<String> findAllByName(@Param("name")String name);
}
