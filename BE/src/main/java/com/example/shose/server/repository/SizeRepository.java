package com.example.shose.server.repository;

import com.example.shose.server.dto.request.size.FindSizeRequest;
import com.example.shose.server.dto.response.SizeResponse;
import com.example.shose.server.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface SizeRepository extends JpaRepository<Size, String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY si.last_modified_date DESC ) AS stt,
                si.id AS id,
                si.name AS name,
                si.status AS status,
                si.created_date AS createdDate,
                si.last_modified_date AS lastModifiedDate
            FROM size si
            WHERE 
                ( :#{#req.name} IS NULL 
                    OR :#{#req.name} LIKE '' 
                    OR name LIKE %:#{#req.name}% ) 
            GROUP BY si.id
            ORDER BY si.last_modified_date DESC  
            """, nativeQuery = true)
    List<SizeResponse> getAll(@Param("req") FindSizeRequest req);

    @Query("SELECT a FROM Size a WHERE a.name=:name")
    Size getOneByName(@Param("name") String name);

    @Query("SELECT s FROM Size s WHERE s.name =:name AND s.id <> :id")
    Size getByNameExistence(@Param("name") String name, @Param("id") String id);
}
