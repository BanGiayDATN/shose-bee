import { Option } from "antd/es/mentions";
import "./style-product.css";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Upload,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { GetSize, SetSize } from "../../../app/reducer/Size.reducer";
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
import { PlusOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import axios from "axios";
import ModalAddSizeProduct from "./modal/ModalAddSizeProduct";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import AddColorModal from "./modal/ModalAddColor";

const CreateProductManagment = () => {
  const dispatch = useAppDispatch();
  const status = "DANG_SU_DUNG";
  const [form] = Form.useForm();
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

  const initialValues = {
    status: "DANG_SU_DUNG",
  };

  const handleCancel = () => {
    setModalAddSole(false);
    setModalAddBrand(false);
    setModalAddMaterial(false);
    setModalAddColor(false);
    setModalAddCategory(false);
    setModalAddSize(false);
  };

  const [productDetail, setProductDetail] = useState({});
  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listSole, setListSole] = useState([]);

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

  const handleSearch = (value) => {
    ProductApi.fetchAllByName({
      name: value,
    }).then((res) => {
      setListProduct(res.data.data);
    });
  };

  const renderOptions = (nameList) => {
    return nameList.map((product, index) => ({
      key: `${product}-${index}`,
      value: product,
      label: product,
    }));
  };

  const [listSizeAdd, setListSizeAdd] = useState([]);

  const handleSaveData = (selectedSizeData) => {
    console.log(selectedSizeData);
    selectedSizeData.forEach((selectedSizeData) => {
      // Kiểm tra xem kích thước đã tồn tại trong listSizeAdd chưa
      const existingSize = listSizeAdd.find(
        (item) => item.nameSize === selectedSizeData.size
      );

      if (existingSize) {
        // Nếu kích thước đã tồn tại, hiển thị cảnh báo
        toast.warning(
          `Kích cỡ ${selectedSizeData.size} đã tồn tại trong danh sách!`
        );
      } else {
        // Nếu kích thước chưa tồn tại, thêm vào listSizeAdd
        setListSizeAdd((prevList) => [
          ...prevList,
          {
            nameSize: selectedSizeData.size,
            status: "DANG_SU_DUNG",
          },
        ]);
      }
    });
  };

  const handleDeleteSize = (index) => {
    const updatedList = [...listSizeAdd];
    updatedList.splice(index, 1);
    setListSizeAdd(updatedList);
    toast.success("Đã xóa kích cỡ thành công");
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (isSubmitting) {
      window.location.href = "/product-management";
    }
  }, [isSubmitting]);

  const handleUpload = () => {
    form
      .validateFields()
      .then((values) => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có đồng ý thêm không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(values),
            onCancel: () => reject(),
          });
        });
      })
      .then((values) => {
        console.log(values);
        console.log(listSizeAdd);
      })
      .catch(() => {
        // Xử lý khi người dùng từ chối xác nhận
      });
    // console.log(productDetail);
    // if (Object.entries(productDetail).length != 0) {
    //   Modal.confirm({
    //     title: "Xác nhận",
    //     content: "Bạn có đồng ý thêm sản phẩm không?",
    //     okText: "Đồng ý",
    //     cancelText: "Hủy",
    //     onOk: () => {
    //       if (!listSizeAdd || listSizeAdd.length === 0) {
    //         toast.error("Bạn cần thêm kích thước và số lượng sản phẩm");
    //         return;
    //       }
    //       if (!fileList || fileList.length === 0) {
    //         toast.error("Bạn cần thêm ảnh cho sản phẩm");
    //         return;
    //       }
    //       // check ảnh được chọn là mặc định chưa
    //       const isAnyStarred = Object.values(starredFiles).some(
    //         (file) => file.isStarred
    //       );
    //       if (!isAnyStarred) {
    //         toast.error("Bạn cần chọn ảnh để làm mặc định");
    //         return;
    //       }
    //       const formData = new FormData();
    //       fileList.forEach((file) => {
    //         formData.append(`multipartFiles`, file.originFileObj);
    //         // Check if the file is starred and set the status accordingly
    //         const isStarred = starredFiles[file.uid]?.isStarred || false;
    //         formData.append(`status`, isStarred ? "true" : "false");
    //         console.log(file);
    //       });
    //       console.log(productDetail);
    //       const requestData = {
    //         description: productDetail.description,
    //         gender: productDetail.gender,
    //         price: productDetail.price,
    //         status: productDetail.status,
    //         categoryId: productDetail.categoryId,
    //         productId: productDetail.productId,
    //         materialId: productDetail.materialId,
    //         soleId: productDetail.soleId,
    //         brandId: productDetail.brandId,
    //       };
    //       formData.append("listSize", JSON.stringify(listSizeAdd));
    //       formData.append("data", JSON.stringify(requestData));
    //       formData.append("listColor", JSON.stringify(selectedColors));
    //       axios
    //         .post("http://localhost:8080/admin/product-detail", formData)
    //         .then((response) => {
    //           console.log(response.data);
    //           setIsSubmitting(true);
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //         });
    //     },
    //   });
    // }
  };

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

  // const [selectedColors, setSelectedColors] = useState([]);
  // const handleChangeColor = (selectedColors) => {
  //   setSelectedColors(selectedColors);
  // };

  // const getColoredOption = (color) => {
  //   return (
  //     <div style={{ display: "flex", alignItems: "center" }}>
  //       <div
  //         style={{
  //           width: "50px",
  //           height: "25px",
  //           borderRadius: "10%",
  //           backgroundColor: color,
  //           marginRight: "8px",
  //         }}
  //       />
  //     </div>
  //   );
  // };

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
            <Form form={form} initialValues={initialValues}>
              <Form.Item>
                <Button
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
                <Input.TextArea
                  rows={7}
                  placeholder="Nhập mô tả sản phẩm"
                  className="form-textarea"
                />
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
                    <Select
                      placeholder="Chọn thể loại"
                      style={{ marginLeft: "15px", width: "95%" }}
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
                      placeholder="Chọn chất liệu"
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
                    <Select
                      placeholder="Chọn đế giày"
                      style={{ marginLeft: "15px", width: "95%" }}
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
                      placeholder="Chọn giới tính"
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
          <AddColorModal visible={modalAddColor} onCancel={handleCancel} />
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
            KÍCH CỠ VÀ MÀU SẮC
          </span>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Row
            align="middle"
            gutter={16}
            style={{ marginTop: "30px", marginBottom: "80px" }}
          >
            <Col span={3} style={{ marginLeft: "25px" }}>
              <h2>Kích Cỡ : </h2>
            </Col>
            <Col span={16}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {listSizeAdd.map((item, index) => (
                  <Popconfirm
                    key={index}
                    title="Bạn có chắc muốn xóa kích cỡ này?"
                    onConfirm={() => handleDeleteSize(index)}
                    okText="Đồng ý"
                    cancelText="Hủy"
                  >
                    <Button className="custom-button">
                      <span
                        style={{ fontWeight: "bold" }}
                      >{`${item.nameSize}`}</span>
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        className="custom-icon"
                      />
                    </Button>
                  </Popconfirm>
                ))}
                <Col
                  span={5}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    style={{ height: "40px" }}
                    type="primary"
                    onClick={() => {
                      setModalAddSize(true);
                    }}
                  >
                    Thêm kích cỡ
                  </Button>
                  <ModalAddSizeProduct
                    visible={modalAddSize}
                    onCancel={handleCancel}
                    onSaveData={handleSaveData}
                  />
                </Col>
              </div>
            </Col>
          </Row>

          <Row
            align="middle"
            gutter={16}
            style={{ marginTop: "80px", marginBottom: "80px" }}
          >
            <Col span={3} style={{ marginLeft: "25px" }}>
              <h2>Màu Sắc : </h2>
            </Col>
            <Col span={16}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Col
                  span={5}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    style={{ height: "40px" }}
                    type="primary"
                    onClick={() => {
                      setModalAddColor(true);
                    }}
                  >
                    Thêm màu sắc
                  </Button>
                  <AddColorModal
                    visible={modalAddColor}
                    onCancel={handleCancel}
                  />
                </Col>
              </div>
            </Col>
          </Row>
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
export default CreateProductManagment;
