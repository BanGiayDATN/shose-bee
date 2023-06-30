package com.example.shose.server.repository;

import com.example.shose.server.dto.request.product.FindProductRequest;
import com.example.shose.server.dto.request.sole.FindSoleRequest;
import com.example.shose.server.dto.response.ProductResponse;
import com.example.shose.server.dto.response.SoleResponse;
import com.example.shose.server.entity.Sole;
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
public interface SoleRepository extends JpaRepository<Sole,String> {

    @Query(value = """
             SELECT
                ROW_NUMBER() OVER (ORDER BY s.last_modified_date DESC ) AS stt,
                s.id AS id,
                s.name AS name,
                s.status AS status,
                s.created_date AS createdDate,
                s.last_modified_date AS lastModifiedDate
            FROM sole s         
            """, countQuery = """
            SELECT count(1)            
             FROM sole s 
            """, nativeQuery = true)
    Page<SoleResponse> getAll(Pageable pageable, FindSoleRequest req);

    @Query("SELECT s FROM Sole s WHERE s.name =:name")
    Sole getByName (@Param("name") String name);

}
