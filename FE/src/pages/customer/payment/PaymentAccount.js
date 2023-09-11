import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style-payment-account.css";
import { Row, Col, InputNumber, Input, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AddressClientApi } from "./../../../api/customer/address/addressClient.api";
import { BillClientApi } from "./../../../api/customer/bill/billClient.api";
import { PaymentClientApi } from "../../../api/customer/payment/paymentClient.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoVnPay from "../../../../src/assets/images/logo_vnpay.png";
import { faCarRear, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
function PaymentAccount() {
  const { Option } = Select;
  const idAccount = localStorage.getItem("idAccount");
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [addressDefault, setAddressDefault] = useState({});
  const [listWard, setListWard] = useState([]);
  const [formBill, setFormBill] = useState({
    address: "",
    billDetail: [],
    district: "",
    districtId: "",
    email: "",
    itemDiscount: 0,
    paymentMethod: "paymentReceive",
    phoneNumber: "",
    province: "",
    provinceId: "",
    totalMoney: 0,
    userName: "",
    ward: "",
    wardCode: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [moneyShip, setMoneyShip] = useState(0);
  const [dayShip, setDayShip] = useState("");
  const [keyMethodPayment, setKeyMethodPayment] = useState("paymentReceive");
  const [totalBill, setTotalBill] = useState(0);
  const [totalBillToPay, setTotalBillToPay] = useState(0);
  const [formGetMoneyShip, setFormGetMoneyShip] = useState([]);
  const listproductOfBill = JSON.parse(sessionStorage.getItem("bill"));
  const voucher = JSON.parse(sessionStorage.getItem("voucher"));
  const comercial = [
    { title: "CHÀO MỪNG QUÝ KHÁCH!" },
    { title: " CHÚC QUÝ KHÁCH MUA HÀNG HAPPY!" },
    { title: " FREE SHIPPING VỚI HÓA ĐƠN TRÊN 800K!" },
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    getAddressDefault(idAccount);
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % comercial.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(formBill);
  }, [formBill]);
  useEffect(() => {
    console.log(addressDefault);
  }, [addressDefault]);

  useEffect(() => {
    console.log(keyMethodPayment);
  }, [keyMethodPayment]);

  const getAddressDefault = (idAccount) => {
    AddressClientApi.getByAccountAndStatus(idAccount).then(
      (res) => {
        setAddressDefault(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const payment = () => {
    const phoneNumberPattern =
      /^(03[2-9]|05[6-9]|07[0-9]|08[1-9]|09[0-9])[0-9]{7}$/;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isFormValid =
      formBill.userName &&
      formBill.phoneNumber &&
      phoneNumberPattern.test(formBill.phoneNumber) &&
      formBill.email &&
      emailPattern.test(formBill.email) &&
      formBill.address &&
      formBill.province &&
      formBill.district &&
      formBill.ward;

    if (!isFormValid) {
      const errors = {
        userName: !formBill.userName ? "Vui lòng nhập họ tên" : "",
        phoneNumber: !formBill.phoneNumber
          ? "Vui lòng nhập số điện thoại"
          : !phoneNumberPattern.test(formBill.phoneNumber)
          ? "Vui lòng nhập đúng định dạng số điện thoại"
          : "",
        email: !formBill.email
          ? "Vui lòng nhập email"
          : !emailPattern.test(formBill.email)
          ? "Vui lòng nhập đúng định dạng email"
          : "",
        address: !formBill.address ? "Vui lòng nhập địa chỉ" : "",
        province:
          formBill.province === undefined || !formBill.province
            ? "Vui lòng chọn tỉnh/thành phố"
            : "",
        district:
          formBill.district === undefined || !formBill.district
            ? "Vui lòng chọn quận/huyện"
            : "",
        ward:
          formBill.ward === undefined || !formBill.ward
            ? "Vui lòng chọn phường/xã"
            : "",
      };
      setFormErrors(errors);
      return;
    }

    if (formBill.paymentMethod === "paymentVnpay") {
      const data = {
        vnp_Ammount: totalBillToPay,
      };
      PaymentClientApi.paymentVnpay(data).then(
        (res) => {
          window.location.replace(res.data.data);
          sessionStorage.setItem("formBill", JSON.stringify(formBill));
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      BillClientApi.createBillOnline(formBill).then(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const getMoneyShip = (districtId, wardCode) => {
    if (totalBill > 2000000) {
      setMoneyShip(0);
    } else {
      AddressClientApi.getMoneyShip(districtId, wardCode).then(
        (res) => {
          setMoneyShip(res.data.data.total);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  const getDayShip = (districtId, wardCode) => {
    AddressClientApi.getDayShip(districtId, wardCode).then(
      (res) => {
        const day = dayjs(res.data.data.leadtime * 1000).format("DD-MM-YYYY");
        setDayShip(day);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const formatMoney = (price) => {
    return (
      parseInt(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
    );
  };
  const formBillChange = (name, value) => {
    setFormBill((prevFormBill) => ({
      ...prevFormBill,
      [name]: value,
    }));
  };

  const paymentReceive = () => {
    setKeyMethodPayment("paymentReceive");
    setFormBill({ ...formBill, paymentMethod: "paymentReceive" });
  };
  const paymentVnpay = () => {
    setKeyMethodPayment("paymentVnpay");
    setFormBill({ ...formBill, paymentMethod: "paymentVnpay" });
  };

  return (
    <div className="payment-acc">
      <Row>
        <Col lg={{ span: 16, offset: 4 }}>
          <div className="border-top-address"></div>
          <div className="address-payment">
            <div className="title-address-recieve-good">
              <span className="icon-address-payment-acc">
                <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ nhận hàng
              </span>
            </div>
            <div>
              <span style={{ fontSize: 17, fontWeight: 600 }}>
                {addressDefault.fullname}
              </span>
              {" | "}
              <span>{addressDefault.phoneNumber}</span>
              <span style={{ fontSize: 17, marginLeft: 40 }}>
                {addressDefault.line}, {addressDefault.ward},{" "}
                {addressDefault.district}, {addressDefault.province}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default PaymentAccount;
