package com.example.shose.server.response.bill;

import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.constant.StatusBill;
import com.example.shose.server.infrastructure.constant.TypeBill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

/**
 * @author thangdt
 */

@Projection(types = {Bill.class, User.class})
public interface BillResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getCode();

    @Value("#{target.created_date}")
    long getCreatedDate();

    @Value("#{target.userName}")
    String getUserName();

    @Value("#{target.nameEmployees}")
    String getNameEmployees();

    @Value("#{target.type}")
    int getType();

    @Value("#{target.status_bill}")
    int getStatusBill();

    @Value("#{target.total_money}")
    BigDecimal getTotalMoney();

    @Value("#{target.item_discount}")
    BigDecimal getItemDiscount();

}
