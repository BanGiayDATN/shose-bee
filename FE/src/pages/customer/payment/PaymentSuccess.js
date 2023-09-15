import "./style-payment-success.css"
import { useState, useEffect } from "react";
import logo from "./../../../assets/images/logo_client.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BillClientApi } from "./../../../api/customer/bill/billClient.api";
import { faSquareCheck,faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function PayMentSuccess() {
  

const urlObject = new URL(window.location.href);
const vnp_ResponseCode = urlObject.searchParams.get("vnp_ResponseCode");
const vnp_Amount = urlObject.searchParams.get("vnp_Amount");
const formBill = JSON.parse(sessionStorage.getItem("formBill"))
useEffect(()=>{
if(vnp_ResponseCode==='00'){
  console.log(formBill);
  onPayment(formBill)
}
},[])
const formatMoney = (price) => {
    return (
      parseInt(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
    );
  };
  const onPayment =(formBill) => {
    BillClientApi.createBillOnline(formBill).then(
      (res) => {},
      (err) => {
        console.log(err);
      }
    )
  }
    return ( <>

    <div className="header-payment-success">
        <img className="logo-payment-success" src={logo} alt="logo"/>
    </div>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
        {vnp_ResponseCode==='00' ?(
      <div className="content-payment-success">
    <FontAwesomeIcon className="icon-payment-success" icon={faSquareCheck} />
        <h1>Thanh toán thành công</h1>
        <div style={{marginTop:"5%"}}>Tổng thanh toán:  {formatMoney(vnp_Amount/100)}</div>
    <Link to="/home">Tiếp tục mua</Link>
        </div>
        ):(
         <div className="content-payment-success">
       <FontAwesomeIcon className="icon-payment-fail" icon={faTriangleExclamation} />
           <h1>Thanh toán thất bại</h1>
         <div>
         <Link to="/payment">Thử lại</Link>
         <Link style={{marginLeft:"10px"}} to="/home">Tiếp tục mua</Link>
         </div>
         </div>
        )}
    </div>
    </> );
}

export default PayMentSuccess;