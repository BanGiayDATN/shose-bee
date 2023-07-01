package com.example.shose.server.repository;

import com.example.shose.server.dto.request.brand.FindBrandRequest;
import com.example.shose.server.dto.request.category.FindCategoryRequest;
import com.example.shose.server.dto.response.BrandResponse;
import com.example.shose.server.dto.response.CategoryResponse;
import com.example.shose.server.entity.Brand;
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
public interface BrandRepository extends JpaRepository<Brand,String> {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY m.last_modified_date DESC ) AS stt,
                m.id AS id,
                m.name AS name,
                m.status AS status,
                m.created_date AS createdDate,
                m.last_modified_date AS lastModifiedDate
            FROM brand m
            WHERE 
                ( :#{#req.name} IS NULL 
                    OR :#{#req.name} LIKE '' 
                    OR name LIKE %:#{#req.name}% ) 
            GROUP BY m.id
            ORDER BY m.last_modified_date DESC  
            """, countQuery = """
            SELECT count(1)            
            FROM brand m
            WHERE 
                ( :#{#req.name} IS NULL 
                    OR :#{#req.name} LIKE '' 
                    OR name LIKE %:#{#req.name}% ) 
            GROUP BY m.id
            ORDER BY m.last_modified_date DESC
            """, nativeQuery = true)
    Page<BrandResponse> getAll(Pageable pageable, @Param("req") FindBrandRequest req);

    @Query("SELECT a FROM Brand a WHERE a.name =:name")
    Brand getOneByName (@Param("name") String name);

    @Query("SELECT s FROM Brand s WHERE s.name =:name AND s.id <> :id")
    Brand getByNameExistence(@Param("name") String name,
                            @Param("id") String id);
}
