import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Select, Space } from "antd";

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
  }
];

function Search({ fillter, changFillter, onChangeStatusBillInFillter,  users, employess }) {
  const { Option } = Select;
  const handleChange = (value) => {
    var arr = Object.keys(value).map(function (key) {
      return value[key];
    });
    onChangeStatusBillInFillter(arr)
  };

  // begin check outslide

  return (
    <div>
      <div>
        <Row>
          <Col span={12}>
            <Row className="text">Mã hóa đơn: </Row>
            <Row>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => changFillter(e)}
                value={fillter.code}
                name="code"
              />
            </Row>
          </Col>
          <Col span={12}>
            <Row className="text">Số điện thoại: </Row>
            <Row>
              <input
                type="text"
                className="form-control "
                id="phone"
                name={"phoneNumber"}
                onChange={(e) => changFillter(e)}
                value={fillter.phoneNumber}
              />
            </Row>
          </Col>
          <Col span={12}>
            <Row className="text">Ngày tạo:</Row>
            <Row>
              <Col span={12}>
                <input
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  onChange={(e) => changFillter(e)}
                  name="startTimeString"
                  value={fillter.startTime}
                />
              </Col>
              <Col span={12}>
                <input
                  type="date"
                  className="form-control "
                  id="exampleFormControlInput1"
                  onChange={(e) => changFillter(e)}
                  name="endTimeString"
                  value={fillter.endTime}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="text">Ngày thanh toán:</Row>
            <Row>
              <Col span={12}>
                <input
                  type="date"
                  className="form-control "
                  id="exampleFormControlInput1"
                  onChange={(e) => changFillter(e)}
                  value={fillter.startDeliveryDate}
                  name={"startDeliveryDateString"}
                />
              </Col>
              <Col span={12}>
                <input
                  type="date"
                  className="form-control "
                  id="exampleFormControlInput1"
                  onChange={(e) => changFillter(e)}
                  value={fillter.endDeliveryDate}
                  name={"endDeliveryDateString"}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
         
          <Col span={12}>
            <Row className="text">Nhân viên:</Row>
            <Row>
              <select
                value={fillter.employees}
                className="form-select"
                aria-label="Default select example"
                name={"employees"}
                onChange={(e) => changFillter(e)}
              >
                <option value={""} disabled>
                  Open this select menu
                </option>
                {employess.map((item, index) => (
                  <option value={item.id} key={item.id}>
                    {item.userName}
                  </option>
                ))}
              </select>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="text">Khách hàng:</Row>
            <Row>
              <select
                value={fillter.user}
                className="form-select"
                aria-label="Default select example"
                name={"user"}
                onChange={(e) => changFillter(e)}
              >
                <option value={""} disabled>
                  Open this select menu
                </option>
                {users.map((item, index) => (
                  <option value={item.id} key={item.id}>
                    {item.userName}
                  </option>
                ))}
              </select>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="text">Trạng thái: </Row>
            <Row>
              <Select
                mode="multiple"
                style={{ width: "95%" }}
                placeholder="Chọn trạng thái"
                defaultValue={fillter.status}
                onChange={handleChange}
                optionLabelProp="label"
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
            <Row className="text">Phương thức:</Row>
            <Row>
              <input
                type="radio"
                className=" "
                id="exampleFormControlInput1"
                name={"type"}
                onChange={(e) => changFillter(e)}
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
                onChange={(e) => changFillter(e)}
                value={0}
              />{" "}
              Online
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Search;
