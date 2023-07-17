import React, { useState } from "react";
import { Modal, Input, Select, Button, Form, Popconfirm } from "antd";
import { BrandApi } from "../../../../api/employee/brand/Brand.api";
import { useAppDispatch } from "../../../../app/hook";
import { CreateBrand, SetBrand } from "../../../../app/reducer/Brand.reducer";
import { toast } from "react-toastify";

const { Option } = Select;

const ModalCreateBrand = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  // Trong hàm handleOk, chúng ta gọi form.validateFields() để kiểm tra và lấy giá trị
  // hàm onCreate để xử lý dữ liệu
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
        BrandApi.create(values)
          .then((res) => {
            dispatch(CreateBrand(res.data.data));
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
      title="Thêm thương hiệu"
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
          label="Tên thương hiệu"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên thương hiệu" },
            { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
          ]}
        >
          <Input placeholder="Tên thương hiệu" />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select placeholder=" Vui lòng chọn trạng thái ">
            <Option value="DANG_SU_DUNG">Đang sử dụng</Option>
            <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateBrand;
