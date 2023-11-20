import React, {useEffect, useState} from "react";
import {BillClientApi} from "../../../../../api/customer/bill/billClient.api";
import "./style.css"

export default function TabAllBill({listBill}) {


    useEffect(() => {
        console.log(listBill)
    }, [listBill])
    const formatMoney = (price) => {
        return (
            parseInt(price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
        );
    };

    return (
        <React.Fragment>
            <div>
                {listBill.map((item, index) => (
                    <div className="box-bill-account">
                        <div className="header-bill-account">
                            <span style={{marginLeft: "auto"}}>{item.statusBill}</span>
                        </div>

                        <div>
                            {item.billDetail.map((item, index) =>

                                <div key={index} className="content-bill-account">
                                    <div className="box-image-bill-account">
                                        <img style={{width: 120}} src={item.image} alt="..."/>
                                    </div>
                                    <div className="box-detail-product-bill-account">
                                        <div className="name-product-bill-account">
                                            {item.productName
                                            }
                                        </div>
                                        <div className="size-product-bill-account">
                                            {item.nameSize} - {item.nameColor}
                                        </div>
                                        <div className="quantity">
                                            x{item.quantity}
                                        </div>
                                    </div>
                                    <div className="box-total-bill-account">
                                        {item.promotion !== null ? (
                                            <>
                                  <span style={{ marginLeft: 5,color:"#ff4400",fontSize:17}}> {formatMoney(item.price - (
                                      item.price * (item.promotion / 100)))}</span>
                                                <del style={{ color: "black", fontSize: 16, marginLeft: 5 }}>{formatMoney(item.price)}</del>
                                            </>
                                        ) : (formatMoney(item.price))}
                                    </div>
                                </div>
                            )}
                        </div>

                            <div  className="box-total-money-bill-account"> Thành tiền: <span style={{fontSize:20,color:"#ff4400",marginLeft:10}}>{formatMoney(item.totalMoney)}</span></div>
                           <div className="box-repurchase">
                               {item.statusBill === "THANH_CONG" ? (
                               <>
                                   <div className="repurchase">Mua lại</div>
                                   <div className="see-purchase">Xem đơn hàng</div>
                               </>
                               ) :null}
                           </div>

                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}
