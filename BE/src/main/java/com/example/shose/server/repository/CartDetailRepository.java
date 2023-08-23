package com.example.shose.server.repository;

import com.example.shose.server.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,String> {

    List<CartDetail> getCartDetailByCart_Id(String idCart);
}
