import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Col, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CartClientApi } from "../../../api/customer/cart/cartClient.api";
import { useParams } from "react-router";
import tableSize from "./../../../assets/images/SizeChart.jpg"
import { ProductDetailClientApi } from "../../../api/customer/productdetail/productDetailClient.api";
import "./style-detail-product.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faTruckFast, faPaypal, faFileInvoiceDollar, faShieldHeart } from "@fortawesome/free-solid-svg-icons";


function DetailProduct() {
    const idAccountLocal = sessionStorage.getItem("idAccount");
    const [itemSize, setItemSize] = useState('');
    const [infoAndSize, setInfoAndSize] = useState(1);
    const id = useParams()
    const [listSize, setListSize] = useState([]);
    const itemsPerPage = 4;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageIndex, setImageIndex] = useState(0);
    const [image, setImage] = useState('');
    const initialCartLocal = JSON.parse(localStorage.getItem("cartLocal")) || [];
    const [cartLocal, setCartLocal] = useState(initialCartLocal);
    const [quantity, setQuantity] = useState(1);
    const [detailProduct, setDetailProduct] = useState({
        codeColor: "",
        idProductDetail: "",
        image: "",
        nameSize: "",
        nameProduct: "",
        price: 0,
        quantity: 0,
    });
    const [productSaw, setProductSaw] = useState( JSON.parse(sessionStorage.getItem("listProductSaw") || []))

    useEffect(() => {
        localStorage.setItem("cartLocal", JSON.stringify(cartLocal));
    }, [cartLocal]);

    useEffect(() => {
        sessionStorage.setItem("listProductSaw", JSON.stringify(productSaw));
    }, [productSaw]);
    useEffect(() => {
        getDetailProduct(id.id)
    }, [])
    useEffect(() => {
        setImage(detailProduct.image.split(",")[0])

        const newCartItem = {
            idProductDetail: detailProduct.idProductDetail,
            image: detailProduct.image,
            price: detailProduct.price,
            quantity: quantity,
            nameProduct: detailProduct.nameProduct,
            codeColor: detailProduct.codeColor,
            nameSize: detailProduct.nameSize,
        };
        console.log(newCartItem);
        setProductSaw((prev) => {
            console.log(cartLocal);
            const exists = prev.find(
                (item) => item.idProductDetail === newCartItem.idProductDetail
            );
            if (!exists) {
                console.log("mới");
                return [...prev, newCartItem];
            } else {
                console.log("trùng");
                return prev.map((item) =>
                    item.idProductDetail === newCartItem.idProductDetail
                        ? { ...item, quantity: item.quantity + newCartItem.quantity }
                        : item
                );
            }
        });

    }, [detailProduct])

    const getDetailProduct = (idProductDetail) => {
        setItemSize(idProductDetail)
        ProductDetailClientApi.getDetailProductOfClient(idProductDetail).then(
            (res) => {
                setDetailProduct(res.data.data);
                const nameSizeArray = res.data.data.listSize.split(',');
                const sizeList = [];
                for (let index = 0; index < nameSizeArray.length; index += 2) {
                    const name = nameSizeArray[index];
                    const id = nameSizeArray[index + 1];
                    sizeList.push({ name, id });
                }
                setListSize(sizeList);
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
    // thay doi kich thuoc 
    const changeSize = (item) => {
        window.location.href = `/detail-product/${item}`
        getDetailProduct(item)
    }
    // them san pham vao gio hang
    const addToCard = () => {
        if (detailProduct.quantity === 0) {
            toast.error("Sản phẩm đã hết hàng", {
                autoClose: 3000,
            });
            return;
        }
        if (idAccountLocal === null) {
            const newCartItem = {
                idProductDetail: detailProduct.idProductDetail,
                image: detailProduct.image,
                price: detailProduct.price,
                quantity: quantity,
                nameProduct: detailProduct.nameProduct,
                codeColor: detailProduct.codeColor,
                nameSize: detailProduct.nameSize,
            };

            setCartLocal((prev) => {
                const exists = prev.find(
                    (item) => item.idProductDetail === newCartItem.idProductDetail
                );
                if (!exists) {
                    return [...prev, newCartItem];
                } else {
                    return prev.map((item) =>
                        item.idProductDetail === newCartItem.idProductDetail
                            ? { ...item, quantity: item.quantity + newCartItem.quantity }
                            : item
                    );
                }
            });
            window.location.href = "/cart";
        } else {
            const newCartItem = {
                idAccount: idAccountLocal,
                idProductDetail: detailProduct.idProductDetail,
                price: detailProduct.price,
                quantity: quantity,
            };

            CartClientApi.addCart(newCartItem).then(
                (res) => {
                    window.location.href = "/home";

                },
                (err) => {
                    console.log(err);
                }
            );

        }
    };

    const changeQuantity = (value) => {
        setQuantity(value)
    }
    const changeTitleInfoAndSize = (item) => {
        setInfoAndSize(item)
    }

    const totalPages = Math.ceil(
        detailProduct.image.split(",").length / itemsPerPage
    );
    const changeImage = (image, index) => {
        setImage(image)
        setImageIndex(index)
    }
    const previous = () => {
        if (currentIndex === 0) {
            return
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const next = () => {
        if (currentIndex === totalPages - 1) {
            return;
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };


    return (<React.Fragment>
        <div className="box-detail-product">
            <Row>
                <Col
                    lg={{ span: 16, offset: 4 }}
                    style={{ display: "flex", justifyContent: "center", padding: 50, borderTop: "3px solid black" }}

                >
                    <div className="box-image-pd">
                        <img
                            className="img-detail-product-pd"
                            src={image === '' ? detailProduct.image.split(",")[0] : image}
                            alt="..."
                        />

                        <div className="box-slide-image">
                            <LeftOutlined className="button-prev-img-pd" onClick={previous}
                                style={{ cursor: currentIndex <= 0 ? "not-allowed" : "pointer" }}
                            />

                            {detailProduct.image.split(",")
                                .slice(
                                    currentIndex * itemsPerPage,
                                    (currentIndex + 1) * itemsPerPage
                                )
                                .map((item, index) => (
                                    <img
                                        key={index}
                                        className="img-slide-detail-product-pd"
                                        src={item}
                                        alt="..."
                                        style={{ border: image === item ? "1px solid #ff4400" : null }}
                                        onClick={() => changeImage(item, index)}
                                    />
                                ))}

                            <RightOutlined className="button-next-img-pd" onClick={next}
                                style={{ cursor: currentIndex >= totalPages - 1 ? "not-allowed" : "pointer" }}
                            />

                        </div>

                    </div>
                    <div className="box-info-pd" >
                        <div className="name-pd">{detailProduct.nameProduct}</div>
                        <div className="price-product-pd">
                            {" "}
                            Giá: {formatMoney(detailProduct.price)}
                        </div>
                        <div className="box-color-pd">

                            <div>Màu:</div>
                            <div className="list-color-detail-pd">
                                <div
                                    className="color-product-pd"

                                    style={{
                                        backgroundColor: detailProduct.codeColor,
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="box-size-pd">
                            <div>Size:</div>
                            <div className="list-size-product-pd" tabIndex="0">

                                {listSize.map((item, index) => (
                                    <div
                                        key={index}
                                        className={itemSize === item.id ? "size-product-pd-click" : "size-product-pd"}
                                        tabIndex="0"
                                        onClick={() => changeSize(item.id)}
                                    >
                                        {item.name}
                                    </div>
                                ))}

                            </div>
                        </div>


                        <div className="box-quantity-pd">
                            Số lượng tồn:{" "}
                            <span style={{ color: "#ff4400" }}>
                                {detailProduct.quantity} sản phẩm
                            </span>
                        </div>

                        <div className="add-to-card-pd">
                            <InputNumber
                                className="input-quantity-card-pd"
                                name="quantity"
                                type="number"
                                disabled={detailProduct.quantity === 0}
                                min={1}
                                defaultValue={1}
                                max={detailProduct.quantity}
                                onChange={(value) => changeQuantity(value)}
                            ></InputNumber>
                            <div className="button-add-to-card-pd" onClick={addToCard}>
                                Thêm vào Giỏ hàng
                            </div>
                        </div>

                        <div className="box-policy">
                            <ul>
                                <li className="item-policy"><div className="box-icon"><FontAwesomeIcon icon={faTruckFast} className="icon-policy" /></div> <span className="title-policy">Miễn phí giao hàng đơn từ 800k. </span></li>
                                <li className="item-policy"><div
                                    className="box-icon"
                                >
                                    <FontAwesomeIcon icon={faRetweet} className="icon-policy" /></div> <span className="title-policy">Đổi trả miễn phí trong vòng 30 ngày.</span></li>
                                <li className="item-policy"><div
                                    className="box-icon"
                                ><FontAwesomeIcon icon={faFileInvoiceDollar} className="icon-policy" /> </div><span className="title-policy">Thanh toán trực tuyến nhanh chóng và an toàn. </span></li>
                                <li className="item-policy"><div
                                    className="box-icon"
                                ><FontAwesomeIcon icon={faShieldHeart}
                                    className="icon-policy" /></div> <span className="title-policy">Sản phẩm chính hãng 100%. </span></li>
                            </ul>
                        </div>


                        <div className="box-info-detail">
                            <div className="box-title-info-detail">
                                <div className="detail-info" style={{ color: infoAndSize === 1 ? "black" : "white" }}
                                    onClick={() => changeTitleInfoAndSize(1)}
                                >
                                    THÔNG TIN CHI TIẾT
                                </div>
                                <div className="guide-to-choose-size" style={{ color: infoAndSize === 2 ? "black" : "white" }}
                                    onClick={() => changeTitleInfoAndSize(2)}
                                >
                                    CÁCH CHỌN SIZE
                                </div>
                            </div>
                            {infoAndSize === 1 ? (
                                <ul className="ul-info-pd" style={{ padding: '30px 10px' }}>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Tên sản phẩm</span>
                                        <span className="content-info-pd"> {detailProduct.nameProduct}</span>
                                    </li>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Giá</span>
                                        <span className="content-info-pd"> {formatMoney(detailProduct.price)}</span>
                                    </li>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Thương hiệu</span>
                                        <span className="content-info-pd"> {detailProduct.nameBrand}</span>
                                    </li>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Loại sản phẩm</span>
                                        <span className="content-info-pd"> {detailProduct.nameCategory}</span>
                                    </li>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Chất liệu</span>
                                        <span className="content-info-pd"> {detailProduct.nameMaterial}</span>
                                    </li>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Kích thước</span>
                                        <span className="content-info-pd"> {detailProduct.nameSize}</span>
                                    </li>
                                    <li className="li-info-pd">
                                        <span className="title-info-pd"> Đế giày</span>
                                        <span className="content-info-pd"> {detailProduct.nameSole}</span>
                                    </li>

                                </ul>
                            ) : (<div className="box-img-guide-choose-size">
                                <img src={tableSize} alt="..." />
                            </div>)}

                        </div>
                    </div>
                </Col>

                <Col
                    lg={{ span: 16, offset: 4 }}
                    style={{ display: "flex", justifyContent: "center", marginTop: 100, padding: 50 }}
                >


                </Col>
            </Row>
        </div>
    </React.Fragment>);
}

export default DetailProduct;