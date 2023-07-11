import React, { useEffect } from 'react'
import SidebarProject from '../../../components/sidebar/SidebarProject'
import Navbar from "./../../../components/navbar/Navbar";
import TimeLine from './TimeLine';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import BillService from '../../../service/BillService';
import { Button, Modal, Table } from 'antd';
import moment from 'moment';
import { useState } from 'react';

var listStatus = [
  { id: 0, name: "Tạo hóa đơn" },
  { id: 1, name: "Chờ xác nhận" },
  { id: 2, name: "Vận chuyển" },
  { id: 3, name: "Đã thanh toán" },
  { id: 4, name: "Thành công" }
]

function DetailBill() {
  const { id } = useParams();
  const detailBill = useSelector((state) => state.bill.bill.billDetail);
  const billHistory = useSelector((state) => state.bill.bill.billHistory);
  const bill = useSelector((state) => state.bill.bill.value);
  const statusPresent = useSelector((state) => state.bill.bill.status);
  const dispatch = useDispatch();
  useEffect(() => {
    BillService.getBillDetail(dispatch, id);
    BillService.getBill(dispatch, id);
    BillService.getBillHistory(dispatch, id);
  }, [])


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Mã sản phẩm</div>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <div className="title-product">Tên Sản Phẩm</div>,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <div className="title-product">Kích thước</div>,
      dataIndex: "sizeName",
      key: "sizeName",
    },
    {
      title: <div className="title-product">Giá</div>,
      dataIndex: "price",
      key: "price",
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
        <span>{statusBill == "TAO_HOA_DON" ? "Tạo Hóa đơn" : (statusBill == "CHO_THANH_TOAN" ? "Chờ xác nhận" : (statusBill === "VAN_CHUYEN" ? "Đang vận chuyển" : (statusBill === "DA_THANH_TOAN" ? "Đã thanh toán" : (statusBill === "KHONG_TRA_HANG" ? "Thành công" : (statusBill === "TRA_HANG" ? "Trả hàng" : "Đã hủy")))))}</span>
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
    }
  ]

  return (
    <div className="home">
      {/* mới sửa */}
      <SidebarProject />
      <div className="homeContainer">
        <Navbar />

        <div className="row">
          <div className="row">
            <TimeLine listStatus={listStatus} data={billHistory} statusPresent={statusPresent} />
          </div>
          <div className="row mt-3">
            <div className="col-2">
              <Button type="Xác nhận" className='btn btn-primary'>
                {listStatus[statusPresent + 1].name}
              </Button>
            </div>
            <div className="col-2">
              <Button type="Hủy" className='btn btn-danger'>
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
              </Modal>
            </div>
          </div>

        </div>
        <div className="row mt-4">
          <h2 className="text-center"> Thông tin hóa đơn</h2>
          <div className="row">
            <div className="col-6">
              <div className="row">Mã: {bill.code}</div>
              <div className="row">Trạng thái:  {bill.statusBill == "TAO_HOA_DON" ? "Tạo Hóa đơn" : (bill.statusBill == "CHO_THANH_TOAN" ? "Chờ xác nhận" : (bill.statusBill === "VAN_CHUYEN" ? "Đang vận chuyển" : (bill.statusBill === "DA_THANH_TOAN" ? "Đã thanh toán" : (bill.statusBill === "KHONG_TRA_HANG" ? "Thành công" : (bill.statusBill === "TRA_HANG" ? "Trả hàng" : "Đã hủy")))))}</div>
              <div className="row">Loại: {bill.typeBill}</div>
              <div className="row">Tổng tiền: {bill.totalMoney}</div>
              <div className="row">ghi chú: {bill.note}</div>
            </div>
            <div className="col-6">
              <div className="row">Tên khách hàng: {bill.userName}</div>
              <div className="row">Số điện thoại: {bill.phoneNumber}</div>
              <div className="row">Địa chỉ: {bill.address}</div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <Table
            dataSource={detailBill}
            columns={columns}
            rowKey="id"
            pagination={false} // Disable default pagination
            className="product-table"
          />
        </div>
      </div>
    </div>
  )
}

export default DetailBill