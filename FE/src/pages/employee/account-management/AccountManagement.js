import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, Modal, Popconfirm } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style-account.css";
import { AccountApi } from "../../../api/employee/account/account.api";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  CreateAccount,
  GetAccount,
  SetAccount,
  UpdateAccount,
} from "../../../app/reducer/Account.reducer";
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
import ModalUpdateAccount from "./modal/ModalUpdateAccount";
import ModalDetailAccount from "./modal/ModalDetailAccount";
import ModalCreateAccount from "./modal/ModalCreateAccount";
const { Option } = Select;

const AccountManagement = () => {
  const [initialAccountList, setInitialAccountList] = useState([]);
  const [listaccount, setListaccount] = useState([]);
  const [initialStartDate, setInitialStartDate] = useState(null);
  const [initialEndDate, setInitialEndDate] = useState(null);
  const dispatch = useAppDispatch();
  const [searchAccount, setSearchAccount] = useState({
    keyword: "",
    status: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Lấy mảng redux ra
  const data = useAppSelector(GetAccount);
  useEffect(() => {
    if (data != null) {
      setListaccount(data);
    }
  }, [data]);

  // Search account
  const handleInputChangeSearch = (name, value) => {
    setSearchAccount((prevSearchAccount) => ({
      ...prevSearchAccount,
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

  useEffect(() => {
    const { keyword, status } = searchAccount;
    AccountApi.fetchAll({ status }).then((res) => {
      const filteredAccounts = res.data.data.filter(
        (account) =>
          account.fullName.includes(keyword) ||
          account.email.includes(keyword) ||
          account.phoneNumber.includes(keyword)
      );
      setListaccount(filteredAccounts);
      dispatch(SetAccount(filteredAccounts));
    });
  }, [searchAccount.status]);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    const { keyword, status } = searchAccount;

    AccountApi.fetchAll({ status }).then((res) => {
      const filteredAccounts = res.data.data
        .filter(
          (account) =>
            account.fullName.toLowerCase().includes(keyword) ||
            account.email.includes(keyword) ||
            account.phoneNumber.includes(keyword)
        )
        .map((account, index) => ({
          ...account,
          stt: index + 1,
        }));
      setListaccount(filteredAccounts);
      dispatch(SetAccount(filteredAccounts));
    });
  };

  // Lọc danh sách theo khoảng ngày sinh
  const filterByDateOfBirthRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      setListaccount(initialAccountList);
      dispatch(SetAccount(initialAccountList));
      return;
    }

    const filteredAccounts = initialAccountList.filter((account) => {
      const accountDateOfBirth = moment(account.dateOfBirth).startOf("day");
      const start = moment(startDate).startOf("day");
      const end = moment(endDate).endOf("day");
      return accountDateOfBirth.isBetween(start, end, null, "[]");
    });

    setListaccount(filteredAccounts);
    dispatch(SetAccount(filteredAccounts));
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
    setSearchAccount({
      keyword: "",
      status: "",
    });
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    filterByDateOfBirthRange(initialStartDate, initialEndDate);
    setListaccount(
      initialAccountList.map((account, index) => ({
        ...account,
        stt: index + 1,
      }))
    );
    loadData();
  };

  const loadData = () => {
    AccountApi.fetchAll().then(
      (res) => {
        const accounts = res.data.data.map((account, index) => ({
          ...account,
          stt: index + 1,
        }));
        setListaccount(res.data.data);
        setInitialAccountList(accounts);
        setInitialStartDate(null);
        setInitialEndDate(null);
        dispatch(SetAccount(res.data.data));
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

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên nhân viên",
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
          <Button
            type="primary"
            title="Chi tiết nhân viên"
            style={{ backgroundColor: "#FF9900" }}
            onClick={() => handleViewDetail(record.id)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            type="primary"
            title="Chỉnh sửa thể loại"
            style={{ backgroundColor: "green", borderColor: "green" }}
            onClick={() => handleUpdate(record.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="title_account">
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý tài khoản nhân viên</span>
      </div>
      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="content">
          <div className="content-wrapper">
            <div>
              <Input
                placeholder="Tìm kiếm"
                type="text"
                style={{ width: "200px", marginRight: "8px" }}
                name="keyword"
                value={searchAccount.keyword}
                onChange={handleKeywordChange}
              />
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

            <div>
              <label style={{ marginRight: "10px", justifyContent: "center" }}>
                Từ ngày
              </label>
              <Input
                type="date"
                style={{ width: "200px", marginRight: "10px" }}
                value={startDate || initialStartDate}
                onChange={handleStartDateChange}
              />
              <label style={{ marginRight: "10px" }}>Đến ngày</label>
              <Input
                type="date"
                style={{ width: "200px" }}
                value={endDate || initialEndDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
        </div>
        <div>
          Trạng thái:{" "}
          <Select
            style={{ width: "200px", marginLeft: "10px" }}
            name="status"
            value={searchAccount.status}
            onChange={handleStatusChange}
          >
            <Option value="">Tất cả</Option>
            <Option value="DANG_SU_DUNG">Kích hoạt</Option>
            <Option value="KHONG_SU_DUNG">Ngừng kích hoạt</Option>
          </Select>
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
            Danh sách nhân viên
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => setModalVisible(true)}
            >
              Thêm
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table
            dataSource={listaccount}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 3 }}
            className="account-table"
          />
        </div>
        <ModalCreateAccount visible={modalVisible} onCancel={handleCancel} />
        <ModalUpdateAccount
          visible={modalVisibleUpdate}
          id={idUpdate}
          onCancel={handleCancel}
        />
        <ModalDetailAccount
          visible={modalVisibleDetail}
          id={idDetail}
          onCancel={handleCancel}
        />
        <ToastContainer />
      </div>
    </>
  );
};
export default AccountManagement;
