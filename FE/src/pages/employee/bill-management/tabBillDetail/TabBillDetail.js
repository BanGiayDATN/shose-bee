/* eslint-disable jsx-a11y/alt-text */
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BillApi } from "../../../../api/employee/bill/bill.api";
import "./tabBillDetail.css";

function TabBillDetail({ dataBillDetail }) {
  const getPromotionStyle = (promotion) => {
    return promotion >= 50 ? { color: "white" } : { color: "#000000" };
  };
  const getPromotionColor = (promotion) => {
    return promotion >= 50 ? { color: "#FF0000" } : { color: "#FFCC00" };
  };
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  const totalMoneyProduct = (product) => {
    return product.promotion != null
      ? (product.price * product.quantity * (100 - product.promotion)) / 100
      : product.price * product.quantity;
  };

  const columnProductBill = [
    {
      title: <div className="title-product">STT</div>,
      key: "stt",
      align: "center",
      width: "5%",
      dataIndex: "stt",
    },
    {
      title: <div className="title-product">Ảnh Sản Phẩm</div>,
      dataIndex: "image",
      align: "center",
      key: "image",
      render: (text, record) => (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={text}
            alt="Ảnh sản phẩm"
            style={{ width: "120px", borderRadius: "10%", height: "120px" }}
          />
          {record.promotion !== null && (
            <div
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                padding: "0px",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{
                  ...getPromotionColor(record.promotion),
                  fontSize: "3em",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "calc(50% - 10px)", // Đặt "50%" lên trên biểu tượng (từ 50% trừ 10px)
                  left: "50%", // Để "50%" nằm chính giữa biểu tượng
                  transform: "translate(-50%, -50%)", // Dịch chuyển "50%" đến vị trí chính giữa
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  ...getPromotionStyle(record.promotion),
                }}
              >
                {`${record.promotion}%`}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "60%", // Để "Giảm" nằm chính giữa biểu tượng
                  left: "50%", // Để "Giảm" nằm chính giữa biểu tượng
                  transform: "translate(-50%, -50%)", // Dịch chuyển "Giảm" đến vị trí chính giữa
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  ...getPromotionStyle(record.promotion),
                }}
              >
                Giảm
              </span>
            </div>
          )}
        </div>
      ),
    },

    {
      title: <div className="title-product">Thông Tin Sản Phẩm</div>,
      dataIndex: "information",
      key: "information",
      align: "center",
      render: (_, record) => (
        <Row justify={"center"}>
          <Col span={19}>
            <Row>
              {" "}
              <span
                style={{
                  fontSize: "19",
                  fontWeight: "500",
                  marginTop: "10px",
                }}
              >
                {record.productName}
              </span>{" "}
            </Row>
            <Row>
              {record.promotion != null ? (
                <span style={{ fontSize: "12px", marginTop: "4px" }}>
                  <del>
                    {formatCurrency(
                      record.price / (1 - record.promotion / 100)
                    )}
                  </del>
                </span>
              ) : (
                <span></span>
              )}
              <span
                style={{
                  color: "red",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                {record.price >= 1000
                  ? formatCurrency(record.price)
                  : record.price + " VND"}
              </span>{" "}
            </Row>
            <Row>
              <span style={{ fontSize: "12", marginTop: "10px" }}>
                Size: {record.nameSize}
              </span>{" "}
            </Row>
            <Row>
              <span style={{ fontSize: "12" }}>x {record.quantity}</span>{" "}
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      title: <div className="title-product">Tổng Tiền Sản Phẩm</div>,
      key: "totalPrice",
      align: "center",
      dataIndex: "totalPrice",
      render: (_, record) => (
        <span style={{ fontWeight: "bold", color: "red", fontSize: "16px" }}>
          {formatCurrency(totalMoneyProduct(record))}
        </span>
      ),
    },
    {
      title: <div className="title-product">Trạng Thái</div>,
      key: "status",
      align: "center",
      dataIndex: "status",
      render: (text) => {
        const genderClass =
          text === "THANH_CONG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "THANH_CONG" ? "Thành công " : "Hoàn hàng"}
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    BillApi.fetchAllProductsInBillByIdBill(dataBillDetail).then((res) => {
      setBillDetail(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [billDetai, setBillDetail] = useState([]);
  return (
    <>
      {billDetai.length > 0 ? (
        <Table
          className="table-bill-detail"
          columns={columnProductBill}
          dataSource={billDetai}
          rowKey={"id"}
        />
      ) : (
        <Row style={{ width: "100%" }}>
          <Row
            justify={"center"}
            style={{
              width: "100%",
              position: "relative",
              marginTop: "8%",
            }}
          >
            <Col align="center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiSWIoLaZSLHBPWAeO0RZFEiqaDNA0pyOboAdbGJqtUBkYAf65Z7rPVukqwmxTiJY87WQ&usqp=CAU"
                style={{ marginTop: "20px", width: "100%" }}
              />
            </Col>
          </Row>
          <Row justify={"center"} style={{ width: "100%" }}>
            <Col>
              <span style={{ fontSize: "15px" }}> Không có sản phẩm nào</span>
            </Col>
          </Row>
        </Row>
      )}
    </>
  );
}

export default TabBillDetail;
