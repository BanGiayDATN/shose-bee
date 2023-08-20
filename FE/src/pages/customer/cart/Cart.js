import imgShoe from "./../../../assets/images/third_slider_img03.png";
import logoHidden from "./../../../assets/images/logo_client.png";
import "./style-cart.css";
import { useState, useEffect } from "react";
import { Row, Col, Input, Checkbox, InputNumber, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function Cart() {
  // const { Option } = Select;
  const idAccountLocal = localStorage.getItem("idAccount");
  const cartLocal = JSON.parse(localStorage.getItem("cartLocal"));
  const [cart, setCart] = useState([]);
  const [chooseItemCart, setChooseItemCart] = useState([]);
  const [totalPrice,setTotalPrice]=useState(0);

  useEffect(() => {
    console.log(idAccountLocal);
    console.log(cartLocal);
    setCart(cartLocal);
  }, []);
  useEffect(() => {
    localStorage.setItem("cartLocal", JSON.stringify(cart));
    console.log(cart);
  },[cart])
  useEffect(() => {
    console.log(chooseItemCart);
  },[chooseItemCart])

  const formatMoney = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };

  const deleteItemCart = (id) => {
    console.log("cart",cart);
    const updatedCart = cart.filter(item => item.idProductDetail !== id);
    console.log("updateCart",updatedCart);
    setCart(updatedCart);
  };
  const changeQuantity = (itemOld, value) => {
    setTotalPrice(totalPrice+itemOld.price)
    const updatedCart = cart.map(item => {
      if (item.idProductDetail === itemOld.idProductDetail) {
        return { ...item, quantity: value }; 
      }
      return item;
    });
    console.log("updateCart",updatedCart);
    setCart(updatedCart); 
  };
  const chooseCartForBill =(item,value)=>{
    const itemDetail = {
      idProductDetail:item.idProductDetail,
      price:item.price,
      quantity:item.quantity
    }
    if (value) {
      setChooseItemCart([...chooseItemCart, itemDetail]);
      setTotalPrice(totalPrice+(item.price*item.quantity))
    } else {
      setChooseItemCart(chooseItemCart.filter(itemId => itemId.idProductDetail !== item.idProductDetail));
      setTotalPrice(totalPrice-(item.price*item.quantity))
    }

  }

  return (
    <div className="cart">
      <div className="img-banner">
        <img className="img-shoe" src={imgShoe} alt="..." />
      </div>
      <div className="content-cart">
        <div className="title-cart">
          <p className="cart-text">Giỏ Hàng</p>
          <img className=" hidden-text" src={logoHidden} alt="..." />
        </div>

        <Row>
          <Col lg={{ span: 18, offset: 3 }}>
            <div className="form-content-cart">
              <div className="info-cart">
                {!idAccountLocal ? (
                  cart.map((item, index) => (
                    <div className="item-cart">
                      <div key={index} className="box-cart-img">
                        <Checkbox className="custom-checkbox" 
                       onChange={(e) => chooseCartForBill(item, e.target.checked)}
                          />
                        <img
                          style={{
                            width: "180px",
                            height: "180px",
                            marginRight: 50,
                            marginLeft: 60,
                          }}
                          src={item.image}
                          alt="..."
                         
                        />
                      </div>
                      <div>
                        <div className="cart-name"> {item.name}</div>
                        <div className="cart-price">
                          Giá: {formatMoney(item.price)}
                        </div>
                        <div className="form-quantity-size">
                          <div>
                            <p style={{ fontWeight: "bold" }}>Số lượng</p>
                            <InputNumber
                              className="input-quantity-cart"
                              name="quantity"
                              type="number"
                              //  value={item.quantity}
                              defaultValue={item.quantity}
                              min="1"
                              onChange={(value) => changeQuantity(item,value)}
                            ></InputNumber>
                          </div>
                          <div style={{ marginLeft: "30px" }}>
                            <p style={{ fontWeight: "bold" }}>Size</p>
                            <Select
                              className="select-size-cart"
                              style={{ width: "100%" }}
                              labelInValue
                              defaultValue={{
                                value: "36",
                                label: "36",
                              }}
                              options={[
                                {
                                  value: "36",
                                  label: "36",
                                },
                                {
                                  value: "37",
                                  label: "37",
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-status-cart">
                        <div
                          style={{
                            color: "#ff4400",
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "20px",
                          }}
                        >
                          {formatMoney(item.quantity * item.price)}
                        </div>
                        <div style={{ color: "#ed7347", marginBottom: "50px" }}>
                          Còn hàng
                        </div>

                        <div
                          className="button-delete-cart"
                          onClick={() => {
                            deleteItemCart(item.idProductDetail);
                          }}
                        >
                          <DeleteOutlined className="icon-button-delete-cart" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>cute yêu diệm </h1>
                )}
              </div>
              <div style={{ width: "5%" }}></div>
              <div className="bill-of-cart">
                <div className="content-bill-of-cart">
                  <div className="text-bill-in-cart"> ĐƠN HÀNG</div>
                  <div className="voucher-of-cart">
                    <h3>THÊM MÃ KHUYẾN MÃI</h3>
                    <div style={{ display: "flex", marginTop: "15px" }}>
                      <Input
                        readOnly
                        type="text"
                        style={{ borderRadius: "0" }}
                      />
                      <div className="button-add-voucher-cart">ÁP DỤNG</div>
                    </div>
                  </div>
                  <div className="value-bill-of-cart">
                    <div style={{ display: "flex" }}>
                      <div style={{ color: "#21201f", fontFamily: "700" }}>
                        Đơn hàng
                      </div>{" "}
                      <div
                        style={{
                          marginLeft: "140px",
                          color: "#21201f",
                          fontFamily: "700",
                        }}
                      >
                        {formatMoney(totalPrice)}
                      </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <span>Giảm</span>{" "}
                      <span style={{ marginLeft: "169px" }}>
                        {formatMoney(0)}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3>TẠM TÍNH: {formatMoney(1000000)}</h3>
                  </div>
                  <div className="button-pay">TIẾP TỤC THANH TOÁN</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Cart;
