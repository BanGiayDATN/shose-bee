package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.address.CreateAddressRequest;
import com.example.shose.server.dto.request.address.FindAddressRequest;
import com.example.shose.server.dto.request.address.UpdateAddressRequest;
import com.example.shose.server.dto.response.AddressResponse;
import com.example.shose.server.dto.response.user.SimpleUserResponse;
import com.example.shose.server.entity.Address;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.common.PageableObject;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AddressRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public List<Address> getAll() {
        return addressRepository.findAll();
    }

    @Override
    public PageableObject<AddressResponse> findAll(FindAddressRequest req) {
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize());
        Page<AddressResponse> list = addressRepository.getAll(pageable, req);
        return new PageableObject<>(list);
    }

    @Override
    public Address create(CreateAddressRequest req) {
        Optional<User> user = userReposiory.findById(req.getUserId());
        if (!user.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Address address = Address.builder().line(req.getLine()).city(req.getCity()).province(req.getProvince())
                .country(req.getCountry()).user(user.get()).build();
        return addressRepository.save(address);
    }

    @Override
    public Address update(UpdateAddressRequest req) {
        Optional<Address> optional = addressRepository.findById(req.getId());
        if (optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
//        User user = userReposiory.getById(req.getUserId());
        Optional<User> user = userReposiory.findById(req.getUserId());
        if (!user.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        Address address = optional.get();
        address.setLine(req.getLine());
        address.setCity(req.getCity());
        address.setProvince(req.getCity());
        address.setCountry(req.getCountry());
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
}
