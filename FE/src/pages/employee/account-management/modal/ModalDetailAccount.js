import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import moment from "moment";
import { AccountApi } from "../../../../api/employee/account/account.api";

const ModalDetailAccount = ({ visible, id, onCancel }) => {
  const [account, setAcount] = useState({});

  const getOne = () => {
    AccountApi.getOne(id).then((res) => {
      setAcount(res.data.data);
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
      setAcount(null);
      id = null;
    };
  }, [id, visible]);

  return (
    <Modal
      title="Chi tiết nhân viên"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Tên nhân viên">
          <Input value={account != null ? account.fullName : null} readOnly />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={account != null ? account.email : null} readOnly />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            value={account != null ? account.phoneNumber : null}
            readOnly
          />
        </Form.Item>
        <Form.Item label="Ngày sinh">
          <Input
            value={
              account != null
                ? moment(account.dateOfBirth).format("DD-MM-YYYY")
                : null
            }
            readOnly
          />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input value={account != null ? account.passWord : null} readOnly />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Input
            value={
              account != null
                ? account.status == "DANG_SU_DUNG"
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

export default ModalDetailAccount;
