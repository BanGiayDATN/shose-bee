package com.example.shose.server.util;

import com.example.shose.server.infrastructure.common.PageableObject;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

/**
 * @author Nguyễn Vinh
 */
@Getter
@Setter
public class ResponseObject {

    private boolean isSuccess = false;
    private Object data;
    private String message;

    public <T> ResponseObject(T obj) {
        processReponseObject(obj);
    }

    public <T> ResponseObject(Page<T> page) {
        this.setSuccess(true);
        this.setMessage("Thành công");
        this.data = new PageableObject<T>(page);

    }
    public void processReponseObject(Object obj) {
        if (obj != null) {
            this.isSuccess = true;
            this.data = obj;
        }
    }
}