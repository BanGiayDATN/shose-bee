package com.example.shose.server.infrastructure.constant;

/**
 * @author Nguyễn Vinh
 */
public enum Message {

    SUCCESS("Success"),
    ERROR_UNKNOWN("Error Unknown"),
    NOT_EXISTS("Không tồn tại"),

    NAME_EXISTS("Tên đã tồn tại"),
    CODE_EXISTS("Mã đã tồn tại"),
    CHANGED_STATUS_ERROR("không thể xác nhận hóa đơn"),

    BILL_NOT_EXIT("Hóa đơn không tồn tại "),
    ACCOUNT_NOT_EXIT("Tài khoản không tồn tại"),
    ACCOUNT_NOT_PERMISSION("Tài khoản không có quyền tạo hóa đơn"),
    BILL_NOT_REFUND("Hóa đơn không thể trả hàng"),
    ERROR_QUANTITY("Số lượng không đủ"),
    ERROR_TOTALMONEY("Tiền trả phải lớn hơn hoặc bằng phải trả"),
    VOUCHER_NOT_USE("không thể sử dụng voucher");



    private String message;

    Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
