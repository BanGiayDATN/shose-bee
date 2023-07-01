import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "./../../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import TableProductDetail from "../../../components/table/tableProduct";


function Product() {
  const products = useSelector((state) => state.products.products.value);
  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="container" style={{ marginTop: "20px" }}>
            <div className="row">
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
}

export default Product;
