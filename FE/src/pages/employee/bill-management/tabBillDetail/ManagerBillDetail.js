import { Row, Tabs } from "antd";
import React from "react";
import TabBillDetail from "./TabBillDetail";

function ManagerBillDetail({ id, status }) {
  const listtab = ["THANH_CONG", "DA_HUY"];
  const convertString = (key) => {
    return key === "THANH_CONG" ? "Hoàn thành" : "Hoàn hàng";
  };
  return (
    <Row style={{    width: "100%"}}>
      {status == 'TRA_HANG' ? (
        <TabBillDetail style={{width: "100%"}} dataBillDetail={{ idBill: id, status: "THANH_CONG" }} />
      ) : (
        <Tabs
          type="card"
          style={{width: "100%"}}
          items={listtab.map((item) => {
            return {
              label: <span>{convertString(item)}</span>,
              key: item,
              children: (
                <TabBillDetail  style={{width: "100%"}} dataBillDetail={{ idBill: id, status: item }} />
              ),
            };
          })}
        />
      )}
    </Row>
  );
}

export default ManagerBillDetail;
