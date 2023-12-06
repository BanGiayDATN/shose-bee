package com.example.shose.server.infrastructure.excel;

import com.example.shose.server.dto.response.bill.BillResponse;
import com.example.shose.server.dto.response.statistical.StatisticalDayResponse;
import com.example.shose.server.dto.response.statistical.StatisticalMonthlyResponse;
import com.example.shose.server.entity.Address;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.service.BillService;
import com.example.shose.server.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExportExcelStatistical {

    @Value("${jxls.template.path}")
    private String templatePath;

    @Autowired
    private StatisticalService statisticalService;

    @Autowired
    private BillService billService;

    public ByteArrayOutputStream downloadExcel(String templateName) throws IOException {
        InputStream in = null;
        ByteArrayOutputStream out = null;
        try {
            out = new ByteArrayOutputStream();
            in = new FileInputStream(ResourceUtils.getFile(templatePath  + templateName));

            List<StatisticalDayResponse> statisticalDayList = statisticalService.getAllStatisticalDay();
            List<StatisticalMonthlyResponse> statisticalMonthList = statisticalService.getAllStatisticalMonth();
            List<BillResponse> listBillCanceled = billService.getBillCanceled();

            Map<String, Object> map = new HashMap<>();
            map.put("apiData", statisticalDayList);
            map.put("apiData2", statisticalMonthList);
            map.put("apiData3", listBillCanceled);

            XLXUtils.exportExcel(in, out, map);

        } catch (IOException e) {
            throw e;
        } finally {
            try {
                if (out != null) {
                    out.flush();
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                throw e;
            }
        }
        return out;
    }
}
