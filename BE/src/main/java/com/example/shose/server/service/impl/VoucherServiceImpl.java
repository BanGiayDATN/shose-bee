package com.example.shose.server.service.impl;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.infrastructure.exception.rest.ShoseExceptionRestHandler;
import com.example.shose.server.repository.VoucherRepository;
import com.example.shose.server.service.VoucherService;
import com.example.shose.server.util.ConvertDateToLong;
import com.example.shose.server.util.ErrorCode;
import com.example.shose.server.util.RandomNumberGenerator;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
@Slf4j
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;



    @Override
    public List<VoucherRespone> getAll(FindVoucherRequest findVoucherRequest) {
        return voucherRepository.getAllVoucher(findVoucherRequest);
    }

    @Override
    public Voucher add(CreateVoucherRequest request) {
           if(StringUtils.isEmpty(request.getName())
                   || request.getValue() == null
                   || request.getQuantity() == null
                   || request.getStartDate() == null
                   || request.getEndDate() == null
           ){

               throw  new RestApiException(ErrorCode.BAD_REQUEST);
           }

           request.setCode(new RandomNumberGenerator().randomToString("KM"));
           Voucher voucher = Voucher.builder()
                   .code(request.getCode())
                   .name(request.getName())
                   .value(request.getValue())
                   .quantity(request.getQuantity())
                   .startDate(request.getStartDate())
                   .endDate(request.getEndDate())
                   .status(Status.DANG_SU_DUNG).build();
           return voucherRepository.save(voucher);
    }

    @Override
    public Voucher update(UpdateVoucherRequest request) {
        Optional<Voucher> optional = voucherRepository.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }

        Voucher voucher = optional.get();
        voucher.setCode(request.getCode());
        voucher.setName(request.getName());
        voucher.setValue(request.getValue());
        voucher.setQuantity(request.getQuantity());
        voucher.setStartDate(request.getStartDate());
        voucher.setEndDate(request.getEndDate());
        voucher.setStatus(request.getStatus());
        return voucherRepository.save(voucher);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Voucher> voucher = voucherRepository.findById(id);
        voucherRepository.delete(voucher.get());
        return true;
    }

    @Override
    public Voucher getById(String id) {
        Voucher voucher = voucherRepository.findById(id).get();
        return voucher;
    }

    @Override
    public List<Voucher> expiredVoucher() {
        List<Voucher> expiredVouchers = voucherRepository.findExpiredVouchers(( System.currentTimeMillis() / 1000)*1000);
        for (Voucher voucher : expiredVouchers) {
            voucher.setStatus(Status.KHONG_SU_DUNG);
            voucherRepository.save(voucher);
        }
        return expiredVouchers;
    }

    @Override
    public List<Voucher> startVoucher() {
        List<Voucher> startVouchers = voucherRepository.findStartVouchers(( System.currentTimeMillis() / 1000)*1000);
        for (Voucher voucher : startVouchers) {
            voucher.setStatus(Status.DANG_SU_DUNG);
            voucherRepository.save(voucher);
        }
        return startVouchers;
    }


    @Override
    public Voucher getByCode(String code) {
        return voucherRepository.getByCode(code);
    }

    @Override
    public List<Voucher> getVoucherByIdAccount(String idAccount) {
        return voucherRepository.getVoucherByIdAccount(idAccount);
    }
}
