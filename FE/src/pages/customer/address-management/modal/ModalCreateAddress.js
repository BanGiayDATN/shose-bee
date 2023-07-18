import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form, Popconfirm } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import {
  CreateAddress,
  SetAddress,
} from "../../../../app/reducer/Address.reducer";
import { toast } from "react-toastify";
import { AddressApi } from "../../../../api/customer/address/address.api";

const { Option } = Select;

const ModalCreateAddress = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
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
        AddressApi.create(values)
          .then((res) => {
            dispatch(CreateAddress(res.data.data));
            toast.success("Thêm thành công");
            onCancel();
          })
          .catch((error) => {
            toast.error("Thêm thất bại");
            console.log("Create failed:", error);
          });
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then(
      (res) => {
        setListProvince(res.data);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleProvinceChange = (value, valueProvince) => {
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.districts);
      }
    );
    console.log(listDistricts);
  };

  const handleCityChange = (value, valueDistrict) => {
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.wards);
    });
  };

  useEffect(() => {
    loadDataProvince();
  }, []);

  return (
    <Modal
      key="add"
      title="Thêm địa chỉ"
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          userId: "7d27cbd0-6569-48f8-8286-378b956dab26",
        }}
      >
        <Form.Item
          label="Tỉnh/Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố" }]}
        >
          <Select defaultValue="" onChange={handleProvinceChange}>
            <Option value="">--Chọn Tỉnh/Thành phố--</Option>
            {listProvince?.map((item) => {
              return (
                <Option
                  key={item.code}
                  value={item.name}
                  valueProvince={item.code}
                >
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          name="city"
          rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
        >
          <Select defaultValue="" onChange={handleCityChange}>
            <Option value="">--Chọn Quận/Huyện--</Option>
            {listDistricts?.map((item) => {
              return (
                <Option
                  key={item.code}
                  value={item.name}
                  valueDistrict={item.code}
                >
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Xã/Phường"
          name="country"
          rules={[{ required: true, message: "Vui lòng chọn Xã/Phường" }]}
        >
          <Select defaultValue="">
            <Option value="">--Chọn Xã/Phường--</Option>
            {listWard?.map((item) => {
              return (
                <Option key={item.code} value={item.name}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Số nhà/Ngõ/Đường"
          name="line"
          rules={[
            { required: true, message: "Vui lòng nhập số nhà/ngõ/đường" },
          ]}
        >
          <Input placeholder="Số nhà/Ngõ/Đường" />
        </Form.Item>
        <Form.Item style={{ marginTop: "40px" }} name="userId" hidden>
          <Input defaultValue="7d27cbd0-6569-48f8-8286-378b956dab26" disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateAddress;
