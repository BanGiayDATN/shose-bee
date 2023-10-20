import { Checkbox, Col, Menu, Row } from "antd";
import React from "react";
import "./Style-products.css";
import { useState } from "react";
import { useEffect } from "react";
import CardItem from "./../component/Card";
import { ProductDetailClientApi } from "../../../api/customer/productdetail/productDetailClient.api";
import { BrandApi } from "../../../api/employee/brand/Brand.api";
import { ColorApi } from "../../../api/employee/color/Color.api";
import { MaterialApi } from "../../../api/employee/material/Material.api";
import { SoleApi } from "../../../api/employee/sole/sole.api";
import { SizeApi } from "../../../api/employee/size/Size.api";
import { CategoryApi } from "../../../api/employee/category/category.api";
const categoryGender = [
  {
    name: "TẤT CẢ",
    value: "",
  },
  {
    name: "NAM",
    value: "NAM",
  },
  {
    name: "NỮ",
    value: "NU",
  },
];

const categoryStatus = [
  {
    name: "Sản phẩm giảm giá",
    value: "giam_gia",
  },
  {
    name: "Sản phẩm mới",
    value: "moi",
  },
];
const categoryPrice = [
  {
    name: "Dưới 500 nghìn",
    value: "duoi 500 nghin",
  },
  {
    name: "500 nghìn - 1 triệu",
    value: "moi",
  },
  {
    name: "1 triệu - 2 triệu",
    value: "moi",
  },
  {
    name: "2 triệu - 3 triệu",
    value: "moi",
  },
  {
    name: "Trên 3 triệu",
    value: "moi",
  },
];

function Products() {
  const [list, setList] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listSize, setListSize] = useState([]);
  const [listSole, setListSole] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [formSearch, setFormSearch] = useState({
    gender: "",
    // size: "",
  });
  useEffect(() => {
    BrandApi.getBrandInProductDetail().then((res) => {
      setListBrand(res.data.data);
    });
    CategoryApi.getCategoryInProductDetail().then((res) => {
      setListCategory(res.data.data);
    });
    MaterialApi.getMaterialInProductDetail().then((res) => {
      setListMaterial(res.data.data);
    });
    SizeApi.getSizeInProductDetail().then((res) => {
      setListSize(res.data.data);
    });
    SoleApi.getSoleInProductDetail().then((res) => {
      setListSole(res.data.data);
    });
    ColorApi.getColorInProductDetail().then((res) => {
      setListColor(res.data.data);
    });
    console.log(formSearch);
    ProductDetailClientApi.list(formSearch).then((res) => {
      setList(res.data.data.data);
      console.log(res.data.data.data);
    });
  }, [formSearch]);
  const changeFormSearch = (name, value) => {
    setFormSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const categorys = [
    {
      label: "Trạng thái",
      children: categoryStatus,
    },
    {
      label: "Chọn mức giá",
      children: categoryPrice,
    },
    {
      label: "Thương hiệu",
      children: listBrand,
    },
    {
      label: "Dòng sản phẩm",
      children: listCategory,
    },
    {
      label: "Chất liệu",
      children: listMaterial,
    },
    {
      label: "Kích thước",
      children: listSize,
    },
    {
      label: "Đế giày",
      children: listSole,
    },
    {
      label: "Màu",
      children: listColor,
    },
  ];
  return (
    <React.Fragment>
      <Row>
        <Col
          lg={{ span: 16, offset: 4 }}
          style={{ display: "flex", marginTop: "50px" }}
        >
          <div className="category-of-products">
            {/* <Menu className="category-gender"> */}
            <ul className="category-gender">
              {categoryGender.map((item, index) => (
                <>
                  <li
                    className={`sub-gender ${
                      formSearch["gender"] === item.value ? "clicked" : ""
                    }`}
                    onClick={() => changeFormSearch("gender", item.value)}
                  >
                    {item.name}
                  </li>
                  {index !== categoryGender.length - 1 && (
                    <p style={{ color: "rgb(183, 188, 188)" }}>|</p>
                  )}
                </>
              ))}
            </ul>

            <ul className="categorys">
              {categorys.map((item, index) => (
                <li
                  key={index}
                  className={
                    index < categorys.length - 1
                      ? "box-category"
                      : "box-category-end"
                  }
                >
                  <label
                    style={{
                      color: "#ff4400",
                      fontSize: "20px",
                      paddingBottom: 20,
                    }}
                  >
                    {item.label}
                  </label>
                  <ul>
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex} className="child-category">
                        <Checkbox /> {child.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="box-products">
            {list.map((item, index) => (
              <CardItem item={item} index={index} />
            ))}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Products;
