package com.example.shose.server.repository;

import com.example.shose.server.entity.Bill;
import com.example.shose.server.request.bill.BillRequest;
import com.example.shose.server.response.BillResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface BillRepository extends JpaRepository<Bill, String> {

    @Query(value = """
            SELECT bi.id, bi.code, bi.created_date, IF(usac.full_name IS NULL, cu.full_name, usac.full_name )  AS userName ,  usem.full_name AS nameEmployees , bi.type, bi.status_bill, bi.total_money, bi.item_discount  FROM bill bi
            LEFT JOIN account ac ON ac.id = bi.id_account
            LEFT JOIN account em ON em.id = bi.id_employees
            LEFT JOIN customer cu ON cu.id = bi.id_customer
            LEFT JOIN user usac ON usac.id = ac.id_user
            LEFT JOIN user usem ON usem.id = em.id_user
            ORDER BY bi.created_date
            
            """, countQuery = """
            SELECT COUNT(bi.id)  FROM bill bi
            LEFT JOIN account ac ON ac.id = bi.id_account
            LEFT JOIN account em ON em.id = bi.id_employees
            LEFT JOIN customer cu ON cu.id = bi.id_customer
            LEFT JOIN user usac ON usac.id = ac.id_user
            LEFT JOIN user usem ON usem.id = em.id_user
            ORDER BY bi.created_date
            
            """, nativeQuery = true)
    List<BillResponse> getAll(Pageable pageable, BillRequest request);
}
