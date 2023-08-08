import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Col,
  Select,
  Row,
  Space,
  Spin,
  Slider,
  Modal,
} from "antd";
import "./style-product.css";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";
import { MaterialApi } from "../../../../api/employee/material/Material.api";
import { SoleApi } from "../../../../api/employee/sole/sole.api";
import { CategoryApi } from "../../../../api/employee/category/category.api";
import { BrandApi } from "../../../../api/employee/brand/Brand.api";
import { ColorApi } from "../../../../api/employee/color/Color.api";
import tinycolor from "tinycolor2";
import {  useNavigate } from "react-router-dom";
import { ProducDetailtApi } from "../../../../api/employee/product-detail/productDetail.api";
import ModalDetailProduct from "./ModalDetailProduct";
import {
  addProductBillWait,
  addProductInBillDetail,
} from "../../../../app/reducer/Bill.reducer";
import { BillApi } from "../../../../api/employee/bill/bill.api";
import { size } from "lodash";
import { ProductApi } from "../../../../api/employee/product/product.api";

function ModalAddProductDetail({
  handleCancelProduct,
  setProducts,
  products,
  typeAddProductBill,
}) {
  const [listProduct, setListProduct] = useState([]);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const[state, setState] = useState(true)

  // format tiền
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  // lấy mảng redux ra
  // const data = useAppSelector(GetProduct);
  // useEffect(() => {
  //   if (data != null) {
  //     setListProduct(data);
  //   }
  // }, [data]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    ProductApi.fetchAllCustomProduct({
      product: search,
    }).then((res) => {
      var data =  res.data.data.filter(
        (product) => product.quantity > 0
      );
      setListProduct(data);
      // dispatch(SetPr(data));
    });
  };

  // Xử lý làm mới bộ lọc
  const handleClear = () => {
    setSearch("");
    
    ProductApi.fetchAllCustomProduct({
      product: "",
    }).then((res) => {
      var data =  res.data.data.filter(
        (product) => product.quantity > 0
      );
      setListProduct(data);
      // dispatch(SetProduct(data));
    });
  };

  const [listMaterial, setListMaterial] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listColor, setListColor] = useState([]);
  // const [listSize, setListSize] = useState([]);
  const [listSole, setListSole] = useState([]);

  const listSize = [];
  for (let size = 35; size <= 45; size++) {
    listSize.push(size);
  }

  const getColorName = (color) => {
    const colorObj = tinycolor(color);
    return colorObj.toName() || colorObj.toHexString();
  };

  const getList = () => {
    MaterialApi.fetchAll().then((res) => setListMaterial(res.data.data));
    CategoryApi.fetchAll().then((res) => setListCategory(res.data.data));
    SoleApi.fetchAll().then((res) => setListSole(res.data.data));
    BrandApi.fetchAll().then((res) => setListBrand(res.data.data));
    MaterialApi.fetchAll().then((res) => setListMaterial(res.data.data));
    ColorApi.getAllCode().then((res) => setListColor(res.data.data));
  };

  const [selectedValues, setSelectedValues] = useState({
    color: "",
    brand: "",
    material: "",
    product: "",
    size: null,
    sole: "",
    category: "",
    gender: "",
    status: "DANG_SU_DUNG",
    minPrice: 0,
    maxPrice: 50000000000,
  });

  const handleSelectChange = (value, fieldName) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

 

  const handleChangeValuePrice = (value) => {
    const [minPrice, maxPrice] = value;

    setSelectedValues((prevValues) => ({
      ...prevValues,
      minPrice: minPrice,
      maxPrice: maxPrice,
    }));
  };

  const loadData = () => {
    
    ProductApi.fetchAllCustomProduct(selectedValues).then(
      (res) => {
        var data =  res.data.data.filter(
          (product) => product.quantity > 0
        );

        setListProduct(data);
        // dispatch(SetProduct(data));
        setIsSubmitted(false);
      },
      (err) => {
      }
    );
  };

  // Xử lý logic chỉnh sửa
  const navigate = useNavigate();
  const handleViewDetail = (id) => {
    navigate(`/detail-product-management/${id}`);
  };
  const handleUpdate = (id) => {
    navigate(`/product-management/${id}`);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsSubmitted(true);
    getList();
    loadData();
  }, [selectedValues]);

  const getPromotionStyle = (promotion) => {
    return promotion >= 50 ? { color: "white" } : { color: "#000000" };
  };
  const getPromotionColor = (promotion) => {
    return promotion >= 50 ? { color: "#FF0000" } : { color: "#FFCC00" };
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={text}
            alt="Ảnh sản phẩm"
            style={{ width: "170px", borderRadius: "10%", height: "140px" }}
          />
          {record.promotion !== null && (
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
                  ...getPromotionColor(record.promotion),
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
                  ...getPromotionStyle(record.promotion),
                }}
              >
                {`${record.promotion}%`}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "60%", // Để "Giảm" nằm chính giữa biểu tượng
                  left: "50%", // Để "Giảm" nằm chính giữa biểu tượng
                  transform: "translate(-50%, -50%)", // Dịch chuyển "Giảm" đến vị trí chính giữa
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  ...getPromotionStyle(record.promotion),
                }}
              >
                Giảm
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
    },
    {
      title: "Giá ",
      dataIndex: "min",
      key: "min",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => {
        if(record.min === record.max){
          return (formatCurrency(record.min))
        }else{
          return (formatCurrency(record.min) + " ~ " + formatCurrency(record.max))
        }
    },
    },
    {
      title: "Số Lượng Tồn ",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            title="Chi tiết thể loại"
            style={{ backgroundColor: "#FF9900" }}
            onClick={(e) => showModal(e, record)}
          >
            Chọn
          </Button>
        </div>
      ),
    },
  ];

  // begin xử lý modal
  //   modal detail product size
  const [product, setProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e, record) => {
    setSizes([]);
    setProduct(record);
    setState(true)
    setIsModalOpen(true);
  };
  const clearSelectSize = () => {
    setSizes([]);
  };
  const handleOk = () => {
    if (sizes.length > 0 && quantity >= 1) {
      setIsModalOpen(false);
      if (typeAddProductBill === "CREATE_BILL") {
        var list = products;
        sizes.map((item) => {
          var index = list.findIndex((x) => x.idSizeProduct === item.id);
          var data = {
            image: item.image,
            productName: item.nameProduct,
            nameSize: item.nameSize,
            idProduct: item.id,
            quantity: quantity,
            price: item.price,
            idSizeProduct: item.id,
            maxQuantity: item.quantity,
          };
          if (index == -1) {
            list.push(data);
          } else {
            data.quantity = list[index].quantity + quantity;
            list.splice(index, 1, data);
          }
          dispatch(addProductBillWait(data));
        });
        setProducts(list);
      } else {
        sizes.map((item) => {
          var data = {
            idBill: typeAddProductBill,
            idProduct: item.id,
            size: item.nameSize,
            quantity: quantity,
            price: item.price,
          };
          BillApi.addProductInBill(data).then((res) => {
            const price = item.price;
            if (item.promotion != null) {
              price =
                (item.price * (100 - item.promotion)) / 100;
            }
            var product = {
              id: res.data.data,
              image: item.image,
              productName: item.nameProduct,
              nameSize: item.nameSize,
              idProduct: item.id,
              quantity: quantity,
              price: price,
              idSizeProduct: item.id,
            };
            dispatch(addProductInBillDetail(product));
          });
        });
      }
    }
    setQuantity(1)
    setState(false)
    setSizes([])
    // handleCancelProduct();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setQuantity(1)
    setState(false)
    setSizes([])
  };
  // end modal detail product size
  const [sizes, setSizes] = useState([]);
  // const [productSelect, setProductSelect] = useState({});
  const [quantity, setQuantity] = useState(1);
  const ChangedSelectSize = (e, size) => {
    setSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((selected) => selected !== size)
        : [...prevSelected, size]
    );
  };

  const ChangeQuantity = (value) => {
    setQuantity(value);
  };
  // end xử lý modal
  return (
    <div className="modelProduct" style={{maxHeight: "500px", overflowY: "auto"}}>
      <div className="content">
        <div className="content-wrapper">
          <div style={{ width: "100%" }}>
            <Row>
              <Col span={18}>
                <Input
                  value={search}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  style={{ width: "100%", marginRight: 10, height: 40 }}
                />
              </Col>
              <Col span={1}></Col>
              <Col span={5}>
                <Row>
                  <Col span={12}>
                    <Button
                      className="btn_filter"
                      type="submit"
                      onClick={handleSubmitSearch}
                      style={{ height: 40 }}
                    >
                      Tìm kiếm
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      className="btn_clear"
                      onClick={handleClear}
                      style={{ height: 40 }}
                    >
                      Làm mới
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="box_btn_filter" style={{paddingBottom: "8px"}}>
        <Row align="middle">
          <Col span={3} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Chất Liệu :</label>
          </Col>
          <Col span={2}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.material}
              onChange={(value) => handleSelectChange(value, "material")}
              defaultValue=""
            >
              <Option value="">Tất cả</Option>
              {listMaterial.map((material, index) => (
                <Option key={index} value={material.name}>
                  {material.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={3} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Thương Hiệu :</label>
          </Col>
          <Col span={2}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.brand}
              onChange={(value) => handleSelectChange(value, "brand")}
            >
              <Option value="">Tất cả</Option>
              {listBrand.map((brand, index) => (
                <Option key={index} value={brand.name}>
                  {brand.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Đế giày :</label>
          </Col>
          <Col span={2}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.sole}
              onChange={(value) => handleSelectChange(value, "sole")}
              defaultValue=""
            >
              <Option value="">Tất cả</Option>
              {listSole.map((sole, index) => (
                <Option key={index} value={sole.name}>
                  {sole.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Kích cỡ :</label>
          </Col>
          <Col span={2}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.sizeProduct}
              onChange={(value) => handleSelectChange(value, "sizeProduct")}
              defaultValue={null}
            >
              <Option value={null}>Tất cả</Option>
              {listSize.map((size, index) => (
                <Option key={index} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Màu Sắc :</label>
          </Col>
          <Col span={2}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.color}
              onChange={(value) => handleSelectChange(value, "color")}
              defaultValue=""
            >
              <Option value="">Tất cả</Option>
              {listColor.map((color, index) => (
                <Option key={index} value={color}>
                  <div
                    style={{
                      backgroundColor: color,
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                    }}
                  >
                    {getColorName(color)}
                  </div>
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>
      <div className="box_btn_filter" style={{paddingBottom: "8px"}} >
        <Row align="middle">
          <Col span={4} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Thể Loại :</label>
          </Col>
          <Col span={3}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.category}
              onChange={(value) => handleSelectChange(value, "category")}
              defaultValue=""
            >
              <Option value="">Tất cả</Option>
              {listCategory.map((category, index) => (
                <Option key={index} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Giới Tinh :</label>
          </Col>
          <Col span={3}>
            <Select
              style={{ width: "100%" }}
              value={selectedValues.gender}
              onChange={(value) => handleSelectChange(value, "gender")}
              defaultValue=""
            >
              <Option value="">Tất cả</Option>
              <Option value="NAM">Nam</Option>
              <Option value="NU">Nữ</Option>
            </Select>
          </Col>

          <Col span={2} style={{ textAlign: "right", paddingRight: 10 }}>
            <label>Khoảng giá :</label>
          </Col>
          <Col span={3}>
            <Slider
              range={{
                draggableTrack: true,
              }}
              defaultValue={[selectedValues.minPrice, selectedValues.maxPrice]}
              min={100000}
              max={30000000}
              tipFormatter={(value) => formatCurrency(value)}
              onChange={handleChangeValuePrice}
            />
          </Col>
        </Row>
      </div>

      <div style={{ marginTop: "0px" }}>
        <Table
          dataSource={listProduct}
          rowKey="id"
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="category-table"
          style={{margin: "10px 0 0 0"}}
        />
      </div>
      <Modal
        title=""
        width={800}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đặt hàng"
        closeButton={true}
        closeIcon={null}
        cancelButton={true}
      >
        <ModalDetailProduct
          id={product.id}
          ChangedSelectSize={ChangedSelectSize}
          ChangeQuantity={ChangeQuantity}
          clearSelectSize={clearSelectSize}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedSizes={sizes}
          setSelectedSizes={setSizes}
          state={state}
        />
      </Modal>
    </div>
  );
}

export default ModalAddProductDetail;
