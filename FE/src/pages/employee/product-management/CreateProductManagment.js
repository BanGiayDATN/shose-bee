import { Option } from "antd/es/mentions";
import "./style-product.css";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { MaterialApi } from "../../../api/employee/material/Material.api";
import { CategoryApi } from "../../../api/employee/category/category.api";
import { SoleApi } from "../../../api/employee/sole/sole.api";
import { BrandApi } from "../../../api/employee/brand/Brand.api";
import { ColorApi } from "../../../api/employee/color/Color.api";
import tinycolor from "tinycolor2";
import ModalCreateSole from "../sole-management/modal/ModalCreateSole";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetSole, SetSole } from "../../../app/reducer/Sole.reducer";
import ModalCreateBrand from "../brand-management/modal/ModalCreateBrand";
import ModalCreateCategory from "../category-management/modal/ModalCreateCategory";
import ModalCreateMaterial from "../material-management/modal/ModalCreateManterial";
import {
  GetMaterail,
  SetMaterial,
} from "../../../app/reducer/Materail.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducer/Category.reducer";
import { GetBrand, SetBrand } from "../../../app/reducer/Brand.reducer";
import { ProductApi } from "../../../api/employee/product/product.api";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const CreateProductManagment = () => {
  const dispatch = useAppDispatch();
  const status = "DANG_SU_DUNG";
  const [modalAddSole, setModalAddSole] = useState(false);
  const [modalAddCategopry, setModalAddCategory] = useState(false);
  const [modalAddMaterial, setModalAddMaterial] = useState(false);
  const [modalAddBrand, setModalAddBrand] = useState(false);
  const [modalAddColor, setModalAddColor] = useState(false);

  const dataSole = useAppSelector(GetSole);
  const dataCategory = useAppSelector(GetCategory);
  const dataMaterial = useAppSelector(GetMaterail);
  const dataBrand = useAppSelector(GetBrand);

  const handleCancel = () => {
    setModalAddSole(false);
    setModalAddBrand(false);
    setModalAddMaterial(false);
    setModalAddColor(false);
    setModalAddCategory(false);
  };

  const [productDetail, setProductDetail] = useState({});
  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listSole, setListSole] = useState([]);

  const listSize = [];
  for (let size = 35; size <= 45; size++) {
    listSize.push("" + size);
  }

  const getColorName = (color) => {
    const colorObj = tinycolor(color);
    return colorObj.toName() || colorObj.toHexString();
  };

  const getList = () => {
    ProductApi.fetchAll().then((res) => {
      setListProduct(res.data.data);
    });
    MaterialApi.fetchAll({
      status: status,
    }).then((res) => {
      setListMaterial(res.data.data);
      dispatch(SetMaterial(res.data.data));
    });
    CategoryApi.fetchAll({
      status: status,
    }).then((res) => {
      setListCategory(res.data.data);
      dispatch(SetCategory(res.data.data));
    });
    SoleApi.fetchAll({
      status: status,
    }).then((res) => {
      setListSole(res.data.data);
      dispatch(SetSole(res.data.data));
    });
    BrandApi.fetchAll({
      status: status,
    }).then((res) => {
      setListBrand(res.data.data);
      dispatch(SetBrand(res.data.data));
    });
    ColorApi.getAllCode().then((res) => {
      setListColor(res.data.data);
    });
  };

  const onFinish = (values) => {
    console.log("Submitted values:", values);
    // Xử lý dữ liệu sau khi biểu mẫu được gửi đi
    setProductDetail(values);
  };

  const handleSearch = (value) => {
    ProductApi.fetchAll({
      name: value,
    }).then((res) => {
      setListProduct(res.data.data);
    });
  };

  const renderOptions = (nameList) => {
    return nameList.map((product, index) => ({
      key: `${product.id}-${index}`,
      value: product.name,
      label: product.name,
    }));
  };

  const [listSizeAdd, setListSizeAdd] = useState([
    // {
    //   stt: 1,
    //   numberSize: 45,
    //   soLuong: 24,
    //   status: "DANG_SU_DUNG",
    // },
  ]);

  const handleQuantityChange = (value, record) => {
    // Cập nhật số lượng mới trong dữ liệu (listSole) dựa trên record
    // Ví dụ:
    const updatedListSole = listSizeAdd.map((item) =>
      item.id === record.id ? { ...item, soLuong: value } : item
    );
    setListSizeAdd(updatedListSole);
  };

  const handleQuantityDecrease = (record) => {
    const updatedListSole = listSizeAdd.map((item) =>
      item.id === record.id ? { ...item, soLuong: item.soLuong - 1 } : item
    );
    setListSizeAdd(updatedListSole);
  };

  const handleQuantityIncrease = (record) => {
    const updatedListSole = listSizeAdd.map((item) =>
      item.id === record.id ? { ...item, soLuong: item.soLuong + 1 } : item
    );
    setListSizeAdd(updatedListSole);
  };

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
  const [fileList, setFileList] = useState([]);
  const handleCancelImage = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
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
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("multipartFiles", file.originFileObj);
    });
    formData.append("productDetail", productDetail);

    axios
      .post("http://localhost:8080/admin/image/upload", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (
      dataSole != null ||
      dataBrand != null ||
      dataCategory != null ||
      dataMaterial != null
    ) {
      setListSole(dataSole);
      setListCategory(dataCategory);
      setListMaterial(dataMaterial);
      setListBrand(dataBrand);
    }
  }, [dataSole, dataBrand, dataCategory, dataMaterial]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Kích cỡ",
      dataIndex: "numberSize",
      key: "numberSize",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      sorter: (a, b) => a.stt - b.stt,
      render: (text, record) => (
        <Space>
          <Button
            shape="circle"
            icon="-"
            onClick={() => handleQuantityDecrease(record)}
          />
          <InputNumber
            min={1}
            value={text}
            onChange={(value) => handleQuantityChange(value, record)}
          />
          <Button
            shape="circle"
            icon="+"
            onClick={() => handleQuantityIncrease(record)}
          />
        </Space>
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
            title="Chỉnh sửa thể loại"
            style={{ backgroundColor: "green", borderColor: "green" }}
            // onClick={() => handleUpdate(record.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      ),
    },
  ];

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
            <Form onFinish={onFinish}>
              <Form.Item
                label="Tên sản phẩm"
                name="productId"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <AutoComplete
                  options={renderOptions(listProduct)}
                  placeholder="Nhập tên sản phẩm"
                  onSearch={handleSearch}
                >
                  <Input className="form-input" />
                </AutoComplete>
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
                    <Input
                      placeholder="Nhập giá sản phẩm"
                      style={{ fontWeight: "bold", height: "40px" }}
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
                    <Select placeholder="Chọn trạng thái sản phẩm">
                      <Option value="DANG_SU_DUNG">Kinh Doanh</Option>
                      <Option value="KHONG_SU_DUNG">Không Kinh Doanh</Option>
                    </Select>
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
                <Col span={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                      onClick={() => setModalAddBrand(true)}
                    ></Button>
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
                <Col span={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                      onClick={() => setModalAddCategory(true)}
                    ></Button>
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
                      style={{ marginLeft: "20px", width: "325px" }}
                    >
                      {listMaterial.map((material, index) => (
                        <Option key={index} value={material.id}>
                          {material.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                      onClick={() => setModalAddMaterial(true)}
                    ></Button>
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
                <Col span={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                      onClick={() => setModalAddSole(true)}
                    ></Button>
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
                      style={{ marginLeft: "20px", width: "325px" }}
                    >
                      <Option value="NAM">Nam</Option>
                      <Option value="NU">Nữ</Option>
                      <Option value="NAM_VA_NU">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                    ></Button>
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
                <Col span={2}>
                  <Form.Item>
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                      onClick={() => setModalAddColor(true)}
                    ></Button>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-submit-btn"
                  onClick={handleUpload}
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
          <ModalCreateSole visible={modalAddSole} onCancel={handleCancel} />
          <ModalCreateBrand visible={modalAddBrand} onCancel={handleCancel} />
          <ModalCreateCategory
            visible={modalAddCategopry}
            onCancel={handleCancel}
          />
          <ModalCreateMaterial
            visible={modalAddMaterial}
            onCancel={handleCancel}
          />
          {/* <ModalCreateBrand visible={modalAddBrand} onCancel={handleCancel} /> */}
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
            dataSource={listSizeAdd}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 3 }}
            className="size-table"
            showHeader={listSizeAdd.length > 0}
          />
          {!listSizeAdd.length && (
            <div
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            ></div>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ height: "40px" }}
              type="primary"
              // onClick={() => setModalVisible(true)}
            >
              Thêm kích cỡ
            </Button>
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
          >
            {fileList.length >= 8 ? null : uploadButton}
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
      </div>
    </>
  );
};
export default CreateProductManagment;
