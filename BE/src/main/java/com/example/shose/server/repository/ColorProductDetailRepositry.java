package com.example.shose.server.repository;

import com.example.shose.server.entity.ColorProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorProductDetailRepositry extends JpaRepository<ColorProductDetail, String> {

    @Query("SELECT cps.color.code FROM ColorProductDetail  cps WHERE cps.productDetail.id =:idProductDetail ")
    List<String> listColorByIdProductDetail (@Param("idProductDetail") String idProductDetail);

    @Query("SELECT cps FROM ColorProductDetail  cps WHERE cps.productDetail.id =:idProductDetail ")
    List<ColorProductDetail> listColorByIdPD(@Param("idProductDetail") String idProductDetail);

}
