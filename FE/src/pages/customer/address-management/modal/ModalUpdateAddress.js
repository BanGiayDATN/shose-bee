import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Form, Popconfirm } from "antd";
import { useAppDispatch } from "../../../../app/hook";
import { UpdateAddress } from "../../../../app/reducer/Address.reducer";
import { toast } from "react-toastify";
import { AddressApi } from "../../../../api/customer/address/address.api";

const { Option } = Select;

const ModalUpdateAddress = ({ visible, id, onCancel }) => {
  const [form] = Form.useForm();
  const [address, setAddress] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const dispatch = useAppDispatch();

  const getOne = () => {
    AddressApi.getOne(id).then((res) => {
      setAddress(res.data.data);
      form.setFieldsValue(res.data.data);
      AddressApi.fetchAllProvinceDistricts(res.data.data.toDistrictId).then(
        (resDistrict) => {
          setListDistricts(resDistrict.data.data);
        }
      );
      AddressApi.fetchAllProvinceDistricts(res.data.data.provinceId).then(
        (resWard) => {
          setListWard(resWard.data.data);
        }
      );
    });
  };

  useEffect(() => {
    if (id != null && id !== "") {
      getOne();
    }
    form.resetFields();
    return () => {
      setAddress(null);
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
        AddressApi.update(id, values)
          .then((res) => {
            dispatch(UpdateAddress(res.data.data));
            toast.success("Cập nhật thành công");
            onCancel();
            form.resetFields();
          })
          .catch((error) => {
            toast.error("Cập nhật thất bại");
            console.log("Update failed:", error);
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
        setListProvince(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleProvinceChange = (value, valueProvince) => {
    form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };

  const handleCityChange = (value, valueDistrict) => {
    form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };

  useEffect(() => {
    loadDataProvince();
  }, []);

  return (
    <Modal
      title="Cập nhật địa chỉ"
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
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          userId: "88ceddbe-94fa-4ee5-9ba7-bdcf2227a8a0",
        }}
      >
        <Form.Item
          label="Tỉnh/Thành phố"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn Tỉnh/Thành phố" }]}
        >
          <Select onChange={handleProvinceChange}>
            <Option value="">--Chọn Tỉnh/Thành phố--</Option>
            {listProvince?.map((item) => {
              return (
                <Option
                  key={item.ProvinceID}
                  value={item.ProvinceName}
                  valueProvince={item.ProvinceID}
                >
                  {item.ProvinceName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quận/Huyện"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
        >
          <Select onChange={handleCityChange}>
            <Option value="">--Chọn Quận/Huyện--</Option>
            {listDistricts?.map((item) => {
              return (
                <Option
                  key={item.DistrictID}
                  value={item.DistrictName}
                  valueDistrict={item.DistrictID}
                >
                  {item.DistrictName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Xã/Phường"
          name="ward"
          rules={[{ required: true, message: "Vui lòng chọn Xã/Phường" }]}
        >
          <Select>
            <Option value="">--Chọn Xã/Phường--</Option>
            {listWard?.map((item) => {
              return (
                <Option key={item.WardCode} value={item.WardName}>
                  {item.WardName}
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
        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Option value="DANG_SU_DUNG">Đang sử dụng</Option>
            <Option value="KHONG_SU_DUNG">Không sử dụng</Option>
          </Select>
        </Form.Item>
        <Form.Item name="userId" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item style={{ marginTop: "40px" }} name="toDistrictId" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item style={{ marginTop: "40px" }} name="provinceId" hidden>
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateAddress;
