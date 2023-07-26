import React from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { CreateAccount } from "../../../../app/reducer/Account.reducer";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../style-account.css";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Option } = Select;

const ModalCreateAccount = ({ visible }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        AccountApi.create(updatedValues)
          .then((res) => {
            dispatch(CreateAccount(res.data.data));
            toast.success("Thêm thành công");
            navigate("/staff-management");
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
        <span style={{ marginLeft: "10px" }}>Quản lý tài khoản nhân viên</span>
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
            TẠO TÀI KHOẢN
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateAccount;
