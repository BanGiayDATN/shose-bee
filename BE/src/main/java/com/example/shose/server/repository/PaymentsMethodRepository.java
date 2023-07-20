package com.example.shose.server.repository;

import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.PaymentsMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface PaymentsMethodRepository extends JpaRepository<PaymentsMethod,String> {

    List<PaymentsMethod> findAllByBill(Bill bill);
}
