import React, { useEffect } from "react";

import "./style.css";
import { useNavigate } from "react-router";

export default function TabAllBill({ listBill }) {
  const nav = useNavigate();
  useEffect(() => {
    console.log(listBill);
  }, [listBill]);
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
          <div key={index} className="box-bill-account">
            <div className="header-bill-account">
              <span style={{ marginLeft: "auto", marginBottom: "10px" }}>
                <span
                  className={`trangThai ${" status_" + item.statusBill} `}
                  style={{ borderRadius: "5px" }}
                >
                  {item.statusBill === "TAO_HOA_DON"
                    ? "Tạo Hóa đơn"
                    : item.statusBill === "CHO_XAC_NHAN"
                    ? "Chờ xác nhận"
                    : item.statusBill === "XAC_NHAN"
                    ? "Xác nhận"
                    : item.statusBill === "CHO_VAN_CHUYEN"
                    ? "Chờ vận chuyển"
                    : item.statusBill === "VAN_CHUYEN"
                    ? "Đang vận chuyển"
                    : item.statusBill === "DA_THANH_TOAN"
                    ? "Đã thanh toán"
                    : item.statusBill === "THANH_CONG"
                    ? "Thành công"
                    : item.statusBill === "TRA_HANG"
                    ? "Trả hàng"
                    : "Đã hủy"}
                </span>
              </span>
            </div>

            <div>
              {item.billDetail.map((item, index) => (
                <div key={index} className="content-bill-account">
                  <div className="box-image-bill-account">
                    <img style={{ width: 120 }} src={item.image} alt="..." />
                  </div>
                  <div className="box-detail-product-bill-account">
                    <div className="name-product-bill-account">
                      {item.productName}
                    </div>
                    <div className="size-product-bill-account">
                      {item.nameSize} - {item.nameColor}
                    </div>
                    <div className="quantity">x{item.quantity}</div>
                  </div>
                  <div className="box-total-bill-account">
                    {item.promotion !== null ? (
                      <>
                        <span
                          style={{
                            marginLeft: 10,
                            color: "#ff4400",
                            fontSize: 17,
                          }}
                        >
                          {" "}
                          {formatMoney(
                            item.price - item.price * (item.promotion / 100)
                          )}
                        </span>{" "}
                        <br />
                        <del
                          style={{
                            color: "black",
                            fontSize: 16,
                            marginLeft: 12,
                          }}
                        >
                          {formatMoney(item.price)}
                        </del>
                      </>
                    ) : (
                      formatMoney(item.price)
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="box-total-money-bill-account">
              {" "}
              Thành tiền:{" "}
              <span
                style={{
                  fontSize: 20,
                  color: "#ff4400",
                  marginLeft: 10,
                }}
              >
                {formatMoney(item.totalMoney)}
              </span>
            </div>
            <div className="box-repurchase">
              {item.statusBill === "THANH_CONG" ||
              item.statusBill === "DA_HUY" ? (
                <>
                  <div className="repurchase">Mua lại</div>
                </>
              ) : null}
              {item.statusBill !== "DA_HUY" ? (
                <div
                  className="see-purchase"
                  onClick={() => nav(`/purchase/${item.id}`)}
                >
                  Xem đơn hàng{" "}
                </div>
              ) : (
                <div
                  className="see-purchase"
                  onClick={() => nav(`/purchase/${item.id}`)}
                >
                  Xem chi tiết hủy đơn
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
