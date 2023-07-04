package com.example.shose.server.dto.response.billhistory;

import com.example.shose.server.entity.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * @author thangdt
 */
@Projection(types = {Bill.class, BillHistory.class})
public interface BillHistoryResponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.status_bill}")
    int getStatusBill();

    @Value("#{target.created_date}")
    int getCreateDate();

    @Value("#{target.action_description}")
    int getActionDesc();



}
