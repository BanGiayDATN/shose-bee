package com.example.shose.server.repository;

import com.example.shose.server.dto.response.SizeProductDetailReponse;
import com.example.shose.server.entity.SizeProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeProductDetailRepository extends JpaRepository<SizeProductDetail , String> {

    @Query(value = """
            SELECT
                spd.id AS id,
                s.name AS nameSize,
                spd.quantity AS quantity,
                spd.status AS status
            FROM size_product_detail spd
            JOIN product_detail pd ON spd.id_product_detail = pd.id
            JOIN size s ON spd.id_size = s.id
            WHERE pd.id = :id
        """, nativeQuery = true)
    List<SizeProductDetailReponse> findAllByIdProductDetail(@Param("id") String id);

    @Query("SELECT spd FROM SizeProductDetail spd WHERE spd.productDetail.id =:id")
    List<SizeProductDetail> findAllByIdProduct(@Param("id") String id);

}
