import React, { useEffect } from 'react'
import SidebarProject from '../../../components/sidebar/SidebarProject'
import Navbar from "./../../../components/navbar/Navbar";
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Paper from "@mui/material/Paper";
import BillService from '../../../service/BillService';
import moment from 'moment';

function Bill() {

  const dataSource = useSelector((state) => state.bills.sizes.value);
  console.log(dataSource);
  const dispatch = useDispatch();
    useEffect(() => {
      BillService.getAll(dispatch);
    }, [])

    const columns = [
      {
        title: <div className="title-product">Mã</div>,
        dataIndex: "code",
        key: "code",
      },
      {
        title: <div className="title-product">Ngày tạo</div>,
        dataIndex: "createdDate",
        key: "createdDate",
        render: (text) => {
          const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
          return formattedDate;
        },
        
      },
      {
        title: <div className="title-product">Khách hàng</div>,
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: <div className="title-product">Nhân viên</div>,
        dataIndex: "nameEmployees",
        key: "nameEmployees",
      },
   
      {
        title: <div className="title-product">Hình thức</div>,
        dataIndex: "type",
        key: "type",
        render: (text) => {
          const genderClass =
            text === 0 ? "Online" : "Tại Quầy";
          return (
            genderClass
          );
        },
      },
      {
        title: <div className="title-product">Trạng Thái</div>,
        dataIndex: "statusBill",
        key: "statusBill",
        render: (text) => (
          <button className="trangThai" style={{border: "none", borderRadius: "0px"}}>
            {text === 0 ? "chờ xác nhận" : text === 1 ? "Chờ thanh toán" : "Hủy"}
          </button>
        ),
      },
      {
        title: <div className="title-product">Tiền giảm</div>,
        dataIndex: "itemDiscount",
        key: "itemDiscount",
      },
      {
        title: <div className="title-product">Tổng tiền</div>,
        dataIndex: "totalMoney",
        key: "totalMoney",
      },
      // {
      //   title: <div className="title-product">Thao Tác</div>,
      //   dataIndex: "id",
      //   key: "actions",
      //   render: (id) => (
      //     <Button onClick={() => handleButtonClick(id)}>Chi tiết</Button>
      //   ),
      // },
    ];

  return (
    <div className="home">
      {/* mới sửa */}
      <SidebarProject />
      <div className="homeContainer">
        <Navbar />

        <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={false} // Disable default pagination
        className="product-table"
      />

{/* 
        <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> Mã</TableCell>
            <TableCell className="tableCell">Ngày tạo</TableCell>
            <TableCell className="tableCell">Khách hàng</TableCell>
            <TableCell className="tableCell">Nhân viên</TableCell>
            <TableCell className="tableCell">Hình thức</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
            <TableCell className="tableCell">Tiền giảm</TableCell>
            <TableCell className="tableCell">Tổng tiền </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.code}</TableCell>
              <TableCell className="tableCell">
              {row.createdDate }
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}

      </div>
    </div>
  )
}

export default Bill