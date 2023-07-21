package com.example.shose.server.service.impl;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Product;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.VoucherRepository;
import com.example.shose.server.service.VoucherService;
import com.example.shose.server.util.ConvertDateToLong;
import com.example.shose.server.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;
    @Override
    public List<VoucherRespone> getAll(FindVoucherRequest findVoucherRequest) {
        return voucherRepository.getAllVoucher(findVoucherRequest);
    }

    @Override
    public Voucher add(CreateVoucherRequest request) {



        request.setCode(new RandomNumberGenerator().randomToString("KM"));
        Voucher voucher = Voucher.builder()
                .code(request.getCode())
                .name(request.getName())
                .value(request.getValue())
                .quantity(request.getQuantity())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(request.getStatus()).build();
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
    public List<Voucher> expiredVouccher() {
        List<Voucher> expiredVouchers = voucherRepository.findExpiredVouchers(System.currentTimeMillis());

        for (Voucher voucher : expiredVouchers) {
            voucher.setStatus(Status.KHONG_SU_DUNG);
            voucherRepository.save(voucher);
        }
        return voucherRepository.findAll();
    }

    public static void main(String[] args) {
    }
}
