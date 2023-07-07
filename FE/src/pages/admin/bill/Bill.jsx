import React, { useEffect, useState } from 'react'
import SidebarProject from '../../../components/sidebar/SidebarProject'
import Navbar from "./../../../components/navbar/Navbar";
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Paper from "@mui/material/Paper";
import BillService from '../../../service/BillService';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import Search from './Search';
import { Offcanvas } from 'react-bootstrap';
import './bill.scss'
import { deletebillWait } from '../../../redux/billSlice';
import { Link } from 'react-router-dom';
// import { addBills, addBill, addAll, deletebillWait } from "./redux/billSlice";

function Bill() {

  const dataSource = useSelector((state) => state.bill.bills.value);
  var dataUse = BillService.getAllUser();
  var dataEmployees =[];
  const currentPage = useSelector((state) => state.bill.bills.currentPage);
  const totalPage = useSelector((state) => state.bill.bills.totalPage);
  const dispatch = useDispatch();
  useEffect(() => {
    BillService.getAll(dispatch, fillter);
    dataUse = BillService.getAllUser();
    dataEmployees = BillService.getAllEmployees(dispatch);
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeForm = event => {
    setFillter({ ...fillter, [event.target.name]: event.target.value })
  }

  const changeStatusValue = (item) => {
    const checkbox = fillter
    checkbox.status = item 
   setFillter(checkbox)
  }

  // begin trạng thái
  const toggleHandler = (e, item) => {

    if (e.target.checked) {
      console.log(item);
      var dataChecks = fillter.status
      // dataChecks.push(item)

      console.log(dataChecks);
      // var datas = peopleInfo.sizes;
      // datas.push(item)
      setFillter(dataChecks);
    } else {
      // remove from list
      if (typeof peopleInfo === 'object' && fillter.status !== null) {
        var index = fillter.status((people) => people.id !== item.id)
        var datas = fillter.status;

        datas.splice(index, 1)
        setFillter(
          datas
        );
      }
    }

  };
  // end trạng thái 


  const [fillter, setFillter] = useState({
    startTime: '',
    endTime: '',
    status: [],
    endDeliveryDate: '',
    startDeliveryDate: '',
    code: '',
    employees: '',
    user: '',
    phoneNumber: '',
    type: -1,
    page: 0

  })

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
        <button className={`trangThai ${" status"+text} ` } style={{ border: "none", borderRadius: "0px" }}>
          {text === 0 ? "Tạo Hóa đơn" : (text === 1 ? "Chờ xác nhận" : (text === 2 ? "Đang vận chuyển" : (text === 3 ? "Đã thanh toán" : (text === 4 ? "Trả hàng" :(text === 5 ? "Thành công" : "Đã hủy")))))}
        </button>
      ),
    },
    {
      title: <div className="title-product">Tiền giảm</div>,
      dataIndex: "itemDiscount",
      key: "itemDiscount",
      render: (itemDiscount) => (
        <span>
          {itemDiscount}
          {/* {itemDiscount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })} */}
        </span>
      ),
    },
    {
      title: <div className="title-product">Tổng tiền</div>,
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney) => (
        <span>
          {totalMoney}
          {/* {totalMoney.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })} */}
        </span>
      ),
    },
    {
      title: <div className="title-product">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <Button ><Link to={`/bill/${id}`}>Chi tiết</Link></Button>
      ),
    },
  ];

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    var data = fillter
    data.page = selectedPage
      BillService.getAll(dispatch, data);
  };

  const searchBill = () => {
    console.log(fillter);
    BillService.getAll(dispatch, fillter);
    setShow(false)
  }

  const clearnFillter = () => {
    setFillter({
      startTime: '',
      endTime: '',
      status: [],
      endDeliveryDate: '',
      startDeliveryDate: '',
      code: '',
      employees: '',
      user: '',
      phoneNumber: '',
      type: -1,
      page: 0
  
    })
    BillService.getAll(dispatch, fillter);
  }

  return (
    <div className="home">
      {/* mới sửa */}
      <SidebarProject />
      <div className="homeContainer ">
        <Navbar />
        <Button variant="primary" onClick={handleShow} > <Link to='/sale'>Bán Tại Quầy</Link> </Button>
        <Button variant="primary" onClick={handleShow} > Lọc </Button>
        <Button variant="primary" onClick={clearnFillter} > Xóa bộ lọc </Button>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          pagination={false} // Disable default pagination
          className="product-table"
        />
        
         { totalPage >= 1 ?  <div className="pagination-container"><ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            pageCount={totalPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          /></div> : <div></div>}
        
        <Offcanvas show={show} onHide={handleClose} placement={'end'} >
          <div className="row">
            <Search style={{ height: '90%' }}  changeStatusValue={changeStatusValue} searchBill={searchBill} fillter={fillter} changFillter={onChangeForm} />
          </div>
          <div className="row">
            <div className='col-7'></div>
            <button style={{marginLeft: '10px', height: "35px"}} className='btn btn-primary col-4' onClick={searchBill}>Tìm kiếm </button>
          </div>

        </Offcanvas>
      </div>
    </div>
  )
}

export default Bill