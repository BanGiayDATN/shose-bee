/* eslint-disable jsx-a11y/alt-text */
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, InputNumber, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BillApi } from "../../../../api/employee/bill/bill.api";
import "./tabBillDetail.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

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
    return product.promotion === null
      ? product.price * product.quantity
      : (product.price * (100 - product.promotion) * product.quantity) / 100;
  };
  const [products, setProducts] = useState( useSelector(
    (state) => state.bill.bill.billDetail
  ));
  const bill = useSelector((state) => state.bill.bill.value);
  const handleQuantityChange = (value, record) => {
    var max = record.quantity;
    if (!Number.isInteger(value)) {
    } else if (value > max) {
    } else {
      const data = {
        idBill: bill.id,
        idProduct: record.id,
        quantity: value,
        totalMoney: products.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price * currentValue.quantity;
        }, 0),
        price: record.price,
        promotion: record.promotion
      }
      BillApi.updateProductInBill(bill.id, data)
      .then((res) => {
        toast.success("Sửa sản phẩm thành công");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    }
  };

  const handleQuantityDecrease = (record) => {
    const data = {
      idBill: bill.id,
      idProduct: record.id,
      quantity: record.quantity + 1,
      totalMoney: products.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, 0),
      price: record.price,
      promotion: record.promotion
    }
    BillApi.updateProductInBill(bill.id, data)
    .then((res) => {
      toast.success("Sửa sản phẩm thành công");
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
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
            style={{ width: "80px", borderRadius: "10%", height: "80px" }}
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
      title: <div style={{ textAlign: "center" }}>Thông tin sản phẩm</div>,
      key: "productName",
      dataIndex: "productName",
      render: (_, record) => (
        <>
          <h3> {record.productName}</h3>
          <h4 style={{ color: "red" }}>
            {record.promotion === null
              ? formatCurrency(record.price)
              : formatCurrency((record.price * (100 - record.promotion)) / 100)}
          </h4>
          <h5 style={{ textDecoration: " line-through" }}>
            {record.promotion !== null && formatCurrency(record.price)}
          </h5>
        </>
      ),
    },
    {
      title: "Màu Sắc",
      dataIndex: "codeColor",
      key: "codeColor",
      width: "8px",
      align: "center",
      render: (color) => (
        <span
          style={{
            backgroundColor: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: "6px",
            width: "60px",
            height: "25px",
          }}
        />
      ),
    },
    {
      title: "Số lượng",
      key: "quantity",
      align: "center",
      dataIndex: "quantity",
      render: (quantity, record) => {
        true ? ( <Col
          span={4}
          align={"center"}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Button
            onClick={() => handleQuantityDecrease(record)}
            style={{ margin: "0 0 0 4px" }}
          >
            -
          </Button>
          <InputNumber
            min={1}
            max={record.maxQuantity}
            style={{ margin: "0 5px" }}
            value={record.quantity}
            onChange={(value) => {
              handleQuantityChange(value, record);
            }}
          />
        </Col>):(<span>{quantity}</span>)}
    },
    {
      title: "Tổng tiền",
      key: "totalPrice",
      align: "center",
      dataIndex: "totalPrice",
      render: (_, record) => (
        <span>{formatCurrency(totalMoneyProduct(record))}</span>
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
      console.log(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [billDetai, setBillDetail] = useState([]);
  const statusPresent = useSelector((state) => state.bill.bill.status);
  return (
    <>
      {billDetai.length > 0 ? (
        <Table
          className="table-bill-detail"
          columns={columnProductBill}
          dataSource={billDetai}
          rowKey={"id"}
          style={{ width: "100%" }}
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
