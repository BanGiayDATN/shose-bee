package com.example.shose.server.dto.request.bill;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * @author thangdt
 */
@Getter
@Setter
public class ChangAllStatusBillByIdsRequest {

    private List<String> ids;

    private  String status;

}
