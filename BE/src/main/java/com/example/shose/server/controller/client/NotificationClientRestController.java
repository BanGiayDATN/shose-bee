package com.example.shose.server.controller.client;

import com.example.shose.server.service.MaterialService;
import com.example.shose.server.service.NotificationService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/client/notification")
public class NotificationClientRestController {
    @Autowired
    private NotificationService notificationService;
    @GetMapping("/listAdmin")
    public ResponseObject getListNotiAdmin() {
        return new ResponseObject(notificationService.getListNotiOfAdmin());
    }
    @GetMapping("/listAdminNotRead")
    public ResponseObject getListNotiAdminNotRead() {
        return new ResponseObject(notificationService.getListNotiOfAdminnotRead());
    }
}
