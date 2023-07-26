package com.example.shose.server.repository;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.promotion.FindPromotionRequest;
import com.example.shose.server.dto.response.promotion.PromotionRespone;
import com.example.shose.server.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion,String> {
    @Query(value = """ 
            select 
            ROW_NUMBER() OVER (ORDER BY po.last_modified_date DESC ) as stt,
                        
            po.id as id,
            po.code as code,
            po.name as name,
            po.value as value,
            po.start_date as startDate,
            po.end_date as endDate,
            po.status as status,
            po.created_date AS createdDate,
            po.last_modified_date AS lastModifiedDate
                       
            from promotion po 
            where
                        
                (:#{#req.code} IS NULL 
                or :#{#req.code} LIKE '' 
                or po.code like  %:#{#req.code}%)
            and 
                (:#{#req.name} IS NULL 
                or :#{#req.name} LIKE '' 
                or po.name like %:#{#req.name}% )
            and 
                (:#{#req.value} IS NULL 
                or :#{#req.value} LIKE '' 
                or po.value = :#{#req.value})
            and 
                (:#{#req.status} IS NULL 
                or :#{#req.status} LIKE ''
                or po.status = :#{#req.status} )
            and (
                (:#{#req.startDate} IS NULL 
                or :#{#req.startDate} LIKE ''
                or :#{#req.endDate} IS NULL 
                or :#{#req.endDate} LIKE '')           
                or((po.start_date>= :#{#req.startDate} and  po.start_date<= :#{#req.endDate}) and(po.end_date>= :#{#req.startDate} and po.end_date<= :#{#req.endDate} )) )
            GROUP BY po.id
            ORDER BY po.last_modified_date DESC  
            """,
            nativeQuery = true )
    List<PromotionRespone> getAllPromotion(@Param("req") FindPromotionRequest req);
    @Query("SELECT po FROM Promotion po WHERE po.code like %:code%")
    Promotion getByCode(@Param("code") String code);
    @Query("SELECT po FROM Promotion po WHERE po.endDate < :currentDate")
    List<Promotion> findExpiredPromotions(@Param("currentDate") Long currentDate);
    @Query("SELECT po FROM Promotion po WHERE po.startDate = :currentDate")
    List<Promotion> findStartPromotions(@Param("currentDate") Long currentDate);
}
