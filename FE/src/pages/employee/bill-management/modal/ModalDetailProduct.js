import { Button, Col, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { SizeProductDetailApi } from "../../../../api/employee/size-product-detail/SizeProductDetail.api";
import { ProducDetailtApi } from "../../../../api/employee/product-detail/productDetail.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function ModalDetailProduct({ id, ChangedSelectSize, ChangeQuantity }) {
  const [listSize, setListSize] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [max, setMax] = useState(0);

  const getPromotionStyle = (promotion) => {
    return promotion >= 50 ? { color: "white" } : { color: "#000000" };
  };
  const getPromotionColor = (promotion) => {
    return promotion >= 50 ? { color: "#FF0000" } : { color: "#FFCC00" };
  };

  const toggleSizeSelection = (e, size) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((selected) => selected !== size)
        : [...prevSelected, size]
    );
    ChangedSelectSize(e, size)
    if(max < size.quantity){
      setMax(size.quantity)
    }
  };


  const getSizeProductDetail = () => {
    SizeProductDetailApi.fetchAll(id).then((res) => {
      console.log(res.data.data);
      const dataWithSTT = res.data.data.map((item, index) => ({
        ...item,
        stt: index + 1,
      }));
      setListSize(dataWithSTT);
    });
  };
  const getProductDetail = () => {
    console.log(id);
    ProducDetailtApi.getByIdProductDetail(id).then((res) => {
      console.log(res.data.data);
      setProductDetail(res.data.data);
    });
  };

  useEffect(() => {
    getSizeProductDetail();
    getProductDetail();
    setQuantity(1)
    setSelectedSizes([])
  }, [id]);

  const handleIncrease = () => {
    console.log(max);
    console.log(max > quantity);
    if(max > quantity){
      setQuantity((prevQuantity) => prevQuantity + 1);
      ChangeQuantity(quantity)
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      ChangeQuantity(quantity)
    }
  };

  const changeInputNumber = (v) =>{
    if(max > quantity){
      setQuantity(v);
      ChangeQuantity(v)
    }
    
  }

  return (
    <div>
      <Row style={{ marginTop: "20px" }}>
        <Col span={10}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={productDetail.image}
              alt="Ảnh sản phẩm"
              style={{ width: "100%", borderRadius: "10%", height: "100%" }}
            />
            {productDetail.value !== null && (
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  padding: "0px",
                  cursor: "pointer",
                  borderRadius: "50%",
                }}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{
                    ...getPromotionColor(productDetail.promotion),
                    fontSize: "3.5em",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "calc(50% - 10px)", // Đặt "50%" lên trên biểu tượng (từ 50% trừ 10px)
                    left: "50%", // Để "50%" nằm chính giữa biểu tượng
                    transform: "translate(-50%, -50%)", // Dịch chuyển "50%" đến vị trí chính giữa
                    fontSize: "0.8em",
                    fontWeight: "bold",
                    ...getPromotionStyle(productDetail.promotion),
                  }}
                >
                  {`${productDetail.promotion}%`}
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "60%", // Để "Giảm" nằm chính giữa biểu tượng
                    left: "50%", // Để "Giảm" nằm chính giữa biểu tượng
                    transform: "translate(-50%, -50%)", // Dịch chuyển "Giảm" đến vị trí chính giữa
                    fontSize: "0.8em",
                    fontWeight: "bold",
                    ...getPromotionStyle(productDetail.promotion),
                  }}
                >
                  Giảm
                </span>
              </div>
            )}
          </div>
        </Col>
        <Col span={14}>
          <Row style={{ marginLeft: "10px" }}>
            <Row style={{ width: "100%" }}>
              {" "}
              <span style={{ fontWeight: "600", fontSize: "20px" }}>
                {" "}
                {productDetail.nameProduct}{" "}
              </span>
            </Row>
            <Row style={{ marginTop: "15px", width: "100%" }}>
              <Col span={6}>Thương hiệu</Col>
              <Col span={18}>
                <span>{productDetail.nameBrand} </span>
              </Col>
            </Row>
            <Row style={{ marginTop: "15px", width: "100%" }}>
              <Col span={6}>Danh mục</Col>
              <Col span={18}>
                <span>{productDetail.nameCategory} </span>
              </Col>
            </Row>
            <Row style={{ marginTop: "15px", width: "100%" }}>
              <Col span={6}>Dành cho</Col>
              <Col span={18}>
                <span>{productDetail.gender == "NU" ? "Nữ" : "Nam"} </span>
              </Col>
            </Row>
          </Row>
          <Row style={{ marginTop: "15px", width: "100%" }}>
            {" "}
            <span style={{ fontWeight: "600", fontSize: "18px", color: "red" }}>
              {" "}
              {productDetail.price >= 1000
                ? productDetail.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : productDetail.price + " đ"}{" "}
            </span>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "15px", width: "100%" }} justify={"center"}>
          {/* Hiển thị các nút button cho các kích thước */}
          {listSize.map((size) => (
            <Col key={size.id} span={6}>
              <Button
                block
                className={selectedSizes.includes(size) ? "selected" : ""}
                onClick={(e) => toggleSizeSelection(e, size)}
              >
                {size.nameSize}
              </Button>
            </Col>
          ))}
        </Row>
          <Row style={{ marginTop: "15px", width: "100%" }} justify={"center"}>
            <Button onClick={handleDecrease} style={{ margin: "0 4px 0 10px" }}>
              -
            </Button>
            <InputNumber
              min={1}
              max={max}
              value={quantity}
              onChange={(value) => changeInputNumber(value)}
            />
            <Button onClick={handleIncrease} style={{ margin: "0 4px 0 4px" }}>
              +
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ModalDetailProduct;
