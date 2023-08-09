import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BillApi } from "../../../api/employee/bill/bill.api";

function TabBills({ statusBill, dataFillter }) {
  const [dataBill, setDataBill] = useState([]);
  const [dataIdCheck, setDataIdCheck] = useState([]);
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
      title: <div className="title-product">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <Button style={{ backgroundColor: "#FF9900" }} title="Chi tiết hóa đơn">
          <Link to={`/bill-management/detail-bill/${id}`}>
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </Button>
      ),
    },
  ];

  const [fillter, setFillter] = useState({
    startTimeString: dataFillter.startTimeString,
    endTimeString: dataFillter.endTimeString,
    status: [statusBill],
    endDeliveryDateString: dataFillter.endDeliveryDateString,
    startDeliveryDateString: dataFillter.startDeliveryDateString,
    key: dataFillter.key,
    employees: dataFillter.employees,
    user: dataFillter.user,
    phoneNumber: dataFillter.phoneNumber,
    type: dataFillter.type,
    page: 0,
  });

  useEffect(() => {
    BillApi.fetchAll(fillter).then((res) => {
      setDataBill(res.data.data);
    });
  }, []);

  useEffect(() => {
    BillApi.fetchAll(dataFillter).then((res) => {
      console.log(fillter);
      setDataBill(res.data.data);
    });
  }, [dataFillter]);

  return (
    <div style={{ width: "100%", marginTop: "0px" }}>
      <Table
        dataSource={dataBill}
        rowKey="id"
        style={{ width: "100%", marginTop: "0px" }}
        columns={columns}
        pagination={{ pageSize: 3 }}
        rowSelection={{
          type: "checkbox",
          onSelectRow: (keys) => {},
          onSelectAll: (checked) => {
            if (checked) {
              setDataIdCheck(dataBill.map((row) => row.id));
            } else {
              setDataIdCheck([]);
            }
          },
          onSelect: (checked, keys) => {
            if (checked) {
              setDataIdCheck(...dataIdCheck, keys.id);
            } else {
              var data = [...dataIdCheck];
              const index = data.indexOf(keys.id);
              if (index > -1) {
                data.splice(index, 1);
              }
              setDataIdCheck(data);
            }
          },
        }}
        className="bill-table"
      />
    </div>
  );
}

export default TabBills;
