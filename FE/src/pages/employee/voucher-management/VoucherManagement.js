import React, { useEffect, useState } from "react";
import "./style-voucher.css";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Modal,
  InputNumber,
  Popconfirm,
  DatePicker,
} from "antd";
import { VoucherApi } from "../../../api/employee/voucher/Voucher.api";
import {
  CreateVoucher,
  GetVoucher,
  SetVoucher,
  UpdateVoucher,
} from "../../../app/reducer/Voucher.reducer";
import {
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
dayjs.extend(utc);
const VoucherManagement = () => {
  const dispatch = useAppDispatch();
  const [list, setList] = useState([]);
  const [id, setId] = useState("");
  const [modal, setModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [formDataSearch, setFormDataSearch] = useState({});
  const [showData, setShowData] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  const data = useAppSelector(GetVoucher);

  
  useEffect(() => {
    if (data != null) {
      setList(data);
    }
  }, [data]);

  useEffect(() => {
    loadData();
  }, [showData, formDataSearch]);

   
  
 
  const openModal = () => {
    setShowDetail(false);
    setShowData(true);
    setModal(true);
    console.log(formData);
  };
  const closeModal = () => {
    setModal(false);
    setFormErrors({});
    setId("");
    setFormData({});
  };

  const resetFormSearch = () => {
    setFormDataSearch({});
    loadData();
  };
  const convertToLong =() => {
    const convertedFormData = { ...formData };
    if (formData.startDate) {
      convertedFormData.startDate = dayjs(formData.startDate).unix() * 1000;
    }
    if (formData.endDate) {
      convertedFormData.endDate = dayjs(formData.endDate).unix() * 1000;
    }
    return convertedFormData;
  }
  const convertToLongSearch =() => {
    const convertedFormDataSearch = { ...formDataSearch };
    if (formDataSearch.startDate) {
      convertedFormDataSearch.startDate = dayjs(formDataSearch.startDate).unix() * 1000;
    }
    if (formDataSearch.endDate) {
      convertedFormDataSearch.endDate = dayjs(formDataSearch.endDate).unix() * 1000;
    }
    return convertedFormDataSearch;
  }

  const loadData = () => {
    
  
   
    VoucherApi.fetchAll(convertToLongSearch()).then(
      (res) => {
        setList(res.data.data);
        dispatch(SetVoucher(res.data.data));
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleSubmit = (id) => {
    console.log(formData);
    const isFormValid =
      formData.name &&
      formData.quantity &&
      formData.value &&
      formData.startDate &&
      formData.endDate &&
      formData.status &&
      formData.startDate <formData.endDate

    if (!isFormValid) {
      openModal();
    
      const errors = {
        name: !formData.name ? "Vui lòng nhập tên khuyễn mãi" : "",
        quantity: !formData.quantity ? "Vui lòng nhập số lượng" : "",
        value: !formData.value ? "Vui lòng nhập giá giảm" : "",
        startDate: !formData.startDate ? "Vui lòng chọn ngày bắt đầu" : "",
        endDate: !formData.endDate ? "Vui lòng chọn ngày kết thúc" : formData.startDate >= formData.endDate ?"Ngày kết thúc phải lớn hơn ngày bắt đầu" :"",
        status: !formData.status ? "Vui lòng chọn trạng thái" : "",
      };
      setFormErrors(errors);
      return; 
    }
    // if (formData.startDate && formData.endDate) {
     
    //   if (formData.startDate > formData.endDate) {
    //     setFormErrors({
    //       ...formErrors,
    //       endDate:"Ngày kết thúc phải lớn hơn ngày bắt đầu!"
    //   })
    //       // toast.success("Ngày bắt đầu phải nhỏ hơn ngày két thúc!", {
    //       //   autoClose: 5000,
    //       // });
    //   }
    //   return;
    // }
    if (!id) {
      VoucherApi.create(convertToLong()).then((res) => {
        dispatch(CreateVoucher(res.data.data));
        setShowData(false);
        toast.success("Thêm thành công!", {
          autoClose: 5000,
        });
      });
    } else {
      VoucherApi.update(id, convertToLong()).then((res) => {
        dispatch(UpdateVoucher(res.data.data));
        setShowData(false);
        setId("");
        toast.success("Cập nhập thành công!", {
          autoClose: 5000,
        });
      });
    }

    setShowData(true);
    setFormData({});
    setModal(false);
    console.log(showData);
  };

  const detailVoucher = (id) => {
    setId(id);
    VoucherApi.getOne(id).then(
      (res) => {
        const voucherData = res.data.data;
        setFormData({
          code: voucherData.code,
          name: voucherData.name,
          quantity: voucherData.quantity,
          value: voucherData.value,
          startDate: dayjs(voucherData.startDate),
          endDate: dayjs(voucherData.endDate),
          status: voucherData.status,
          createdDate: dayjs(voucherData.createdDate),
        });

        setModal(true);
      },
      (err) => console.log(err)
    );
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  const handleInputChangeSearch = (name, value) => {
    setFormDataSearch({ ...formDataSearch, [name]: value });
  };
  const handleDetail = (id) => {
    setShowDetail(true);
    detailVoucher(id);
  };
  const handleUpdate = (id) => {
    setShowDetail(false);
    detailVoucher(id);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã khuyến mại",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên khuyến mại",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Giá trị giảm",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => a.startDate - b.startDate,
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => a.endDate - b.endDate,
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      sorter: (a, b) => a.lastModifiedDate - b.lastModifiedDate,
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
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
            onClick={() => handleDetail(record.id)}
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
  const { Option } = Select;
  const fields = [
    {
      name: "code",
      type: "text",
      label: "Mã khuyễn mại",
      text: "mã khuyễn mại",
      hidden: true,
      class: "input-form",
    },
    {
      name: "name",
      type: "text",
      label: "Tên khuyễn mại",
      text: "tên khuyễn mại",
      class: "input-form",
    },
    {
      name: "quantity",
      type: "number",
      label: "Số lượng",
      text: "số lượng",
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
    {
      name: "status",
      type: "select",
      label: "Trạng thái",
      options: [
        { value: "DANG_SU_DUNG", label: "Đang sử dụng" },
        { value: "KHONG_SU_DUNG", label: "Không sử dụng" },
      ],
      text: "trạng thái",
      class: "input-form",
    },
    {
      name: "createdDate",
      type: "date",
      label: "Ngày tạo",
      text: "ngày tạo",
      hidden: true,
      class: "input-form",
    },
  ];
  
  const fieldsSearch = [
    {
      name: "code",
      type: "text",
      label: "Mã khuyễn mại",
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
    {
      name: "name",
      type: "text",
      label: "Tên khuyễn mại",
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
    {
      name: "quantity",
      type: "number",
      label: "Số lượng",
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
    {
      name: "value",
      type: "number",
      label: "Giá trị giảm",
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
    {
      name: "startDate",
      type: "date",
      label: "Ngày bắt đầu sau",
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
    {
      name: "endDate",
      type: "date",
      label: "Ngày kết thúc trước",
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
    {
      name: "status",
      type: "select",
      label: "Trạng thái",
      options: [
        { value: "DANG_SU_DUNG", label: "Đang sử dụng" },
        { value: "KHONG_SU_DUNG", label: "Không sử dụng" },
      ],
      class: "input-search",
      placeholder:"Tìm kiếm"
    },
  ];
  return (
    <div className="voucher">
      <h1 className="title-voucher">
        {" "}
        <FontAwesomeIcon icon={faKaaba} /> Quản lý khuyến mại
      </h1>
      <h1>
        {" "}
        <FontAwesomeIcon icon={faFilter} /> Bộ lọc
      </h1>
      <hr></hr>
      <div className="form-search">
        <div className="row">
          {fieldsSearch.map((field, index) => {
            return (
              <div key={index}>
                <Form.Item label={field.label}>
                  {field.type === "number" && (
                    <InputNumber
                      className={field.class}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formDataSearch[field.name] || ""}
                      onChange={(value) =>
                        handleInputChangeSearch(field.name, value)
                      }
                      min="1"
                    />
                  )}
                  {field.type === "date" &&
                      <DatePicker
                        className={field.class}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formDataSearch[field.name]}
                        onChange={(value) => {
                          handleInputChangeSearch(field.name, value);
                        }}
                      />
                    }
                    
                  {field.type === "select" && (
                    <Select
                      className={field.class}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formDataSearch[field.name] || ""}
                      onChange={(value) =>
                        handleInputChangeSearch(field.name, value)
                      }
                    >
                      <Option value="">Tất cả</Option>
                      {field.options.map((option, optionIndex) => (
                        <Option key={optionIndex} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                  {field.type !== "date" &&field.type !== "select" && field.type !== "number" && (
                    <Input
                      className={field.class}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formDataSearch[field.name] || ""}
                      onChange={(e) =>
                        handleInputChangeSearch(field.name, e.target.value)
                      }
                    />
                  )}
                </Form.Item>
              </div>
            );
          })}
        </div>

        <div className="reset-form-search">
          <Button
            title="Làm mới mục tìm kiếm"
            className="button-submit"
            onClick={resetFormSearch}
          >
            Làm mới
          </Button>
        </div>
      </div>
      
      <h1>
        {" "}
        <FontAwesomeIcon icon={faListAlt} /> Danh sách khuyến mãi{" "}
      </h1>
      <hr></hr>
      <div className="manager-voucher">
        <Button
          title="Thêm phiếu giảm giá"
          className="button-add"
          onClick={openModal}
        >
          Thêm +
        </Button>
        <div className="voucher-table">
          <Table
            dataSource={list}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "even-row" : "odd-row"
            }
          />
         
        </div>
      </div>

      {/* modal */}
      <Modal
        title={
          showDetail === true
            ? "Chi tiết khuyễn mại"
            : "Thêm hoặc cập nhập khuyến mại"
        }
        visible={modal}
        onCancel={closeModal}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <hr></hr>
        <br></br>
        <Form
          name="wrap"
          labelCol={{
            flex: "110px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 600,
          }}
        >
          {fields.map((field, index) => {
            return (
              <div key={index}>
                <Form.Item
                  label={field.label}
                  validateStatus={formErrors[field.name] ? "error" : ""}
                  help={formErrors[field.name] || ""}
                  style={{
                    display: field.hidden && !showDetail ? "none" : "block",
                  }}
                >
                  {field.type === "number" && (
                    <InputNumber
                      className={field.class}
                      readOnly={showDetail}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name] || ""}
                      onChange={(value) => {
                        if (!showDetail) {
                          handleInputChange(field.name, value);
                        }
                      }}
                      min="1"
                    />
                  )}
                  {field.type === "date" &&
                    (showDetail ? (
                      <Input
                        className={field.class}
                        readOnly={true}
                        name={field.name}
                        placeholder={field.label}
                        value={dayjs(formData[field.name]).format("DD-MM-YYYY")}
                      />
                    ) : (
                      <DatePicker
                        className={field.class}
                        readOnly={showDetail}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                      />
                    ))}
                     {field.type === "select" &&
                    (showDetail ? (
                      <Input
                        className={field.class}
                        readOnly={true}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] === "DANG_SU_DUNG" ? "Đang sử dụng": "Không sử dụng"}
                      />
                    ) : (
                      <Select
                      className={field.class}
                      readOnly={showDetail}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name] || ""}
                      onChange={(value) => {
                        if (!showDetail) {
                          handleInputChange(field.name, value);
                        }
                      }}
                    >
                      <Option value="">Chọn trạng thái</Option>
                      {field.options.map((option, optionIndex) => (
                        <Option key={optionIndex} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                    ))}
                 
                  {field.type !== "date" &&
                    field.type !== "select" &&
                    field.type !== "number" && (
                      <Input
                        className={field.class}
                        readOnly={showDetail}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(e) => {
                          if (!showDetail) {
                            handleInputChange(field.name, e.target.value);
                          }
                        }}
                      />
                    )}
                </Form.Item>
              </div>
            );
          })}

          <Form.Item label=" ">
            <Button onClick={closeModal}>Hủy</Button>
            {showDetail === false ? (
              <Popconfirm
                title="Thông báo"
                description="Bạn có chắc chắn muốn thêm không ?"
                onConfirm={() => {
                  handleSubmit(id);
                }}
                okText="Có"
                cancelText="Không"
              >
                <Button
                  className="button-submit"
                  key="submit"
                  title={id ? "Cập nhập" : "Thêm"}
                >
                  {id ? "Cập nhập" : "Thêm"}
                </Button>
              </Popconfirm>
            ) : (
              ""
            )}
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default VoucherManagement;
