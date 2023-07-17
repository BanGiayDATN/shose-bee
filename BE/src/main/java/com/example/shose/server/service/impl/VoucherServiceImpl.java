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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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


        Voucher checkCode = voucherRepository.getByCode(request.getCode());
        if (checkCode != null) {
            throw new RestApiException(Message.CODE_EXISTS);
        }
        Voucher voucher = Voucher.builder()
                .code(request.getCode())
                .name(request.getName())
                .value(request.getValue())
                .quantity(request.getQuantity())
                .startDate(new ConvertDateToLong().dateToLong(request.getStartDate()))
                .endDate(new ConvertDateToLong().dateToLong(request.getEndDate()))
                .status(request.getStatus()).build();
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher update(UpdateVoucherRequest request) {
        Optional<Voucher> optional = voucherRepository.findById(request.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Voucher checkCode = voucherRepository.getByCode(request.getCode());
        if (checkCode != null ) {
            throw new RestApiException(Message.CODE_EXISTS);
        }
        Voucher voucher = optional.get();
        voucher.setCode(request.getCode());
        voucher.setName(request.getName());
        voucher.setValue(request.getValue());
        voucher.setQuantity(request.getQuantity());
        voucher.setStartDate(new ConvertDateToLong().dateToLong(request.getStartDate()));
        voucher.setEndDate(new ConvertDateToLong().dateToLong(request.getEndDate()));
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

    public static void main(String[] args) {
//        CreateVoucherRequest request = new CreateVoucherRequest();
//        request.setCode("1");
//        request.setName("diem");
//        request.setValue(BigDecimal.valueOf(1));
//        request.setQuantity(1);
//        request.setEndDate(new ConvertDateToLong().longToDate(new ConvertDateToLong().dateToLong("")));
//        System.out.println(new ConvertDateToLong().dateToLong());
    }
}