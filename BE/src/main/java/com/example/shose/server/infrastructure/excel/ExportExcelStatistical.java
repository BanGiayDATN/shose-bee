package com.example.shose.server.infrastructure.excel;

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
import java.util.stream.Collectors;

@Service
public class ExportExcelStatistical {

    @Value("${jxls.template.path}")
    private String templatePath;

    public ByteArrayOutputStream downloadExcel(String templateName) throws IOException {
        InputStream in = null;
        ByteArrayOutputStream out = null;
        try {
            out = new ByteArrayOutputStream();
            in = new FileInputStream(ResourceUtils.getFile(templatePath  + templateName));


            Map<String, Object> map = new HashMap<>();
//            map.put("apiData", exportList);

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
