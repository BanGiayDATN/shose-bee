package com.example.shose.server.repository;

import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.User;
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
public interface UserReposiory extends JpaRepository<User, String> {
    @Query(value = """
            SELECT
                ROW_NUMBER() OVER (ORDER BY u.last_modified_date DESC ) AS stt,
                u.id AS id,
                u.gender AS gender,
                u.full_name AS fullName,
                u.date_of_birth AS dateOfBirth,
                u.avata AS avata,
                u.email AS email,
                u.phone_number AS phoneNumber,
                u.updated_by AS updatedBy,
                u.created_by AS createdBy,
                u.status AS status,
                u.created_date AS createdDate,
                u.last_modified_date AS lastModifiedDate
            FROM user u
            """, countQuery = """
            SELECT count(1)            
            FROM user u
            """, nativeQuery = true)
    Page<EmployeeResponse> getAll(Pageable pageable, FindEmployeeRequest req);

    @Query(value = """
    SELECT
        ROW_NUMBER() OVER (ORDER BY u.last_modified_date DESC) AS stt,
        u.id AS id,
        u.gender AS gender,
        u.full_name AS fullName,
        u.date_of_birth AS dateOfBirth,
        u.avata AS avata,
        u.email AS email,
        u.phone_number AS phoneNumber,
        u.updated_by AS updatedBy,
        u.created_by AS createdBy,
        u.status AS status,
        u.created_date AS createdDate,
        u.last_modified_date AS lastModifiedDate
    FROM user u
    WHERE  
        (:#{#req.fullName} IS NULL 
        OR u.full_name LIKE CONCAT('%', :#{#req.fullName}, '%'))
        AND
        (:#{#req.phoneNumber} IS NULL
        OR u.phone_number LIKE CONCAT('%', :#{#req.phoneNumber}, '%'))
    """, nativeQuery = true)
    Page<EmployeeResponse> findByName(Pageable pageable, @Param("req") FindEmployeeRequest req);
}
