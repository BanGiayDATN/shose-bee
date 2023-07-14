import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, Modal, Popconfirm } from "antd";
import "./style-material.css";
import { useAppDispatch, useAppSelector } from "../../../app/hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faFilter,
  faListAlt,
  faMattressPillow,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import {
  CreateMaterail,
  GetMaterail,
  SetMaterial,
  UpdateMaterail,
} from "../../../app/reducer/Materail.reducer";
import { MaterialApi } from "../../../api/employee/material/Material.api";

const { Option } = Select;

const MaterialManagement = () => {
  const [listMaterail, setListMaterail] = useState([]);
  const dispatch = useAppDispatch();
  const [searchMaterail, setSearchMaterail] = useState({
    keyword: "",
    status: "",
  });

  const [materailId, setMaterailId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    status: " Vui lòng chọn trạng thái ",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdadte, setModalVisibleUpdate] = useState(false);

  // lấy mảng redux ra
  const data = useAppSelector(GetMaterail);
  useEffect(() => {
    console.log(data);
    if (data != null) {
      setListMaterail(data);
    }
  }, [data]);

  // seach  sole
  const handleInputChangeSearch = (name, value) => {
    setSearchMaterail((prevSearchCategory) => ({
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
    MaterialApi.fetchAll({
      name: searchMaterail.keyword,
      status: searchMaterail.status,
    }).then((res) => {
      setListMaterail(res.data.data);
      dispatch(SetMaterial(res.data.data));
    });
  };

  // Xử lý làm mới bộ lọc
  const handleClear = () => {
    setSearchMaterail({
      keyword: "",
      status: "",
    });
  };

  const loadData = () => {
    MaterialApi.fetchAll().then(
      (res) => {
        setListMaterail(res.data.data);
        dispatch(SetMaterial(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // thêm category
  const handleAddMaterail = () => {
    MaterialApi.create(formData).then((res) => {
      dispatch(CreateMaterail(res.data.data));
    });

    // Đóng modal
    setFormData({ name: "", status: " Vui lòng chọn trạng thái " });
    setModalVisible(false);
  };

  // upadte sole
  const handleUpdateMaterail = () => {
    MaterialApi.update(materailId, formData).then((res) => {
      console.log(res);
      dispatch(UpdateMaterail(res.data.data));
    });
    // Đóng modal
    setFormData({ name: "", status: " Vui lòng chọn trạng thái " });
    setModalVisibleUpdate(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý logic chỉnh sửa
  const handleViewDetail = (id) => {
    console.log(id);
  };

  const handleUpdate = (id) => {
    setMaterailId(id);
    MaterialApi.getOne(id).then(
      (res) => {
        setFormData({
          name: res.data.data.name,
          status: res.data.data.status,
        });
      },
      (err) => console.log(err)
    );
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
      <div className="title_sole">
        {" "}
        <FontAwesomeIcon icon={faMattressPillow} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý Chất liệu</span>
      </div>
      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="content">
          <div className="content-wrapper">
            <div className="content-left">
              Tên chát liệu :{" "}
              <Input
                placeholder="Tìm kiếm"
                type="text"
                style={{ width: "50%", marginLeft: "10px" }}
                name="keyword"
                value={searchMaterail.keyword}
                onChange={handleKeywordChange}
              />
            </div>
            <div className="content-right">
              Trạng thái:{" "}
              <Select
                style={{ width: "40%", marginLeft: "10px" }}
                name="status"
                value={searchMaterail.status}
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

      <div className="sole-table">
        <div
          className="title_sole"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách chất liệu
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
            dataSource={listMaterail}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 3 }}
            className="category-table"
          />
        </div>
      </div>

      {/* modal thêm category */}
      <Modal
        key="add"
        title="Thêm thể loại"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Popconfirm
            title="Xóa việc cần làm"
            description="Bạn có chắc chắn muốn xóa việc cần làm này không ?"
            onConfirm={() => {
              handleAddMaterail();
            }}
            okText="Có"
            cancelText="Không"
          >
            <Button key="submit" type="primary">
              Thêm
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Tên thể loại" style={{ marginTop: "40px" }}>
            <Input
              placeholder="Tên thể loại"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Trạng thái">
            <Select
              placeholder="Trạng thái thể loại"
              name="status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
            >
              <Option value="DANG_SU_DUNG">Đang sử dụng</Option>
              <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* modal updatedCategory */}
      <Modal
        key="update"
        title="Update Thể Loại"
        visible={modalVisibleUpdadte}
        onCancel={() => setModalVisibleUpdate(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisibleUpdate(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpdateMaterail}>
            update
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Tên thể loại" style={{ marginTop: "40px" }}>
            <Input
              placeholder="Tên thể loại"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item label="Trạng thái">
            <Select
              placeholder="Trạng thái thể loại"
              name="status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
            >
              <Option value="DANG_SU_DUNG">Đang sử dụng</Option>
              <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MaterialManagement;
