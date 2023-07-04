import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./../../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import TableProductDetail from "../../../components/table/tableProduct";
import SidebarProject from "../../../components/sidebar/SidebarProject";
import Combox from "./ComBox";
import CategoryService from "../../../service/CategoryService";
import { useState } from "react";
import { useEffect } from "react";
import SoleService from "../../../service/SoleService";
import ProductService from "../../../service/ProductService";

const Product = () => {
  const products = useSelector((state) => state.products.products.value);
  // lấy list 
  const [listCategory, setListCategory] = useState([]);
  const [listSole, setListSole] = useState([]);


  const fetchData = async (apiEndpoint, setList) => {
    try {
      const response = await apiEndpoint();
      setList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // thực thi hành động 
  useEffect(() => {
    fetchData(CategoryService.listAllCategory, setListCategory);
    fetchData(SoleService.listAllSole, setListSole);
  }, []);


  const handleComboxChange = (value) => {
    // Xử lý sự kiện thay đổi giá trị của Combox tại đây)
    console.log("Combox value changed:", value);
  };

  return (
    <div>
      <div className="home">
        <SidebarProject />
        <div className="homeContainer">
          <Navbar />
          <div className="container" style={{ marginTop: "20px" }}>
            <div className="row">
              <div className="row-combox">
                <div className="combox-container">
                  <Combox
                    options={listCategory}
                    defaultValue=" Mời bạn chọn "
                    onChange={handleComboxChange}
                    renderOptionLabel={(option) => option.name}
                  />
                </div>

                <div className="combox-container">
                  <Combox
                    options={listSole}
                    defaultValue=" Mời bạn chọn "
                    onChange={handleComboxChange}
                    renderOptionLabel={(option) => option.name}
                  />
                </div>
              </div>

              <Link to={"/create-product"}>
                {" "}
                <button className="btn  btn-info">Tạo sản phẩm</button>
              </Link>
            </div>
            <div className="row">
              <TableProductDetail rows={products} />
            </div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Product;
