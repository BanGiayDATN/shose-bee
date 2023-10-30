import {
  EnvironmentOutlined,
  FileSearchOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style-header.css";
function SalesHeader() {

  const idUser = localStorage.getItem("idAccount");
  const [openInfor, setOpenInfo] = useState(false);


  const handleMenuHover = () => {
    setOpenInfo(true);
  };

  const handleMenuLeave = () => {
    setOpenInfo(false);
  };



  const logout = () => {
    localStorage.removeItem("idAccount");
    window.location.href = "/home"
  };

  const fields = [
    {
      classIcon: "header-icon",
      icon: <FileSearchOutlined />,
      className: "title-header",
      title: "Tra cứu đơn hàng",
      to: "/sreach-bill"
    },
    {
      classIcon: "header-icon",
      icon: <EnvironmentOutlined />,
      className: "title-header",
      title: "Tìm kiếm cửa hàng",
      to: "#"
    },
    {
      classIcon: "header-icon",
      icon: <UserOutlined />,
      className: "title-header",
      to: idUser === null ? "/login" : "#",
      title: idUser === null ? "Đăng nhập" : "Thông tin",
    },
  ];
  return (
    <div className="header">
      <div className="content-header">
        <Link to="/sreach-bill" className="title-header">
          <span className="header-icon"><FileSearchOutlined /></span>  Tra cứu đơn hàng
        </Link>
      </div>

      <div className="content-header">
        <Link to="#" className="title-header">
          <span className="header-icon"><EnvironmentOutlined /></span> Tìm kiếm cửa hàng
        </Link>
      </div>
      <div className="content-header-account">

        <Link to={idUser === null ? "/login" : "#"} className="title-header">
          <span className="header-icon"><UserOutlined /></span> {idUser === null ? "Đăng nhập" : "Thông tin"}
        </Link>

        <ul className="dropdown-list">
          <li className="dropdown-item">
            Tài khoản của tôi
          </li>
          <li className="dropdown-item">
            Đơn mua
          </li>
          <li className="dropdown-item">
            Đăng xuất
          </li>
        </ul>
      </div>


    </div>
  );
}

export default SalesHeader;
