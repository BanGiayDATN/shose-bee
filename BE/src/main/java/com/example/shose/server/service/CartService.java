package com.example.shose.server.service;
/*
 *  @author diemdz
 */

import com.example.shose.server.dto.response.cart.ListAddToCart;
import com.example.shose.server.entity.Cart;

public interface CartService {

    Cart addToCart(ListAddToCart listAddToCart);
}
