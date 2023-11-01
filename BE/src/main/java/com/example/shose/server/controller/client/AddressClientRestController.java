package com.example.shose.server.controller.client;

import com.example.shose.server.dto.request.address.UpdateAddressClientRequest;
import com.example.shose.server.dto.request.bill.billcustomer.CreateBillCustomerOnlineRequest;
import com.example.shose.server.service.AddressService;
import com.example.shose.server.service.BillService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/client/address")
public class AddressClientRestController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/{idAccount}")
    public ResponseObject getByAccountAndStatus(@PathVariable("idAccount") String idAccount)  {
        return new ResponseObject(addressService.getAddressByAccountIdAndStatus(idAccount));
    }
    @GetMapping("/list/{idAccount}")
    public ResponseObject getListByAccount(@PathVariable("idAccount") String idAccount)  {
        return new ResponseObject(addressService.getListAddressByAccountId(idAccount));
    }
    @PostMapping("/setDefault/{idAddress}")
    public ResponseObject setDefault(@PathVariable("idAddress") String idAddress)  {
        return new ResponseObject(addressService.setDefault(idAddress));
    }
    @PostMapping("/update")
    public ResponseObject update(@RequestBody UpdateAddressClientRequest request)  {
        return new ResponseObject(addressService.updateAddressClient(request));
    }
}
