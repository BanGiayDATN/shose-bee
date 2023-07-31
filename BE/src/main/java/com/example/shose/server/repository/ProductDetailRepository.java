package com.example.shose.server.repository;

import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
import com.example.shose.server.dto.response.productdetail.ProductDetailResponse;
import com.example.shose.server.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, String> {

    @Query(value = """
             SELECT
                 ROW_NUMBER() OVER (ORDER BY detail.last_modified_date DESC) AS stt,
                 detail.id AS id,
                 i.name AS image,
                 p.name AS nameProduct,
                 detail.price AS price,
                 detail.created_date AS created_date,
                 detail.gender AS gender,
                 detail.status AS status,
                 (
                     SELECT SUM(spd.quantity)
                     FROM size_product_detail spd
                     JOIN size si ON spd.id_size = si.id
                     WHERE detail.id = spd.id_product_detail
                 ) AS total_quantity,
                 (
                      SELECT p2.value
                      FROM promotion p2
                      WHERE detail.id_promotion = p2.id AND p2.status = 'DANG_SU_DUNG'
                      ORDER BY p2.value DESC
                 ) AS promotion
             FROM product_detail detail
             JOIN product p ON detail.id_product = p.id
             JOIN image i ON detail.id = i.id_product_detail
             JOIN sole s ON s.id = detail.id_sole
             JOIN material m ON detail.id_material = m.id
             JOIN category c ON detail.id_category = c.id
             JOIN brand b ON detail.id_brand = b.id
             JOIN color col ON detail.id_color = col.id
             WHERE i.status = true
             AND  ( :#{#req.color} IS NULL OR :#{#req.color} LIKE '' OR col.code LIKE %:#{#req.color}% ) 
             AND  ( :#{#req.brand} IS NULL OR :#{#req.brand} LIKE '' OR b.name LIKE %:#{#req.brand}% )
             AND  ( :#{#req.material} IS NULL OR :#{#req.material} LIKE '' OR m.name LIKE %:#{#req.material}% ) 
             AND  ( :#{#req.product} IS NULL OR :#{#req.product} LIKE ''  OR p.name LIKE %:#{#req.product}% ) 
             AND  ( :#{#req.sole} IS NULL  OR :#{#req.sole} LIKE '' OR s.name LIKE %:#{#req.sole}% )
             AND  ( :#{#req.category} IS NULL OR :#{#req.category} LIKE '' OR c.name LIKE %:#{#req.category}% )
             AND  ( :#{#req.status} IS NULL   OR :#{#req.status} LIKE '' OR detail.status LIKE :#{#req.status} )
             AND  ( :#{#req.gender} IS NULL OR :#{#req.gender} LIKE '' OR detail.gender LIKE :#{#req.gender} )
             AND  ( :#{#req.minPrice} IS NULL OR detail.price >= :#{#req.minPrice} ) 
             AND  ( :#{#req.maxPrice} IS NULL OR detail.price <= :#{#req.maxPrice} )
             AND (
                 SELECT SUM(spd.quantity)
                 FROM size_product_detail spd
                 JOIN size si ON spd.id_size = si.id
                 WHERE detail.id = spd.id_product_detail
                 AND ( :#{#req.sizeProduct} IS NULL OR si.name = :#{#req.sizeProduct} OR :#{#req.sizeProduct} = '' )
             ) IS NOT NULL
             GROUP BY detail.id, i.name, p.name, detail.price, detail.created_date, detail.gender, detail.status
             ORDER BY detail.last_modified_date DESC 
            """, nativeQuery = true)
    List<ProductDetailReponse> getAll(@Param("req") FindProductDetailRequest req);

    @Query(value = """
             SELECT 
                               detail.id AS id,
                               i.name AS image,
                               p.code AS codeProduct,
                               p.name AS nameProduct,
                               detail.price AS price,
                               detail.created_date AS created_date,
                               detail.gender AS gender,
                               detail.status AS status,
                               detail.id_promotion AS idPromotion
                        FROM product_detail detail
                        JOIN product p on detail.id_product = p.id
                        JOIN image i on detail.id = i.id_product_detail
                        where p.id = :id
            """,nativeQuery = true)
    List<GetProductDetailByProduct> getByIdProduct(@Param("id") String id);

    @Query(value = """
             SELECT\s
                                            detail.id AS id,
                                            i.name AS image,
                                            p.code AS codeProduct,
                                            p.name AS nameProduct,
                                            pr.value AS value,
                                            s.name AS nameSole,
                                            m.name AS nameMaterial,
                                            c.name AS nameCategory,
                                            b.name AS nameBrand,
                                            detail.price AS price,
                                            detail.created_date AS created_date,
                                            detail.gender AS gender,
                                            detail.status AS status,
                                            detail.id_promotion AS idPromotion
                          FROM product_detail detail
                          LEFT JOIN product p on detail.id_product = p.id
                          LEFT JOIN image i on detail.id = i.id_product_detail
                         LEFT JOIN sole s ON s.id = detail.id_sole
                         LEFT JOIN material m ON detail.id_material = m.id
                         LEFT JOIN promotion pr ON pr.id = detail.id_promotion
                         LEFT JOIN category c ON detail.id_category = c.id
                         LEFT JOIN brand b ON detail.id_brand = b.id
                         LEFT JOIN color col ON detail.id_color = col.id
                        where detail.id = :id
            """,nativeQuery = true)
    ProductDetailResponse findByIdProductDetail(@Param("id") String id);

}
