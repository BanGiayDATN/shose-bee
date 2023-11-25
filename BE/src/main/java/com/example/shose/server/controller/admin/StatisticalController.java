package com.example.shose.server.controller.admin;

import com.example.shose.server.dto.request.statistical.FindBillDateRequest;
import com.example.shose.server.dto.response.statistical.StatisticalBillDateResponse;
import com.example.shose.server.dto.response.statistical.StatisticalDayResponse;
import com.example.shose.server.dto.response.statistical.StatisticalMonthlyResponse;
import com.example.shose.server.dto.response.statistical.StatisticalProductDateResponse;
import com.example.shose.server.service.StatisticalService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Hào Ngô
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/statistical")
public class StatisticalController {
    @Autowired
    private StatisticalService statisticalService;

    @GetMapping("/day")
    public ResponseObject statisticalDay() {
        return new ResponseObject(statisticalService.getAllStatisticalDay());
    }

    @GetMapping("/month")
    public ResponseObject statisticalMonth() {
        return new ResponseObject(statisticalService.getAllStatisticalMonth());
    }

    @GetMapping("/status-bill")
    public ResponseObject statisticalStatusBill(final FindBillDateRequest req) {
        return new ResponseObject(statisticalService.getAllStatisticalStatusBill(req));
    }
    @GetMapping("/best-selling-product")
    public ResponseObject statisticalBestSellingProduct(final FindBillDateRequest req) {
        return new ResponseObject(statisticalService.getAllStatisticalBestSellingProduct(req));
    }
    @GetMapping("/bill-date")
    public ResponseEntity<?> statisticalBillDate(final FindBillDateRequest req) {
        List<StatisticalProductDateResponse> listProductDay = statisticalService.getAllStatisticalProductDate(req);
        List<StatisticalBillDateResponse> listBillDay = statisticalService.getAllStatisticalBillDate(req);
        Map<String, Object> mapData = new HashMap<>();
        mapData.put("dataBill", listBillDay);
        mapData.put("dataProduct", listProductDay);
        return new ResponseEntity<>(mapData, HttpStatus.OK);
    }

    @GetMapping("/growth")
    public ResponseEntity<?> statisticalGrowth() {
        List<StatisticalDayResponse> listDay = statisticalService.getAllStatisticalDay();
        List<StatisticalDayResponse> listDayPrevious = statisticalService.getAllStatisticalDayPrevious();
        List<StatisticalMonthlyResponse> listMonth = statisticalService.getAllStatisticalMonth();
        List<StatisticalMonthlyResponse> listMonthPrevious = statisticalService.getAllStatisticalMonthPrevious();
        List<StatisticalMonthlyResponse> listYear = statisticalService.getAllStatisticalYear();
        List<StatisticalMonthlyResponse> listYearPrevious = statisticalService.getAllStatisticalYearPrevious();

        Map<String, Object> mapData = new HashMap<>();

        mapData.put("listDay", listDay);
        mapData.put("listDayPrevious", listDayPrevious);
        mapData.put("listMonth", listMonth);
        mapData.put("listMonthPrevious", listMonthPrevious);
        mapData.put("listYear", listYear);
        mapData.put("listYearPrevious", listYearPrevious);

        return new ResponseEntity<>(mapData, HttpStatus.OK);
    }

    @GetMapping("/stock")
    public ResponseObject statisticalStock() {
        return new ResponseObject(statisticalService.getAllStatisticalProductStock());
    }
}
