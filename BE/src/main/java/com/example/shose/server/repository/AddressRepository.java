package com.example.shose.server.repository;

import com.example.shose.server.dto.request.address.FindAddressRequest;
import com.example.shose.server.dto.response.AddressResponse;
import com.example.shose.server.dto.response.user.SimpleUserResponse;
import com.example.shose.server.entity.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface AddressRepository extends JpaRepository<Address, String> {

    @Query(value = """
            SELECT 
                ROW_NUMBER() OVER (ORDER BY a.last_modified_date DESC ) AS stt,
                a.id AS id,
                u.full_name AS nameUser,
                a.line AS line,
                a.city AS city,
                a.province AS province,
                a.country AS country,
                a.created_date AS createdDate,
                a.last_modified_date AS lastModifiedDate
            FROM address a
            JOIN user u on a.id_user = u.id
            WHERE u.status = '0'
            AND 
                  ( :#{#req.line} IS NULL 
                      OR :#{#req.line} LIKE '' 
                      OR a.line LIKE %:#{#req.line}% )
            AND 
                  ( :#{#req.city} IS NULL 
                      OR :#{#req.city} LIKE '' 
                      OR a.city LIKE %:#{#req.city}% )
            AND 
                  ( :#{#req.province} IS NULL 
                      OR :#{#req.province} LIKE '' 
                      OR a.province LIKE %:#{#req.province}% )
            AND 
                  ( :#{#req.country} IS NULL 
                      OR :#{#req.country} LIKE '' 
                      OR a.country LIKE %:#{#req.country}% )        
            AND
                 ( :#{#req.user} IS NULL
                      OR :#{#req.user} LIKE ''
                      OR u.full_name LIKE %:#{#req.user}% )
            GROUP BY a.id, u.full_name, a.line, a.city, a.province, a.country, a.created_date
            ORDER BY a.last_modified_date DESC  
            """, countQuery = """
              SELECT COUNT(1)
              FROM address a
              JOIN user u on a.id_user = u.id
              WHERE u.status = '0'
            AND 
                  ( :#{#req.line} IS NULL 
                      OR :#{#req.line} LIKE '' 
                      OR a.line LIKE %:#{#req.line}% )
            AND 
                  ( :#{#req.city} IS NULL 
                      OR :#{#req.city} LIKE '' 
                      OR a.city LIKE %:#{#req.city}% )
            AND 
                  ( :#{#req.province} IS NULL 
                      OR :#{#req.province} LIKE '' 
                      OR a.province LIKE %:#{#req.province}% )
            AND 
                  ( :#{#req.country} IS NULL 
                      OR :#{#req.country} LIKE '' 
                      OR a.country LIKE %:#{#req.country}% )        
            AND
                 ( :#{#req.user} IS NULL
                      OR :#{#req.user} LIKE ''
                      OR u.full_name LIKE %:#{#req.user}% )
              GROUP BY a.id, u.full_name, a.line, a.city, a.province, a.country, a.created_date
              ORDER BY a.last_modified_date DESC
                  """,
            nativeQuery = true
    )
    Page<AddressResponse> getAll(Pageable pageable, @Param("req") FindAddressRequest req);

    @Query(value = """
             SELECT ac.id, us.full_name FROM account ac
                        LEFT JOIN user us ON us.id = ac.id_user
            
            """, nativeQuery = true)
    List<SimpleUserResponse> getAllSimpleEntityUser();
}
