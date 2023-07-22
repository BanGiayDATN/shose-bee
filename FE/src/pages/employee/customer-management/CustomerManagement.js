import React, { useEffect, useState } from "react";
import { Input, Button, Select, Table, Slider } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./style-account.css";
import { CustomerApi } from "../../../api/employee/account/customer.api";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { Link } from "react-router-dom";
import {
  GetCustomer,
  SetCustomer,
} from "../../../app/reducer/Customer.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
const { Option } = Select;

const CustomerManagement = () => {
  const [initialCustomerList, setInitialCustomerList] = useState([]);
  const [listaccount, setListaccount] = useState([]);
  const [initialStartDate, setInitialStartDate] = useState(null);
  const [initialEndDate, setInitialEndDate] = useState(null);
  const dispatch = useAppDispatch();
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [searchCustomer, setSearchCustomer] = useState({
    keyword: "",
    status: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Lấy mảng redux ra
  const data = useAppSelector(GetCustomer);
  useEffect(() => {
    if (data != null) {
      setListaccount(data);
    }
  }, [data]);

  // Search customer
  const handleInputChangeSearch = (name, value) => {
    setSearchCustomer((prevSearchCustomer) => ({
      ...prevSearchCustomer,
      [name]: value,
    }));
  };

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    handleInputChangeSearch("keyword", value);
  };

  const handleStatusChange = (value) => {
    handleInputChangeSearch("status", value);
  };
  const handleAgeRangeChange = (value) => {
    setAgeRange(value);
  };
  useEffect(() => {
    const { keyword, status } = searchCustomer;
    CustomerApi.fetchAll({ status }).then((res) => {
      const filteredCustomers = res.data.data.filter(
        (customer) =>
          customer.fullName.includes(keyword) ||
          customer.email.includes(keyword) ||
          customer.phoneNumber.includes(keyword)
      );
      setListaccount(filteredCustomers);
      dispatch(SetCustomer(filteredCustomers));
    });
  }, [searchCustomer.status]);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    const { keyword, status } = searchCustomer;

    CustomerApi.fetchAll({ status }).then((res) => {
      const filteredCustomers = res.data.data
        .filter(
          (customer) =>
            customer.fullName.toLowerCase().includes(keyword) ||
            customer.email.includes(keyword) ||
            customer.phoneNumber.includes(keyword)
        )
        .map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));
      setListaccount(filteredCustomers);
      dispatch(SetCustomer(filteredCustomers));
    });
  };

  // Lọc danh sách theo khoảng ngày sinh
  const filterByDateOfBirthRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setListaccount(initialCustomerList);
      dispatch(SetCustomer(initialCustomerList));
      return;
    }

    const filteredCustomers = initialCustomerList.filter((customer) => {
      const accountDateOfBirth = moment(customer.dateOfBirth).startOf("day");
      const start = moment(startDate).startOf("day");
      const end = moment(endDate).endOf("day");
      return accountDateOfBirth.isBetween(start, end, null, "[]");
    });

    setListaccount(filteredCustomers);
    dispatch(SetCustomer(filteredCustomers));
  };
  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setStartDate(startDate);
    filterByDateOfBirthRange(startDate, endDate);
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    setEndDate(endDate);
    filterByDateOfBirthRange(startDate, endDate);
  };

  const handleClear = () => {
    setSearchCustomer({
      keyword: "",
      status: "",
    });
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    filterByDateOfBirthRange(initialStartDate, initialEndDate);
    setListaccount(
      initialCustomerList.map((customer, index) => ({
        ...customer,
        stt: index + 1,
      }))
    );
    loadData();
  };
  const filterByAgeRange = (minAge, maxAge) => {
    if (minAge === 0 && maxAge === 100) {
      setListaccount(initialCustomerList);
      dispatch(SetCustomer(initialCustomerList));
    } else {
      const filteredAccounts = initialCustomerList.filter((customer) => {
        const age = moment().diff(customer.dateOfBirth, "years");
        return age >= minAge && age <= maxAge;
      });

      setListaccount(filteredAccounts);
      dispatch(SetCustomer(filteredAccounts));
    }
  };
  const loadData = () => {
    CustomerApi.fetchAll().then(
      (res) => {
        const accounts = res.data.data.map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));
        setListaccount(res.data.data);
        setInitialCustomerList(accounts);
        setInitialStartDate(null);
        setInitialEndDate(null);
        dispatch(SetCustomer(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // Xử lý logic chỉnh sửa
  const [idUpdate, setIdUpdate] = useState("");
  const [idDetail, setIdDetail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleDetail, setModalVisibleDetail] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
    setModalVisibleUpdate(false);
    setModalVisibleDetail(false);
  };

  const handleViewDetail = (id) => {
    setIdDetail(id);
    setModalVisibleDetail(true);
  };

  const handleUpdate = (id) => {
    setIdUpdate(id);
    setModalVisibleUpdate(true);
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    filterByAgeRange(ageRange[0], ageRange[1]);
  }, [ageRange, initialCustomerList]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "SDT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: (a, b) => a.dateOfBirth - b.dateOfBirth,
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Điểm",
      dataIndex: "points",
      key: "points",
      sorter: (a, b) => a.points.localeCompare(b.points),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Kích hoạt " : "Ngừng kích hoạt"}
          </button>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/detail-customer-management/${record.id}`}>
            <Button
              type="primary"
              title="Chi tiết khách hàng"
              style={{ backgroundColor: "#FF9900" }}
              onClick={() => handleViewDetail(record.id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Link>
          <Link to={`/update-customer-management/${record.id}`}>
            <Button
              type="primary"
              title="Chỉnh sửa khách hàng"
              style={{ backgroundColor: "green", borderColor: "green" }}
              onClick={() => handleUpdate(record.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="title_account">
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý tài khoản khách hàng</span>
      </div>
      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="content_ac">
          <div className="content-wrapper-ac">
            <div>
              <Input
                style={{
                  marginBottom: "20px",
                  marginLeft: "18%",
                  width: "300px",
                  display: "flex",
                }}
                placeholder="Tìm kiếm"
                type="text"
                name="keyword"
                value={searchCustomer.keyword}
                onChange={handleKeywordChange}
              />
              <label>Trạng thái:</label>
              <Select
                style={{
                  marginLeft: "5px",
                  width: "300px",
                }}
                name="status"
                value={searchCustomer.status}
                onChange={handleStatusChange}
              >
                <Option value="">Tất cả</Option>
                <Option value="DANG_SU_DUNG">Kích hoạt</Option>
                <Option value="KHONG_SU_DUNG">Ngừng kích hoạt</Option>
              </Select>
            </div>
            <div>
              <div className="date-range">
                <label className="date-label">Ngày sinh:</label>
                <Input
                  style={{ width: "200px" }}
                  type="date"
                  value={startDate || initialStartDate}
                  onChange={handleStartDateChange}
                />
                <Input
                  style={{ width: "200px" }}
                  type="date"
                  value={endDate || initialEndDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <div className="age">
                <label>Khoảng tuổi:</label>
                <Slider
                  style={{ width: "400px" }}
                  range
                  min={0}
                  max={100}
                  defaultValue={ageRange}
                  value={ageRange}
                  onChange={handleAgeRangeChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="box_btn_filter">
            <Button
              className="btn_filter"
              type="submit"
              onClick={handleSubmitSearch}
            >
              Tìm kiếm
            </Button>
            <Button className="btn_clear" onClick={handleClear}>
              Làm mới bộ lọc
            </Button>
          </div>
        </div>
      </div>
      <div className="account-table">
        <div
          className="title_account"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách khách hàng
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Link to="/create-customer-management">
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => setModalVisible(true)}
              >
                Thêm
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table
            dataSource={listaccount}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 3 }}
            className="customer-table"
          />
        </div>
      </div>
    </>
  );
};
export default CustomerManagement;
