import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
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
import { BsTrash } from "react-icons/bs";
import "./style-bill.css";
import { useSelector } from "react-redux";
import { BillApi } from "../../../api/employee/bill/bill.api";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router";
import { FaShoppingBag } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { CiDeliveryTruck } from "react-icons/ci";
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
import {
  GetPromotion,
  SetPromotion,
} from "../../../app/reducer/Promotion.reducer";
import ModalAddProductDetail from "./modal/ModalAddProductDetail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { AddressApi } from "../../../api/customer/address/address.api";
import { set } from "lodash";

function CreateBill() {
  const listProduct = useSelector((state) => state.bill.billWaitProduct.value);
  const [products, setProducts] = useState([]);
  const [billRequest, setBillRequest] = useState({
    phoneNumber: "",
    address: "",
    userName: "",
    idUser: "",
    itemDiscount: 0,
    totalMoney: 0,
    note: "",
    moneyShip: 0,
    billDetailRequests: [],
    vouchers: [],
  });

  const [address, setAddress] = useState({
    city: "",
    district: "",
    wards: "",
    detail: "",
  });

  const onChangeAddress = (fileName, value) => {
    setAddress({ ...address, [fileName]: value });
  };

  const typeAddProductBill = "CREATE_BILL";

  const initialValues = {
    status: "DANG_SU_DUNG",
  };

  const ChangeBillRequest = (filleName, value) => {
    setBillRequest({ ...billRequest, [filleName]: value });
  };
  // const dispatch = useAppDispatch();
  const [isOpenDelivery, setIsOpenDelivery] = useState(false);
  const { Option } = Select;
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
  //tạo list chứa tỉnh, quận/huyện, xã/phường, ngày dự kiến ship, phí ship
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [dayShip, setDayShip] = useState([]);
  const [shipFee, setShipFee] = useState(0);
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
    loadDataProvince();
    dispatch(addUserBillWait(null));
  }, []);

  const loadData = () => {
    CustomerApi.fetchAll().then(
      (res) => {
        const accounts = res.data.data.map((customer, index) => ({
          ...customer,
          stt: index + 1,
        }));
        console.log("hdkjsahdkjas");
        console.log(accounts);
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
        const data = [];
        res.data.data.map((item) => {
          if (
            item.status == "DANG_SU_DUNG"
            // && item.quantity != null
            // && item.quantity > 0
          ) {
            data.push(item);
          }
        });
        dispatch(SetPromotion(data));
      },
      (err) => {
        console.log(err);
      }
    );
  };
  //load data tỉnh
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
  //load data quận/huyện khi chọn tỉnh
  const handleProvinceChange = (value, valueProvince) => {
    // form.setFieldsValue({ provinceId: valueProvince.valueProvince });
    setAddress({ ...address, city: valueProvince.value });
    AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
      (res) => {
        setListDistricts(res.data.data);
      }
    );
  };
  //load data xã/phường khi chọn quận/huyện
  const handleDistrictChange = (value, valueDistrict) => {
    setAddress({ ...address, district: valueDistrict.value });
    // form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
  };

  //load data phí ship và ngày ship
  const handleWardChange = (value, valueWard) => {
    // form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
    setAddress({ ...address, wards: valueWard.value });
    AddressApi.fetchAllMoneyShip(
      valueWard.valueDistrict,
      valueWard.valueWard
    ).then((res) => {
      setShipFee(res.data.data.total);
    });
    AddressApi.fetchAllDayShip(
      valueWard.valueDistrict,
      valueWard.valueWard
    ).then((res) => {
      const leadtimeInSeconds = res.data.data.leadtime;
      const formattedDate = moment.unix(leadtimeInSeconds).format("DD/MM/YYYY");
      setDayShip(formattedDate);
    });
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
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
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
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="dashed"
            title="Chọn"
            style={{
              color: "#02bdf0",
              border: "1px solid #02bdf0",
              fontWeight: "500",
            }}
            onClick={() => selectedAccount(record)}
          >
            Chọn
          </Button>
        </div>
      ),
    },
  ];
  const selectedAccount = (record) => {
    setBillRequest({
      ...billRequest,
      phoneNumber: record.phoneNumber,
      userName: record.fullName,
      idUser: record.id,
    });
    dispatch(addUserBillWait(record));
    setIsModalAccountOpen(false);
  };
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

  const checkNotEmptyBill = () => {
    return Object.keys(billRequest)
      .filter((key) => key !== "note")
      .every((key) => billRequest[key] !== "");
  };
  const checkNotEmptyAddress = () => {
    return (
      Object.keys(address).filter((key) => address[key] !== "").length ===
      Object.keys(address).length - 1
    );
  };

  const orderBill = (e) => {
    var newProduct = products.map((product) => ({
      idProduct: product.idProduct,
      size: product.nameSize,
      quantity: product.quantity,
      price: product.price,
    }));
    var newVoucher = [];
    if (voucher.idVoucher != "") {
      newVoucher.push(voucher);
    }
    var totalBill = products.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    var addressuser = ""
    if(checkNotEmptyAddress()){
       addressuser =
    address.detail +
    ", " +
    address.wards +
    ", " +
    address.district +
    ", " +
    address.city;
    }
    var idAccount = ""
    if(user != null){
      console.log(user);
      idAccount = user.idAccount
    }
    var data = {
                phoneNumber: billRequest.phoneNumber,
                address: addressuser,
                userName: billRequest.userName,
                itemDiscount: voucher.discountPrice,
                totalMoney: totalBill,
                note: billRequest.note,
                typeBill: 'OFFLINE',
                moneyShip: shipFee,
                billDetailRequests: newProduct,
                vouchers: newVoucher,
                idUser: idAccount
              };
              console.log(data);
    if (isOpenDelivery) {
      if (checkNotEmptyAddress() && checkNotEmptyBill()) {
        if (totalBill > 0) {
          Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có xác nhận đặt hàng không?",
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: async () => {
              await BillApi.createBillWait(data).then((res) => {
                navigate("/bill-management/detail-bill/" + res.data.data.id);
              });
            },
            onCancel: () => {},
          });
        } else {
          toast("vui lòng chọn sản phẩm");
        }
      } else {
        toast("Vui lòng Nhập địa chỉ");
      }
    } else {
      if (totalBill > 0) {
        Modal.confirm({
          title: "Xác nhận",
          content: "Bạn có xác nhận đặt hàng không?",
          okText: "Đồng ý",
          cancelText: "Hủy",
          onOk: async () => {
            await BillApi.createBillWait(data).then((res) => {
              navigate("/bill-management/detail-bill/" + res.data.data.id);
            });
          },
          onCancel: () => {},
        });
      } else {
        toast("vui lòng chọn sản phẩm");
      }
    }
  };

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
  const searchVoucher = (e) => {
    var fillter = {
      code: keyVoucher,
      name: keyVoucher,
      quantity: keyVoucher,
    };
    PromotionApi.fetchAll(fillter).then(
      (res) => {
        const data = [];
        res.data.data.map((item) => {
          if (
            item.status == "DANG_SU_DUNG" &&
            item.quantity != null &&
            item.quantity > 0
          ) {
            data.push(item);
          }
        });
        dispatch(SetPromotion(data));
      },
      (err) => {
        console.log(err);
      }
    );
  };
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
      render: (value) => (
        <span>
          {value >= 1000
            ? value.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : value + " đ"}
        </span>
      ),
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
      render: (date, record) => {
        const start = moment(date).format(" DD-MM-YYYY");
        const end = moment(record.endDate).format(" DD-MM-YYYY");
        return <span>{start + " > " + end}</span>;
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
            style={{
              color: "#02bdf0",
              border: "1px solid #02bdf0",
              fontWeight: "500",
              backgroundColor: "white",
            }}
            onClick={() => selectedVoucher(record)}
          >
            Chọn
          </Button>
        </div>
      ),
    },
  ];

  const selectedVoucher = (record) => {
    var price = products.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);

    setVoucher({
      idVoucher: record.id,
      beforPrice: price,
      afterPrice: price - record.value,
      discountPrice: record.value,
    });
    setCodeVoucher(record.code);
    setIsModalVoucherOpen(false);
  };

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
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);

  const handleQuantityDecrease = (record) => {
    const updatedListSole = products.map((item) =>
      item.idSizeProduct === record.idSizeProduct
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity is at least 1
        : item
    );
    setProducts(updatedListSole);
  };

  const handleQuantityChange = (value, record) => {
    // Ensure the value is at least 1
    const newQuantity = Math.max(value, 1);
    const updatedListSole = products.map((item) =>
      item.idSizeProduct === record.idSizeProduct
        ? { ...item, quantity: newQuantity }
        : item
    );
    setProducts(updatedListSole);
  };

  const handleQuantityIncrease = (record) => {
    const updatedListSole = products.map((item) =>
      item.idSizeProduct === record.idSizeProduct &&
      record.maxQuantity > item.quantity
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setProducts(updatedListSole);
  };

  const showModalProduct = (e) => {
    setIsModalProductOpen(true);
  };
  const handleOkProduct = () => {
    setIsModalProductOpen(false);
  };
  const handleCancelProduct = () => {
    setIsModalProductOpen(false);
  };

  const removeProductInBill = (e, id) => {
    var data = products.filter((x) => x.idSizeProduct !== id);
    setProducts(data);
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
      dataIndex: "productName",
      key: "productName",
      render: (productName, record) => {
        return (
          <Row style={{ marginTop: "10px" }}>
            <Col span={5}>
              <img
                src={record.image}
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
                  {record.productName}
                </span>{" "}
              </Row>
              <Row>
                <span style={{ color: "red", fontWeight: "500" }}>
                  {record.price >= 1000
                    ? record.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : record.price + " đ"}
                </span>{" "}
              </Row>
              <Row>
                <span style={{ fontSize: "12", marginTop: "10px" }}>
                  Size: {record.nameSize}
                </span>{" "}
              </Row>
              <Row>
                <span style={{ fontSize: "12" }}>x {record.quantity}</span>{" "}
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
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            {price >= 1000
              ? price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : price + " đ"}
          </span>{" "}
        </div>
      ),
    },
    {
      title: <div className="title-product">Tổng</div>,
      dataIndex: "sum",
      key: "sum",
      render: (sum) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              color: "red",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            {sum >= 1000
              ? sum.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : sum + " đ"}
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
          <Row
            style={{
              marginBottom: "20px",
              width: "100%",
              borderBottom: "2px solid #ccc",
              padding: "5px",
            }}
          >
            <Col span={13} align={"center"}>
              <span
                style={{ fontSize: "16px", fontWeight: "400", padding: "3px" }}
              >Sản phẩm</span>
              
            </Col>
            <Col span={5} align={"center"}>
              <span
                style={{ fontSize: "16px", fontWeight: "400", padding: "3px" }}
              >Số lượng</span>
              
            </Col>
            <Col span={4} align={"center"}>
              <span
                style={{ fontSize: "16px", fontWeight: "400", padding: "3px" }}
              >Tổng tiền</span>
              
            </Col>
            <Col span={2} align={"center"}>
              <span
                style={{ fontSize: "16px", fontWeight: "400", padding: "3px" }}
              >Thao tác</span>
              
            </Col>
          </Row>
          {products.map((item) => {
            return (
              <Row style={{ marginTop: "10px", width: "100%" }}>
                <Col span={4}>
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
                <Col span={9}>
                  <Row>
                    {" "}
                    <span
                      style={{
                        fontSize: "19",
                        fontWeight: "500",
                        marginTop: "10px",
                        marginLeft: "15px",
                      }}
                    >
                      {item.productName}
                    </span>{" "}
                  </Row>
                  <Row>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "500",
                        marginLeft: "15px",
                      }}
                    >
                      {item.price >= 1000
                        ? item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : item.price + " đ"}
                    </span>{" "}
                  </Row>
                  <Row>
                    <span
                      style={{
                        fontSize: "12",
                        marginTop: "10px",
                        marginLeft: "15px",
                      }}
                    >
                      Size: {item.nameSize}
                    </span>{" "}
                  </Row>
                  <Row>
                    <span style={{ fontSize: "12", marginLeft: "15px" }}>
                      x {item.quantity}
                    </span>{" "}
                  </Row>
                </Col>
                <Col
                  span={5}
                  align={"center"}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    onClick={() => handleQuantityDecrease(item)}
                    style={{ margin: "0 0 0 4px" }}
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    max={item.maxQuantity}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(value, item)}
                  />
                  <Button
                    onClick={() => handleQuantityIncrease(item)}
                    style={{ margin: "0 10px 0 0" }}
                  >
                    +
                  </Button>
                </Col>
                <Col
                  span={4}
                  align={"center"}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.price * item.quantity >= 1000
                      ? (item.price * item.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : item.price * item.quantity + " đ"}
                  </span>{" "}
                </Col>
                <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    style={{
                      marginLeft: "10px",
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "white",
                      backgroundColor: "red",
                    }}
                    onClick={(e) => removeProductInBill(e, item.idSizeProduct)}
                  >
                    <BsTrash />
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Row>
        <Row
          justify="end"
          style={{
            marginBottom: "10px",
            width: "100%",
            borderTop: "2px solid #ccc",
            padding: "10px 0 0 0",
            marginTop: "20px",
          }}
        >
          <Col span={3}>Tổng tiền: </Col>
          <Col
            span={4}
            style={{ fontWeight: "500", fontSize: "16px", color: "red" }}
          >
            {products.reduce((accumulator, currentValue) => {
              return accumulator + currentValue.price * currentValue.quantity;
            }, 0) >= 1000
              ? products
                  .reduce((accumulator, currentValue) => {
                    return (
                      accumulator + currentValue.price * currentValue.quantity
                    );
                  }, 0)
                  .toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
              : products.reduce((accumulator, currentValue) => {
                  return (
                    accumulator + currentValue.price * currentValue.quantity
                  );
                }, 0) + " đ"}
          </Col>
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
              <Form initialValues={initialValues}>
                <div>
                  <Row
                    style={{
                      width: "100%",
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <Col span={24}>
                      <Form.Item
                        label=""
                        name="name"
                        style={{ marginBottom: "20px" }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên khách hàng",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nhập họ và tên"
                          style={{ width: "90%", height: "39px" }}
                          value={billRequest.userName}
                          onChange={(e) =>
                            ChangeBillRequest("userName", e.target.value)
                          }
                        />
                      </Form.Item>
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
                      <Form.Item
                        label=""
                        name="phoneNumber"
                        style={{ marginBottom: "20px" }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                          {
                            pattern:
                              "(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}",
                            message: "Vui lòng nhập đúng số điện thoại",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nhập số điện thoại"
                          style={{ width: "90%", height: "39px" }}
                          onChange={(e) =>
                            ChangeBillRequest("phoneNumber", e.target.value)
                          }
                          value={billRequest.phoneNumber}
                        />
                      </Form.Item>
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
                      <Form.Item
                        label=""
                        name="detail"
                        style={{ marginBottom: "20px" }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn Quận",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Nhập địa chỉ"
                          style={{ width: "90%", height: "39px" }}
                          onChange={(e) =>
                            onChangeAddress("detail", e.target.value)
                          }
                        />
                      </Form.Item>
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
                          <Form.Item
                            label=""
                            name="city"
                            style={{ marginBottom: "20px" }}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn tỉnh",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn tỉnh"
                              optionFilterProp="children"
                              // // onChange={onChange}
                              // // onSearch={onSearch}
                              onChange={handleProvinceChange}
                              style={{ width: "90%", height: "39px" }}
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              // options={[]}
                            >
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
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label=""
                            name="district"
                            style={{ marginBottom: "20px" }}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn Quận",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn Quận"
                              optionFilterProp="children"
                              style={{ width: "90%" }}
                              // onChange={onChange}
                              // onSearch={onSearch}
                              onChange={handleDistrictChange}
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              // options={[]}
                            >
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
                        </Col>
                        <Col span={7}>
                          <Form.Item
                            label=""
                            name="wards"
                            style={{ marginBottom: "20px" }}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn Quận",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Chọn Phường xã"
                              optionFilterProp="children"
                              style={{ width: "95%" }}
                              // onChange={onChange}
                              // onSearch={onSearch}
                              onChange={handleWardChange}
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              // options={[]}
                            >
                              {listWard?.map((item) => {
                                return (
                                  <Option
                                    key={item.WardCode}
                                    value={item.WardName}
                                    valueWard={item.WardCode}
                                    valueDistrict={item.DistrictID}
                                  >
                                    {item.WardName}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
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
                        onChange={(e) =>
                          ChangeBillRequest("note", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "30px",
                      marginLeft: "10px",
                      width: "100%",
                    }}
                  >
                    <Col span={2}>
                      <CiDeliveryTruck
                        style={{ height: "30px", width: "50px" }}
                      />
                    </Col>
                    <Col
                      span={22}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "500",
                        marginBottom: "20px",
                      }}
                    >
                      <span>Thời gian nhận hàng dự kiến: {dayShip}</span>
                    </Col>
                  </Row>
                </div>
              </Form>
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
                <Input
                  style={{ width: "100%", backgroundColor: "white" }}
                  disabled
                  value={codeVoucher}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={3}>
                <Button type="dashed" onClick={(e) => showModalVoucher(e)}>
                  Chọn mã
                </Button>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={5}>Tiền hàng: </Col>
              <Col span={10} align={"end"} style={{ marginRight: "10px" }}>
                {products.reduce((accumulator, currentValue) => {
                  return (
                    accumulator + currentValue.price * currentValue.quantity
                  );
                }, 0) >= 1000
                  ? products
                      .reduce((accumulator, currentValue) => {
                        return (
                          accumulator +
                          currentValue.price * currentValue.quantity
                        );
                      }, 0)
                      .toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                  : products.reduce((accumulator, currentValue) => {
                      return (
                        accumulator + currentValue.price * currentValue.quantity
                      );
                    }, 0) + " đ"}
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginTop: "20px" }}>
              <Col span={8}>Phí vận chuyển: </Col>
              <Col span={10} align={"end"} style={{ marginRight: "10px" }}>
                {shipFee >= 1000
                  ? shipFee.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : shipFee + " đ"}
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
                {products.reduce((accumulator, currentValue) => {
                  return (
                    accumulator + currentValue.price * currentValue.quantity
                  );
                }, 0) +
                  shipFee >=
                1000
                  ? (
                      products.reduce((accumulator, currentValue) => {
                        return (
                          accumulator +
                          currentValue.price * currentValue.quantity
                        );
                      }, 0) + shipFee
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : products.reduce((accumulator, currentValue) => {
                      return (
                        accumulator + currentValue.price * currentValue.quantity
                      );
                    }, 0) +
                    shipFee +
                    " đ"}
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
        title=""
        open={isModalProductOpen}
        onOk={handleOkProduct}
        onCancel={handleCancelProduct}
        width={1000}
      >
        <ModalAddProductDetail
          handleCancelProduct={handleCancelProduct}
          products={products}
          setProducts={setProducts}
          typeAddProductBill={typeAddProductBill}
        />
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
            style={{ width: "100%" }}
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
      <Modal
        title="Mã giảm giá"
        width={1000}
        open={isModalVoucherOpen}
        onOk={handleOkVoucher}
        onCancel={handleCancelVoucher}
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
              value={keyVoucher}
              onChange={(e) => {
                setKeyVoucher(e.target.value);
              }}
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
            style={{ width: "100%" }}
            columns={columnsVoucher}
            pagination={{ pageSize: 5 }}
            // rowClassName={(record, index) =>
            //   index % 2 === 0 ? "even-row" : "odd-row"
            // }
          />
        </Row>
      </Modal>
      {/* end modal voucher */}
      <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default CreateBill;
