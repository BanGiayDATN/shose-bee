import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  DatePicker,
  Input,
  Popconfirm,
  Button,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  CreateVoucher,
  GetVoucher,
  SetVoucher,
  UpdateVoucher,
} from "../../../app/reducer/Voucher.reducer";
import { VoucherApi } from "../../../api/employee/voucher/Voucher.api";

function UpdateVoucherManagement() {
  const dispatch = useAppDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({});
  const { Option } = Select;

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const convertToLong = () => {
    const convertedFormData = { ...formData };
    if (formData.startDate) {
      convertedFormData.startDate = dayjs(formData.startDate).unix() * 1000;
    }
    if (formData.endDate) {
      convertedFormData.endDate = dayjs(formData.endDate).unix() * 1000;
    }
    return convertedFormData;
  };
  const handleSubmit = (id) => {
    console.log(formData);
    const isFormValid =
      formData.name &&
      formData.value &&
      formData.startDate &&
      formData.endDate &&
      formData.status &&
      formData.startDate < formData.endDate;

    if (!isFormValid) {
      const errors = {
        name: !formData.name ? "Vui lòng nhập tên khuyễn mãi" : "",
        value: !formData.value ? "Vui lòng nhập giá giảm" : "",
        startDate: !formData.startDate ? "Vui lòng chọn ngày bắt đầu" : "",
        endDate: !formData.endDate
          ? "Vui lòng chọn ngày kết thúc"
          : formData.startDate >= formData.endDate
          ? "Ngày kết thúc phải lớn hơn ngày bắt đầu"
          : "",
        status: !formData.status ? "Vui lòng chọn trạng thái" : "",
      };
      setFormErrors(errors);
      return;
    }

    VoucherApi.create(convertToLong()).then((res) => {
      dispatch(UpdateVoucher(res.data.data));

      toast.success("Thêm thành công!", {
        autoClose: 5000,
      });
    });
    setFormData({});
  };
  const fields = [
    {
      name: "name",
      type: "text",
      label: "Tên khuyễn mại",
      text: "tên khuyễn mại",
      class: "input-form",
    },
    {
      name: "value",
      type: "number",
      label: "Giá trị giảm",
      text: "giá trị giảm",
      class: "input-form",
    },
    {
      name: "startDate",
      type: "date",
      label: "Ngày bắt đầu",
      text: "ngày bắt đầu",
      class: "input-form",
    },
    {
      name: "endDate",
      type: "date",
      label: "Ngày kết thúc",
      text: "ngày kết thúc",
      class: "input-form",
    },
    {
        name: "status",
        type: "select",
        label: "Trạng thái",
        options: [
          { value: "DANG_SU_DUNG", label: "Đang sử dụng" },
          { value: "KHONG_SU_DUNG", label: "Không sử dụng" },
        ],
        text: "trạng thái",
        class: "input-form",
      },
  ];
  return (
    <div>
      <Row>
        <Col className="add-voucher" lg={{ span: 12, offset: 0 }}>
          <Form
            name="wrap"
            labelCol={{
              flex: "110px",
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 600,
            }}
          >
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <Form.Item
                    label={field.label}
                    validateStatus={formErrors[field.name] ? "error" : ""}
                    help={formErrors[field.name] || ""}
                  >
                    {field.type === "number" && (
                      <InputNumber
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                        min="1"
                      />
                    )}
                    {field.type === "date" && (
                      <DatePicker
                        showTime
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name]}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                      />
                    )}
                    {field.type === "select" && (
                      <Select
                        className={field.class}
                        name={field.name}
                        placeholder={field.label}
                        value={formData[field.name] || ""}
                        onChange={(value) => {
                          handleInputChange(field.name, value);
                        }}
                      >
                        <Option value="">Chọn trạng thái</Option>
                        {field.options.map((option, optionIndex) => (
                          <Option key={optionIndex} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    )}

                    {field.type !== "date" &&
                      field.type !== "select" &&
                      field.type !== "number" && (
                        <Input
                          className={field.class}
                          name={field.name}
                          placeholder={field.label}
                          value={formData[field.name] || ""}
                          onChange={(e) => {
                            handleInputChange(field.name, e.target.value);
                          }}
                        />
                      )}
                  </Form.Item>
                </div>
              );
            })}

            <Form.Item label=" ">
              <Popconfirm
                title="Thông báo"
                description="Bạn có chắc chắn muốn thêm không ?"
                onConfirm={() => {
                  handleSubmit();
                }}
                okText="Có"
                cancelText="Không"
              >
                <Button className="button-submit" key="submit" title="Thêm">
                  Thêm
                </Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        </Col>
        <Col lg={{ span: 12, offset: 0 }}>

            ádfghjk
        </Col>
      </Row>
    </div>
  );
}

export default UpdateVoucherManagement;
