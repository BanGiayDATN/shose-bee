package com.example.shose.server.controller.client;

import com.example.shose.server.entity.ProductDetail;
import com.example.shose.server.service.ProductDetailService;
import com.example.shose.server.util.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/*
 *  @author diemdz
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/client/product-detail")
public class ProductDetailClientRestController {

    @Autowired
    private ProductDetailService productDetailService;
    @GetMapping("/byCategory/{id}")
    public ResponseObject getByIdCategory(@PathVariable("id") String id) {
        return new ResponseObject(productDetailService.GetProductDetailByCategory(id));
    }
    @GetMapping("/{id}&&{codeColor}")
    public ResponseObject  getDetailProductOfClient(@PathVariable("id") String id,@PathVariable("codeColor") String codeColor) {
        String rawCodeColor = codeColor.replace("%23", "#");

        return new ResponseObject(productDetailService.getDetailProductOfClient(id,rawCodeColor));
    }
//    @GetMapping("/{idProduct}&&{codeColor}&&{nameSize}")
//    public ResponseObject getProductDetailInCart (@PathVariable("idProduct") String idProduct,@PathVariable("codeColor") String codeColor,@PathVariable("nameSize") String nameSize){
//        String rawCodeColor = codeColor.replace("%23", "#");
//        return new ResponseObject(productDetailService.getProductDetailInCart(idProduct,rawCodeColor,nameSize));
//    }
}
