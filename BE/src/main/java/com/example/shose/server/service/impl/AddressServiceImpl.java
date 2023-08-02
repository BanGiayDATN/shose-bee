package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.address.CreateAddressRequest;
import com.example.shose.server.dto.request.address.FindAddressRequest;
import com.example.shose.server.dto.request.address.UpdateAddressRequest;
import com.example.shose.server.dto.response.address.AddressResponse;
import com.example.shose.server.dto.response.address.AddressUserReponse;
import com.example.shose.server.dto.response.user.SimpleUserResponse;
import com.example.shose.server.entity.Address;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AddressRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Hào Ngô
 */
@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserReposiory userReposiory;

    @Override
    public List<AddressUserReponse> findAddressByUserId(String idUser) {
        return addressRepository.findAddressByUserId(idUser);
    }

    @Override
    public List<AddressResponse> getList(FindAddressRequest req) {

        return addressRepository.getAll(req);
    }

    @Override
    public Address create(CreateAddressRequest req) {
        Address checkStatusAddress = addressRepository.getOneAddressByStatus(req.getStatus(), req.getUserId());
        Optional<User> user = userReposiory.findById(req.getUserId());
        if(checkStatusAddress == null){
            Address address = Address.builder().line(req.getLine()).district(req.getDistrict()).province(req.getProvince())
                    .ward(req.getWard()).status(req.getStatus()).provinceId(req.getProvinceId()).toDistrictId(req.getToDistrictId())
                    .wardCode(req.getWardCode()).user(user.get()).build();
            return addressRepository.save(address);
        }
        else if (checkStatusAddress.getStatus() != Status.KHONG_SU_DUNG) {
            throw new RestApiException(Message.STATUS_ADDRESS_EXIST);
        }


        Address address = Address.builder().line(req.getLine()).district(req.getDistrict()).province(req.getProvince())
                .ward(req.getWard()).status(req.getStatus()).provinceId(req.getProvinceId()).toDistrictId(req.getToDistrictId())
                .wardCode(req.getWardCode()).user(user.get()).build();
        return addressRepository.save(address);
    }

    @Override
    public Address update(UpdateAddressRequest req) {
        Optional<Address> optional = addressRepository.findById(req.getId());

        Optional<User> user = userReposiory.findById(req.getUserId());

        Address address = optional.get();
        address.setLine(req.getLine());
        address.setDistrict(req.getDistrict());
        address.setProvince(req.getProvince());
        address.setWard(req.getWard());
        address.setStatus(req.getStatus());
        address.setToDistrictId(req.getToDistrictId());
        address.setProvinceId(req.getProvinceId());
        address.setWardCode(req.getWardCode());
        address.setUser(user.get());
        return addressRepository.save(address);
    }

    @Override
    public Boolean delete(String id) {
        Optional<Address> optional = addressRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        addressRepository.delete(optional.get());
        return true;
    }

    @Override
    public Address getOneById(String id) {
        Optional<Address> optional = addressRepository.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }

    @Override
    public List<SimpleUserResponse> getAllSimpleEntityUser() {
        return addressRepository.getAllSimpleEntityUser();
    }

    @Override
    public Address getAddressByUserIdAndStatus(String id, Status status) {
        return addressRepository.getAddressByUserIdAndStatus(id, Status.DANG_SU_DUNG);
    }

}
