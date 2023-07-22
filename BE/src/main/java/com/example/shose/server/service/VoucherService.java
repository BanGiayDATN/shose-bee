package com.example.shose.server.service;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.request.voucher.CreateVoucherRequest;
import com.example.shose.server.dto.request.voucher.FindVoucherRequest;
import com.example.shose.server.dto.request.voucher.UpdateVoucherRequest;
import com.example.shose.server.dto.response.voucher.VoucherRespone;
import com.example.shose.server.entity.Voucher;
import com.example.shose.server.infrastructure.common.PageableObject;

import java.util.List;

public interface VoucherService {

    List<VoucherRespone> getAll(FindVoucherRequest findVoucherRequest);
    Voucher add(CreateVoucherRequest request);
    Voucher update(UpdateVoucherRequest request);

    Boolean delete(String id);
    Voucher getById(String id);
    List<Voucher> expiredVoucher();
    List<Voucher> startVoucher();
}
