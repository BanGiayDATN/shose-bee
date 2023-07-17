import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, Modal, Popconfirm } from "antd";
import "./style-category.css";
import { CategoryApi } from "../../../api/employee/category/category.api";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  CreateCategory,
  GetCategory,
  SetCategory,
  UpdateCategory,
} from "../../../app/reducer/Category.reducer";
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
import ModalCreateCategory from "./modal/ModalCreateCategory";
import ModalDetailCategory from "./modal/ModalDetailCategory";
import ModalUpdateCategory from "./modal/ModalUpdateCategory";

const { Option } = Select;

const CategoryManagement = () => {
  const [listCategory, setListcategory] = useState([]);
  const dispatch = useAppDispatch();
  const [searchCategory, setSearchCategory] = useState({
    keyword: "",
    status: "",
  });

<<<<<<< HEAD
=======
  const [categoryId, setCategoryId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    status: "Vui lòng chọn trạng thái ",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdadte, setModalVisibleUpdate] = useState(false);

>>>>>>> develop
  // lấy mảng redux ra
  const data = useAppSelector(GetCategory);
  useEffect(() => {
    if (data != null) {
      setListcategory(data);
    }
  }, [data]);

  // seach  category
  const handleInputChangeSearch = (name, value) => {
    setSearchCategory((prevSearchCategory) => ({
      ...prevSearchCategory,
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

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    CategoryApi.fetchAll({
      name: searchCategory.keyword,
      status: searchCategory.status,
    }).then((res) => {
      setListcategory(res.data.data);
      dispatch(SetCategory(res.data.data));
    });
  };

  // Xử lý làm mới bộ lọc
  const handleClear = () => {
    setSearchCategory({
      keyword: "",
      status: "",
    });
  };

  const loadData = () => {
    CategoryApi.fetchAll().then(
      (res) => {
        setListcategory(res.data.data);
        dispatch(SetCategory(res.data.data));
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

  // Xử lý logic chỉnh sửa
  const handleViewDetail = (id) => {
    setIdDetail(id);
    setModalVisibleDetail(true);
  };
  const handleUpdate = (id) => {
<<<<<<< HEAD
    setIdUpdate(id);
=======
    setCategoryId(id);
    CategoryApi.getOne(id).then(
      (res) => {
        
        setFormData({
          name: res.data.data.name,
          status: res.data.data.status,
        });
       
        console.log(res);
      },
      (err) => console.log(err)
    );
>>>>>>> develop
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
      title: "Tên Thể Loại",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      sorter: (a, b) => a.lastModifiedDate - b.lastModifiedDate,
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
            {text === "DANG_SU_DUNG" ? "Đang sử dụng " : "Không sử dụng"}
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
            title="Chi tiết thể loại"
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
      <div className="title_category">
        {" "}
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý thể loại</span>
      </div>
      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="content">
          <div className="content-wrapper">
            <div className="content-left">
              Tên thể loại :{" "}
              <Input
                placeholder="Tìm kiếm"
                type="text"
                style={{ width: "50%", marginLeft: "10px" }}
                name="keyword"
                value={searchCategory.keyword}
                onChange={handleKeywordChange}
              />
            </div>
            <div className="content-right">
              Trạng thái:{" "}
              <Select
                style={{ width: "40%", marginLeft: "10px" }}
                name="status"
                value={searchCategory.status}
                onChange={handleStatusChange}
              >
                <Option value="">Tất cả</Option>
                <Option value="DANG_SU_DUNG">Đang sử dụng</Option>
                <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
              </Select>
            </div>
          </div>
        </div>
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

      <div className="category-table">
        <div
          className="title_category"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách thể loại
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
            dataSource={listCategory}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 3 }}
            className="category-table"
          />
        </div>
        {/* modal thêm */}
        <ModalCreateCategory visible={modalVisible} onCancel={handleCancel} />
        {/* modal update */}
        <ModalUpdateCategory
          visible={modalVisibleUpdate}
          id={idUpdate}
          onCancel={handleCancel}
        />
        <ModalDetailCategory
          visible={modalVisibleDetail}
          id={idDetail}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default CategoryManagement;
