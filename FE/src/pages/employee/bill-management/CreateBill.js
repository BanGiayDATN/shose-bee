import {
  PoweroffOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  PlusCircleOutlined,
  BarcodeOutlined,
  AndroidOutlined,
  RetweetOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
// import "./create-bill.css";
import "./style-bill.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hook";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { addbillWait, getAllBillWait } from "../../../app/reducer/Bill.reducer";
import DetailsInvoicesCounter from "./DetailsInvoicesCounter";
import TextArea from "antd/es/input/TextArea";

function CreateBill() {
  // const listBillWait = useSelector((state) => state.bill.billWait.value);
  // const dispatch = useAppDispatch();
  const [isOpenDelivery, setIsOpenDelivery] = useState(false);
  const user = null;

  // console.log(user !== {});
  // const onSearch = () => {
  //   console.log(123);
  // };

  const test = (e) => {
    setIsOpenDelivery(!isOpenDelivery);
  };

  // useEffect(() => {
  //   BillApi.getAllBillWait().then((res) => {
  //     dispatch(getAllBillWait(res.data.data));
  //   });
  // }, []);

  // const createBillWait = () => {
  //   BillApi.createBillWait().then((res) => {
  //     dispatch(addbillWait(res.data.data));
  //   });
  // };

  // begin update code

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
      title: <div className="title-product">Hành động</div>,
      render: <InputNumber addonBefore="+" addonAfter="-" defaultValue={100} />,
    },
  ];

  // end update code
  return (
    <div>
      <Row>
        <Col span={3}>
          <Button type="primary">Danh sách hóa đơn</Button>
        </Col>
        <Col span={18}></Col>
        <Col span={3}>
          <Button type="primary">Thêm sản phẩm</Button>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: "20px" }}>
        <Row>
          {" "}
          <Table
            dataSource={[]}
            columns={columns}
            rowKey="id"
            style={{ width: "100%" }}
            pagination={false} // Disable default pagination
            className="product-table"
          />
        </Row>
        <Row justify="end" style={{ marginBottom: "10px", width: "100%" }}>
          <Col span={3}>Tổng tiền: </Col>
          <Col span={4}>{}</Col>
        </Row>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: "20px" }}>
        <Row style={{ width: "100%" }}>
          <Col span={8}>
            <h2 style={{ margin: "10px 0 0 10px" }}>Tài khoản</h2>
          </Col>
          <Col span={12}></Col>
          <Col span={3}>
            <Button style={{ margin: "10px 10px 0px 0" }}>
              Chọn tài khoản
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <hr />
        </Row>
        <Row style={{ width: "100%" }}>
          {user != null ? (
            <Row style={{marginLeft: "10px", width: "100%"}}>
              <Row style={{ width: "100%", marginBottom: " 20px" }}>
                <Col span={5}>Tên khách hàng: </Col>
                <Col span={19}>{}</Col>
              </Row>
              <Row style={{ width: "100%", marginBottom: " 20px" }}>
                <Col span={5}>Số điện thoại: </Col>
                <Col span={19}>{}</Col>
              </Row>
              <Row style={{ width: "100%", marginBottom: " 20px" }}>
                <Col span={5}>email: </Col>
                <Col span={19}>{}</Col>
              </Row>
            </Row>
          ) : (
            <div style={{marginLeft: "10px", marginBottom: " 20px"}}>Tên khách hàng:         <span style={{backgroundColor: "#ccc", padding: "5px", marginLeft: "30px"}}>khách lẻ</span></div>
          )}
        </Row>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: "20px" }}>
        <Row style={{ width: "100%", margin: "2px 0 2px 10px" }}>
          <Col span={8}>
            <h2>Khách hàng</h2>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <hr></hr>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={14}>
            {isOpenDelivery ? (
              <div>
                <Row
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Col span={5}> Họ và tên: </Col>
                  <Col span={19}>
                    {" "}
                    <Input
                      placeholder="Nhập họ và tên"
                      style={{ width: "90%" }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Col span={5}> Số điện thoại: </Col>
                  <Col span={19}>
                    {" "}
                    <Input
                      placeholder="Nhập số điện thoại"
                      style={{ width: "90%" }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Col span={5}> Địa chỉ: </Col>
                  <Col span={19}>
                    {" "}
                    <Input
                      placeholder="Nhập địa chỉ"
                      style={{ width: "90%" }}
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Col span={5}></Col>
                  <Col span={19}>
                    <Row style={{ width: "100%" }}>
                      <Col span={7}>
                        {" "}
                        <Select
                          showSearch
                          placeholder="Chọn tỉnh"
                          optionFilterProp="children"
                          // onChange={onChange}
                          // onSearch={onSearch}
                          style={{ width: "90%" }}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[]}
                        />
                      </Col>
                      <Col span={8}>
                        {" "}
                        <Select
                          showSearch
                          placeholder="Chọn Quận"
                          optionFilterProp="children"
                          style={{ width: "90%" }}
                          // onChange={onChange}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[]}
                        />
                      </Col>
                      <Col span={7}>
                        {" "}
                        <Select
                          showSearch
                          placeholder="Chọn Phường xã"
                          optionFilterProp="children"
                          style={{ width: "95%" }}
                          // onChange={onChange}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[]}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Col span={5}> Ghi chú: </Col>
                  <Col span={19}>
                    <TextArea
                      rows={4}
                      style={{ width: "90%" }}
                      placeholder="ghi chú"
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <div></div>
            )}
          </Col>
          <Col span={10}>
            <Row style={{ width: "100%" }}>
              <Col span={2}>
                <ShoppingCartOutlined />
              </Col>
              <Col span={22}>
                <h3 style={{ margin: "0px" }}>Thông tin thanh toán</h3>
              </Col>
            </Row>
            <Row style={{ margin: "10px 0 5px 5px", width: "100%" }}>
              <Col span={5}> Giao hàng: </Col>
              <Col span={12}>
                <label class="switch" for="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    defaultChecked={isOpenDelivery}
                    onChange={(e) => setIsOpenDelivery(e.target.checked)}
                  />
                  <div class="slider round"></div>
                </label>
              </Col>
            </Row>
            <Row style={{ margin: "10px 0 " }}>
              <Select
                mode="multiple"
                size={"middle"}
                placeholder="Chọn mã giảm giá"
                defaultValue={[]}
                // onChange={handleChange}
                style={{
                  width: "90%",
                }}
                options={[]}
              />
            </Row>
            <Row justify="space-between" style={{ marginTop: "10px" }}>
              <Col span={5}>Tiền hàng: </Col>
              <Col span={10} align={"end"} style={{marginRight: "10px"}}>{} đ </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "10px" }}>
              <Col span={8}>Phí vận chuyển: </Col>
              <Col span={10} align={"end"} style={{marginRight: "10px"}}>{} đ </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "10px" }}>
              <Col span={5}>Giảm giá: </Col>
              <Col span={10} align={"end"} style={{marginRight: "10px"}}>{} đ </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "10px" }}>
              <Col span={12} >Tổng tiền: </Col>
              <Col
                span={10}
                style={{ color: "red", fontSize: "18px", fontWeight: "bold",marginRight: "10px" }}
                align={"end"} 
              >
                {} đ{" "}
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }} justify="end">
              <Button type="primary">Xác nhận đặt hàng</Button>
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default CreateBill;
