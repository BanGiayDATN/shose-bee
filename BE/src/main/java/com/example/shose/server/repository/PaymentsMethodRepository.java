package com.example.shose.server.repository;

import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.PaymentsMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface PaymentsMethodRepository extends JpaRepository<PaymentsMethod,String> {

    List<PaymentsMethod> findAllByBill(Bill bill);

    @Query(value = """
            SELECT 
            COALESCE(SUM(total_money), 0)
             FROM payments_method
             WHERE id_bill = :idBill
            """, nativeQuery = true)
    BigDecimal sumTotalMoneyByIdBill(String idBill);

    @Query(value = """
             DELETE FROM  payments_method
                   WHERE id_bill = :id
            """, nativeQuery = true)
    boolean deleteAllByIdBill(@Param("id") String idBill);

    @Query(value = """
             SELECT COUNT(id) FROM payments_method
             WHERE id_bill = :idBill
             AND status = 'TRA_SAU'
            """, nativeQuery = true)
    int countPayMentPostpaidByIdBill(@Param("idBill") String idBill);

}
