package com.example.shose.server.service.impl;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.repository.VoucherRepository;
import com.example.shose.server.service.VoucherService;
import com.example.shose.server.util.ConvertDateToLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;
    @Override
    public PageableObject<VoucherRespone> getAll(FindVoucherRequest findVoucherRequest) {

        Pageable pageable = PageRequest.of(findVoucherRequest.getPage(), findVoucherRequest.getSize());
        Page<VoucherRespone> page = voucherRepository.getAllVoucher(pageable,findVoucherRequest);
        return new PageableObject<>(page);
    }

    @Override
    public Voucher add(CreateVoucherRequest request) {

        Voucher voucher = Voucher.builder()
                .code(request.getCode())
                .name(request.getName())
                .value(request.getValue())
                .quantity(request.getQuantity())
                .startDate(new ConvertDateToLong().dateToLong(request.getStartDate()))
                .endDate(new ConvertDateToLong().dateToLong(request.getEndDate()))
                .status(Status.DANG_SU_DUNG).build();
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher update(UpdateVoucherRequest request) {
        Optional<Voucher> optional = voucherRepository.findById(request.getId());

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
