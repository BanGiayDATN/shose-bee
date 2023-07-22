import React, { useEffect, useState } from "react";
import { Input, Button, Table, Col, Select, Row, Space, Spin } from "antd";
import "./style-product.css";
import { useAppDispatch, useAppSelector } from "../../../app/hook";

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
import { GetProduct, SetProduct } from "../../../app/reducer/Product.reducer";
import { Option } from "antd/es/mentions";
import { MaterialApi } from "../../../api/employee/material/Material.api";
import { SoleApi } from "../../../api/employee/sole/sole.api";
import { CategoryApi } from "../../../api/employee/category/category.api";
import { BrandApi } from "../../../api/employee/brand/Brand.api";
import { ColorApi } from "../../../api/employee/color/Color.api";
import tinycolor from "tinycolor2";
import { Link } from "react-router-dom";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";

const ProductManagement = () => {
  const [listProduct, setListProduct] = useState([]);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  // format tiền
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  // lấy mảng redux ra
  const data = useAppSelector(GetProduct);
  useEffect(() => {
    if (data != null) {
      setListProduct(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    ProducDetailtApi.fetchAll({
      product: search,
    }).then((res) => {
      setListProduct(res.data.data);
      dispatch(SetProduct(res.data.data));
    });
  };

  // Xử lý làm mới bộ lọc
  const handleClear = () => {
    setSearch("");
    ProducDetailtApi.fetchAll({
      product: "",
    }).then((res) => {
      setListProduct(res.data.data);
      dispatch(SetProduct(res.data.data));
    });
  };

  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  // const [listSize, setListSize] = useState([]);
  const [listSole, setListSole] = useState([]);

  const listSize = [];
  for (let size = 35; size <= 45; size++) {
    listSize.push(size);
  }

  const getColorName = (color) => {
    const colorObj = tinycolor(color);
    return colorObj.toName() || colorObj.toHexString();
  };

  const getList = () => {
    MaterialApi.fetchAll().then((res) => setListMaterial(res.data.data));
    CategoryApi.fetchAll().then((res) => setListCategory(res.data.data));
    SoleApi.fetchAll().then((res) => setListSole(res.data.data));
    BrandApi.fetchAll().then((res) => setListBrand(res.data.data));
    MaterialApi.fetchAll().then((res) => setListMaterial(res.data.data));
    ColorApi.getAllCode().then((res) => setListColor(res.data.data));
  };

  const [selectedValues, setSelectedValues] = useState({
    color: "",
    brand: "",
    material: "",
    product: "",
    sizeProduct: "",
    sole: "",
    category: "",
    gender: "",
    status: "",
  });

  const handleSelectChange = (value, fieldName) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const loadData = () => {
    ProducDetailtApi.fetchAll(selectedValues).then(
      (res) => {
        console.log(res);
        setListProduct(res.data.data);
        dispatch(SetProduct(res.data.data));
        setIsSubmitted(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // Xử lý logic chỉnh sửa
  const handleViewDetail = (id) => {};
  const handleUpdate = (id) => {};
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(true);
    getList();
    loadData();
  }, [selectedValues]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Ảnh sản phẩm"
          style={{ width: "130px", borderRadius: "20px", height: "130px" }}
        />
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
    },
    {
      title: "Giá ",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => formatCurrency(text),
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createDate",
      key: "createDate",
      sorter: (a, b) => a.createDate - b.createDate,
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <Button
          className={
            gender === "NAM"
              ? "primary-btn"
              : gender === "NU"
              ? "danger-btn"
              : "default-btn"
          }
        >
          {gender === "NAM" ? "Nam" : gender === "NU" ? "Nữ" : "Nam và Nữ"}
        </Button>
      ),
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
            <div>
              <Input
                value={search}
                onChange={handleChange}
                placeholder="Nhập tên sản phẩm"
                style={{ width: 200, marginRight: 10, height: 40 }}
              />
              <Button
                className="btn_filter"
                type="submit"
                onClick={handleSubmitSearch}
                style={{ height: 40 }}
              >
                Tìm kiếm
              </Button>
              <Button
                className="btn_clear"
                onClick={handleClear}
                style={{ height: 40 }}
              >
                Làm mới
              </Button>
            </div>
          </div>
        </div>
        <div className="box_btn_filter">
          <Row align="middle">
            <Col span={3} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Chất Liệu :</label>
            </Col>
            <Col span={2}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.material}
                onChange={(value) => handleSelectChange(value, "material")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                {listMaterial.map((material, index) => (
                  <Option key={index} value={material.name}>
                    {material.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={3} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Thương Hiệu :</label>
            </Col>
            <Col span={2}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.brand}
                onChange={(value) => handleSelectChange(value, "brand")}
              >
                <Option value="">Tất cả</Option>
                {listBrand.map((brand, index) => (
                  <Option key={index} value={brand.name}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Đế giày :</label>
            </Col>
            <Col span={2}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.sole}
                onChange={(value) => handleSelectChange(value, "sole")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                {listSole.map((sole, index) => (
                  <Option key={index} value={sole.name}>
                    {sole.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Kích cỡ :</label>
            </Col>
            <Col span={2}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.sizeProduct}
                onChange={(value) => handleSelectChange(value, "sizeProduct")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                {listSize.map((size, index) => (
                  <Option key={index} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Màu Sắc :</label>
            </Col>
            <Col span={2}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.color}
                onChange={(value) => handleSelectChange(value, "color")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                {listColor.map((color, index) => (
                  <Option key={index} value={color}>
                    <div
                      style={{
                        backgroundColor: color,
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                      }}
                    >
                      {getColorName(color)}
                    </div>
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>
        <div className="box_btn_filter">
          <Row align="middle">
            <Col span={6} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Thể Loại :</label>
            </Col>
            <Col span={3}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.category}
                onChange={(value) => handleSelectChange(value, "category")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                {listCategory.map((category, index) => (
                  <Option key={index} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Trạng Thái :</label>
            </Col>
            <Col span={3}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.status}
                onChange={(value) => handleSelectChange(value, "status")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                <Option value="DANG_SU_DUNG">Đang sử dung</Option>
                <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
              </Select>
            </Col>
            <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
              <label>Giới Tinh :</label>
            </Col>
            <Col span={3}>
              <Select
                style={{ width: "100%" }}
                value={selectedValues.gender}
                onChange={(value) => handleSelectChange(value, "gender")}
                defaultValue=""
              >
                <Option value="">Tất cả</Option>
                <Option value="NAM">Nam</Option>
                <Option value="NU">Nữ</Option>
              </Select>
            </Col>
          </Row>
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
            className="category-table"
          />
        </div>
      </div>
    </>
  );
};

export default ProductManagement;
