package com.example.shose.server.repository;

import com.example.shose.server.entity.VoucherDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface VoucherDetailRepository extends JpaRepository<VoucherDetail,String> {

    @Query(value = """
             DELETE FROM  voucher_detail
                   WHERE id_bill = :id
            """, nativeQuery = true)
    boolean deleteAllByIdBill(@Param("id") String idBill);
}
