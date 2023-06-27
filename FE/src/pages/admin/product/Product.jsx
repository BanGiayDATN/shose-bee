import React from 'react'
import { useSelector } from 'react-redux';
import List from '../../../components/table/Table';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from "./../../../components/navbar/Navbar";
import { Link } from 'react-router-dom';


function Product() {
    const products = useSelector((state) => state.product.product.value);
    return (
        <div>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="container" style={{marginTop: "20px"}}>
                     <div className="row">
                        <Link to={"/create-product"}> <button className='btn  btn-info'>Tạo sản phẩm</button></Link>
                     </div>   
                    <div className="row">
                    <List rows={products}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product