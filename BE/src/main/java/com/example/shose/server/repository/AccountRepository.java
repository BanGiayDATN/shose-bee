package com.example.shose.server.repository;

import com.example.shose.server.dto.response.LoginResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.dto.response.employee.SimpleEmployeeResponse;
import com.example.shose.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * @author Nguyễn Vinh
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email")
    Account getOneByEmail(@Param("email") String email);

    @Query(value = """
             SELECT ac.id, us.full_name FROM account ac
                        LEFT JOIN user us ON us.id = ac.id_user
                        WHERE roles IN (0,2)
            """, nativeQuery = true)
    List<SimpleEmployeeResponse> getAllSimpleEntityEmployess();

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email AND ac.user.phoneNumber =:phoneNumber")
    Account resetPassword(@Param("email") String email , @Param("phoneNumber") String phoneNumber);

}
