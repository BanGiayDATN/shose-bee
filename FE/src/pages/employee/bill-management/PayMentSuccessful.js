import { Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './paymentSuccessFull.css'
import { white } from "color-name";

const getUrlVars = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const parameters = {};
  for (const [key, value] of urlParams.entries()) {
    if (key === "vnp_TxnRef" || key === "vnp_TransactionStatus") {
      parameters[key] = value;
    }
  }
  return parameters;
};

const saveToLocalStorage = (parameters) => {
  localStorage.setItem("parameters", JSON.stringify(parameters));
};

const fetchData = () => {
  const parameters = getUrlVars();
  saveToLocalStorage(parameters);
};

const getTransactionStatus = () => {
  const urlParams = new URLSearchParams(window.location.search);
  var parameters = "";
  for (const [key, value] of urlParams.entries()) {
    if (key === "vnp_TransactionStatus") {
      parameters = value;
    }
  }
  return parameters;
};

const getAmount = () => {
  const urlParams = new URLSearchParams(window.location.search);
  var parameters = "";
  for (const [key, value] of urlParams.entries()) {
    if (key === "vnp_Amount") {
      parameters = value;
    }
  }
  return parameters;
};

function PayMentSuccessful() {
  getUrlVars();
  const [status, setStatus] = useState();
  const [amount, setAmount] = useState();
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };
  useEffect(() => {
    fetchData();
    setStatus(getTransactionStatus());
    setAmount(getAmount());
  }, []);
  console.log(status);
  return (
    <div>
      {status == "00" ? (
        <div style={{ width: "100%" }}>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <div class="loading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="124"
                viewBox="0 0 124 124"
              >
                <circle
                  class="circle-loading"
                  cx="62"
                  cy="62"
                  r="59"
                  fill="none"
                  stroke="#0cff00"
                  stroke-width="6px"
                ></circle>
                <circle
                  class="circle"
                  cx="62"
                  cy="62"
                  r="59"
                  fill="none"
                  stroke="#0cff00"
                  stroke-width="6px"
                  stroke-linecap="round"
                ></circle>
                <polyline
                  class="check"
                  points="73.56 48.63 57.88 72.69 49.38 62"
                  fill="none"
                  stroke="#0cff00"
                  stroke-width="6px"
                  stroke-linecap="round"
                ></polyline>
              </svg>
            </div>
          </Row>
          <Row
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: "600",
              color: "#00f63f",
            }}
          >
            <h2 className="textGradient">Thanh toán thành công</h2>
          </Row>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <p className="textColor">
              {" "}
              Qúy khách đã thanh toán thành công cho đơn hàng{" "}
            </p>
          </Row>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <p
              style={{
                padding: "20px",
                backgroundColor: "#f05623c9",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: "500",
                color: "white"
              }}
            >
              {" "}
              Tổng Thanh toán: {formatCurrency(amount)}{" "}
            </p>
          </Row>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <Row
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: "600",
              color: "#00f63f",
            }}
          >
            <h2 className="textGradient">Thanh toán Thất bại</h2>
          </Row>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <p  className="textColor"> Qúy khách vui lòng thử lại </p>
          </Row>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <p
              style={{
                padding: "20px",
                backgroundColor: "#f05623c9",
                borderRadius: "20px",
              }}
            >
              {" "}
              Tổng Thanh toán: {formatCurrency(amount)}{" "}
            </p>
          </Row>
        </div>
      )}
    </div>
  );
}

export default PayMentSuccessful;
