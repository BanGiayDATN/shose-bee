package com.example.shose.server.infrastructure.config.expiredvoucher;

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

    @Scheduled(cron = "21 13 0 * * *") // Chạy vào mỗi ngày 00:00:00
    public void updateExpiredVouchers() {
        voucherService.expiredVouccher();
    }
}
