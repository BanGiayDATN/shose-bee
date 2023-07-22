import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Select, Space, Input, DatePicker } from "antd";
import { values } from "lodash";
import { RightOutlined } from "@ant-design/icons";

const data = [
  {
    id: "TAO_HOA_DON",
    name: "Tạo Hóa đơn",
  },
  {
    id: "CHO_XAC_NHAN",
    name: "Chờ xác nhận",
  },
  {
    id: "VAN_CHUYEN",
    name: "Đang vận chuyển",
  },
  {
    id: "DA_THANH_TOAN",
    name: "Đã thanh toán",
  },
  {
    id: "KHONG_TRA_HANG",
    name: "Thành công",
  },
  {
    id: "DA_HUY",
    name: "Đã hủy",
  },
  {
    id: "TRA_HANG",
    name: "Trả hàng",
  },
];

function FormSearch({
  fillter,
  changFillter,
  onChangeStatusBillInFillter,
  users,
  employess,
  status
}) {
  const { Option } = Select;
  const handleChange = (value) => {
    var arr = Object.keys(value).map(function (key) {
      return value[key];
    });
    onChangeStatusBillInFillter(arr);
  };
  const { RangePicker } = DatePicker;

  return (
    <div>
      <div>
        <Row style={{ marginTop: "15px" }}>
          <Col span={12}>
            <Row>
              <Col span={6} className="text">
                {" "}
                Mã hóa đơn:
              </Col>
              <Col span={18}>
                <Input
                  value={fillter.code}
                  onChange={(value) => changFillter(value.target.value, "code")}
                  placeholder="Nhập mã hóa đơn"
                  style={{ width: "98%" }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{marginLeft: "15px"}}>
              <Col span={6} className="text">
                {" "}
                Số điện thoại:
              </Col>
              <Col span={18}>
                <Input
                  value={fillter.phoneNumber}
                  onChange={(value) =>
                    changFillter(value.target.value, "phoneNumber")
                  }
                  placeholder="Nhập số điện thoại"
                  style={{ width: "98%" }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col span={12}>
            <Row>
              <Col span={6} className="text">
                {" "}
                Ngày tạo:
              </Col>
              <Col span={18}>
                <Row>
                  <Col span={11}>
                    <Input
                      type="date"
                      style={{ width: "98%" }}
                      value={fillter.startTimeString}
                      onChange={(value) =>
                        changFillter(value.target.value, "startTimeString")
                      }
                    />
                  </Col>
                  <Col
                    span={1}
                    style={{ textAlign: "center", margin: "6px 4px 0px 4px" }}
                  >
                    <RightOutlined />
                  </Col>
                  <Col span={11}>
                    <Input
                      type="date"
                      style={{ width: "98%" }}
                      value={fillter.endTimeString}
                      onChange={(value) =>
                        changFillter(value.target.value, "endTimeString")
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{marginLeft: "15px"}}>
              <Col span={6} className="text">
                {" "}
                Ngày thanh toán:
              </Col>
              <Col span={18}>
                <Row>
                  <Col span={11}>
                    <Input
                      type="date"
                      style={{ width: "98%" }}
                      value={fillter.startDeliveryDateString}
                      onChange={(value) =>
                        changFillter(
                          value.target.value,
                          "startDeliveryDateString"
                        )
                      }
                    />
                  </Col>
                  <Col
                    span={1}
                    style={{ textAlign: "center", margin: "6px 4px 0px 4px" }}
                  >
                    <RightOutlined />
                  </Col>
                  <Col span={11}>
                    <Input
                      type="date"
                      style={{ width: "98%" }}
                      value={fillter.endDeliveryDateString}
                      onChange={(value) =>
                        changFillter(
                          value.target.value,
                          "endDeliveryDateString"
                        )
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col span={12}>
            <Row>
              <Col span={6} className="text">
                {" "}
                Nhân viên:
              </Col>
              <Col span={18}>
                <Select
                 style={{ width: "98%" }}
                  value={fillter.employees}
                  onChange={(value) =>
                    changFillter(value, "employees")
                  }
                  defaultValue=""
                >
                  <Option value="">Tất cả</Option>
                  {employess.map((employee, index) => (
                    <Option key={index} value={employee.id}>
                      {employee.userName}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{marginLeft: "15px"}}>
              <Col span={6} className="text">
                {" "}
                Khách hàng:
              </Col>
              <Col span={18}>
              <Select
                  style={{ width: "98%" }}
                  value={fillter.user}
                  onChange={(value) =>
                    changFillter(value, "user")
                  }
                  defaultValue=""
                >
                  <Option value="">Tất cả</Option>
                  {users.map((user, index) => (
                    <Option key={index} value={user.id}>
                      {user.userName}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col span={12}>
            <Row className="text">Trạng thái: </Row>
            <Row>
              <Select
                mode="multiple"
                style={{ width: "98%" }}
                placeholder="Chọn trạng thái"
                defaultValue={fillter.status}
                onChange={(value) => handleChange(value)}
                optionLabelProp="label"
                allowClear
                value={status}
              >
                {data.map((item, index) => (
                  <Option value={item.id} label={item.name} key={index}>
                    <Space>{item.name}</Space>
                  </Option>
                ))}
              </Select>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{marginLeft: "15px"}}>
              <Col span={6} className="text">
                Phương thức:
              </Col>
              <Col span={18}>
                <Row>
                  <input
                    type="radio"
                    className=" "
                    id="exampleFormControlInput1"
                    name={"type"}
                    onChange={(value) =>
                      changFillter(value.target.value, "type")
                    }
                    value={1}
                  />{" "}
                  Tại quầy
                </Row>
                <Row>
                  <input
                    type="radio"
                    className=" "
                    id="exampleFormControlInput1"
                    name={"type"}
                    onChange={(value) =>
                      changFillter(value.target.value, "type")
                    }
                    value={0}
                  />{" "}
                  Online
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FormSearch;