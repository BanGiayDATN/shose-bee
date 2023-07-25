import { Button, Col, Row, Table } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Sale() {
  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Mã Hóa đơn</div>,
      dataIndex: "codeProduct",
      key: "codeProduct",
    },
    {
      title: <div className="title-product">Số sản Phẩm</div>,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <div className="title-product">Tổng tiền</div>,
      dataIndex: "nameSize",
      key: "nameSize",
    },
    {
      title: <div className="title-product">Giờ tạo</div>,
      dataIndex: "nameColor",
      key: "nameColor",
    },
    {
      title: <div className="title-product">Trạng thái</div>,
      dataIndex: "nameSole",
      key: "nameSole",
    },
    {
      title: <div className="title-product">Thao tác</div>,
      dataIndex: "nameMaterial",
      key: "nameMaterial",
    },
  ];

  return (
    <div>
      <Row style={{ background: "white", width: "100%" }}>
        <Row style={{ width: "100%" , marginTop: "10px"}}>
          <Col span={12}>
            <Search
              placeholder="input search text"
              allowClear
              style={{ marginLeft: "30px" }}
              enterButton="Search"
              size="large"
              // onSearch={onSearch}
            />
          </Col>
          <Col span={12} align={"end"} >
            <Link to={"/create-bill"} style={{ marginRight: "10px" }}>
              <Button type="primary" icon={<PlusOutlined />} size={"large"}>
                Tạo đơn hàng
              </Button>
            </Link>
          </Col>
        </Row>
        <Row style={{ width: "100%", marginTop: "40px" }}>
          <Table
            // dataSource={detailProductInBill}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="product-table"
          />
        </Row>
      </Row>
    </div>
  );
}

export default Sale;
