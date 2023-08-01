package com.example.shose.server.repository;

import com.example.shose.server.dto.request.address.FindAddressRequest;
import com.example.shose.server.dto.response.AddressResponse;
import com.example.shose.server.dto.response.user.SimpleUserResponse;
import com.example.shose.server.entity.Address;
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
                a.line AS line,
                a.district AS district,
                a.province AS province,
                a.werd AS ward,
                a.created_date AS createdDate,
                a.last_modified_date AS lastModifiedDate,
                u.id AS idUser
            FROM address a
            JOIN user u on a.id_user = u.id
            WHERE u.status = 'DANG_SU_DUNG'
              AND 
                  ( u.id LIKE %:#{#req.id_user}% )
            AND 
                  ( :#{#req.line} IS NULL 
                      OR :#{#req.line} LIKE '' 
                      OR a.line LIKE %:#{#req.line}% )
            AND 
                  ( :#{#req.district} IS NULL 
                      OR :#{#req.district} LIKE '' 
                      OR a.district LIKE %:#{#req.district}% )
            AND 
                  ( :#{#req.province} IS NULL 
                      OR :#{#req.province} LIKE '' 
                      OR a.province LIKE %:#{#req.province}% )
            AND 
                  ( :#{#req.ward} IS NULL 
                      OR :#{#req.ward} LIKE '' 
                      OR a.werd LIKE %:#{#req.ward}% )        
            GROUP BY a.id
            ORDER BY a.last_modified_date DESC
                  """,
            nativeQuery = true
    )
    List<AddressResponse> getAll(@Param("req") FindAddressRequest req);

    @Query(value = """
             SELECT ac.id, us.full_name FROM account ac
                        LEFT JOIN user us ON us.id = ac.id_user
                        
            """, nativeQuery = true)
    List<SimpleUserResponse> getAllSimpleEntityUser();
}