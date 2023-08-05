package com.example.shose.server.repository;

import com.example.shose.server.dto.request.product.FindProductRequest;
import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.CustomProductRespone;
import com.example.shose.server.dto.response.ProductResponse;
import com.example.shose.server.entity.Product;
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

    @Query(value = """
                SELECT
                                   ROW_NUMBER() OVER (ORDER BY detail.last_modified_date DESC) AS stt,
                                   p.id AS id,
                                   i.name AS image,
                                   p.name  AS nameProduct,
                                   detail.price AS price,
                                   detail.created_date AS created_date,
                                   detail.status AS status,
                                   c.name AS nameCategory,
                                   b.name AS nameBrand,
                                   SUM(detail.quantity) AS quantity,
                                    MAX(pr.value) AS promotion,
                                     si.name AS nameSize,
                                   s2.name AS size,
                                   c2.code AS color,
                                   MIN(detail.price) AS min,
                                   MAX(detail.price) AS max
                                FROM product  p
                                JOIN product_detail detail  ON detail.id_product = p.id
                                JOIN image i ON detail.id = i.id_product_detail
                                JOIN sole s ON s.id = detail.id_sole
                                JOIN material m ON detail.id_material = m.id
                                JOIN category c ON detail.id_category = c.id
                                JOIN brand b ON detail.id_brand = b.id
                                LEFT JOIN promotion_product_detail ppd on detail.id = ppd.id_product_detail
                                LEFT JOIN promotion pr on pr.id = ppd.id_promotion
                                JOIN size s2 on detail.id_size = s2.id
                                LEFT JOIN size si ON detail.id_size = si.id
                                JOIN color c2 on detail.id_color = c2.id
                WHERE i.status = true
                AND  ( :#{#req.size} = 0 OR s2.name = :#{#req.size} OR :#{#req.size} = '' )
                AND  ( :#{#req.color} IS NULL OR c2.code LIKE %:#{#req.color}% OR :#{#req.color} LIKE '' )
                AND  ( :#{#req.brand} IS NULL OR b.name LIKE %:#{#req.brand}% OR :#{#req.brand} LIKE '' )
                AND  ( :#{#req.material} IS NULL OR :#{#req.material} LIKE '' OR m.name LIKE %:#{#req.material}% ) 
                AND  ( :#{#req.product} IS NULL OR :#{#req.product} LIKE ''  OR p.name LIKE %:#{#req.product}% ) 
                AND  ( :#{#req.sole} IS NULL  OR :#{#req.sole} LIKE '' OR s.name LIKE %:#{#req.sole}% )
                AND  ( :#{#req.category} IS NULL OR :#{#req.category} LIKE '' OR c.name LIKE %:#{#req.category}% )
                AND  ( :#{#req.status} IS NULL   OR :#{#req.status} LIKE '' OR detail.status LIKE :#{#req.status} )
                AND  ( :#{#req.gender} IS NULL OR :#{#req.gender} LIKE '' OR detail.gender LIKE :#{#req.gender} )
                AND  ( :#{#req.minPrice} IS NULL OR detail.price >= :#{#req.minPrice} ) 
                AND  ( :#{#req.maxPrice} IS NULL OR detail.price <= :#{#req.maxPrice} )
                GROUP BY p.id
                ORDER BY detail.last_modified_date DESC 
                 
            """, nativeQuery = true)
    List<CustomProductRespone> getAllProduct(@Param("req") FindProductDetailRequest req);
}
