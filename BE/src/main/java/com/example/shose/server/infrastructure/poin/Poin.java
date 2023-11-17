package com.example.shose.server.infrastructure.poin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;

/**
 * @author thangdt
 */
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Poin {
    @JsonProperty("exchangeRatePoin")
    private BigDecimal exchangeRatePoin;

    @JsonProperty("exchangeRateMoney")
    private BigDecimal exchangeRateMoney;

    @JsonProperty("discountBill")
    private boolean discountBill;

    @JsonProperty("discountProduct")
    private boolean discountProduct;

    @JsonProperty("paymentRewardPoints")
    private boolean paymentRewardPoints;

    @JsonProperty("quantityBill")
    private BigDecimal quantityBill;

    @JsonProperty("minMoney")
    private BigDecimal minMoney;

    // Getters and setters (hoặc sử dụng các annotation của Lombok để tự động tạo)

    public int ConvertMoneyToPoints(BigDecimal totalMoney, BigDecimal discount){
        if(discountBill || discountProduct || paymentRewardPoints){
            return  0;
        }
        if(discountBill && discount.compareTo(BigDecimal.ZERO) != 0){
            return 0;
        }
        if(totalMoney.compareTo(minMoney) < 0){
            return 0;
        }
        return totalMoney.divide(exchangeRatePoin, 0, BigDecimal.ROUND_DOWN).intValue();

    }

    public BigDecimal  ConvertPoinToMoney(int poin){
        return BigDecimal.valueOf(poin).multiply(exchangeRateMoney);
    }

}
