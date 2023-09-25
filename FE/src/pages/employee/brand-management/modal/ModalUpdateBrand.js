import React, { useEffect } from "react";
import { Modal, Input, Select, Button, Form } from "antd";
import { BrandApi } from "../../../../api/employee/brand/Brand.api";
import { useAppDispatch } from "../../../../app/hook";
import { toast } from "react-toastify";
import { UpdateBrand } from "../../../../app/reducer/Brand.reducer";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const ModalUpdateBrand = ({ visible, id, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const getOne = () => {
    BrandApi.getOne(id).then((res) => {
      console.log(res);
      form.setFieldsValue(res.data.data);
    });
  };

  useEffect(() => {
    console.log(id);
    if (id != null && id !== "") {
      getOne();
    }
    form.resetFields();
    return () => {
      id = null;
    };
  }, [id, visible]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const trimmedValues = Object.keys(values).reduce((acc, key) => {
          acc[key] =
            typeof values[key] === "string" ? values[key].trim() : values[key];
          return acc;
        }, {});
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có đồng ý thêm không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(trimmedValues),
            onCancel: () => reject(),
          });
        });
      })
      .then((trimmedValues) => {
        form.resetFields();
        BrandApi.update(id, trimmedValues).then((res) => {
          dispatch(UpdateBrand(res.data.data));
          toast.success("Cập nhật thành công");
          onCancel();
        });
        form.resetFields();
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
      title="Cập nhật thương hiệu "
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
          label="Tên thương hiệu"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên thương hiệu" },
            { max: 50, message: "Tên thương hiệu tối đa 50 ký tự" },
          ]}
        >
          <Input
            placeholder="Tên thương hiệu"
            onKeyDown={(e) => {
              if (e.target.value === "" && e.key === " ") {
                e.preventDefault();
                e.target.value.replace(/\s/g, "");
              }
            }}
          />
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

export default ModalUpdateBrand;
