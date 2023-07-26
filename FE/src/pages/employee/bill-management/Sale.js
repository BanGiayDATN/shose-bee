import { Button, Col, Row, Table } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { useAppDispatch } from "../../../app/hook";
import { getAllBillAtCounter } from "../../../app/reducer/Bill.reducer";
import moment from "moment";

function Sale() {

  var data = useSelector((state) => state.bill.billAtCounter.value);

  const [fillter, setFillter] = useState({
    key: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    var value = ""
    BillApi.fetchAllBillAtCounter(value).then((res) => {
      dispatch(getAllBillAtCounter(res.data.data));
    });
  }, []);


  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Mã Hóa đơn</div>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <div className="title-product">Số sản Phẩm</div>,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: <div className="title-product">Tổng tiền</div>,
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney) => (
        <span>
          {totalMoney >= 1000
            ? totalMoney.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : totalMoney}
        </span>
      ),
    },
    {
      title: <div className="title-product">Giờ tạo</div>,
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => a.createdDate - b.createdDate,
      render: (text) => {
        const formattedDate = moment(text).format("HH:mm:ss"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-product">Trạng thái</div>,
      dataIndex: "statusBill",
      key: "statusBill",
      render: (text) => {
        return (
          <span
            // className={`trangThai ${" status_" + text} `}
            // style={{ border: "none", borderRadius: "0px" }}
          >
            {text === "TAO_HOA_DON"
              ? "Tạo Hóa đơn"
              : text === "CHO_XAC_NHAN"
              ? "Chờ xác nhận"
              : text === "VAN_CHUYEN"
              ? "Đang vận chuyển"
              : text === "DA_THANH_TOAN"
              ? "Đã thanh toán"
              : text === "TRA_HANG"
              ? "Trả hàng"
              : text === "KHONG_TRA_HANG"
              ? "Thành công"
              : "Đã hủy"}
          </span>
        );
      },
    },
    {
      title: <div className="title-product">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <Button>
          <Link to={`/bill-management/detail-bill/${id}`}>Chi tiết</Link>
        </Button>
      ),
    },
  ];

  const search = (value) =>{
    // setFillter({ ...fillter, ["key"]: value })
    BillApi.fetchAllBillAtCounter(value).then((res) => {
      console.log(res);
      dispatch(getAllBillAtCounter(res.data.data));
    });
  }

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
              onSearch={(value) => {search(value);}}
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
            dataSource={data}
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
