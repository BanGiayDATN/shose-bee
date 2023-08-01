import React, { useEffect, useRef, useState } from "react";
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
import { ProductApi } from "../../../api/employee/product/product.api";
import ModalAddSizeProduct from "./modal/ModalAddSizeProduct";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { GetSole, SetSole } from "../../../app/reducer/Sole.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducer/Category.reducer";
import {
  GetMaterail,
  SetMaterial,
} from "../../../app/reducer/Materail.reducer";
import { GetBrand, SetBrand } from "../../../app/reducer/Brand.reducer";
import { GetSize } from "../../../app/reducer/Size.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalCreateSole from "../sole-management/modal/ModalCreateSole";
import ModalCreateBrand from "../brand-management/modal/ModalCreateBrand";
import ModalCreateCategory from "../category-management/modal/ModalCreateCategory";
import ModalCreateMaterial from "../material-management/modal/ModalCreateManterial";
import { toast } from "react-toastify";
import axios from "axios";
import { ColorProductDetailApi } from "../../../api/employee/color-product-detail/ColorProductDetail";

const UpdateProductManagment = () => {
  const dispatch = useAppDispatch();
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

  const status = "DANG_SU_DUNG";
  const [productDetail, setProductDetail] = useState({});
  const [modalAddSole, setModalAddSole] = useState(false);
  const [modalAddCategopry, setModalAddCategory] = useState(false);
  const [modalAddMaterial, setModalAddMaterial] = useState(false);
  const [modalAddBrand, setModalAddBrand] = useState(false);
  const [modalAddColor, setModalAddColor] = useState(false);
  const [modalAddSize, setModalAddSize] = useState(false);

  const dataSole = useAppSelector(GetSole);
  const dataCategory = useAppSelector(GetCategory);
  const dataMaterial = useAppSelector(GetMaterail);
  const dataBrand = useAppSelector(GetBrand);
  const dataSize = useAppSelector(GetSize);

  const onFinish = (values) => {
    const priceValue = values.price;
    if (typeof priceValue === "string") {
      const numericPrice = parseFloat(priceValue.replace(/[^0-9.-]+/g, ""));
      values.price = numericPrice + "";
    }
    setProductDetail(values);
  };

  const checkAtLeastOneStarred = () => {
    return fileList.some((file) => file.isStarred);
  };

  // update product- detail
  const handleUpload = () => {
    if (Object.entries(productDetail).length === 0) {
      return;
    }

    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có đồng ý thêm sản phẩm không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        if (!listSizeAdd || listSizeAdd.length === 0) {
          toast.error("Bạn cần thêm kích thước và số lượng sản phẩm");
          return;
        }

        if (!fileList || fileList.length === 0) {
          toast.error("Bạn cần thêm ảnh cho sản phẩm");
          return;
        }
        // check ảnh được chọn là mặc định chưa
        const isAnyStarred = Object.values(starredFiles).some(
          (file) => file.isStarred
        );
        if (!isAnyStarred) {
          toast.error("Bạn cần chọn ảnh để làm mặc định");
          return;
        }

        const formData = new FormData();

        const promises = fileList.map((file) => {
          return new Promise((resolve, reject) => {
            if (file.originFileObj) {
              formData.append(`multipartFiles`, file.originFileObj);
              resolve(); // Giải quyết promise ngay lập tức nếu có originFileObj
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
                  resolve(); // Giải quyết promise sau khi đã thêm imageFile vào formData
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

        Promise.all(promises)
          .then(() => {
            // Tất cả các yêu cầu tải ảnh từ URL đã hoàn thành
            // Tiếp tục xử lý các dữ liệu và gửi formData lên server
            fileList.forEach((file) => {
              formData.append(
                `status`,
                starredFiles[file.uid]?.isStarred ? "true" : "false"
              );
            });
            const requestData = {
              description: productDetail.description,
              gender: productDetail.gender,
              price: productDetail.price,
              status: productDetail.status,
              categoryId: productDetail.categoryId,
              productId: productDetail.productId,
              materialId: productDetail.materialId,
              soleId: productDetail.soleId,
              brandId: productDetail.brandId,
            };
            console.log(listSizeAdd);
            formData.append("listSize", JSON.stringify(listSizeAdd));
            formData.append("data", JSON.stringify(requestData));

            formData.append("listColor", JSON.stringify(selectedColors));

            axios
              .put(`http://localhost:8080/admin/product-detail/${id}`, formData)
              .then((response) => {
                console.log(response.data);
                setIsSubmitting(true);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      },
    });
  };

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

  const handleCancel = () => {
    setModalAddSole(false);
    setModalAddBrand(false);
    setModalAddMaterial(false);
    setModalAddColor(false);
    setModalAddCategory(false);
    setModalAddSize(false);
  };

  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [listSizeAdd, setListSizeAdd] = useState([]);
  const handleQuantityChange = (value, record) => {
    // Ensure the value is at least 1
    const newQuantity = Math.max(value, 1);
    const updatedListSole = listSizeAdd.map((item) =>
      item.nameSize === record.nameSize
        ? { ...item, quantity: newQuantity }
        : item
    );
    setListSizeAdd(updatedListSole);
  };

  const handleQuantityDecrease = (record) => {
    const updatedListSole = listSizeAdd.map((item) =>
      item.nameSize === record.nameSize
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity is at least 1
        : item
    );
    setListSizeAdd(updatedListSole);
  };

  const handleQuantityIncrease = (record) => {
    const updatedListSole = listSizeAdd.map((item) =>
      item.nameSize === record.nameSize
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setListSizeAdd(updatedListSole);
  };

  const getSizeProductDetail = () => {
    SizeProductDetailApi.fetchAll(id).then((res) => {
      const dataWithSTT = res.data.data.map((item, index) => ({
        ...item,
        stt: index + 1,
      }));
      setListSizeAdd(dataWithSTT);
    });
  };

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
    ColorApi.getAllCode().then((res) => {
      setListColor(res.data.data);
    });
  };

  const handleSaveData = (selectedSizeData) => {
    console.log(selectedSizeData);
    selectedSizeData.forEach((selectedSizeData) => {
      // Kiểm tra xem kích thước đã tồn tại trong listSizeAdd chưa
      const existingSize = listSizeAdd.find(
        (item) => item.size === selectedSizeData.size
      );

      if (existingSize) {
        // Nếu kích thước đã tồn tại, cộng dồn số lượng
        setListSizeAdd((prevList) =>
          prevList.map((item) =>
            item.size === selectedSizeData.size
              ? { ...item, quantity: item.quantity + selectedSizeData.quantity }
              : item
          )
        );
      } else {
        setListSizeAdd((prevList) => [
          ...prevList,
          {
            stt: prevList.length + 1,
            nameSize: selectedSizeData.size,
            quantity: selectedSizeData.quantity,
            status: "DANG_SU_DUNG",
          },
        ]);
      }
    });
  };

  const fetchProductDetails = async () => {
    try {
      ProducDetailtApi.getOne(id).then((productData) => {
        setProduct(productData.data.data);
        setInitialValues({
          description: productData.data.data.description,
          gender: productData.data.data.gender,
          price: productData.data.data.price,
          status: productData.data.data.status,
          categoryId: productData.data.data.categoryId,
          productId: productData.data.data.productId,
          materialId: productData.data.data.materialId,
          soleId: productData.data.data.soleId,
          brandId: productData.data.data.brandId,
        });
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const [selectedColors, setSelectedColors] = useState([]);
  const handleChangeColor = (color) => {
    setSelectedColors(color);
  };
  const getColorProductDetail = () => {
    ColorProductDetailApi.fetchAll(id).then((res) => {
      setSelectedColors(res.data.data);
    });
  };

  useEffect(() => {
    setIsSubmitted(true);
    getList();
  }, []);

  useEffect(() => {
    getColorProductDetail();
    getListImage();
    fetchProductDetails();
    getSizeProductDetail();
  }, [id]);

  const [checkStatus, setCheckStatus] = useState(false);
  const handleUpdateStatusSize = (index) => {
    const updatedList = [...listSizeAdd];
    const currentStatus = updatedList[index].status;
    const newStatus =
      currentStatus === "DANG_SU_DUNG" ? "KHONG_SU_DUNG" : "DANG_SU_DUNG";
    updatedList[index].status = newStatus;
    setListSizeAdd(updatedList);
    setCheckStatus(true);
  };

  useEffect(() => {
    if (checkStatus == true) {
      setCheckStatus(false);
    }
  }, [checkStatus]);

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
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => handleQuantityDecrease(record)}
            style={{ margin: "0 0 0 4px" }}
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={text}
            onChange={(value) => handleQuantityChange(value, record)}
          />
          <Button
            onClick={() => handleQuantityIncrease(record)}
            style={{ margin: "0 10px 0 0" }}
          >
            +
          </Button>
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
      render: (text, record, index) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            title=" chỉnh sửa trạng thái "
            style={{ backgroundColor: "#0099FF", borderColor: "#0099FF" }}
            onClick={() => handleUpdateStatusSize(index)} // Gọi hàm xóa và truyền vị trí của phần tử
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </div>
      ),
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

  //
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      window.location.href = "/product-management";
    }
  }, [isSubmitting]);
  const [listProduct, setListProduct] = useState([]);
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
            Update Sản Phẩm
          </span>
        </div>

        <div style={{ marginTop: "25px" }}>
          <div className="content">
            <Form onFinish={onFinish} initialValues={initialValues}>
              <Form.Item>
                <Button
                  title="Chỉnh sửa sản phẩm"
                  type="primary"
                  htmlType="submit"
                  className="form-submit-btn"
                  onClick={handleUpload}
                  disabled={isSubmitting}
                >
                  Hoàn Tất
                </Button>
              </Form.Item>
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
                  <Input
                    className="form-input"
                    style={{ fontWeight: "bold" }}
                  />
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
                {/* Container div */}
                <Input.TextArea
                  rows={7}
                  placeholder="Nhập mô tả sản phẩm"
                  className="form-textarea"
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
                      style={{
                        fontWeight: "bold",
                        height: "40px",
                        width: "300px",
                      }}
                      customInput={Input}
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
                    <Select
                      placeholder="Chọn chọn giới tính"
                      style={{ marginLeft: "20px", width: "260px" }}
                    >
                      <Option value="DANG_SU_DUNG">
                        <span style={{ fontWeight: "bold" }}>Kinh Doanh</span>
                      </Option>
                      <Option value="kHONG_SU_DUNG">
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          Không Kinh Doanh
                        </span>
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

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
                          <span style={{ fontWeight: "bold" }}>
                            {brand.name}
                          </span>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
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
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon={faPlus} />}
                      style={{ height: 30 }}
                      onClick={() => setModalAddCategory(true)}
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
                    <Select
                      placeholder="Chọn giới tính"
                      style={{ marginLeft: "20px", width: "260px" }}
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
                <Col span={5}>
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
                          <span style={{ fontWeight: "bold" }}>
                            {sole.name}
                          </span>
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

              <Row gutter={7} justify="space-around">
                <Col span={8}>
                  <Form.Item
                    label="Giới Tính"
                    name="gender"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tính" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn chọn giới tính"
                      style={{ marginLeft: "20px", width: "260px" }}
                    >
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
                    // name="colorId"
                    style={{ fontWeight: "bold" }}
                    rules={[
                      { required: true, message: "Vui lòng chọn màu sắc" },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Chọn màu sắc"
                      value={selectedColors}
                      onChange={handleChangeColor}
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
                          {color}
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
              onClick={() => setModalAddSize(true)}
            >
              Thêm kích cỡ
            </Button>
          </div>
          <ModalAddSizeProduct
            visible={modalAddSize}
            onCancel={handleCancel}
            onSaveData={handleSaveData}
          />
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

export default UpdateProductManagment;
