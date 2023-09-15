import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style-card.css";
import { Card, Modal, Row, Col, Button, InputNumber } from "antd";
import { toast } from "react-toastify";
import { CartClientApi } from "./../../../api/customer/cart/cartClient.api";
import { ProductDetailClientApi } from "./../../../api/customer/productdetail/productDetailClient.api";
function CardItem({
  item,
  index
}) {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(-1);


  const [detailProduct, setDetailProduct] = useState({
    codeColor: "",
    idProduct: "",
    idProductDetail:"",
    image: "",
    nameSize: "",
    listNameSize: "",
    nameProduct: "",
    price: 0,
    quantity: 0,
  });

  const idAccountLocal = localStorage.getItem("idAccount");
  const [quantity, setQuantity] = useState(1);
  const [cartAccount,setCartAccount] = useState([]);
  const initialCartLocal = JSON.parse(localStorage.getItem("cartLocal")) || [];

  const [cartLocal, setCartLocal] = useState(initialCartLocal);

  useEffect(() => {
    localStorage.setItem("cartLocal", JSON.stringify(cartLocal));
  }, [cartLocal]);




  const addToCard = () => {
    if (idAccountLocal===null) {
      const newCartItem = {
        idProductDetail: detailProduct.idProductDetail,
        name: detailProduct.nameProduct,
        image: detailProduct.image,
        price: detailProduct.price,
        quantity: quantity,
        idProduct:detailProduct.idProduct,
        codeColor:detailProduct.codeColor,
        nameSize:detailProduct.nameSize
      };
      
     
        setCartLocal((prev) => {
          console.log(cartLocal);
          const exists = prev.find(item =>item.idProductDetail === newCartItem.idProductDetail); 
        if (!exists) {
          console.log("mới");
          return [...prev, newCartItem];
        }else{
          console.log("trùng");
          return prev.map(item => 
            item.idProductDetail === newCartItem.idProductDetail
              ? { ...item, quantity: item.quantity + newCartItem.quantity} 
              : item
          );
        }
        
      });
      window.location.href = "/cart"
      toast.success("Add cart không login", {
        autoClose: 3000,
      });  
     
    } else {
      const newCartItem = {
        idAccount:idAccountLocal,
        idProductDetail: detailProduct.idProductDetail,
        price: detailProduct.price,
        quantity: quantity
      };

        CartClientApi.addCart(newCartItem).then(
          (res) => {
            console.log(res.data.data);
            // setListProductDetailByCategory(res.data.data);
          },
          (err) => {
            console.log(err);
          }
        );
        window.location.href = "/cart"
      toast.success("Add cart có login!", {
        autoClose: 3000,
      });
    }
  };

  const getDetailProduct = (idProduct, idColor, nameSize) => {
    // console.log(detailProduct);
    ProductDetailClientApi.getDetailProductOfClient(
      idProduct,
      idColor,
      nameSize
    ).then(
      (res) => {
        console.log(res.data.data);
        setDetailProduct(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
    setModal(true);
  };
  const handleSizeClick = (index, idProduct, codeColor, nameSize) => {
    getDetailProduct(idProduct, codeColor, nameSize);
    setClickedIndex(index);
  };

  const handleClickDetail = (idProduct, codeColor, nameSize) => {
    setClickedIndex(-1);
    getDetailProduct(idProduct, codeColor, nameSize);
  };
  const closeModal = () => {
    setModal(false);
    setClickedIndex(-1);
    setQuantity(1);
  };

  const formatMoney = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };
  const handleButtonMouseEnter = () => {
    setHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setHovered(false);
  };
  return (
    <>
      <div>
        <div
          to="/detail"
          className="card-item"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Link className="link-card-item" to="/detail">
            {item.valuePromotion !== null && (
              <p className="value-promotion">
                Giảm {parseInt(item.valuePromotion)}%
              </p>
            )}
            <img className="image-product" src={item.image} alt="..." />
            <div>
              <p className="name-product">
                {item.nameProduct}
                {/* - [{item.nameSize}] */}
              </p>
            </div>
            <p className="price-product">{formatMoney(item.price)}</p>
          </Link>
        </div>

        <p
          className={`button-buy-now ${hovered ? "visible" : "hidden"}`}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          onClick={() => {
            handleClickDetail(item.idProduct, item.codeColor, item.nameSize);
          }}
        >
          Mua ngay
        </p>
      </div>

      <Modal
        className="modal-detail-product"
        width={900}
        onCancel={closeModal}
        open={modal}
        closeIcon={null}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="modal-detail-product">
          <Row justify="center">
            <Col lg={{ span: 11, offset: 0 }} style={{ height: 500 }}>
              <img
                className="img-detail-product"
                src={detailProduct.image}
                alt="..."
              />
            </Col>
            <Col lg={{ span: 12, offset: 1 }} style={{ height: 500 }}>
              <h1>{detailProduct.nameProduct}</h1>
              <div className="price-product">
                {" "}
                Giá: {formatMoney(detailProduct.price)}
              </div>
              <div>
                <div>
                  ------------------------------------------------------------------------
                </div>
                <div>Màu:</div>
                <div className="list-color-detail">
                  <div
                    className="color-product"
                    key={index}
                    style={{
                      backgroundColor: detailProduct.codeColor.replace(
                        "%23",
                        "#"
                      ),
                    }}
                  ></div>
                </div>
              </div>

              <div>
                ------------------------------------------------------------------------
              </div>
              <div>
                <div>Size:</div>
                <div className="list-size-product" tabIndex="0">
                  {detailProduct.listNameSize
                    .split(",")
                    .sort()
                    .map((nameSize, index) => (
                      <div
                        className={`size-product ${
                          clickedIndex === index ? "clicked" : ""
                        }`}
                        key={index}
                        tabIndex="0"
                        onClick={() =>
                          handleSizeClick(
                            index,
                            item.idProduct,
                            item.codeColor,
                            nameSize
                          )
                        }
                        style={
                          nameSize !== detailProduct.nameSize
                            ? {}
                            : { border: "1px solid black" }
                        }
                      >
                        {nameSize}
                      </div>
                    ))}
                </div>
              </div>
              <div className="add-to-card">
                <InputNumber
                  className="input-quantity-card"
                  name="quantity"
                  type="number"
                  value={quantity}
                  // defaultValue="1"
                  min="1"
                  onChange={(value) => setQuantity(value)}
                ></InputNumber>
                <div className="button-add-to-card" onClick={addToCard}>
                  Thêm vào Giỏ hàng
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export default CardItem;
