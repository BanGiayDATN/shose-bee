package com.example.shose.server.repository;

import com.example.shose.server.dto.request.bill.FindNewBillCreateAtCounterRequest;
import com.example.shose.server.dto.response.bill.BillResponseAtCounter;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.dto.request.bill.BillRequest;
import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.bill.UserBillResponse;
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
            SELECT  ROW_NUMBER() OVER( ORDER BY bi.created_date ASC ) AS stt, bi.id, bi.code, bi.created_date, IF(usac.full_name IS NULL, cu.full_name, usac.full_name )  AS userName ,  usem.full_name AS nameEmployees , bi.type, bi.status_bill, bi.total_money, bi.item_discount  FROM bill bi
            LEFT JOIN account ac ON ac.id = bi.id_account
            LEFT JOIN account em ON em.id = bi.id_employees
            LEFT JOIN customer cu ON cu.id = bi.id_customer
            LEFT JOIN user usac ON usac.id = ac.id_user
            LEFT JOIN user usem ON usem.id = em.id_user
            WHERE  ( :#{#request.startTime} = 0
                     OR bi.created_date >= :#{#request.startTime}  )
            AND ( :#{#request.endTime} = 0
                     OR bi.created_date <= :#{#request.endTime}  )
             AND ( :#{#request.startDeliveryDate} = 0
                     OR bi.delivery_date >= :#{#request.startDeliveryDate}  )
            AND ( :#{#request.endDeliveryDate} = 0
                     OR bi.delivery_date <= :#{#request.endDeliveryDate}  )         
            AND ( :#{#request.converStatus} IS NULL
                     OR :#{#request.converStatus} LIKE '[]'
                     OR bi.status_bill IN (:#{#request.status}))
            AND ( :#{#request.code} IS NULL
                     OR :#{#request.code} LIKE ''
                     OR bi.code LIKE :#{#request.code})
            AND ( :#{#request.employees} IS NULL
                     OR :#{#request.employees} LIKE ''
                     OR em.id LIKE :#{#request.employees})
            AND ( :#{#request.user} IS NULL
                     OR :#{#request.user} LIKE ''
                     OR usac.id LIKE :#{#request.user}
                     OR cu.id LIKE :#{#request.user})
            AND ( :#{#request.phoneNumber} IS NULL
                     OR :#{#request.phoneNumber} LIKE ''
                     OR usac.phone_number LIKE :#{#request.phoneNumber})
            AND ( :#{#request.type} = -1
                     OR bi.type = :#{#request.type})
            ORDER BY bi.created_date
                        
            """, nativeQuery = true)
    List<BillResponse> getAll( BillRequest request);

    @Query(value = """
            SELECT  ROW_NUMBER() OVER( ORDER BY bi.created_date ASC ) AS stt, bi.id, bi.code, bi.created_date, IF(usac.full_name IS NULL, cu.full_name, usac.full_name )  AS userName ,   bi.status_bill, bi.total_money, bi.item_discount, COUNT(bide.quantity) AS quantity FROM bill bi
                        LEFT JOIN account ac ON ac.id = bi.id_account
                        LEFT JOIN bill_detail bide ON bide.id_bill = bi.id
                        LEFT JOIN account em ON em.id = bi.id_employees
                        LEFT JOIN customer cu ON cu.id = bi.id_customer
                        LEFT JOIN user usac ON usac.id = ac.id_user
                        LEFT JOIN user usem ON usem.id = em.id_user
            WHERE bi.type = 1 
            AND (:#{#request.startCreateBill} <= bi.created_date)
            AND ( :#{#request.key} IS NULL
                     OR :#{#request.key} LIKE ''
                     OR bi.user_name LIKE :#{#request.key}
                     OR bi.code LIKE :#{#request.key}
                     OR bi.phone_number LIKE :#{#request.key})
           GROUP BY   bi.id, bi.code, bi.created_date, IF(usac.full_name IS NULL, cu.full_name, usac.full_name ) ,   bi.status_bill, bi.total_money, bi.item_discount 
            ORDER BY bi.created_date           
            """, nativeQuery = true)
    List<BillResponseAtCounter> findAllBillAtCounterAndStatusNewBill(FindNewBillCreateAtCounterRequest request);


    @Query(value = """
            SELECT  ROW_NUMBER() OVER( ORDER BY bi.created_date ASC ) AS stt, IF(bi.id_account IS NULL, cu.id, usac.id )  AS id ,  IF(usac.full_name IS NULL, cu.full_name, usac.full_name )  AS userName   FROM bill bi
                         LEFT JOIN account ac ON ac.id = bi.id_account
                         LEFT JOIN customer cu ON cu.id = bi.id_customer
                         LEFT JOIN user usac ON usac.id = ac.id_user
                         ORDER BY bi.created_date
            """, nativeQuery = true)
    List<UserBillResponse> getAllUserInBill();
}
