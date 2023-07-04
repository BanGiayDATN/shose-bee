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

    BILL_NOT_EXIT(""),
    ACCOUNT_NOT_EXIT(""),
    ACCOUNT_NOT_PERMISSION("");



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
