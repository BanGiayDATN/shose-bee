import React, { useState } from "react";
import { Modal, InputNumber, Button, Form } from "antd";

const ModalUpdateProductDetail = ({
  visible,
  onCancel,
  onUpdate,
  initialQuantity,
  initialPrice,
}) => {
  const [form] = Form.useForm();

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        onUpdate(values.quantity, values.price);
        form.resetFields();
        onCancel();
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  return (
    <Modal
      title="Update Product Detail"
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="update" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
      mask={false} // Disable the dark backdrop
      maskClosable={true} // Disable closing the modal by clicking on the backdrop
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="quantity"
          label="Quantity"
          initialValue={initialQuantity}
          rules={[
            { required: true, message: "Please enter the quantity" },
            { type: "number", min: 1, message: "Quantity must be at least 1" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          initialValue={initialPrice}
          rules={[
            { required: true, message: "Please enter the price" },
            {
              type: "number",
              min: 0,
              message: "Price must be a positive number",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateProductDetail;
