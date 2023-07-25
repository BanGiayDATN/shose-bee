import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import moment from "moment";
import { CustomerApi } from "../../../../api/employee/account/customer.api";

const ModalDetailCustomer = ({ visible, id, onCancel }) => {
  const [customer, setCustomer] = useState({});

  const getOne = () => {
    CustomerApi.getOne(id).then((res) => {
      setCustomer(res.data.data);
    });
  };
  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    console.log(id);
    if (id != null && id !== "") {
      getOne();
    }
    return () => {
      setCustomer(null);
      id = null;
    };
  }, [id, visible]);

  return (
    <Modal
      title="Chi tiết khách hàng"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Tên khách hàng">
          <Input value={customer != null ? customer.fullName : null} readOnly />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={customer != null ? customer.email : null} readOnly />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            value={customer != null ? customer.phoneNumber : null}
            readOnly
          />
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <Input
            value={
              customer != null
                ? moment(customer.dateOfBirth).format("DD-MM-YYYY")
                : null
            }
            readOnly
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input value={customer != null ? customer.password : null} readOnly />
        </Form.Item>
        <Form.Item label="Điểm">
          <Input value={customer != null ? customer.points : null} readOnly />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Input
            value={
              customer != null
                ? customer.status == "DANG_SU_DUNG"
                  ? "Kích hoạt"
                  : "Ngừng kích hoạt"
                : null
            }
            readOnly
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailCustomer;
