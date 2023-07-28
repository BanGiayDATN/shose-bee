import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form, Row, Col, Upload } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import { CustomerApi } from "../../../../api/employee/account/customer.api";
import { CreateCustomer } from "../../../../app/reducer/Customer.reducer";
import { useParams, useNavigate } from "react-router-dom";
import "../style-account.css";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { PlusOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { AddressApi } from "../../../../api/customer/address/address.api";

// import QrReader from "react-qr-reader";

const { Option } = Select;

const ModalCreateCustomer = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  // const [qrData, setQrData] = useState("");

  // const handleScan = (data) => {
  //   if (data) {
  //     setQrData(data);
  //   }
  // };

  // const handleError = (error) => {
  //   console.error("QR Scan Error:", error);
  // };
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then(
      (res) => {
        setListProvince(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleProvinceChange = (value, valueProvince) => {
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };

  const handleDistrictChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };
  useEffect(() => {
    loadDataProvince();
  }, []);

  const handleOk = () => {
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
        const formattedDate = moment(
          values.dateOfBirth,
          "YYYY-MM-DD"
        ).valueOf();
        const updatedValues = { ...values, dateOfBirth: formattedDate };
        CustomerApi.create(updatedValues)
          .then((res) => {
            dispatch(CreateCustomer(res.data.data));
            toast.success("Thêm thành công");
            navigate("/customerr-management");
          })
          .catch((error) => {
            toast.error("Thêm thất bại");
            console.log("Create failed:", error);
          });
      })
      .catch(() => {
        // Xử lý khi người dùng từ chối xác nhận
      });
  };

  const handleCancel = () => {
    navigate("/customerr-management");
  };
  const validateAge = (rule, value) => {
    if (value) {
      const currentDate = new Date();
      const selectedDate = new Date(value);
      const ageDifference =
        currentDate.getFullYear() - selectedDate.getFullYear();

      if (ageDifference < 18) {
        return Promise.reject("Phải đủ 18 tuổi trở lên");
      }
    }
    return Promise.resolve();
  };
  return (
    <div>
      <div className="title_account">
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý tài khoản khách hàng</span>
      </div>
      <div
        className="content-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px" }}
        >
          THÊM KHÁCH HÀNG
        </span>
      </div>
      <Row gutter={[24, 8]}>
        <Col className="filter" span={6}>
          {/* <Link to="/promotion-management">
            <LeftOutlined /> Quay lại
          </Link> */}
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            Ảnh đại diện
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
            >
              {uploadButton}
            </Upload>
          </div>
        </Col>

        <Col className="filter" span={17} style={{ marginLeft: "20px" }}>
          {/* <div className="filter"> */}
          <Form form={form} layout="vertical">
            <Row gutter={[24, 8]}>
              <Col span={10}>
                <div className="title_add">
                  <Form.Item
                    label="Tên khách hàng"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên khách hàng",
                      },
                      { max: 30, message: "Tên khách hàng tối đa 30 ký tự" },
                    ]}
                  >
                    <Input
                      className="input-item"
                      placeholder="Tên khách hàng"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { max: 20, message: "Email tối đa 20 ký tự" },
                      {
                        pattern:
                          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                        message: "Email không đúng định dạng",
                      },
                    ]}
                  >
                    <Input className="input-item" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu" },
                      { min: 8, message: "Mật khẩu phải 8 ký tự" },
                    ]}
                  >
                    <Input className="input-item" placeholder="Mật khẩu" />
                  </Form.Item>
                  <Form.Item
                    label="Tỉnh/Thành phố"
                    name="province"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn Tỉnh/Thành phố",
                      },
                    ]}
                  >
                    <Select defaultValue="" onChange={handleProvinceChange}>
                      <Option value="">--Chọn Tỉnh/Thành phố--</Option>
                      {listProvince?.map((item) => {
                        return (
                          <Option
                            key={item.ProvinceID}
                            value={item.ProvinceName}
                            valueProvince={item.ProvinceID}
                          >
                            {item.ProvinceName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Xã/Phường"
                    name="werd"
                    rules={[
                      { required: true, message: "Vui lòng chọn Xã/Phường" },
                    ]}
                  >
                    <Select defaultValue="">
                      <Option value="">--Chọn Xã/Phường--</Option>
                      {listWard?.map((item) => {
                        return (
                          <Option key={item.WardCode} value={item.WardName}>
                            {item.WardName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item style={{ marginTop: "40px" }} name="userId" hidden>
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    style={{ marginTop: "40px" }}
                    name="toDistrictId"
                    hidden
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Trạng thái" name="status">
                    <Select
                      placeholder="Vui lòng chọn trạng thái"
                      defaultValue="DANG_SU_DUNG"
                      disabled
                    >
                      <Option value="DANG_SU_DUNG">Kích hoạt</Option>
                      <Option value="KHONG_SU_DUNG">Ngừng kích hoạt</Option>
                    </Select>
                  </Form.Item>

                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    style={{ marginRight: "10px" }}
                  >
                    Thêm
                  </Button>
                  <Button key="cancel" onClick={handleCancel}>
                    Hủy
                  </Button>
                </div>
              </Col>
              <Col span={10} style={{ marginLeft: "40px", marginTop: "16px" }}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại",
                    },
                    {
                      pattern: /^0\d{9}$/,
                      message:
                        "Số điện thoại phải bắt đầu từ số 0 và gồm 10 chữ số",
                    },
                  ]}
                >
                  <Input className="input-item" placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  label="Ngày sinh"
                  name="dateOfBirth"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày sinh" },
                    { validator: validateAge },
                  ]}
                >
                  <Input className="input-item" type="date" />
                </Form.Item>
                <Form.Item
                  label="Điểm"
                  name="points"
                  rules={[{ required: true, message: "Vui lòng nhập điểm" }]}
                >
                  <Input
                    className="input-item"
                    type="number"
                    placeholder="Điểm"
                  />
                </Form.Item>
                <Form.Item
                  label="Quận/Huyện"
                  name="district"
                  rules={[
                    { required: true, message: "Vui lòng chọn Quận/Huyện" },
                  ]}
                >
                  <Select defaultValue=" " onChange={handleDistrictChange}>
                    <Option value=" ">--Chọn Quận/Huyện--</Option>
                    {listDistricts?.map((item) => {
                      return (
                        <Option
                          key={item.DistrictID}
                          value={item.DistrictName}
                          valueDistrict={item.DistrictID}
                        >
                          {item.DistrictName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Số nhà/Ngõ/Đường"
                  name="line"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số nhà/ngõ/đường",
                    },
                  ]}
                >
                  <Input
                    className="input-item"
                    placeholder="Số nhà/Ngõ/Đường"
                  />
                </Form.Item>
                {/* <div>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%" }}
                  />
                  <p>Scanned Data: {qrData}</p>
                </div> */}
              </Col>
            </Row>
          </Form>
          {/* </div> */}
        </Col>
      </Row>
    </div>
  );
};
export default ModalCreateCustomer;
