package com.example.shose.server.controller.client;

import com.example.shose.server.dto.response.cart.ListAddToCart;
import com.example.shose.server.service.CartService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartClientRestController {
    @Autowired
    private CartService cartService;

    @PostMapping("")
    public ResponseObject addCart(@RequestBody ListAddToCart listAddToCart){
      return new ResponseObject(cartService.addToCart(listAddToCart));
    }
}
