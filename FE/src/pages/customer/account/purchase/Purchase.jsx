import { Tabs } from "antd";
import React from "react";
import TabAllBill from "./tabscontent/TabAllBill";
import TabChoThanhToan from "./tabscontent/TabChoThanhToan";
import TabVanChuyen from "./tabscontent/TabVanChuyen";
import TabChoGiaoHang from "./tabscontent/TabChoGiaoHang";
import TabHoanThanh from "./tabscontent/TabHoanThanh";
import TabHuy from "./tabscontent/TabHuy";

export default function Purchase() {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <h3
        style={{ marginTop: "10px", marginLeft: "20px", marginBottom: "10px" }}
      >
        {" "}
        Đơn hàng của tôi{" "}
      </h3>
      <div>
        <Tabs onChange={onChange} type="card">
          <Tabs.TabPane tab="Tất cả" key="1">
            <TabAllBill />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ thanh toán" key="2">
            <TabChoThanhToan />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Vận chuyển" key="3">
            <TabVanChuyen />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ giao hàng" key="4">
            <TabChoGiaoHang />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hoàn thành" key="5">
            <TabHoanThanh />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy" key="6">
            <TabHuy />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}
