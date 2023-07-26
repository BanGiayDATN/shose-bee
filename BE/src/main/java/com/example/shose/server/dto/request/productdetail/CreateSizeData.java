package com.example.shose.server.dto.request.productdetail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateSizeData {

    private int nameSize;

    private int quantity;
}
