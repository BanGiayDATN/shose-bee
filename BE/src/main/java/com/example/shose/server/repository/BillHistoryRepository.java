package com.example.shose.server.repository;

import com.example.shose.server.dto.response.billhistory.BillHistoryResponse;
import com.example.shose.server.entity.BillHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface BillHistoryRepository extends JpaRepository<BillHistory, String> {

    @Query(value = """
            SELECT  ROW_NUMBER() OVER( ORDER BY bihi.created_date DESC ) AS stt, bihi.id, bihi.status_bill, bihi.created_date, bihi.action_description FROM bill_history bihi
            LEFT JOIN bill bi ON bi.id = bihi.id_bill
            WHERE bi.id LIKE :idBill
            ORDER BY bihi.created_date
            """, nativeQuery = true)
    List<BillHistoryResponse> findAllByIdBill(String idBill);

}
