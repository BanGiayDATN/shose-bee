import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, Row, Col } from "antd";
import { Bar } from "react-chartjs-2";
// import SalesChart from "./chart";

import "../dashboard/style-dashboard.css";

const DashBoard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);

  return (
    <div>
      <div
        className="content-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          THỐNG KÊ
        </span>
      </div>
      <div>
        <Row className="row-header">
          <Col span={7} className="col-header">
            <div className="content-header">
              <h3>Doanh số tháng này</h3>
              <h3>100 đơn hàng / 100.000.000 VNĐ</h3>
            </div>
          </Col>

          <Col span={7} className="col-header">
            <div className="content-header">
              <h3>Doanh số tháng này</h3>
              <h3>100 đơn hàng / 100.000.000 VNĐ</h3>
            </div>
          </Col>

          <Col span={7} className="col-header">
            <div className="content-header">
              <h3>Hàng bán được tháng này</h3>
              <h3>87 chiếc</h3>
            </div>
          </Col>
        </Row>
        <Row className="row-body">
          <h3>Biểu đồ thống kê</h3>
          {/* <SalesChart /> */}
        </Row>
        <Row className="row-footer">
          <Col className="row-footer-left">
            <h3>San pham ban chay trong thang</h3>
          </Col>
          <Col className="row-footer-right">
            <h3>Trang thai don hang</h3>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;
