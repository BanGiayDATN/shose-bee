import {
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Table, Select, Space, Row, Col, Tabs, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import {
  getAllBill,
  getEmployees,
  getUsers,
} from "../../../app/reducer/Bill.reducer";
import "./style-bill.css";
import { useRef } from "react";
import { AccountApi } from "../../../api/employee/account/account.api";
import FormSearch from "./FormSearch";
import { Link } from "react-router-dom";
import { AddressApi } from "../../../api/employee/address/address.api";
import TabBills from "./TabBills";

function BillManagement() {
  var listBill = useSelector((state) => state.bill.bills.value);

  var users = useSelector((state) => state.bill.search.users);
  var employees = useSelector((state) => state.bill.search.employees);
  var [status, setStatus] = useState([]);

  const dispatch = useAppDispatch();
  const { Option } = Select;

  useEffect(() => {
    BillApi.fetchAll(fillter).then((res) => {
      dispatch(getAllBill(res.data.data));
    });

  }, []);

  const onChangeFillter = (value, fileName) => {
    setFillter({ ...fillter, [fileName]: value });
  };

  const onChangeStatusBillInFillter = (value) => {
    setStatus(value);
  };

  const handleSubmitSearch = (e) => {
    var data = fillter;
    data.status = status;
    setFillter(data);
    BillApi.fetchAll(fillter).then((res) => {
      dispatch(getAllBill(res.data.data));
    });
  };

  const handleSelectChange = async (value, fileName) => {
    // setFillter({ ...fillter, [fileName]: value });
    var data = fillter;
    data.status = status;
    data.type = value;
    setFillter(data);
    await BillApi.fetchAll(fillter).then((res) => {
      dispatch(getAllBill(res.data.data));
    });
  };
  const handleSelectMultipleChange = (value) => {
    var arr = Object.keys(value).map(function (key) {
      return value[key];
    });
    setStatus(arr);
    var data = fillter;
    data.status = status;
    setFillter(data);
    BillApi.fetchAll(fillter).then((res) => {
      dispatch(getAllBill(res.data.data));
    });
  };

  const clearFillter = (e) => {
    setFillter({
      startTimeString: "",
      endTimeString: "",
      status: [],
      endDeliveryDateString: "",
      startDeliveryDateString: "",
      key: "",
      employees: "",
      user: "",
      phoneNumber: "",
      type: "",
      page: 0,
    });
    setStatus([]);
    BillApi.fetchAll(fillter).then((res) => {
      console.log(res.data.data);
      dispatch(getAllBill(res.data.data));
    });
  };

  const [fillter, setFillter] = useState({
    startTimeString: "",
    endTimeString: "",
    status: [],
    endDeliveryDateString: "",
    startDeliveryDateString: "",
    key: "",
    employees: "",
    user: "",
    phoneNumber: "",
    type: "",
    page: 0,
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName - b.userName,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "nameEmployees",
      key: "nameEmployees",
      sorter: (a, b) => a.nameEmployees - b.nameEmployees,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return <p>{type === "ONLINE" ? "OnLine" : "Tại quầy"}</p>;
      },
    },
    {
      title: <div className="title-product">Ngày tạo</div>,
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => a.createdDate - b.createdDate,
      render: (text) => {
        const formattedDate = moment(text).format("HH:mm:ss DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-product">Tiền giảm</div>,
      dataIndex: "itemDiscount",
      key: "itemDiscount",
      render: (itemDiscount) => (
        <span>
          {itemDiscount >= 1000
            ? itemDiscount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : itemDiscount + " đ"}
        </span>
      ),
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
            : totalMoney + " đ"}
        </span>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "statusBill",
      key: "statusBill",
      render: (text) => {
        return (
          <button
            className={`trangThai ${" status_" + text} `}
            style={{ border: "none", borderRadius: "22px" }}
          >
            {text === "TAO_HOA_DON"
              ? "Hóa đơn chờ"
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
          </button>
        );
      },
    },
    {
      title: <div className="title-product">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <Tooltip placement="top" title={"Chi tiết"}>
        <Button style={{ backgroundColor: "#FF9900" }} title="Chi tiết hóa đơn">
          <Link to={`/bill-management/detail-bill/${id}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </Button>
        </Tooltip>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };


  const listtab = [
    "",
    "CHO_XAC_NHAN", 
    "CHO_VAN_CHUYEN",
    "VAN_CHUYEN",
    "DA_THANH_TOAN",
    "KHONG_TRA_HANG",
    "DA_HUY"
   
  ]

  const convertString = (key) => {
    return  key === ""
    ? "Tất cả"
    : key === "CHO_XAC_NHAN"
    ? "Chờ xác nhận"
    : key === "CHO_VAN_CHUYEN"
    ? "Chờ vận chuyển"
    : key === "VAN_CHUYEN"
    ? "Vận chuyển"
     : key === "DA_THANH_TOAN"
    ? "Thanh toán"
    : key === "KHONG_TRA_HANG"
    ? "Hoàn thành"
    : "Hủy"
  }
  return (
    <div>
      <div className="title_category">
        {" "}
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý Hóa đơn</span>
      </div>
      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="">
          <div className="">
            <FormSearch
              fillter={fillter}
              changFillter={onChangeFillter}
              users={users}
              employess={employees}
              onChangeStatusBillInFillter={onChangeStatusBillInFillter}
              status={status}
              handleSubmitSearch={handleSubmitSearch}
              clearFillter={clearFillter}
              handleSelectMultipleChange={handleSelectMultipleChange}
              handleSelectChange={handleSelectChange}
            />
          </div>
        </div>
        <div className="box_btn_filter">
        </div>
      </div>

      <div className="bill-table">
        <div
          className="title_bill"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách Hóa đơn
          </span>
          <div style={{ marginLeft: "auto" }}></div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Tabs
            onChange={onChange}
            type="card"
            items={listtab.map((item) => {
              return {
                label: convertString(item),
                key: item,
                children: <TabBills statusBill={item} dataFillter={fillter}/>,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default BillManagement;
