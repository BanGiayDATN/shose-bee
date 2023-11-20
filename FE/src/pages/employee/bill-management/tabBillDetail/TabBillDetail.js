import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { BillApi } from '../../../../api/employee/bill/bill.api';
import { useDispatch } from 'react-redux';

function TabBillDetail({dataBillDetail}) {

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
      const dispatch = useDispatch();
      useEffect(() => {
        BillApi.fetchAllProductsInBillByIdBill(dataBillDetail).then((res) => {
            setBillDetail(res.data.data);
        });
      }, []);
      const [billDetai, setBillDetail] = useState([])
  return (
    <div>
          <Row
          style={{
            width: "100%",
            marginTop: "20px",
            borderBottom: "1px solid #ccc",
            padding: "12px",
          }}
        >
          {billDetai.map((item, index) => {
            return (
              <Row style={{ marginTop: "10px", width: "100%" }}>
                <Col
                  span={1}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "21px",
                    fontFamily: "500",
                    margin: "auto",
                  }}
                >
                  {index + 1}
                </Col>
                <Col span={5}>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      src={item.image}
                      alt="Ảnh sản phẩm"
                      style={{
                        width: "100px",
                        borderRadius: "10%",
                        height: "100px",
                      }}
                    />
                    {item.promotion !== null && (
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
                            ...getPromotionColor(item.promotion),
                            fontSize: "3.5em",
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
                            ...getPromotionStyle(item.promotion),
                          }}
                        >
                          {`${item.promotion}%`}
                        </span>
                        <span
                          style={{
                            position: "absolute",
                            top: "60%",
                            left: "50%", // Để "Giảm" nằm chính giữa biểu tượng
                            transform: "translate(-50%, -50%)", // Dịch chuyển "Giảm" đến vị trí chính giữa
                            fontSize: "0.8em",
                            fontWeight: "bold",
                            ...getPromotionStyle(item.promotion),
                          }}
                        >
                          Giảm
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={10}>
                  <Row>
                    {" "}
                    <span
                      style={{
                        fontSize: "19",
                        fontWeight: "500",
                        marginTop: "10px",
                      }}
                    >
                      {item.productName}
                    </span>{" "}
                  </Row>
                  <Row>
                    {item.promotion != null ? (
                      <span style={{ fontSize: "12px", marginTop: "4px" }}>
                        <del>
                          {formatCurrency(
                            item.price / (1 - item.promotion / 100)
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
                      {item.price >= 1000
                        ? formatCurrency(item.price)
                        : item.price + " VND"}
                    </span>{" "}
                  </Row>
                  <Row>
                    <span style={{ fontSize: "12", marginTop: "10px" }}>
                      Size: {item.nameSize}
                    </span>{" "}
                  </Row>
                  <Row>
                    <span style={{ fontSize: "12" }}>x {item.quantity}</span>{" "}
                  </Row>
                </Col>
                <Col span={3} style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      marginBottom: "30px",
                    }}
                  >
                    {item.price * item.quantity >= 1000
                      ? (item.price * item.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : item.price * item.quantity + " đ"}
                  </span>{" "}
                </Col>
              </Row>
            );
          })}
        </Row>
    </div>
  )
}

export default TabBillDetail