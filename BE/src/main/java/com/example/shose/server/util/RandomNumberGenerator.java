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
    private static int previousRandomNumber = 1;

    public String randomToString(String name) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(name).append(previousRandomNumber);
        previousRandomNumber++;
        return stringBuilder.toString();
    }

    public static void main(String[] args) {


        System.out.println(new RandomNumberGenerator().randomToString("KM"));
        System.out.println(new RandomNumberGenerator().randomToString("KM"));
        System.out.println(new RandomNumberGenerator().randomToString("KM"));
    }
}
