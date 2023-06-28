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
            WHERE i.status = '0'
            GROUP BY detail.id, i.name, p.name, detail.price, detail.created_date, detail.gender, detail.status;
            """,countQuery = """
            SELECT COUNT(1)
            FROM product_detail detail
            JOIN product p on detail.id_product = p.id
            JOIN image i on detail.id = i.id_product_detail
            WHERE i.status = '0'
            GROUP BY detail.id, i.name, p.name, detail.price, detail.created_date, detail.gender, detail.status;
                       """,nativeQuery = true)
    Page<ProductDetailReponse> getAllProductDetail(Pageable pageable, @Param("req") FindProductDetailRequest req);
}
