import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style-payment.css";
import { Card, Modal, Row, Col, Button, InputNumber } from "antd";
import { toast } from "react-toastify";
import { CartClientApi } from "./../../../api/customer/cart/cartClient.api";
import { ProductDetailClientApi } from "./../../../api/customer/productdetail/productDetailClient.api";
function Payment() {
 
  return (
    <div>
        <h1>welcome to diêm bill</h1>
    </div>
  );
}

export default Payment;
