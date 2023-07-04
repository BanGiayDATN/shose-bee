package com.example.shose.server.repository;

import com.example.shose.server.dto.response.billdetail.BillDetailResponse;
import com.example.shose.server.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author thangdt
 */

public interface BillDetailRepository extends JpaRepository<Bill, String> {

    @Query(value = """
            select bide.id, pr.code, pr.name AS product_name, si.name AS size_name, bide.price, bide.quantity  , prde.quantity AS quantity_product_detail from bill_detail bide
            LEFT JOIN product_detail prde ON bide.id_product_detail = prde.id
            LEFT JOIN size si ON si.id = prde.id_size
            LEFT JOIN product pr ON pr.id = prde.id_product
            LEFT JOIN bill bi ON bi.id = bide.id_bill
            WHERE bi.id LIKE :idBill
            ORDER BY bide.created_date
            """, nativeQuery = true)
    List<BillDetailResponse> findAllByIdBill(String idBill);
}
