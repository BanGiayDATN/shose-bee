package com.example.shose.server.infrastructure.excel;

import com.example.shose.server.dto.response.statistical.StatisticalDayResponse;
import com.example.shose.server.dto.response.statistical.StatisticalMonthlyResponse;
import com.example.shose.server.infrastructure.email.SendEmailService;
import com.example.shose.server.service.StatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExportExcelStatistical {

    @Value("${jxls.template.path}")
    private String templatePath;

    @Autowired
    private StatisticalService statisticalService;


    public ByteArrayOutputStream downloadExcel(String templateName) throws IOException {
        InputStream in = null;
        ByteArrayOutputStream out = null;
        try {
            out = new ByteArrayOutputStream();
            in = new FileInputStream(ResourceUtils.getFile(templatePath  + templateName));

            List<StatisticalDayResponse> statisticalDayList = statisticalService.getAllStatisticalDay();
            List<StatisticalMonthlyResponse> statisticalMonthList = statisticalService.getAllStatisticalMonth();
            Map<String, Object> map = new HashMap<>();
            map.put("apiData", statisticalDayList);
            map.put("apiData2", statisticalMonthList);


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
