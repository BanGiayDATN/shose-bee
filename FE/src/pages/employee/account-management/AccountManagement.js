import React, { useEffect, useState } from "react";
import { Input, Button, Select, Table, Slider, Image } from "antd";
import "react-toastify/dist/ReactToastify.css";
import "./style-account.css";
import { AccountApi } from "../../../api/employee/account/account.api";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetAccount, SetAccount } from "../../../app/reducer/Account.reducer";
import { Link } from "react-router-dom";
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

const AccountManagement = () => {
  const [initialAccountList, setInitialAccountList] = useState([]);
  const [listaccount, setListaccount] = useState([]);
  const [initialStartDate, setInitialStartDate] = useState(null);
  const [initialEndDate, setInitialEndDate] = useState(null);
  const dispatch = useAppDispatch();
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [searchAccount, setSearchAccount] = useState({
    keyword: "",
    status: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [imageData, setImageData] = useState(null);

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
  const filterByAgeRange = (minAge, maxAge) => {
    if (minAge === 0 && maxAge === 100) {
      setListaccount(initialAccountList);
      dispatch(SetAccount(initialAccountList));
    } else {
      const filteredAccounts = initialAccountList.filter((account) => {
        const age = moment().diff(account.dateOfBirth, "years");
        return age >= minAge && age <= maxAge;
      });

      setListaccount(filteredAccounts);
      dispatch(SetAccount(filteredAccounts));
    }
  };
  const handleClear = () => {
    setSearchAccount({
      keyword: "",
      status: "",
    });
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    filterByDateOfBirthRange(initialStartDate, initialEndDate);
    // filterByAgeRange()
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

  const handleAgeRangeChange = (value) => {
    setAgeRange(value);
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    filterByAgeRange(ageRange[0], ageRange[1]);
  }, [ageRange, initialAccountList]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const fileExists = fileList.find((f) => f.uid === file.uid);

    // If the file doesn't exist, add it to the fileList with isStarred property initialized to false
    if (!fileExists) {
      const newFile = { ...file, isStarred: false };
      setFileList([...fileList, newFile]);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  useEffect(() => {
    // Gọi API để lấy dữ liệu ảnh từ backend
    fetch("http://localhost:8080/admin/employee")
      .then((response) => response.json())
      .then((data) => {
        // Kiểm tra nếu data là một mảng trước khi sử dụng map
        if (Array.isArray(data)) {
          // Trích xuất URL của ảnh từ dữ liệu nhân viên (giả sử URL ảnh lưu trong trường "avata" của mỗi nhân viên)
          const imageURLs = data.map((employee) => employee.avata);

          // Set state với mảng URL ảnh
          setImageData(imageURLs);
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh",
      dataIndex: "avata",
      key: "avata",
      render: (text) => (
        <img src={text} alt="Ảnh sản phẩm" style={{ width: "60px" }} />
      ),
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
          <Link to={`/detail-staff-management/${record.id}`}>
            <Button
              type="primary"
              title="Chi tiết nhân viên"
              style={{ backgroundColor: "#FF9900" }}
              onClick={() => handleViewDetail(record.id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Link>
          <Link to={`/update-staff-management/${record.id}`}>
            <Button
              type="primary"
              title="Chỉnh sửa nhân viên"
              style={{ backgroundColor: "green", borderColor: "green" }}
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
        <span style={{ marginLeft: "10px" }}>Quản lý tài khoản nhân viên</span>
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
                value={searchAccount.keyword}
                onChange={handleKeywordChange}
              />
              <label>Trạng thái:</label>
              <Select
                style={{
                  marginLeft: "5px",
                  width: "300px",
                }}
                name="status"
                value={searchAccount.status}
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
            Danh sách nhân viên
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Link to="/create-staff-management">
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
            className="account-table"
          />
        </div>
      </div>
    </>
  );
};
export default AccountManagement;
