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

    BILL_NOT_EXIT("hóa đơn không tồn tại "),
    ACCOUNT_NOT_EXIT("tài khoản không tồn tại"),
    ACCOUNT_NOT_PERMISSION("tài khoản không có quyền tạo hóa đơn"),
    BILL_NOT_REFUND("hóa đơn không thể trả hàng");



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
