import { ShoppingCartOutlined } from "@ant-design/icons";
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
import "./create-bill.css";
import "./style-bill.css";
import { useSelector } from "react-redux";
import { BillApi } from "../../../api/employee/bill/bill.api";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router";
import { FaShoppingBag } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {CiDeliveryTruck} from 'react-icons/ci';
import {
  GetCustomer,
  SetCustomer,
} from "../../../app/reducer/Customer.reducer";
import { CustomerApi } from "../../../api/employee/account/customer.api";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { addUserBillWait } from "../../../app/reducer/Bill.reducer";
import { PromotionApi } from "../../../api/employee/promotion/Promotion.api";
import { GetPromotion, SetPromotion } from "../../../app/reducer/Promotion.reducer";
import dayjs from "dayjs";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import { GetProduct, SetProduct } from "../../../app/reducer/Product.reducer";
import { MaterialApi } from "../../../api/employee/material/Material.api";
import { CategoryApi } from "../../../api/employee/category/category.api";
import { SoleApi } from "../../../api/employee/sole/sole.api";
import { BrandApi } from "../../../api/employee/brand/Brand.api";
import ModalAddProductDetail from "./modal/ModalAddProductDetail";

function CreateBill() {
  const listProduct = useSelector((state) => state.bill.billWaitProduct.value);
  // const dispatch = useAppDispatch();
  const [isOpenDelivery, setIsOpenDelivery] = useState(false);

  //  begin khách hàng
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
  const [listaccount, setListaccount] = useState([]);
  const [initialCustomerList, setInitialCustomerList] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState({
    keyword: "",
    status: "",
  });
  const dispatch = useAppDispatch();
  const data = useAppSelector(GetCustomer);
  useEffect(() => {
    if (data != null) {
      setListaccount(data);
    }
  }, [data]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    CustomerApi.fetchAll().then(
      (res) => {
        const accounts = res.data.data.map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));
        setListaccount(res.data.data);
        setInitialCustomerList(accounts);
        dispatch(SetCustomer(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
    PromotionApi.fetchAll().then(
      (res) => {
        const data = []
        res.data.data.map(item =>{
          if(item.status == "DANG_SU_DUNG" 
          // && item.quantity != null
          // && item.quantity > 0
          ){
            data.push(item)
          }
        })
        dispatch(SetPromotion(data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleInputChangeSearch = (name, value) => {
    setSearchCustomer((prevSearchCustomer) => ({
      ...prevSearchCustomer,
      [name]: value,
    }));
  };

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    handleInputChangeSearch("keyword", value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    const { keyword, status } = searchCustomer;

    CustomerApi.fetchAll({ status }).then((res) => {
      const filteredCustomers = res.data.data
        .filter(
          (customer) =>
            customer.fullName.toLowerCase().includes(keyword) ||
            customer.email.includes(keyword) ||
            customer.phoneNumber.includes(keyword)
        )
        .map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));
      setListaccount(filteredCustomers);
      dispatch(SetCustomer(filteredCustomers));
    });
  };
  const columnsAccount = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh",
      dataIndex: "avata",
      key: "avata",
      render: (avata) => (
        <img
          src={avata}
          alt="Hình ảnh"
          style={{ width: "150px", height: "110px", borderRadius: "20px" }}
        />
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: "Điểm",
      dataIndex: "points",
      key: "points",
      sorter: (a, b) => a.points.localeCompare(b.points),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Kích hoạt " : "Ngừng kích hoạt"}
          </button>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
         <Button
            type="dashed"
            title="Chọn"
            style={{ color: "#02bdf0", border: "1px solid #02bdf0", fontWeight: "500" }}
            onClick={() => selectedAccount(record)}
          >Chọn</Button>
        </div>
      ),
    },
  ];
  const selectedAccount = (record) =>{
    dispatch(addUserBillWait(record));
    setIsModalAccountOpen(true);
  }
  // end khách hàng
  const user = useSelector((state) => state.bill.billWaitProduct.user);
  const vouchers = useSelector((state) => state.bill.billWaitProduct.vouchers);

  var [provinces, setProvince] = useState([]);
  var [districts, setDistricts] = useState([]);
  var [Ward, setWards] = useState([]);

  const [bill, setBill] = useState({
    phoneNumber: "",
    address: "",
    userName: "",
    itemDiscount: 0,
    totalMoney: 0,
    note: "",
    moneyShip: 0,
    billDetailRequests: listProduct,
    vouchers: vouchers,
  });
  const navigate = useNavigate();
  const orderBill = (e) => {
    console.log(e);
    BillApi.createBillWait(bill).then((res) => {
      navigate("/bill-management/detail-bill/" + res.data.data.id);
    });
  };

  useEffect(() => {}, []);

  //  begin voucher

  const [isModalVoucherOpen, setIsModalVoucherOpen] = useState(false);
  const showModalVoucher = (e) => {
    setIsModalVoucherOpen(true);
  };
  const handleOkVoucher = () => {
    setIsModalVoucherOpen(false);
  };
  const handleCancelVoucher = () => {
    setIsModalVoucherOpen(false);
  };

  const [listVoucher, setListVoucher] = useState([]);
  const [keyVoucher, setKeyVoucher] = useState("");
  const searchVoucher = (e) =>{
    var fillter = {
      code: keyVoucher,
      name: keyVoucher,
      quantity: keyVoucher
    }
    PromotionApi.fetchAll(fillter).then(
      (res) => {
        const data = []
        res.data.data.map(item =>{
          if(item.status == "DANG_SU_DUNG" 
          && item.quantity != null
          && item.quantity > 0
          ){
            data.push(item)
          }
        })
        dispatch(SetPromotion(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  const dataVoucher = useAppSelector(GetPromotion);
  useEffect(() => {
    if (data != null) {
      setListVoucher(dataVoucher);
    }
  }, [dataVoucher]);

  const columnsVoucher = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Mã ",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Tên ",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: "Giá trị ",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value - b.value,
      render: (value) =>(
        <span>
        {value >= 1000
          ? value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          : value + " đ"}
      </span>
      )
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Thời gian",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => a.startDate - b.startDate,
      render: (date, record) =>{
        const start = moment(date).format(" DD-MM-YYYY");
        const end = moment(record.endDate).format(" DD-MM-YYYY");
        return (
          <span>{start +" > "+ end}</span>
        )
      },
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
           <Button
            type="primary"
            title="Chọn"
            style={{ color: "#02bdf0", border: "1px solid #02bdf0", fontWeight: "500", backgroundColor: "white" }}
            onClick={() => selectedVoucher(record)}
          >
            Chọn
          </Button>
        </div>
      ),
    },
  ];

  const selectedVoucher = (record) => {
    setVoucher({
      idVoucher: record.id,
      beforPrice: 0,
      afterPrice: 0,
      discountPrice: record.value,
    })
    setCodeVoucher(record.code)
    setIsModalVoucherOpen(false);
  }

  const [voucher, setVoucher] = useState({
    idVoucher: "",
    beforPrice: 0,
    afterPrice: 0,
    discountPrice: 0,
  });

  const [codeVoucher, setCodeVoucher] = useState("");
  // dispatch(addVoucherBillWait(res.data.data));

  // end voucher

  // begin modal product
  const [listProductDetail, setListProductDetail] = useState([]);
  const [search, setSearch] = useState("");
  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  // const [listSize, setListSize] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [product, setProduct] = useState({
    productDetail: {
      image: "",
      productName: "",
      price: 0,
      nameSize: "",
      quantity: 0,
    },
    idProduct: "",
    quantity: 0,
    price: 0,
  });

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

  const columns = [
    {
      title: (
        <div className="title-product" style={{ width: "70%" }}>
          {" "}
          sản phẩm
        </div>
      ),
      dataIndex: "productDetail",
      key: "productDetail",
      render: (item) => {
        return (
          <Row style={{ marginTop: "10px" }}>
            <Col span={5}>
              <img
                src={item.image}
                alt="Ảnh sản phẩm"
                style={{
                  width: "170px",
                  borderRadius: "10%",
                  height: "140px",
                  marginLeft: "5px",
                }}
              />
            </Col>
            <Col span={19}>
              <Row>
                {" "}
                <span
                  style={{
                    fontSize: "19",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  {item.productName}
                </span>{" "}
              </Row>
              <Row>
                <span style={{ color: "red", fontWeight: "500" }}>
                  {item.price >= 1000
                    ? item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : item.price + " đ"}
                </span>{" "}
              </Row>
              <Row>
                <span style={{ fontSize: "12", marginTop: "10px" }}>
                  Size: {item.nameSize}
                </span>{" "}
              </Row>
              <Row>
                <span style={{ fontSize: "12" }}>x {item.quantity}</span>{" "}
              </Row>
            </Col>
          </Row>
        );
      },
    },
    {
      title: <div className="title-product">Số lượng </div>,
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <div style={{ marginTop: 16 }}>
          <label>Số lượng:</label>
          <Button style={{ margin: "0 4px 0 10px" }}>-</Button>
          <InputNumber
            min={1}
            value={quantity}
            // onChange={(value) => setQuantity(value)}
          />
          <Button style={{ margin: "0 4px 0 4px" }}>+</Button>
        </div>
      ),
    },
    {
      title: <div className="title-product">Giá</div>,
      dataIndex: "product",
      key: "product",
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            {item.price * item.quantity >= 1000
              ? (item.price * item.quantity).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : item.price * item.quantity + " đ"}
          </span>{" "}
        </div>
      ),
    },

    {
      title: <div className="title-product">Thao tác</div>,
      render: () => (
        <Button
          style={{
            color: "#eb5a36",
            marginLeft: "20px",
            fontWeight: "500",
            marginBottom: "30px",
            border: "1px solid #eb5a36",
            borderRadius: "10px",
          }}
        >
          Xóa khỏi hàng
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between">
        <Col span={3}>
          <Button
            type="primary"
            style={{ fontSize: "medium", fontWeight: "500" }}
            onClick={(e) => navigate("/bill-management")}
          >
            Danh sách
          </Button>
        </Col>
        {/* <Col span={16}></Col> */}
        <Col span={4}>
          <Button
            type="primary"
            style={{ fontSize: "medium", fontWeight: "500" }}
            onClick={(e) => showModalProduct(e)}
          >
            Thêm sản phẩm
          </Button>
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
        <Row
          style={{
            width: "100%",
            marginBottom: "20px",
            borderBottom: "2px solid #ccc",
            padding: "12px",
          }}
        >
          <Col span={8}>
            <h2 style={{ margin: "10px 0 0 0px" }}>Tài khoản</h2>
          </Col>
          <Col span={12}></Col>
          <Col span={4} align={"end"}>
            <Button
              style={{ margin: "10px 00px 0px 0" }}
              onClick={(e) => showModalAccount(e)}
            >
              Chọn tài khoản
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <hr />
        </Row>
        <Row style={{ width: "100%" }}>
          {user != null ? (
            <Row style={{ marginLeft: "20px", width: "100%" }}>
              <Row style={{ width: "100%", marginBottom: " 20px" }}>
                <Col span={5}>Tên khách hàng: </Col>
                <Col span={19}>{user.fullName}</Col>
              </Row>
              <Row style={{ width: "100%", marginBottom: " 20px" }}>
                <Col span={5}>Số điện thoại: </Col>
                <Col span={19}>{user.phoneNumber}</Col>
              </Row>
              <Row style={{ width: "100%", marginBottom: " 20px" }}>
                <Col span={5}>email: </Col>
                <Col span={19}>{user.email}</Col>
              </Row>
            </Row>
          ) : (
            <div style={{ marginLeft: "20px", marginBottom: " 20px" }}>
              Tên khách hàng:{" "}
              <span
                style={{
                  backgroundColor: "#ccc",
                  padding: "5px 20px",
                  marginLeft: "30px",
                  borderRadius: "50px",
                }}
              >
                khách lẻ
              </span>
            </div>
          )}
        </Row>
      </Row>
      <Row style={{ backgroundColor: "white", marginTop: "20px" }}>
        <Row
          style={{
            width: "100%",
            marginBottom: "20px",
            borderBottom: "2px solid #ccc",
            padding: "12px",
          }}
        >
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
                >
                  <Col span={24}>
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
                <Row style={{marginTop: "30px", marginLeft: "10px", width: "100%"}}>
                <Col span={2} >
                <CiDeliveryTruck style={{height: "30px", width: "50px"}}/>
                </Col>
                <Col span={22} style={{display: "flex", alignItems: "center", fontWeight: "500"}}>
                <span>Thời gian nhận hàng dự kiến: {}</span>
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
                <FaShoppingBag
                  style={{ width: "50px", height: "20px", margin: "4px" }}
                />
              </Col>
              <Col span={22}>
                <h2 style={{ margin: "0px 0px 0px 10px" }}>
                  Thông tin thanh toán
                </h2>
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
              <Col span={16}>
              <Input style={{width: "100%", backgroundColor: "white"}} disabled value={codeVoucher}/>
              </Col>
              <Col span={1}></Col>
              <Col span={3}>
              <Button type="dashed" onClick={(e) => showModalVoucher(e)}>Chọn mã</Button>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={5}>Tiền hàng: </Col>
              <Col span={10} align={"end"} style={{ marginRight: "10px" }}>
                {} đ{" "}
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={8}>Phí vận chuyển: </Col>
              <Col span={10} align={"end"} style={{ marginRight: "10px" }}>
                {} đ{" "}
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={5}>Giảm giá: </Col>
              <Col span={10} align={"end"} style={{ marginRight: "10px" }}>
                {} đ{" "}
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={12}>
                <span style={{ margin: "2px", fontWeight: "700px" }}>
                  Tổng tiền:
                </span>{" "}
              </Col>
              <Col
                span={10}
                style={{
                  color: "red",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
                align={"end"}
              >
                {} đ{" "}
              </Col>
            </Row>
            <Row style={{ margin: "40px 20px 30px 0" }} justify="end">
              <Button
                type="primary"
                style={{ backgroundColor: "black", fontWeight: "500" }}
                onClick={(e) => orderBill(e)}
              >
                Xác nhận đặt hàng
              </Button>
            </Row>
          </Col>
        </Row>
      </Row>

      {/* begin modal product */}
      <Modal
        title="Basic Modal"
        open={isModalProductOpen}
        onOk={handleOkProduct}
        onCancel={handleCancelProduct}
        width={1000}
      >
        <ModalAddProductDetail/>
      </Modal>
      {/* end bigin modal product */}

      {/* begin modal Account */}
      <Modal
        title="Khách hàng"
        open={isModalAccountOpen}
        onOk={handleOkAccount}
        className="account"
        onCancel={handleCancelAccount}
      >
        <Row style={{ width: "100%" }}>
          <Col span={20}>
            <Input
              style={{
                // width: "250px",
                height: "38px",
                marginRight: "8px",
              }}
              placeholder="Tìm kiếm"
              type="text"
              name="keyword"
              value={searchCustomer.keyword}
              onChange={handleKeywordChange}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={3}>
            {" "}
            <Button
              className="btn_filter"
              type="submit"
              onClick={handleSubmitSearch}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%", marginTop: "20px" }}>
          <Table
          style={{width: "100%"}}
            dataSource={listaccount}
            rowKey="id"
            columns={columnsAccount}
            pagination={{ pageSize: 3 }}
            className="customer-table"
          />
        </Row>
      </Modal>
      {/* end  modal Account */}

      {/* begin modal voucher */}
      <Modal title="Mã giảm giá" width={1000} open={isModalVoucherOpen} onOk={handleOkVoucher} onCancel={handleCancelVoucher}>
      <Row style={{ width: "100%" }}>
          <Col span={20}>
            <Input
              style={{
                // width: "250px",
                height: "38px",
                marginRight: "8px",
              }}
              placeholder="Tìm kiếm"
              type="text"
              name="keyword"
              value={keyVoucher}
              onChange={(e) => {setKeyVoucher(e.target.value)}}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={3}>
            {" "}
            <Button
              className="btn_filter"
              type="submit"
              onClick={(e) => searchVoucher(e)}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%", marginTop: "20px" }}>
        <Table
            dataSource={listVoucher}
            rowKey="id"
            style={{ width: "100%",}}
            columns={columnsVoucher}
            pagination={{ pageSize: 5 }}
            // rowClassName={(record, index) =>
            //   index % 2 === 0 ? "even-row" : "odd-row"
            // }
          />
        </Row>
      
      </Modal>
      {/* end modal voucher */}
    </div>
  );
}

export default CreateBill;
