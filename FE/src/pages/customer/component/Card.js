import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style-card.css";
import { Card, Modal, Row, Col, Button, Input } from "antd";
import { ProductDetailClientApi } from "./../../../api/customer/productdetail/productDetailClient.api";
function CardItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState({
    codeColor: "",
    idProduct: "",
    image: "",
    listIdColor: "",
    listCodeColor: "",
    listNameSize: "",
    nameProduct: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    console.log(detailProduct);
  }, [detailProduct]);
  const getDetailProduct = (id, idColor) => {
    ProductDetailClientApi.getDetailProductOfClient(id, idColor).then(
      (res) => {
        const list1 = res.data.data;
        setDetailProduct(list1);
      },
      (err) => {
        console.log(err);
      }
    );
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
        <Card
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
            <p className="name-product">{item.nameProduct}</p>
            <p className="price-product">
              {formatPriceWithCommas(item.price)} VND
            </p>
          </Link>
        </Card>

        <p
          className={`button-buy-now ${hovered ? "visible" : "hidden"}`}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          onClick={() => {
            getDetailProduct(item.idProduct, item.idColor);
          }}
        >
          Mua ngay
        </p>
      </div>

      <Modal
        className="modal-detail-product"
        width={1000}
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
            <Col
              lg={{ span: 12, offset: 1 }}
              style={{ height: 500, paddingLeft: 30 }}
            >
              <h1>{detailProduct.nameProduct}</h1>
              <div className="price-product"> Giá: {formatPriceWithCommas(detailProduct.price)} VND</div>
             <div>
              <div>------------------------------------------------------------------------</div>
              <div>
                Màu:
              </div>
             <div className="list-color-detail">
              
              {detailProduct.listCodeColor
                .split(",")
                .sort((a, b) => {
                  if (a === detailProduct.codeColor) {
                    return -1;
                  } else if (b === detailProduct.codeColor) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((item, index) => (
                  <p
                  className="color-product"
                    key={index}
                    style={{
                      backgroundColor: item.replace("%23", "#"),
                    }}
                    onClick={() => {
                      getDetailProduct(detailProduct.idProduct, item);
                    }}
                    
                  ></p>
                ))}
            </div>
             </div>

             <div>------------------------------------------------------------------------</div>
             <div>
              <div>
                Size:
              </div>
             <div className="list-size-product" tabIndex="0">
                {detailProduct.listNameSize.split(",").map((item, index) => (
                  <div className="size-product" key={index} tabindex="0">{item}</div >
                ))}
              </div>

             </div>
             <div className="add-to-card">
                <Input className="input-quantity"  type="number" min={1} defaultValue={1}></Input>
                <div className="button-add-to-card">Thêm vào giỏ hàng</div>
             </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
}

export default CardItem;
