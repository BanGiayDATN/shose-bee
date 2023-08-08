import React, { useEffect, useState } from "react";
import { Button, Table, Space, Spin, Col, Slider, Select, Input } from "antd";
import "./style-product.css";
import { useAppDispatch } from "../../../app/hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import ModalDetailProductManagment from "./ModalDetailProductManagment";
import { ProductApi } from "../../../api/employee/product/product.api";
import { Option } from "antd/es/mentions";

const ProductManagement = () => {
  const [listProduct, setListProduct] = useState([]);
  const dispatch = useAppDispatch();
  const [modaleDetail, setModalDetail] = useState(false);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    console.log(selectedValues);
    ProducDetailtApi.fetchAll(selectedValues).then((res) => {
      setListProduct(res.data.data);
    });
  };

  // Xử lý làm mới bộ lọc
  const handleClear = () => {
    console.log(selectedValues);
    setSelectedValues({
      keyword: "",
      status: "",
      minQuantity: 0,
      maxQuantity: 500000,
    });
    ProducDetailtApi.fetchAll(selectedValues).then((res) => {
      setListProduct(res.data.data);
    });
  };

  const [selectedValues, setSelectedValues] = useState({
    keyword: "",
    status: "",
    minQuantity: 0,
    maxQuantity: 500000,
  });

  const handleSelectChange = (value, fieldName) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleChangeValueQuantity = (value) => {
    const [minQuantity, maxQuantity] = value;

    setSelectedValues((prevValues) => ({
      ...prevValues,
      minQuantity: minQuantity,
      maxQuantity: maxQuantity,
    }));
  };

  const handleInputChangeSearch = (name, value) => {
    setSelectedValues((prevSearchCategory) => ({
      ...prevSearchCategory,
      [name]: value,
    }));
  };
  const handleKeywordChange = (event) => {
    const { value } = event.target;
    handleInputChangeSearch("keyword", value);
  };

  const loadData = () => {
    console.log(selectedValues);
    ProductApi.fetchAll(selectedValues).then(
      (res) => {
        console.log(res);
        setListProduct(res.data.data);
        setIsSubmitted(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // Xử lý logic chỉnh sửa
  const handleCancel = () => {
    setModalDetail(false);
  };
  const [productDetailId, setProductDetaiId] = useState(null);
  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    // navigate(`/detail-product-management/${id}`);
    setModalDetail(true);
    setProductDetaiId(id);
  };
  const handleUpdate = (id) => {
    navigate(`/product-detail-management/${id}`);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(true);
    loadData();
  }, [selectedValues]);

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã Sản Phẩm",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Số Lượng Tồn ",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      sorter: (a, b) => a.totalQuantity - b.totalQuantity,
      align: "center",
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
            {text === "DANG_SU_DUNG" ? "Đang kinh doanh " : "Không kinh doanh"}
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
            title="Chi tiết sản phẩm"
            style={{ backgroundColor: "#FF9900" }}
            onClick={() => handleViewDetail(record.id)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            type="primary"
            title="Chỉnh sửa sản phẩm"
            style={{ backgroundColor: "#0099FF", borderColor: "#0099FF" }}
            onClick={() => handleUpdate(record.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <ModalDetailProductManagment
            visible={modaleDetail}
            onCancel={handleCancel}
            id={productDetailId}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="title_sole">
        {isSubmitted && (
          <Space
            direction="vertical"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              zIndex: 999999999,
            }}
          >
            <Space>
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </Space>
          </Space>
        )}{" "}
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý sản phẩm</span>
      </div>

      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="content">
          <div className="content-wrapper">
            <div className="content-left">
              Tìm kiếm :{" "}
              <Input
                placeholder="Tìm kiếm"
                type="text"
                style={{ width: "50%", marginLeft: "10px", height: "40px" }}
                name="keyword"
                value={selectedValues.keyword}
                onChange={handleKeywordChange}
              />
            </div>
            <div className="content-right">
              Trạng thái:{" "}
              <Select
                style={{ width: "50%", marginLeft: "10px" }}
                name="status"
                onChange={(value) => handleSelectChange(value, "status")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                <Option value="DANG_SU_DUNG">Đang sử dụng</Option>
                <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
              </Select>
            </div>
            <div className="content-right">
              <Col span={7} style={{ textAlign: "right", paddingRight: 30 }}>
                <label>Số lượng tồn :</label>
              </Col>
              <Col span={9}>
                <Slider
                  range={{
                    draggableTrack: true,
                  }}
                  defaultValue={[
                    selectedValues.minPrice,
                    selectedValues.maxPrice,
                  ]}
                  min={0}
                  max={30000000}
                  onChange={handleChangeValueQuantity}
                />
              </Col>
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

      <div className="product-table">
        <div
          className="title_product"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách sản phẩm
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Link to="/create-product-management">
              <Button
                type="primary"
                icon={<FontAwesomeIcon icon={faPlus} />}
                style={{ height: 40 }}
                title="Tạo sản phẩm chi tiết"
              >
                Tạo sản phẩm
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table
            dataSource={listProduct}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 5 }}
            className="product-table"
            rowClassName={getRowClassName}
          />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
