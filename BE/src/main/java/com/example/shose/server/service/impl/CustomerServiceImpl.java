package com.example.shose.server.service.impl;

import com.example.shose.server.dto.request.address.CreateAddressRequest;
import com.example.shose.server.dto.request.customer.CreateCustomerRequest;
import com.example.shose.server.dto.request.employee.CreateEmployeeRequest;
import com.example.shose.server.dto.request.employee.FindEmployeeRequest;
import com.example.shose.server.dto.request.employee.UpdateEmployeeRequest;
import com.example.shose.server.dto.response.EmployeeResponse;
import com.example.shose.server.entity.Account;
import com.example.shose.server.entity.Address;
import com.example.shose.server.entity.User;
import com.example.shose.server.infrastructure.cloudinary.UploadImageToCloudinary;
import com.example.shose.server.infrastructure.constant.Message;
import com.example.shose.server.infrastructure.constant.Roles;
import com.example.shose.server.infrastructure.constant.Status;
import com.example.shose.server.infrastructure.email.SendEmailService;
import com.example.shose.server.infrastructure.exception.rest.RestApiException;
import com.example.shose.server.repository.AccountRepository;
import com.example.shose.server.repository.UserReposiory;
import com.example.shose.server.service.CustomerService;
import com.example.shose.server.util.RandomNumberGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * @author Phuong Oanh
 */
@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private UserReposiory userReposiory;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UploadImageToCloudinary imageToCloudinary;

    @Autowired
    private SendEmailService sendEmailService;


    @Override
    public List<EmployeeResponse> findAll(FindEmployeeRequest req) {
        return userReposiory.getAllCustomer(req);
    }

    @Override
    public List<EmployeeResponse> searchDate(FindEmployeeRequest req) {
        return userReposiory.findByDate(req);
    }

    @Override
<<<<<<< HEAD
    public User create(CreateEmployeeRequest req) {
        Account employeeAccount = new Account();
        employeeAccount.setEmail(req.getEmail());
        employeeAccount.setPassword(req.getPassword());
        employeeAccount.setRoles(Roles.USER);
=======
    public User create(CreateCustomerRequest request,
                       CreateAddressRequest addressRequest,
                       MultipartFile file) {
        // check xem có tồn tại sdt không => Khách hàng => roles là USER
        User checkUser = userReposiory.getOneUserByPhoneNumber(request.getPhoneNumber());
        if (checkUser != null) {
            throw new RestApiException(Message.PHONENUMBER_USER_EXIST);
        }
>>>>>>> 480c98af49abab798b9adaac03e39e8750103e24

        // xử lý ảnh
        String urlImage = imageToCloudinary.uploadImage(file);

        //  thông tin user
        User user = User.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .status(request.getStatus())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .points(0) // điểm khi tạo mới max định 0
                .avata(urlImage) // đường dẫn ảnh từ url
                .build();
        userReposiory.save(user); // add user vào database

        // tạo tài khoản cho khách hàng
        Account account =  new Account();
        account.setUser(user);
        account.setRoles(Roles.USER);
        account.setEmail(user.getEmail());
        account.setPassword(String.valueOf(new RandomNumberGenerator().generateRandom6DigitNumber()));
        account.setStatus(Status.DANG_SU_DUNG);
        accountRepository.save(account); // add tài khoản vào database

        //  địa chỉ user
        Address address = new Address();
        address.setWard(addressRequest.getWerd());
        address.setLine(addressRequest.getLine());
        address.setProvince(addressRequest.getProvince());
        address.setDistrict(addressRequest.getDistrict());
        address.setUser(user); // add địa chỉ vào database

        // gửi email
        String subject = "Xin chào, bạn đã đăng ký thành công ";
        sendEmailService.sendEmailPasword(account.getEmail(),subject,account.getPassword());

        return user;
    }


    @Override
    @Transactional
    public User update(UpdateEmployeeRequest req) {
        Optional<User> optional = userReposiory.findById(req.getId());
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        User user = optional.get();
        user.setFullName(req.getFullName());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setEmail(req.getEmail());
        user.setPoints(req.getPoints());
        user.setStatus(req.getStatus());

        if (req.getPassword() != null) {
            accountRepository.updatePasswordByUserId(user.getId(), req.getPassword());
        }
        if (req.getEmail() != null) {
            accountRepository.updateEmailByUserId(user.getId(), req.getEmail());
        }
        return userReposiory.save(user);
    }


    @Override
    public Boolean delete(String id) {
        Optional<User> optional = userReposiory.findById(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        userReposiory.delete(optional.get());
        return null;
    }

    @Override
    public EmployeeResponse getOneById(String id) {
        Optional<EmployeeResponse> optional = userReposiory.getOneWithPassword(id);
        if (!optional.isPresent()) {
            throw new RestApiException(Message.NOT_EXISTS);
        }
        return optional.get();
    }
}
