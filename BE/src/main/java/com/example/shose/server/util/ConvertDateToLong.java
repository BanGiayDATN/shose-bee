package com.example.shose.server.util;


import com.example.shose.server.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.text.DateFormat;
import java.text.ParseException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * @author Nguyễn Vinh
 */
@Component
public class ConvertDateToLong {

    public Long dateToLong(String date) {
        long milliseconds = -1;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        format.setTimeZone(TimeZone.getDefault());
        try {
            Date d = format.parse(date);
            milliseconds = d.getTime();
        } catch (Exception e) {
            e.printStackTrace(System.out);
        }
        return milliseconds;
    }


    public String longToDate(Long milliseconds) {
        Date date = new Date(milliseconds);
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        return format.format(date);
    }


    public Long getLongDateNow() {
        long now = 0;
        try {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            now = df.parse(df.format(new Date())).getTime()  ;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return now;
    }

}
