import { Tabs } from "antd";
import React from "react";
import TabBillDetail from "./TabBillDetail";

function ManagerBillDetail({ id, status }) {
  const listtab = ["THANH_CONG", "DA_HUY"];
  const convertString = (key) => {
    return key === "THANH_CONG" ? "Hoàn thành" : "Hoàn hàng";
  };
  return (
    <div>
      {status != 'TRA_HANG' ? (
        <TabBillDetail dataBillDetail={{ idBill: id, status: "THANH_CONG" }} />
      ) : (
        <Tabs
          type="card"
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
    </div>
  );
}

export default ManagerBillDetail;
