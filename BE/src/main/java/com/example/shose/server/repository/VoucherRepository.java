package com.example.shose.server.repository;

import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Nguyễn Vinh
 */
@Repository
public interface VoucherRepository extends JpaRepository<Voucher,String> {
    @Query(value = """ 
            select 
            ROW_NUMBER() OVER (ORDER BY vo.last_modified_date DESC ) as stt,
                        
            vo.id as id,
            vo.code as code,
            vo.name as name,
            vo.value as value,
            vo.quantity as quantity,
            vo.start_date as startDate,
            vo.end_date as endDate,
            vo.status as status,
            vo.created_date AS createdDate,
            vo.last_modified_date AS lastModifiedDate
                       
            from voucher vo 
            where
                        
                (:#{#req.code} IS NULL 
                or :#{#req.code} LIKE '' 
                or code like  %:#{#req.code}%)
            and 
                (:#{#req.name} IS NULL 
                or :#{#req.name} LIKE '' 
                or name like %:#{#req.name}% )
            and 
                (:#{#req.value} IS NULL 
                or :#{#req.value} LIKE '' 
                or value = :#{#req.value})
            and
                (:#{#req.quantity} IS NULL 
                or :#{#req.quantity} LIKE ''
                or quantity = :#{#req.quantity})
            and 
                (:#{#req.startDate} IS NULL 
                or :#{#req.startDate} LIKE ''
                or start_date>=:#{#req.startDateStart})
            and 
                (:#{#req.startDate} IS NULL 
                or :#{#req.startDate} LIKE ''
                or start_date<=:#{#req.startDateEnd})
            and 
                (:#{#req.endDate} IS NULL 
                or :#{#req.endDate} LIKE ''
                or end_date >=:#{#req.endDateStart})
            and 
                (:#{#req.endDate} IS NULL 
                or :#{#req.endDate} LIKE ''
                or end_date <=:#{#req.endDateEnd})
            and 
                (:#{#req.status} IS NULL 
                or :#{#req.startDate} LIKE ''
                or status like %:#{#req.status}% )
            GROUP BY vo.id
            ORDER BY vo.last_modified_date DESC  
            """, countQuery = """
            SELECT count(1)            
            FROM voucher vo
            WHERE 
                 (:#{#req.code} IS NULL 
                or :#{#req.code} LIKE '' 
                or code like  %:#{#req.code}%)
            and 
                (:#{#req.name} IS NULL 
                or :#{#req.name} LIKE '' 
                or name like %:#{#req.name}% )
            and 
                (:#{#req.startDate} IS NULL 
                or :#{#req.startDate} LIKE ''
                or start_date>=:#{#req.startDateStart})
            and 
                (:#{#req.startDate} IS NULL 
                or :#{#req.startDate} LIKE ''
                or start_date<=:#{#req.startDateEnd})
            and 
                (:#{#req.endDate} IS NULL 
                or :#{#req.endDate} LIKE ''
                or end_date >=:#{#req.endDateStart})
            and 
                (:#{#req.endDate} IS NULL 
                or :#{#req.endDate} LIKE ''
                or end_date <=:#{#req.endDateEnd})
            and 
                (:#{#req.status} IS NULL 
                or :#{#req.startDate} LIKE ''
                or status like %:#{#req.status}% )
            GROUP BY vo.id
            ORDER BY vo.last_modified_date DESC  
            """,
            nativeQuery = true )


    Page<VoucherRespone> getAllVoucher(Pageable pageable, @Param("req") FindVoucherRequest req);
}
