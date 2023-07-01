package com.example.shose.server.repository;

import com.example.shose.server.dto.request.productdetail.FindProductDetailRequest;
import com.example.shose.server.dto.response.ProductDetailReponse;
import com.example.shose.server.entity.ProductDetail;
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
public interface ProductDetailRepository extends JpaRepository<ProductDetail, String> {

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY detail.last_modified_date DESC ) AS stt,
                   detail.id AS id,
                   i.name AS image,
                   p.name AS nameProduct,
                   detail.price AS price,
                   detail.created_date AS created_date,
                   detail.gender AS gender,
                   detail.status AS status
            FROM product_detail detail
            JOIN product p on detail.id_product = p.id
            JOIN image i on detail.id = i.id_product_detail
            JOIN sole s on s.id = detail.id_sole
            JOIN material m on detail.id_material = m.id
            JOIN size si on detail.id_size = si.id
            JOIN category c on detail.id_category = c.id
            JOIN brand b on detail.id_brand = b.id
            JOIN color col on detail.id_color = col.id
            WHERE i.status = '0'
            AND 
                ( :#{#req.color} IS NULL 
                    OR :#{#req.color} LIKE '' 
                    OR col.name LIKE %:#{#req.color}% ) 
            AND 
                ( :#{#req.brand} IS NULL 
                    OR :#{#req.brand} LIKE '' 
                    OR b.name LIKE %:#{#req.brand}% )
            AND 
                ( :#{#req.material} IS NULL 
                    OR :#{#req.material} LIKE '' 
                    OR m.name LIKE %:#{#req.material}% ) 
            AND 
                ( :#{#req.product} IS NULL 
                    OR :#{#req.product} LIKE '' 
                    OR p.name LIKE %:#{#req.product}% ) 
            AND 
                ( :#{#req.sizeProduct} IS NULL 
                    OR :#{#req.sizeProduct} LIKE '' 
                    OR si.name LIKE %:#{#req.sizeProduct}% ) 
            AND 
                ( :#{#req.sole} IS NULL 
                    OR :#{#req.sole} LIKE '' 
                    OR s.name LIKE %:#{#req.sole}% )
            AND 
                ( :#{#req.category} IS NULL 
                    OR :#{#req.category} LIKE '' 
                    OR c.name LIKE %:#{#req.category}% )
            GROUP BY detail.id, i.name, p.name, detail.price, detail.created_date, detail.gender, detail.status
            ORDER BY detail.last_modified_date DESC 
            """, countQuery = """
            SELECT COUNT(1)
            FROM product_detail detail
            JOIN product p on detail.id_product = p.id
            JOIN image i on detail.id = i.id_product_detail
            WHERE i.status = '0'
            AND 
                ( :#{#req.color} IS NULL 
                    OR :#{#req.color} LIKE '' 
                    OR col.name LIKE %:#{#req.color}% ) 
            AND 
                ( :#{#req.brand} IS NULL 
                    OR :#{#req.brand} LIKE '' 
                    OR b.name LIKE %:#{#req.brand}% )
            AND 
                ( :#{#req.material} IS NULL 
                    OR :#{#req.material} LIKE '' 
                    OR m.name LIKE %:#{#req.material}% ) 
            AND 
                ( :#{#req.product} IS NULL 
                    OR :#{#req.product} LIKE '' 
                    OR p.name LIKE %:#{#req.product}% ) 
            AND 
                ( :#{#req.sizeProduct} IS NULL 
                    OR :#{#req.sizeProduct} LIKE '' 
                    OR si.name LIKE %:#{#req.sizeProduct}% ) 
            AND 
                ( :#{#req.sole} IS NULL 
                    OR :#{#req.sole} LIKE '' 
                    OR s.name LIKE %:#{#req.sole}% )
            AND 
                ( :#{#req.category} IS NULL 
                    OR :#{#req.category} LIKE '' 
                    OR c.name LIKE %:#{#req.category}% )
            GROUP BY detail.id, i.name, p.name, detail.price, detail.created_date, detail.gender, detail.status
            ORDER BY detail.last_modified_date DESC
                       """, nativeQuery = true)
    Page<ProductDetailReponse> getAllProductDetail(Pageable pageable, @Param("req") FindProductDetailRequest req);
}
