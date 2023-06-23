package com.example.shose.server.util;

import java.util.Random;

/**
 * @author Nguyễn Vinh
 */
public class RandomNumberGenerator {

    public String randomToString(String name, int soLuong) {
        Random random = new Random();
        int randomNumber = random.nextInt(soLuong);
        return name + randomNumber;
    }

}
