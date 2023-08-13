import React, { useState } from "react";
import {
  Modal,
  InputNumber,
  Button,
  Form,
  Col,
  Select,
  Tooltip,
  Row,
  Input,
  Upload,
  QRCode,
} from "antd";
import { useEffect } from "react";
import { ProducDetailtApi } from "../../../../api/employee/product-detail/productDetail.api";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { GetSole, SetSole } from "../../../../app/reducer/Sole.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../../../app/reducer/Category.reducer";
import {
  GetMaterail,
  SetMaterial,
} from "../../../../app/reducer/Materail.reducer";
import { GetBrand, SetBrand } from "../../../../app/reducer/Brand.reducer";
import { GetSize, SetSize } from "../../../../app/reducer/Size.reducer";
import { ProductApi } from "../../../../api/employee/product/product.api";
import { MaterialApi } from "../../../../api/employee/material/Material.api";
import { CategoryApi } from "../../../../api/employee/category/category.api";
import { SoleApi } from "../../../../api/employee/sole/sole.api";
import { BrandApi } from "../../../../api/employee/brand/Brand.api";
import ModalCreateSole from "../../sole-management/modal/ModalCreateSole";
import ModalCreateBrand from "../../brand-management/modal/ModalCreateBrand";
import ModalCreateCategory from "../../category-management/modal/ModalCreateCategory";
import ModalCreateMaterial from "../../material-management/modal/ModalCreateManterial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";
import NumberFormat from "react-number-format";
import { PlusOutlined } from "@ant-design/icons";
import { IamgeApi } from "../../../../api/employee/image/Image.api";
import { toast } from "react-toastify";
import axios from "axios";
import { SizeApi } from "../../../../api/employee/size/Size.api";
import { ColorApi } from "../../../../api/employee/color/Color.api";

const ModalUpdateProductDetail = ({ id, visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({
    id: "",
    description: "",
    gender: "",
    price: "",
    quantity: "",
    status: "",
    categoryId: "",
    productId: "",
    materialId: "",
    colorId: "",
    soleId: "",
    brandId: "",
    QRCode: "",
    sizeId: "",
    colorId: "",
  });

  // lấy đối tượng theo id
  const getOne = () => {
    ProducDetailtApi.getOne(id).then((productData) => {
      console.log(productData.data.data);
      setInitialValues({
        id: productData.data.data.id,
        description: productData.data.data.description,
        gender: productData.data.data.gender,
        price: productData.data.data.price,
        quantity: productData.data.data.quantity,
        status: productData.data.data.status,
        categoryId: productData.data.data.idCategory,
        productId: productData.data.data.nameProduct,
        materialId: productData.data.data.idMaterial,
        soleId: productData.data.data.idSole,
        brandId: productData.data.data.idBrand,
        QRCode: productData.data.data.qrcode,
        sizeId: productData.data.data.idSize,
        colorId: productData.data.data.idCode,
      });
    });
  };

  useEffect(() => {
    if (id != null && id !== "") {
      getOne();
      getListImage();
    }
  }, [id]);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  // các thuộc tính productDetail
  const dispatch = useAppDispatch();
  const status = "DANG_SU_DUNG";
  const [modalAddSole, setModalAddSole] = useState(false);
  const [modalAddCategopry, setModalAddCategory] = useState(false);
  const [modalAddMaterial, setModalAddMaterial] = useState(false);
  const [modalAddBrand, setModalAddBrand] = useState(false);

  const dataSole = useAppSelector(GetSole);
  const dataCategory = useAppSelector(GetCategory);
  const dataMaterial = useAppSelector(GetMaterail);
  const dataBrand = useAppSelector(GetBrand);
  const dataSize = useAppSelector(GetSize);

  const handleCancel = () => {
    setModalAddSole(false);
    setModalAddBrand(false);
    setModalAddMaterial(false);
    setModalAddCategory(false);
  };

  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listColor, setListColor] = useState([]);

  const getList = () => {
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
    SizeApi.fetchAll({
      status: status,
    }).then((res) => {
      setListSize(res.data.data);
      dispatch(SetSize(res.data.data));
    });
    ColorApi.fetchAll({
      status: status,
    }).then((res) => {
      setListColor(res.data.data);
      // dispatch(Set(res.data.data));
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
      dataMaterial != null ||
      dataSize != null
    ) {
      setListSole(dataSole);
      setListCategory(dataCategory);
      setListMaterial(dataMaterial);
      setListBrand(dataBrand);
    }
  }, [dataSole, dataBrand, dataCategory, dataMaterial, dataSize]);

  // format tiền
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
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

  const getListImage = () => {
    IamgeApi.fetchAll(id).then((res) => {
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

  const customItemRender = (originNode, file) => {
    const isUploadedFile = fileList.some((item) => item.uid === file.uid);
    if (isUploadedFile) {
      return <div style={{ width: "100%", height: "100%" }}>{originNode}</div>;
    }
    return originNode;
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có đồng ý cập nhật không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(values),
            onCancel: () => reject(),
          });
        });
      })
      .then((values) => {
        if (!fileList || fileList.length === 0) {
          toast.error("Bạn cần thêm ảnh cho sản phẩm");
          return;
        }
        const formData = new FormData();
        const promises = fileList.map((file) => {
          return new Promise((resolve, reject) => {
            if (file.originFileObj) {
              formData.append(`multipartFiles`, file.originFileObj);
              resolve();
            } else if (file.url) {
              axios
                .get(file.url, { responseType: "arraybuffer" }) // Tải ảnh từ URL dưới dạng mảng byte (arraybuffer)
                .then((response) => {
                  const imageFile = new File(
                    [response.data],
                    "your_image_public_id.jpg",
                    { type: "image/jpeg" }
                  );
                  formData.append(`multipartFiles`, imageFile);
                  resolve();
                })
                .catch((error) => {
                  console.error("Error fetching image:", error);
                  reject(error); // Từ chối promise nếu xảy ra lỗi
                });
            } else {
              resolve(); // Giải quyết promise ngay lập tức nếu không có originFileObj hoặc url
            }
          });
        });
        console.log(fileList);
        console.log(values);
        form.resetFields();
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại");
        console.log("Validation failed:", error);
      });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width="70%"
      bodyStyle={{ height: "65vh", overflowY: "auto" }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Chỉnh sửa
        </Button>,
      ]}
      mask={false} // Disable the dark backdrop
      maskClosable={false} // Disable closing the modal by clicking on the backdrop
    >
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
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "1%",
              marginBottom: "2%",
            }}
          >
            Thông Tin Sản Phẩm
          </span>
        </div>
        <Form form={form} initialValues={initialValues}>
          <Form.Item
            label="Tên sản phẩm"
            name="productId"
            style={{ fontWeight: "bold" }}
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input style={{ fontWeight: "bold", height: "40px" }} readOnly />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            style={{ fontWeight: "bold" }}
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>
          <br />

          <Row gutter={7} justify="space-around">
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
                      <span style={{ fontWeight: "bold" }}>{brand.name}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Tooltip title="Thêm thương hiệu">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                    onClick={() => setModalAddBrand(true)}
                  />
                </Tooltip>
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
                <Select>
                  <Option value="DANG_SU_DUNG">
                    <span style={{ fontWeight: "bold" }}>Kinh Doanh</span>
                  </Option>
                  <Option value="KHONG_SU_DUNG">
                    <span style={{ fontWeight: "bold" }}>Không Kinh Doanh</span>
                  </Option>
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
          </Row>

          <Row gutter={7} justify="space-around">
            <Col span={8}>
              <Form.Item
                label="Chất Liệu"
                name="materialId"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Vui lòng chọn thương hiệu" },
                ]}
              >
                <Select placeholder="Chọn chất liệu">
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
            <Col span={5}>
              <Form.Item>
                <Tooltip title="Thêm vật liệu">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                    onClick={() => setModalAddMaterial(true)}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Đế Giày"
                name="soleId"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
              >
                <Select placeholder="Chọn đế giày">
                  {listSole.map((sole, index) => (
                    <Option key={index} value={sole.id}>
                      <span style={{ fontWeight: "bold" }}>{sole.name}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Tooltip title="Thêm đế giày">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                    onClick={() => setModalAddSole(true)}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={7} justify="space-around">
            <Col span={8}>
              <Form.Item
                label="Giới Tính"
                name="gender"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="NAM">
                    <span style={{ fontWeight: "bold" }}>Nam</span>
                  </Option>
                  <Option value="NU">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Nữ</span>
                  </Option>
                  <Option value="NAM_VA_NU">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Nam và Nữ</span>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Tooltip title="Thêm giới tính">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Thể loại"
                name="categoryId"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
              >
                <Select placeholder="Chọn thể loại">
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
            <Col span={2}>
              <Form.Item>
                <Tooltip title="Thêm thể loại">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                    onClick={() => setModalAddCategory(true)}
                  ></Button>
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={7} justify="space-around">
            <Col span={8}>
              <Form.Item
                label="Màu Sắc"
                name="colorId"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}
              >
                <Select placeholder="Chọn màu sắc">
                  {listColor.map((color, index) => (
                    <Option key={index} value={color.id}>
                      <div
                        style={{
                          backgroundColor: color.code,
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
            <Col span={5}>
              <Form.Item>
                <Tooltip title="Thêm màu sắc">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Kích Cỡ"
                name="sizeId"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Vui lòng nhập giá sản phẩm" },
                ]}
              >
                <Select placeholder="Chọn kích cỡ">
                  {listSize.map((size, index) => (
                    <Option key={index} value={size.id}>
                      <span style={{ fontWeight: "bold" }}>{size.name}</span>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Tooltip title="Thêm kích thước">
                  <Button
                    type="primary"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    style={{ height: 30 }}
                  />
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={7} justify="space-around">
            <Col span={8}>
              <Form.Item
                label="Số Lượng"
                name="quantity"
                style={{ fontWeight: "bold" }}
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng" },
                  {
                    type: "number",
                    min: 1,
                    message: "Số lượng tối thiểu là 1",
                  }, // Minimum value validation
                ]}
              >
                <InputNumber
                  style={{ fontWeight: "bold", width: "100%", height: "40px" }}
                  placeholder="Nhập số lượng"
                />
              </Form.Item>
            </Col>
            <Col span={5}></Col>
            <Col span={8}>
              <Form.Item
                label="Giá Bán"
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
                  style={{
                    fontWeight: "bold",
                    height: "40px",
                    width: "100%",
                  }}
                  customInput={Input}
                />
              </Form.Item>
            </Col>
            <Col span={2}></Col>
          </Row>

          <Row gutter={7} justify="start">
            <Col span={8}>
              <Form.Item
                label="QR Code : "
                name="QRCode"
                style={{ fontWeight: "bold" }}
                rules={[{ required: true, message: "Ảnh Qr sản phẩm" }]}
              >
                <img
                  src={initialValues.QRCode}
                  alt="QR Code"
                  style={{ width: "50%", height: "auto" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
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
            style={{ fontSize: "20px", fontWeight: "bold", marginTop: "1%" }}
          >
            Ảnh Sản Phẩm
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
            beforeUpload={(file) => {
              // Kiểm tra xem tệp có phải là hình ảnh hay không
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                toast.error("Chỉ cho phép tải lên các tệp hình ảnh!");
              }
              return isImage ? true : Upload.LIST_IGNORE;
            }}
            multiple
          >
            {/* Render uploadButton if fileList length is less than 10 */}
            {fileList.length >= 9 ? null : uploadButton}
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
    </Modal>
  );
};

export default ModalUpdateProductDetail;
