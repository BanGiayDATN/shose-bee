import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Upload,
} from "antd";
import NumberFormat from "react-number-format";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import { useParams } from "react-router";
import { Option } from "antd/es/mentions";
import { MaterialApi } from "../../../api/employee/material/Material.api";
import { CategoryApi } from "../../../api/employee/category/category.api";
import { SoleApi } from "../../../api/employee/sole/sole.api";
import { BrandApi } from "../../../api/employee/brand/Brand.api";
import { ColorApi } from "../../../api/employee/color/Color.api";
import { SizeProductDetailApi } from "../../../api/employee/size-product-detail/SizeProductDetail.api";
import "./style-detail.css";
import { PlusOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { IamgeApi } from "../../../api/employee/image/Image.api";

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
  const [listSole, setListSole] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getSizeProductDetail = () => {
    SizeProductDetailApi.fetchAll(id).then((res) => {
      const dataWithSTT = res.data.data.map((item, index) => ({
        ...item,
        stt: index + 1,
      }));
      setListSize(dataWithSTT);
    });
  };

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

  const fetchProductDetails = async () => {
    try {
      ProducDetailtApi.getOne(id).then((productData) => {
        setProduct(productData.data.data);
        setInitialValues({
          description: productData.data.data.description,
          gender:
            productData.data.data.gender == "NAM"
              ? "Nam"
              : productData.data.data.gender === "NU"
              ? "Nữ"
              : "Nam và Nữ",
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
  useEffect(() => {
    setIsSubmitted(true);
    getList();
  }, []);

  useEffect(() => {
    getSizeProductDetail();
    getListImage();
    fetchProductDetails();
  }, [id]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Kích cỡ",
      dataIndex: "nameSize",
      key: "nameSize",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
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
  ];

  // ảnh
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
  const [fileList, setFileList] = useState([
    {
      uid: "",
      name: "",
      status: "",
      url: "",
    },
  ]);

  const getListImage = () => {
    IamgeApi.fetchAll(id).then((res) => {
      console.log(res.data.data);
      const newData = res.data.data.map((imageData) => ({
        uid: imageData.id,
        name: imageData.name,
        status: imageData.status,
        url: imageData.name,
      }));
      setFileList(newData);
    });
  };
  const handleCancelImage = () => setPreviewOpen(false);

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
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [starredFiles, setStarredFiles] = useState({});

  useEffect(() => {
    const initialStarredState = fileList.reduce((acc, file) => {
      acc[file.uid] = { ...file, isStarred: false };
      return acc;
    }, {});
    setStarredFiles(initialStarredState);
  }, [fileList]);

  const renderUploadButton = (file) => {
    const isStarred = starredFiles[file.uid]?.isStarred || false;

    return (
      <div className="custom-button">
        <Button onClick={() => handleCustomButtonClick(file)}>
          {isStarred ? (
            <StarFilled style={{ fontSize: 24, color: "gold" }} />
          ) : (
            <StarOutlined style={{ fontSize: 24 }} />
          )}
        </Button>
      </div>
    );
  };

  const handleCustomButtonClick = (file) => {
    setStarredFiles((prevStarredFiles) => {
      return {
        ...prevStarredFiles,
        [file.uid]: {
          ...prevStarredFiles[file.uid],
          isStarred: !prevStarredFiles[file.uid]?.isStarred,
        },
      };
    });
  };

  const customItemRender = (originNode, file) => {
    const isUploadedFile = fileList.some((item) => item.uid === file.uid);
    if (isUploadedFile) {
      return (
        <div className="uploaded-file-container">
          {originNode}
          {renderUploadButton(file)}
        </div>
      );
    }
    return originNode;
  };
  const renderImages = () => {
    return fileList.map((file) => (
      <div
        key={file.uid}
        className="image-item" // Sử dụng class đã tạo trong CSS
        onClick={() => handlePreview(file)}
      >
        <img
          alt="example"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={file.url || file.preview}
        />
      </div>
    ));
  };
  // Add a check for product existence
  if (!product) {
    return (
      <div>
        {" "}
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
      </div>
    );
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
            Chi Tiết Sản Phẩm
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
                <Col span={9}>
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
                <Col span={9}>
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

              <Row gutter={7} justify="space-around">
                <Col span={9}>
                  <Form.Item
                    label="Thương hiệu"
                    name="brandId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thương hiệu" },
                    ]}
                  >
                    <Select
                      style={{
                        pointerEvents: "none",
                        userSelect: "none",
                        width: "107%",
                      }}
                    >
                      {listBrand.map((brand, index) => (
                        <Option key={index} value={brand.id}>
                          <span style={{ fontWeight: "bold" }}>
                            {brand.name}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    label="Thể loại"
                    name="categoryId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thể loại" },
                    ]}
                  >
                    <Select
                      style={{
                        pointerEvents: "none",
                        userSelect: "none",
                        width: "100%",
                      }}
                    >
                      {listCategory.map((category, index) => (
                        <Option key={index} value={category.id}>
                          <span style={{ fontWeight: "bold" }}>
                            {category.name}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={7} justify="space-around">
                <Col span={9}>
                  <Form.Item
                    label="Chất Liệu"
                    name="materialId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thương hiệu" },
                    ]}
                  >
                    <Select
                      style={{
                        marginLeft: "20px",
                        width: "100%",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    >
                      {listMaterial.map((material, index) => (
                        <Option key={index} value={material.id}>
                          <span style={{ fontWeight: "bold" }}>
                            {material.name}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    label="Đế Giày"
                    name="soleId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thể loại" },
                    ]}
                  >
                    <Select
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {listSole.map((sole, index) => (
                        <Option key={index} value={sole.id}>
                          <span style={{ fontWeight: "bold" }}>
                            {sole.name}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={7} justify="space-around">
                <Col span={9}>
                  <Form.Item
                    label="Giới Tính"
                    name="gender"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn thương hiệu" },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        height: "40px",
                        marginLeft: "20px",
                      }}
                      readOnly
                    />
                  </Form.Item>
                </Col>

                <Col span={9}>
                  <Form.Item
                    label="Màu Sắc"
                    name="colorId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn màu sắc" },
                    ]}
                  >
                    <Select
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
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
            style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}
          >
            KÍCH THƯỚC VÀ SỐ LƯỢNG
          </span>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table
            dataSource={listSize}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 3 }}
            className="size-table"
          />
          {!listSize.length && (
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            ></div>
          )}
        </div>
      </div>

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
            style={{ fontSize: "20px", fontWeight: "bold", marginTop: "10px" }}
          >
            Ảnh
          </span>
        </div>

        <div style={{ marginTop: "25px" }}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
            itemRender={(originNode, file, currIndex) =>
              customItemRender(originNode, file, currIndex)
            }
          >
            {/* Render uploadButton if fileList length is less than 10 */}
            {fileList.length >= 10 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancelImage}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
        {/* Display the loading spinner while submitting */}
      </div>
    </>
  );
};

export default DetailProductManagment;
