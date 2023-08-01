import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  Row,
  Col,
  Upload,
  message,
  Radio,
} from "antd";
import moment from "moment";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { UpdateAccount } from "../../../../app/reducer/Account.reducer";
import { useParams, useNavigate } from "react-router-dom";
import "../style-account.css";
import { AddressApi } from "../../../../api/customer/address/address.api";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const ModalUpdateAccount = ({ visible }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [account, setAccount] = useState({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
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
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleCancelImagel = () => setPreviewOpen(false);

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
  const handleChange = ({ file }) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Bạn chỉ có thể tải lên tệp JPG/PNG!");
      return;
    }
    setUploadedFile(file);
    if (file.status === "removed") {
      // Nếu tệp bị xóa, đặt giá trị uploadedFile về null
      setUploadedFile(null);
    }
  };

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
  const getOne = () => {
    if (id != null && id !== "") {
      AccountApi.getOne(id).then((res) => {
        setAccount(res.data.data);
        form.setFieldsValue({
          ...res.data.data,
          dateOfBirth: moment(res.data.data.dateOfBirth).format("YYYY-MM-DD"),
        });
      });
    }
  };

  useEffect(() => {
    if (id != null && id !== "") {
      getOne();
    }
    form.resetFields();
    return () => {
      setAccount({});
    };
  }, [id, visible]);

  const handleOk = () => {
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
        const updatedValues = {
          ...values,
          dateOfBirth: moment(values.dateOfBirth).valueOf(),
        };
        form.resetFields();
        if (uploadedFile == null) {
          toast.error("Bạn cần thêm ảnh đai diện ");
        }
        const formData = new FormData();
        formData.append(`multipartFile`, uploadedFile.originFileObj);
        formData.append(`request`, JSON.stringify(updatedValues));

        AccountApi.update(id, formData).then((res) => {
          dispatch(UpdateAccount(res.data.data));
          toast.success("Cập nhật thành công");
          navigate("/staff-management");
        });
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại");
        console.log("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    navigate("/staff-management");
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
  return (
    <div>
      <div
        className="content-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          CẬP NHẬT NHÂN VIÊN
        </span>
      </div>
      <Row gutter={[24, 8]}>
        <Col
          className="filter"
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
                marginBottom: "50px",
                fontSize: "20px",
              }}
            >
              Ảnh đại diện
            </h1>
            <div>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                fileList={uploadedFile ? [uploadedFile] : []}
                onPreview={handlePreview}
                onChange={handleChange}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                  showErrorTips: true,
                }}
              >
                {uploadedFile ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancelImagel}
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
        </Col>

        <Col className="filter" span={17} style={{ marginLeft: "20px" }}>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "30px",
              fontSize: "20px",
            }}
          >
            Thông tin nhân viên
          </h1>
          <Form form={form} layout="vertical">
            <div className="title_add">
              <Row gutter={[24, 8]}>
                <Col span={10} style={{ marginLeft: "6%" }}>
                  <Form.Item
                    label="Tên nhân viên"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên nhân viên",
                      },
                      { max: 30, message: "Tên nhân viên tối đa 30 ký tự" },
                    ]}
                  >
                    <Input className="input-item" placeholder="Tên nhân viên" />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { max: 50, message: "Email tối đa 50 ký tự" },
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
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[
                      { required: true, message: "Vui lòng chọn trạng thái" },
                    ]}
                  >
                    <Select placeholder="Vui lòng chọn trạng thái">
                      <Option value="DANG_SU_DUNG">Kích hoạt</Option>
                      <Option value="KHONG_SU_DUNG">Ngừng kích hoạt</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tinh" },
                    ]}
                    initialValue={account.gender === true ? "Nam" : "Nữ"}
                  >
                    <Radio.Group>
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={10} style={{ marginLeft: "40px" }}>
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
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu" },
                      { min: 8, message: "Mật khẩu phải 8 ký tự" },
                    ]}
                  >
                    <Input type="password" placeholder="Mật khẩu" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
              marginRight: "8%",
              marginBottom: "20px",
            }}
          >
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              style={{ marginRight: "10px", width: "100px", height: "40px" }}
            >
              Cập nhật
            </Button>
            <Button
              key="cancel"
              onClick={handleCancel}
              style={{ width: "100px", height: "40px" }}
            >
              Hủy
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ModalUpdateAccount;
