import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import moment from "moment";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { UpdateAccount } from "../../../../app/reducer/Account.reducer";
const { Option } = Select;

const ModalUpdateAccount = ({ visible, id, onCancel }) => {
  const [form] = Form.useForm();
  const [account, setAccount] = useState({});
  const dispatch = useAppDispatch();

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
      setAccount(null);
      id = null;
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
          onCancel();
        });
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại");
        console.log("Validation failed:", error);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Cập nhật nhân viên"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Cập nhật
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
      </Form>
    </Modal>
  );
};

export default ModalUpdateAccount;
