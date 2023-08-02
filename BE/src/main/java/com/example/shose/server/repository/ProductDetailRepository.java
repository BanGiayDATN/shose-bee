package com.example.shose.server.repository;

import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailDTOResponse;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.dto.response.productdetail.GetProductDetailByProduct;
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
                   CONCAT(p.name ,'[ ',s2.name,' - ',c2.name,' ]') AS nameProduct,
                   detail.price AS price,
                   detail.created_date AS created_date,
                   detail.gender AS gender,
                   detail.status AS status,
                   detail.quantity AS quantity,
                   s2.name AS size,
                   c2.code AS color
                FROM product_detail detail
                JOIN product p ON detail.id_product = p.id
                JOIN image i ON detail.id = i.id_product_detail
                JOIN sole s ON s.id = detail.id_sole
                JOIN material m ON detail.id_material = m.id
                JOIN category c ON detail.id_category = c.id
                JOIN brand b ON detail.id_brand = b.id
                JOIN size s2 on detail.id_size = s2.id
                JOIN color c2 on detail.id_color = c2.id
                WHERE i.status = true
                AND p.id = :#{#req.idProduct}
                AND  ( :#{#req.size} IS NULL OR s2.name = :#{#req.size} OR :#{#req.size} = '' )
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


//    @Query(value = """
//
//""",nativeQuery = true)
//    List<ProductDetailDTOResponse> getListByIdProductDetail (@Param("id") String id);

}
