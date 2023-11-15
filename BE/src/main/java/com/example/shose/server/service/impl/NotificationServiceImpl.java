package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.notification.CreateNotificationRequest;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Bill;
import com.example.shose.server.entity.Notification;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.BillRepository;
import com.example.shose.server.repository.NotificationRepository;
import com.example.shose.server.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Notification> getListNotiOfAdmin() {
        return notificationRepository.findAllByReceiver("admin");
    }

    @Override
    public Notification createNoti(CreateNotificationRequest request) {
        Optional<Account> optionalAccount = accountRepository.findById(request.getIdAccount());
        if (!optionalAccount.isPresent()){
            throw new RestApiException("Tài khoản không tồn tại");
        }
        Optional<Bill> optionalBill = billRepository.findById(request.getIdBill());
        if(!optionalBill.isPresent()){
            throw new RestApiException("Hoá đơn không tồn tại");
        }
        Notification notification = Notification.builder()
                .receiver(request.getReceiver())
                .notifyContent(request.getNotifyContent())
                .url(request.getUrl())
                .status(Status.CHUA_DOC)
                .account(optionalAccount.get())
                .bill(optionalBill.get()).build();
        return notificationRepository.save(notification);
    }
}
