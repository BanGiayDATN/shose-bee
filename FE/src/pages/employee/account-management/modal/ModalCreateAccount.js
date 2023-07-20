import React from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { CreateAccount } from "../../../../app/reducer/Account.reducer";
import moment from "moment";

const { Option } = Select;

const ModalCreateAccount = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

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
            onCancel();
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
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Thêm nhân viên"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Thêm
        </Button>,
      ]}
    >
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
            { max: 20, message: "Email tối đa 20 ký tự" },
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
              message: "Số điện thoại phải bắt đầu từ số 0 và gồm 10 chữ số",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
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
      </Form>
    </Modal>
  );
};

export default ModalCreateAccount;
