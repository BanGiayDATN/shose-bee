import { background } from "@chakra-ui/react";
import { Button, Col, Row, Select, Table } from "antd";
import React, { useEffect } from "react";
import "./style-bill.css";
import moment from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AddressApi } from "../../../api/employee/address/address.api";
import { useAppDispatch } from "../../../app/hook";
import {
  getCity,
  getDistrict,
  getWard,
} from "../../../app/reducer/address.reducer";
import Search from "antd/es/input/Search";

function DetailsInvoicesCounter({ detailBill }) {
  var vouchers = [];
  const city = useSelector((state) => state.address.city);
  const district = useSelector((state) => state.address.district);
  const ward = useSelector((state) => state.address.ward);
  const dispatch = useAppDispatch();

  const onChangCity = (e) => {
    AddressApi.fetchDistrict(e.target.value).then((res) => {
      console.log(res.data.districts);
      dispatch(getDistrict(res.data.districts));
    });
  };

  const onChangDistrict = (e) => {
    AddressApi.fetchWard(e.target.value).then((res) => {
      dispatch(getWard(res.data.wards));
    });
  };

  useEffect(() => {
    AddressApi.fetchCity().then((res) => {
      dispatch(getCity(res.data));
    });
  }, []);

  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Mã sản phẩm</div>,
      dataIndex: "codeProduct",
      key: "codeProduct",
    },
    {
      title: <div className="title-product">Tên Sản Phẩm</div>,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <div className="title-product">Kích thước</div>,
      dataIndex: "nameSize",
      key: "nameSize",
    },
    {
      title: <div className="title-product">Màu</div>,
      dataIndex: "nameColor",
      key: "nameColor",
    },
    {
      title: <div className="title-product">Đế giày</div>,
      dataIndex: "nameSole",
      key: "nameSole",
    },
    {
      title: <div className="title-product">Chất liệu</div>,
      dataIndex: "nameMaterial",
      key: "nameMaterial",
    },
    {
      title: <div className="title-product">Giá</div>,
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: <div className="title-product">Số lượng </div>,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: <div className="title-product">Số lượng còn lại</div>,
      dataIndex: "quantityProductDetail",
      key: "quantityProductDetail",
    },
  ];

  return (
    <div>
      <Row style={{ backgroundColor: "white" }}>
        <Col span={16}>
          <Row>
            <Table
              dataSource={detailBill.children}
              columns={columns}
              rowKey="id"
              pagination={false} // Disable default pagination
              className="product-table"
            />
          </Row>
          <Row>
            <Col span={16}>
              <div class="mb-3">
                <label for="" class="form-label"></label>
                <textarea
                  class="form-control"
                  name=""
                  id=""
                  rows="10"
                ></textarea>
              </div>
            </Col>
            <Col span={8}>
              <Row>
                {" "}
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  //   onChange={handleChange}
                  placeholder={"Chọn mã giảm giá"}
                  tokenSeparators={[","]}
                  options={vouchers}
                />
              </Row>
              <Row>
                <Col span={12}>Tổng tiền hàng: </Col>
                <Col span={12}>0</Col>
              </Row>
              <Row>
                <Col span={12}>Giảm giá: </Col>
                <Col span={12}>0</Col>
              </Row>
              <hr />
              <Row>
                <Col span={12}>Khách cần trả: </Col>
                <Col
                  span={12}
                  style={{
                    color: "#237fcd",
                    fontSize: "1.8rem",
                    fontWeight: "700",
                  }}
                >
                  0
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={12}> Mã hóa đơn: {detailBill.father.code}</Col>
            <Col span={12}>
              {" "}
              Ngày tạo:{" "}
              {moment(detailBill.father.createdDate).format("DD-MM-YYYY")}
            </Col>
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={22}>
              {/* <Search
                placeholder="Tìm khách hàng"
                //   onSearch={onSearch}
                style={{
                  width: "100%",
                }}
              /> */}
            </Col>
            <Col span={2}>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                //   loading={loadings[2]}
                //   onClick={() => enterLoading(2)}
              />
            </Col>
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={12}> Khách thanh toán: </Col>
            <Col span={12}> 0 đ </Col>
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={12}> Hình thức: </Col>
            <Col span={12}> 0 đ </Col>
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Tên người người nhận  "
            />
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Số điện thoại"
            />
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Nhập Số nhà, ngõ, đường "
            />
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={4}>Tỉnh</Col>
            <Col span={20}>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  onChangCity(e);
                }}
              >
                <option selected disabled>
                  Open this select menu
                </option>
                {city.map((item) => (
                  <option value={item.code}>{item.name}</option>
                ))}
              </select>
            </Col>
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={4}>Quận</Col>
            <Col span={20}>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  onChangDistrict(e);
                }}
              >
                <option selected>Open this select menu</option>
                {district.map((item) => (
                  <option value={item.code}>{item.name}</option>
                ))}
              </select>
            </Col>
          </Row>
          <Row style={{ margin: "5px 0 5px 5px" }}>
            <Col span={4}>Phường xã</Col>
            <Col span={20}>
              <select class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                {ward.map((item) => (
                  <option value={item.code}>{item.name}</option>
                ))}
              </select>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DetailsInvoicesCounter;
