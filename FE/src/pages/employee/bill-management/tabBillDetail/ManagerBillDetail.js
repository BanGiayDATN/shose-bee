import { Row, Tabs } from "antd";
import React from "react";
import TabBillDetail from "./TabBillDetail";
import "./tabBillDetail.css";

function ManagerBillDetail({ id, status }) {
  const listtab = [null, "THANH_CONG", "TRA_HANG"];
  const convertString = (key) => {
    return key === null
      ? "Tất cả sản phẩm"
      : key === "THANH_CONG"
      ? "Sản phẩm mua thành công"
      : "Sản phẩm trả hàng";
  };
  return (
    <Row style={{ width: "100%" }}>
      {status !== "TRA_HANG" ? (
        <TabBillDetail dataBillDetail={{ idBill: id, status: "THANH_CONG" }} />
      ) : (
        <Tabs
          type="card"
          className="tab-bill-detail"
          items={listtab.map((item) => {
            return {
              label: <span>{convertString(item)}</span>,
              key: item,
              children: (
                <TabBillDetail dataBillDetail={{ idBill: id, status: item }} />
              ),
            };
          })}
        />
      )}
    </Row>
  );
}

export default ManagerBillDetail;
