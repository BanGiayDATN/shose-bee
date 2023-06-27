package com.example.shose.server.repository;

import com.example.shose.server.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface AccountRepository extends JpaRepository<Account,String> {

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email")
    Account getOneByEmail (@Param("email") String email);

}
