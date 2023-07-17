import {
  PoweroffOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  PlusCircleOutlined,
  BarcodeOutlined,
  AndroidOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tabs } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import "./create-bill.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hook";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { addbillWait, getAllBillWait } from "../../../app/reducer/Bill.reducer";
import DetailsInvoicesCounter from "./DetailsInvoicesCounter";

function CreateBill() {
  const listBillWait = useSelector((state) => state.bill.billWait.value);
  const dispatch = useAppDispatch();

  const onSearch = () => {
    console.log(123);
  };

  useEffect(() => {
    BillApi.getAllBillWait().then((res) => {
      dispatch(getAllBillWait(res.data.data));
    });
  }, []);

  const createBillWait = () => {
    BillApi.createBillWait().then((res) => {
      dispatch(addbillWait(res.data.data));
    });
  };

  return (
    <div>
      <Row>
        <Col span={18}>
          <Search
            placeholder="chọn sản phẩm"
            onClick={onSearch}
            disabled={true}
            style={{
              width: "80%",
            }}
          />
          <Button
            type="primary"
            icon={<BarcodeOutlined />}
            //   loading={loadings[2]}
            //   onClick={() => enterLoading(2)}
          />
        </Col>

        <Col span={6}>0338957590</Col>
      </Row>
      <Row className="content">
        <Col span={24} style={{ marginTop: "5px", padding: "0px" }}>
          <Row>
            <Col span={23}>
              <Tabs
                defaultActiveKey="1"
                style={{
                  height: 220,
                  marginLeft: 5,
                }}
                items={listBillWait.map((item, index) => {
                  return {
                    label: `Hóa đơn-${index + 1}`,
                    key: index,
                    children: <DetailsInvoicesCounter detailBill={item} />,
                  };
                })}
              />
            </Col>
            <Col span={1.5}>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                style={{ margin: "0 5px 0 0" }}
                onClick={() => createBillWait()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CreateBill;
