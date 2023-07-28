import {
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
// import "./create-bill.css";
import "./style-bill.css";
import { useSelector } from "react-redux";
import { BillApi } from "../../../api/employee/bill/bill.api";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router";
import { FaShoppingBag } from "react-icons/fa";

function CreateBill() {
  const listProduct = useSelector((state) => state.bill.billWaitProduct.value);
  // const dispatch = useAppDispatch();
  const [isOpenDelivery, setIsOpenDelivery] = useState(false);

  const user = useSelector((state) => state.bill.billWaitProduct.user);
  const vouchers = useSelector((state) => state.bill.billWaitProduct.vouchers);

  var [provinces, setProvince] = useState([])
  var [districts, setDistricts] = useState([])
  var [Ward, setWards] = useState([])

  const [bill, setBill] = useState({
    phoneNumber: "",
    address: "",
    userName: "",
    itemDiscount: 0,
    totalMoney: 0,
    note: "",
    moneyShip: 0,
    billDetailRequests: listProduct,
    vouchers: vouchers
  });
  const navigate = useNavigate();
  const orderBill = (e) => {
    console.log(e);
    BillApi.createBillWait(bill).then((res) => {
      navigate("/bill-management/detail-bill/"+ res.data.data.id)
    })
  };



  useEffect(() => {
   

  }, []);

  
  //  begin voucher 
  const [voucher, setVoucher] = useState({
    idVoucher: "",
    beforPrice: 0,
    afterPrice: 0,
    discountPrice: 0
  })
 // dispatch(addVoucherBillWait(res.data.data));

  // end voucher  

  // begin modal product
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [product, setProduct] = useState({
    idProduct: "",
    quantity: 0,
    price: 0
  })
  const showModalProduct = (e) => {
    setIsModalProductOpen(true);
  };
  const handleOkProduct = () => {
    setIsModalProductOpen(false);
  };
  const handleCancelProduct = () => {
    setIsModalProductOpen(false);
  };
   // dispatch(addProductBillWait(res.data.data));

  //  end modal product

  // begin modal Account
  const [isModalAccountOpen, setIsModalAccountOpen] = useState(false);
  const showModalAccount = (e) => {
    setIsModalAccountOpen(true);
  };
  const handleOkAccount = () => {
    setIsModalAccountOpen(false);
  };
  const handleCancelAccount = () => {
    setIsModalAccountOpen(false);
  };

  // dispatch(addUserBillWait(res.data.data));

  //  end modal Account

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

  return (
    <div>
      <Row justify="space-between" >
        <Col span={3}>
          <Button type="primary" style={{fontSize: "medium", fontWeight: "500"}} onClick={e => navigate("/bill-management") }>Danh sách</Button>
        </Col>
        {/* <Col span={16}></Col> */}
        <Col span={4}>
          <Button type="primary" style={{fontSize: "medium", fontWeight: "500"}} onClick={e => showModalProduct(e)}>Thêm sản phẩm</Button>
        </Col>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: "20px" }}>
        <Row style={{ width: "100%" }}>
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
        <Row style={{ width: "100%" , marginBottom: "20px", borderBottom: "2px solid #ccc", padding: "12px"}}>
          <Col span={8}>
            <h2 style={{ margin: "10px 0 0 0px" }} >Tài khoản</h2>
          </Col>
          <Col span={12}></Col>
          <Col span={4} align={"end"} >
            <Button style={{ margin: "10px 00px 0px 0" }} onClick={e => showModalAccount(e)}>
              Chọn tài khoản
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <hr />
        </Row>
        <Row style={{ width: "100%" }}>
          {user != null ? (
            <Row style={{marginLeft: "20px", width: "100%"}}>
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
            <div style={{marginLeft: "20px", marginBottom: " 20px"}}>Tên khách hàng:         <span style={{backgroundColor: "#ccc", padding: "5px", marginLeft: "30px", borderRadius: '50px'}}>khách lẻ</span></div>
          )}
        </Row>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: "20px" }}>
        <Row style={{ width: "100%" , marginBottom: "20px", borderBottom: "2px solid #ccc", padding: "12px"}}>
          <Col span={8}>
            <h2>Khách hàng</h2>
          </Col>
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
                ><Col span={24}>
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
                  <Col span={24}>
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
                  <Col span={24}>
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
                  <Col span={24}>
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
                  <Col span={24}>
                    <TextArea
                      rows={4}
                      style={{ width: "90%" }}
                      placeholder="Ghi chú"
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
                <FaShoppingBag style={{width:"50px", height: "20px", margin: "4px"}}/>
              </Col>
              <Col span={22}>
                <h2 style={{ margin: "0px 0px 0px 10px" }}>Thông tin thanh toán</h2>
              </Col>
            </Row>
            <Row style={{ margin: "20px 0 5px 5px", width: "100%" }}>
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
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={5}>Tiền hàng: </Col>
              <Col span={10} align={"end"} style={{marginRight: "10px"}}>{} đ </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={8}>Phí vận chuyển: </Col>
              <Col span={10} align={"end"} style={{marginRight: "10px"}}>{} đ </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={5}>Giảm giá: </Col>
              <Col span={10} align={"end"} style={{marginRight: "10px"}}>{} đ </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={12} >
                <span style={{margin: "2px", fontWeight: "700px"}}>Tổng tiền:</span> </Col>
              <Col
                span={10}
                style={{ color: "red", fontSize: "18px", fontWeight: "bold",marginRight: "10px" }}
                align={"end"} 
              >
                {} đ{" "}
              </Col>
            </Row>
            <Row style={{ margin: "40px 20px 30px 0" }} justify="end">
              <Button type="primary" style={{backgroundColor: "black", fontWeight: "500"}} onClick={e => orderBill(e)} >Xác nhận đặt hàng</Button>
            </Row>
          </Col>
        </Row>
      </Row>

      {/* begin modal product */}
      <Modal title="Basic Modal" open={isModalProductOpen} onOk={handleOkProduct} onCancel={handleCancelProduct}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {/* end bigin modal product */}

      {/* begin modal product */}
      <Modal title="Basic Modal" open={isModalAccountOpen} onOk={handleOkAccount} onCancel={handleCancelAccount}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {/* end bigin modal product */}
    </div>
  );
}

export default CreateBill;
