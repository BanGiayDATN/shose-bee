import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Input,
  Popconfirm,
  Button,
  Table,
  Switch,
} from "antd";
import {
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { LeftOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { CreatePromotion } from "../../../app/reducer/Promotion.reducer";
import { PromotionApi } from "../../../api/employee/promotion/Promotion.api";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import { GetProductDetail, SetProductDetail } from "../../../app/reducer/ProductDetail.reducer";
import { ProductApi } from "../../../api/employee/product/product.api";

function CreateVoucherManagement() {
  const dispatch = useAppDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysDetail, setSelectedRowKeysDetail] = useState([]);
  const [detailProduct, setDetailProduct] = useState(false);
  const [list, setList] = useState([]);
  const [listProductDetail, setListProductDetail] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const { Option } = Select;
  const datas = useAppSelector(GetProductDetail);

  useEffect(() => {
    if (datas != null) {
      SetProductDetail(datas);
    }
  }, [datas]);

  useEffect(() => {
    if (!detailProduct) {
      setListProductDetail([]);
      onSelectChange("");
    }
    onSelectChange("");
    console.log(detailProduct);
  }, [detailProduct]);

  useEffect(() => {
    loadDataProduct();
    console.log(loadDataProduct());
  }, []);

  useEffect(() => {
    console.log(listProductDetail);
  }, [listProductDetail]);

  useEffect(() => {
    console.log(selectedRowKeysDetail);
  }, [selectedRowKeysDetail]);

  useEffect(() => {
    if (detailProduct) {
      for (const key of selectedRowKeys) {
        getProdutDetailByproduct(key);
      }
      setListProductDetail(updatedListProductDetail);
    } else {
    }

    console.log(selectedRowKeys);
  }, [selectedRowKeys]);

  const updatedListProductDetail = listProductDetail.filter((item) =>
    selectedRowKeys.includes(item.id)
  );

  const loadDataProduct = () => {
    ProductApi.getProductUse().then(
      (res) => {
        setList(res.data.data);
        // dispatch(SetProductDetail(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getProdutDetailByproduct = (id) => {
    ProducDetailtApi.getByIdProduct(id).then(
      (res) => {
        setListProductDetail((prevListProductDetail) => [
          ...prevListProductDetail,
          ...res.data.data,
        ]);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const onChange = (checked) => {
    setDetailProduct(checked);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    if (!detailProduct) {
      console.log("diem");
      setSelectedRowKeys(newSelectedRowKeys);
    } else {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSelectChangeDetail = (newSelectedRowKeys) => {
    setSelectedRowKeysDetail(newSelectedRowKeys);
  };
  const rowSelectionDetail = {
    selectedRowKeysDetail,
    onChange: onSelectChangeDetail,
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const convertToLong = () => {
    const convertedFormData = {
      ...formData,
      idProductDetails: selectedRowKeysDetail,
    };
    if (formData.startDate) {
      convertedFormData.startDate = dayjs(formData.startDate).unix() * 1000;
    }
    if (formData.endDate) {
      convertedFormData.endDate = dayjs(formData.endDate).unix() * 1000;
    }
    return convertedFormData;
  };
  const handleSubmit = () => {
    console.log(convertToLong());
    console.log(formData);
    const isFormValid =
      formData.name &&
      formData.value &&
      formData.startDate &&
      formData.endDate &&
      formData.startDate < formData.endDate;

    if (!isFormValid) {
      const errors = {
        name: !formData.name ? "Vui lòng nhập tên khuyễn mãi" : "",
        value: !formData.value ? "Vui lòng nhập giá giảm" : "",
        startDate: !formData.startDate ? "Vui lòng chọn ngày bắt đầu" : "",
        endDate: !formData.endDate
          ? "Vui lòng chọn ngày kết thúc"
          : formData.startDate >= formData.endDate
          ? "Ngày kết thúc phải lớn hơn ngày bắt đầu"
          : "",
      };
      setFormErrors(errors);
      return;
    }

    PromotionApi.create(convertToLong()).then((res) => {
      dispatch(CreatePromotion(res.data.data));
      toast.success("Thêm thành công!", {
        autoClose: 5000,
      });
      window.location.href = "/promotion-management";
    });
    setFormData({});
    setListProductDetail([]);
    onSelectChange("");
    onSelectChangeDetail("");

    // for (const key of selectedRowKeysDetail) {
    //   getProdutDetailByproduct(key);
    // }
  };
  const fields = [
    {
      name: "name",
      type: "text",
      label: "Tên khuyễn mại",
      text: "tên khuyễn mại",
      class: "input-form",
    },
    {
      name: "value",
      type: "number",
      label: "Giá trị giảm",
      text: "giá trị giảm",
      class: "input-form",
    },
    {
      name: "startDate",
      type: "date",
      label: "Ngày bắt đầu",
      text: "ngày bắt đầu",
      class: "input-form",
    },
    {
      name: "endDate",
      type: "date",
      label: "Ngày kết thúc",
      text: "ngày kết thúc",
      class: "input-form",
    },
    // {
    //   name: "status",
    //   type: "select",
    //   label: "Trạng thái",
    //   options: [
    //     { value: "DANG_SU_DUNG", label: "Đang sử dụng" },
    //     { value: "KHONG_SU_DUNG", label: "Không sử dụng" },
    //   ],
    //   text: "trạng thái",
    //   class: "input-form",
    // },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
  const columnsDetailproduct = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="Ảnh sản phẩm"
          style={{ width: "70px", borderRadius: "5px" }}
        />
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "codeProduct",
      key: "codeProduct",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Trạng thái",
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
      title: "Tình trạng",
      dataIndex: "idPromotion",
      key: "idPromotion",
      render: (text) => {
        const genderClass = text ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text ? "Có khuyến mại " : "Không khuyến mại"}
          </button>
        );
      },
    },
  ];
  const updatedList = list.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  const updatedListDetail = listProductDetail.map((item, index) => ({
    ...item,
    stt: index + 1,
  }));

  return (
    <div>
      <Row>
        <Col className="add-promotion" lg={{ span: 7, offset: 0 }}>
          <Link to="/promotion-management">
            <LeftOutlined /> Quay lại
          </Link>
          <div className="title-add-promotion">
            <h1>Thêm khuyến mại</h1>
          </div>

          <Form layout="vertical" autoComplete="off">
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <Form.Item
                    label={field.label}
                    validateStatus={formErrors[field.name] ? "error" : ""}
                    help={formErrors[field.name] || ""}
                  >
                    {field.type === "number" && (
                      <InputNumber
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                        min="1"
                      />
                    )}
                    {field.type === "date" && (
                      <DatePicker
                        showTime
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                        format="HH:mm:ss DD-MM-YYYY"
                      />
                    )}
                    {field.type === "select" && (
                      <Select
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                      >
                        <Option value="">Chọn trạng thái</Option>
                        {field.options.map((option, optionIndex) => (
                          <Option key={optionIndex} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    )}

                    {field.type !== "date" &&
                      field.type !== "select" &&
                      field.type !== "number" && (
                        <Input
                          className={field.class}
                          name={field.name}
                          placeholder={field.label}
                          value={formData[field.name] || ""}
                          onChange={(e) => {
                            handleInputChange(field.name, e.target.value);
                          }}
                        />
                      )}
                  </Form.Item>
                </div>
              );
            })}

            <Form.Item label=" ">
              <Popconfirm
                title="Thông báo"
                description="Bạn có chắc chắn muốn thêm không ?"
                onConfirm={() => {
                  handleSubmit();
                }}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  className="button-add-promotion"
                  key="submit"
                  title="Thêm"
                >
                  Thêm
                </Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={{ span: 0, offset: 0 }}></Col>
        <Col className="get-product" lg={{ span: 17, offset: 0 }}>
          <Col>
            <Switch onChange={onChange} /> Thêm cho từng sản phẩm
            <br></br>
            <br></br>
            <Table
              rowKey="id"
              columns={columns}
              rowSelection={rowSelection}
              dataSource={updatedList}
              pagination={{ pageSize: 5 }}
            />
          </Col>
          <Col>
            {/* {selectedRowKeys.length > 0 && detailProduct && ( */}
            <div>
              <h1>Chi tiết sản phẩm</h1>
              <br></br>
              <Table
                rowKey="id"
                columns={columnsDetailproduct}
                rowSelection={rowSelectionDetail}
                dataSource={updatedListDetail}
                pagination={{ pageSize: 5 }}
              />
            </div>
            {/* )} */}
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default CreateVoucherManagement;
