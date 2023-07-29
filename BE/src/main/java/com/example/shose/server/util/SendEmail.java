//package com.example.shose.server.util;
//
//
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Component;
//
//import java.nio.charset.StandardCharsets;
//
///**
// * @author Phuong Oanh
// */
//@Component
//public class SendEmail {
//    @Autowired
//    JavaMailSender javaMailSender;
//
//    public void testMail(String email, String password) {
//        String to = "oanh.np.03@gmail.com";
//        String sub = "[BEE SHOES] Chào mừng bạn đến với bee shoes , đây là thông tin tài khoản của bạn ";
//        String body = "Mật khẩu của bạn là:" + password;
//
//        MimeMessage message = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
//        try {
//            helper.setTo(to);
//            helper.setSubject(sub);
//            helper.setText(body);
//            helper.setFrom("oanh.np.2003@gmail.com");
//            javaMailSender.send(message);
//        } catch (MessagingException e) {
//            e.printStackTrace();
//        }
//    }
//}
//
