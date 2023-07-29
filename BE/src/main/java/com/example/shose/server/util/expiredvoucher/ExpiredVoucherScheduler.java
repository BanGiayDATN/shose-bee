package com.example.shose.server.util.expiredvoucher;

import com.example.shose.server.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/*
 *  @author diemdz
 */
@Component
public class ExpiredVoucherScheduler {
    @Autowired
    private VoucherService voucherService;

//    @Scheduled(cron = "0 0 0 * * *") // Chạy vào mỗi ngày 00:00:00
//    @Scheduled(cron = "0 40 21 * * *") // Chạy vào lúc 9:40 PM mỗi ngày
//    @Scheduled(cron = "* * * * * *")
//    public void updateExpiredVouchers() {
//        voucherService.startVoucher();
//        voucherService.expiredVoucher();
//    }
}