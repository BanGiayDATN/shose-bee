import { Button, Col, Modal, Row, Table } from "antd";
import TimeLine from "./TimeLine";
import {
  addStatusPresent,
  getBill,
  getBillHistory,
  getProductInBillDetail,
} from "../../../app/reducer/Bill.reducer";
import moment from "moment";
import { useState } from "react";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

var listStatus = [
  { id: 0, name: "Tạo hóa đơn", status: "TAO_HOA_DON" },
  { id: 1, name: "Chờ xác nhận", status: "CHO_XAC_NHAN" },
  { id: 2, name: "Vận chuyển", status: "VAN_CHUYEN" },
  { id: 3, name: "Đã thanh toán", status: "DA_THANH_TOAN" },
  { id: 4, name: "Thành công", status: "KHONG_TRA_HANG" },
];

function DetailBill() {
  const { id } = useParams();
  const detailProductInBill = useSelector(
    (state) => state.bill.bill.billDetail
  );
  const billHistory = useSelector((state) => state.bill.bill.billHistory);
  const bill = useSelector((state) => state.bill.bill.value);
  const statusPresent = useSelector((state) => state.bill.bill.status);
  const [statusBill, setStatusBill] = useState({
    idbill: id,
    actionDescription: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    BillApi.fetchAllProductsInBillByIdBill(id).then((res) => {
      console.log(res);
      dispatch(getProductInBillDetail(res.data.data));
    });
    BillApi.fetchDetailBill(id).then((res) => {
      dispatch(getBill(res.data.data));
      var index = listStatus.findIndex(
        (item) => item.status == res.data.data.statusBill
      );
      if (res.data.data.statusBill == "TRA_HANG") {
        index = 5;
      }
      if (res.data.data.statusBill == "DA_HUY") {
        index = 6;
      }
      dispatch(addStatusPresent(index));
    });
    BillApi.fetchAllHistoryInBillByIdBill(id).then((res) => {
      dispatch(getBillHistory(res.data.data));
      console.log(res);
    });
  }, []);

  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Mã sản phẩm</div>,
      dataIndex: "codeProduct",
      key: "codeProduct",
    },
    {
      title: <div className="title-product">Tên Sản Phẩm</div>,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <div className="title-product">Kích thước</div>,
      dataIndex: "nameSize",
      key: "nameSize",
    },
    {
      title: <div className="title-product">Màu</div>,
      dataIndex: "nameColor",
      key: "nameColor",
    },
    {
      title: <div className="title-product">Đế giày</div>,
      dataIndex: "nameSole",
      key: "nameSole",
    },
    {
      title: <div className="title-product">Chất liệu</div>,
      dataIndex: "nameMaterial",
      key: "nameMaterial",
    },
    {
      title: <div className="title-product">Giá</div>,
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: <div className="title-product">Số lượng </div>,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: <div className="title-product">Số lượng còn lại</div>,
      dataIndex: "quantityProductDetail",
      key: "quantityProductDetail",
    },
  ];

  const columnsHistory = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Trạng thái</div>,
      dataIndex: "statusBill",
      key: "statusBill",
      render: (statusBill) => (
        <span>
          {statusBill == "TAO_HOA_DON"
            ? "Tạo Hóa đơn"
            : statusBill == "CHO_THANH_TOAN"
            ? "Chờ xác nhận"
            : statusBill === "VAN_CHUYEN"
            ? "Đang vận chuyển"
            : statusBill === "DA_THANH_TOAN"
            ? "Đã thanh toán"
            : statusBill === "KHONG_TRA_HANG"
            ? "Thành công"
            : statusBill === "TRA_HANG"
            ? "Trả hàng"
            : "Đã hủy"}
        </span>
      ),
    },
    {
      title: <div className="title-product">Ngày</div>,
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-product">Ghi chú</div>,
      dataIndex: "actionDesc",
      key: "actionDesc",
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="row">
          <TimeLine
            listStatus={listStatus}
            data={billHistory}
            statusPresent={statusPresent}
          />
        </div>
        <div className="row mt-3">
          <div className="col-2">
            {/* <Button type="Xác nhận" className='btn btn-primary' onClick={showModalChangeStatus(0, "Xác nhận")}>
                  {listStatus[statusPresent + 1].name}
                </Button>
                <Modal title="Basic Modal" open={isModalOpenChangeStatus} onOk={handleOkChangeStatus} onCancel={handleCancelChangeStatus}>
                  <h2 className='row'> {title} Mã Hóa đơn: {bill.code}</h2>
                  <p></p>
                  <p className='row'>
                    <div className="mb-3">
                      <label className="form-label">Nhập mô tả</label>
                      <input type="text" className="form-control" name="actionDescription" value={statusBill.actionDescription} onChange={(e) => onChangeDescStatusBill(e)} id="exampleInputEmail1" />
                    </div>
                  </p>
                  <button type="submit" className="btn btn-primary" onClick={actionBill == 0 ? changeStatusBill : cancelStatusBill }>Xác nhận</button>
                </Modal> */}
          </div>
          <div className="col-2">
            {/* <Button type="Hủy" className='btn btn-danger' onClick={showModalChangeStatus(1, "Xác nhận hủy")}>
                  Hủy
                </Button>
              </div>
              <div className="offset-6 col-2">
                <Button type="primary" onClick={showModal}>
                  Open Modal
                </Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <Table
                    dataSource={billHistory}
                    columns={columnsHistory}
                    rowKey="id"
                    pagination={false} // Disable default pagination
                    className="product-table"
                  />
                </Modal> */}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h2 className="text-center"> Thông tin hóa đơn</h2>
        <Row>
          <Col span={12} className="text">
            <div className="row">Mã: {bill.code}</div>
          </Col>
          <Col span={12} className="text">
            <div className="row">
              Trạng thái:{" "}
              {bill.statusBill == "TAO_HOA_DON"
                ? "Tạo Hóa đơn"
                : bill.statusBill == "CHO_THANH_TOAN"
                ? "Chờ xác nhận"
                : bill.statusBill === "VAN_CHUYEN"
                ? "Đang vận chuyển"
                : bill.statusBill === "DA_THANH_TOAN"
                ? "Đã thanh toán"
                : bill.statusBill === "KHONG_TRA_HANG"
                ? "Thành công"
                : bill.statusBill === "TRA_HANG"
                ? "Trả hàng"
                : "Đã hủy"}
            </div>
          </Col>
          <Col span={12} className="text">
            <div className="row">Loại: {bill.typeBill}</div>
          </Col>
          <Col span={12} className="text">
            <div className="row">Tổng tiền: {bill.totalMoney}</div>
          </Col>
        </Row>
        <div className="row">
          <Row>
            <Col span={12} className="text">
              <div className="row">Tên khách hàng: {bill.userName}</div>
            </Col>
            <Col span={12} className="text">
              <div className="row">Số điện thoại: {bill.phoneNumber}</div>
            </Col>
            <Col span={12} className="text">
              <div className="row">Địa chỉ: {bill.address}</div>
            </Col>
            <Col span={12} className="text">
              <div className="row">ghi chú: {bill.note}</div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="row mt-4">
        <Table
          dataSource={detailProductInBill}
          columns={columns}
          rowKey="id"
          pagination={false} // Disable default pagination
          className="product-table"
        />
      </div>
    </div>
  );
}

export default DetailBill;
