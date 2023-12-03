import { Button, Col, Modal, Row, Tabs } from "antd";
import React, { useState } from "react";
import TabBillDetail from "./TabBillDetail";
import "./tabBillDetail.css";
import ModalAddProductDetail from "../modal/ModalAddProductDetail";
import { useSelector } from "react-redux";

function ManagerBillDetail({ id, status }) {
  const listtab = [null, "THANH_CONG", "TRA_HANG"];
  const convertString = (key) => {
    return key === null
      ? "Tất cả sản phẩm"
      : key === "THANH_CONG"
      ? "Sản phẩm mua thành công"
      : "Sản phẩm trả hàng";
  };

  const [isModalProductOpen, setIsModalProductOpen] = useState(false);

  const showModalProduct = (e) => {
    setIsModalProductOpen(true);
  };
  const handleOkProduct = () => {
    setIsModalProductOpen(false);
  };
  const handleCancelProduct = () => {
    setIsModalProductOpen(false);
  };
  const [products, setProducts] = useState( useSelector(
    (state) => state.bill.bill.billDetail
  ));
  const typeAddProductBill = id;

  
  return (
    <Row style={{ width: "100%" }}>
      {status !== "TRA_HANG" ? (
        <Row>
          {status < 3 ? (
            <Row style={{ width: "100%" }} justify={"end"}>
              <Button
              type="primary"
              style={{ margin: "10px 20px 0 0 " }}
              onClick={(e) => showModalProduct(e)}
            >
              Thêm sản phẩm
            </Button>
            </Row>
          ) : (
            <Row></Row>
          )}
          <Row style={{ width: "100%" }}>
            {" "}
            <TabBillDetail
              style={{ width: "100%" }}
              dataBillDetail={{ idBill: id, status: "THANH_CONG" }}
            />
          </Row>
        </Row>
      ) : (
        <Tabs
          type="card"
          style={{ width: "100%" }}
          items={listtab.map((item) => {
            return {
              label: <span>{convertString(item)}</span>,
              key: item,
              children: (
                <TabBillDetail
                  style={{ width: "100%" }}
                  dataBillDetail={{ idBill: id, status: item }}
                />
              ),
            };
          })}
        />
      )}
      <Modal
        title="Basic Modal"
        open={isModalProductOpen}
        onOk={handleOkProduct}
        onCancel={handleCancelProduct}
        width={1000}
      >
        <ModalAddProductDetail
          handleCancelProduct={handleCancelProduct}
          products={products}
          setProducts={setProducts}
          typeAddProductBill={typeAddProductBill}
        />
      </Modal>
    </Row>
  );
}

export default ManagerBillDetail;
