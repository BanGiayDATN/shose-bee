import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import NumberFormat from "react-number-format";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import { useParams } from "react-router";
import { Option } from "antd/es/mentions";
import { MaterialApi } from "../../../api/employee/material/Material.api";
import { CategoryApi } from "../../../api/employee/category/category.api";
import { SoleApi } from "../../../api/employee/sole/sole.api";
import { BrandApi } from "../../../api/employee/brand/Brand.api";
import { ColorApi } from "../../../api/employee/color/Color.api";

const DetailProductManagment = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    description: "",
    gender: "",
    price: "",
    status: "",
    categoryId: "",
    productId: "",
    materialId: "",
    colorId: "",
    soleId: "",
    brandId: "",
  });
  const onFinish = (values) => {
    const priceValue = values.price;
    const numericPrice = parseFloat(priceValue.replace(/[^0-9.-]+/g, ""));
    values.price = numericPrice + "";
  };

  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listSole, setListSole] = useState([]);
  const status = "DANG_SU_DUNG";

  const getList = () => {
    MaterialApi.fetchAll({
      status: status,
    }).then((res) => {
      setListMaterial(res.data.data);
    });
    CategoryApi.fetchAll({
      status: status,
    }).then((res) => {
      setListCategory(res.data.data);
    });
    SoleApi.fetchAll({
      status: status,
    }).then((res) => {
      setListSole(res.data.data);
    });
    BrandApi.fetchAll({
      status: status,
    }).then((res) => {
      setListBrand(res.data.data);
    });
    ColorApi.getAllCode().then((res) => {
      setListColor(res.data.data);
    });
  };
  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    // Fetch product details based on the ID from the URL
    const fetchProductDetails = async () => {
      try {
        ProducDetailtApi.getOne(id).then((productData) => {
          console.log(productData);
          setProduct(productData.data.data);
          setInitialValues({
            description: productData.data.data.description,
            gender: productData.data.data.gender,
            price: productData.data.data.price,
            status:
              productData.data.data.status === "DANG_SU_DUNG"
                ? "Kinh Doanh"
                : "Không Kinh Doanh",
            categoryId: productData.data.data.categoryId,
            productId: productData.data.data.productId,
            materialId: productData.data.data.materialId,
            colorId: productData.data.data.colorId,
            soleId: productData.data.data.soleId,
            brandId: productData.data.data.brandId,
          });
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  // Add a check for product existence
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="filter">
        <div
          className="title_product"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px" }}
          >
            THÊM SẢN PHẨM
          </span>
        </div>

        <div style={{ marginTop: "25px" }}>
          <div className="content">
            <Form onFinish={onFinish} initialValues={initialValues}>
              <Form.Item
                label="Tên sản phẩm"
                name="productId"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input className="form-input" readOnly />
              </Form.Item>

              <Form.Item
                label="Mô tả"
                name="description"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
                ]}
              >
                <Input.TextArea
                  rows={7}
                  placeholder="Nhập mô tả sản phẩm"
                  className="form-textarea"
                  readOnly
                />
              </Form.Item>

              <Row gutter={16} justify="center">
                <Col span={8}>
                  <Form.Item
                    label="Giá"
                    name="price"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng nhập giá sản phẩm" },
                    ]}
                  >
                    <NumberFormat
                      thousandSeparator={true}
                      suffix=" VND"
                      placeholder="Nhập giá sản phẩm"
                      style={{ fontWeight: "bold", height: "40px" }}
                      customInput={Input}
                      readOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn trạng thái sản phẩm",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "300px",
                        fontWeight: "bold",
                        height: "40px",
                      }}
                      readOnly
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={7} justify="center">
                <Col span={8}>
                  <Form.Item
                    label="Thương hiệu"
                    name="brandId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thương hiệu" },
                    ]}
                  >
                    <Select placeholder="Chọn thương hiệu">
                      {listBrand.map((brand, index) => (
                        <Option key={index} value={brand.id}>
                          {brand.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Thể loại"
                    name="categoryId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thể loại" },
                    ]}
                  >
                    <Select placeholder="Chọn thể loại">
                      {listCategory.map((category, index) => (
                        <Option key={index} value={category.id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={7} justify="center">
                <Col span={8}>
                  <Form.Item
                    label="Chất Liệu"
                    name="materialId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thương hiệu" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn thương hiệu"
                      style={{ marginLeft: "20px", width: "260px" }}
                    >
                      {listMaterial.map((material, index) => (
                        <Option key={index} value={material.id}>
                          {material.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Đế Giày"
                    name="soleId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thể loại" },
                    ]}
                  >
                    <Select placeholder="Chọn thể loại">
                      {listSole.map((sole, index) => (
                        <Option key={index} value={sole.id}>
                          {sole.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={7} justify="center">
                <Col span={8}>
                  <Form.Item
                    label="Giới Tính"
                    name="gender"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thương hiệu" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn thương hiệu"
                      style={{ marginLeft: "20px", width: "260px" }}
                    >
                      <Option value="NAM">Nam</Option>
                      <Option value="NU">Nữ</Option>
                      <Option value="NAM_VA_NU">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Màu Sắc"
                    name="colorId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn màu sắc" },
                    ]}
                  >
                    <Select placeholder="Chọn màu sắc">
                      {listColor.map((color, index) => (
                        <Option key={index} value={color}>
                          <div
                            style={{
                              backgroundColor: color,
                              width: "100%",
                              height: "100%",
                              borderRadius: "5px",
                            }}
                          ></div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProductManagment;
