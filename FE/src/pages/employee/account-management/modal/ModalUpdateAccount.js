import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import moment from "moment";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { UpdateAccount } from "../../../../app/reducer/Account.reducer";
import { useParams, useNavigate } from "react-router-dom";
import "../style-account.css";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Option } = Select;

const ModalUpdateAccount = ({ visible }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [account, setAccount] = useState({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        AccountApi.update(id, updatedValues).then((res) => {
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
  return (
    <div>
      <div className="title_account">
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý nhân viên</span>
      </div>
      <div className="filter">
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
            CẬP NHẬT NHÂN VIÊN
          </span>
        </div>
        <div className="title_add">
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên nhân viên"
              name="fullName"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhân viên" },
                { max: 30, message: "Tên nhân viên tối đa 30 ký tự" },
              ]}
            >
              <Input placeholder="Tên nhân viên" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { max: 30, message: "Email tối đa 30 ký tự" },
                {
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email không đúng định dạng",
                },
              ]}
            >
              <Input placeholder="Email" />
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
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^0\d{9}$/,
                  message:
                    "Số điện thoại phải bắt đầu từ số 0 và gồm 10 chữ số",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[
                { required: true, message: "Vui lòng chọn ngày sinh" },
                { validator: validateAge },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select placeholder="Vui lòng chọn trạng thái">
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
              Cập nhật
            </Button>
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateAccount;
