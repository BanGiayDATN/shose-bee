import React, { useState } from "react";
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Badge,
} from "antd";
import "./style-dashboard-employee.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faChartLine,
  faDumpsterFire,
  faFileInvoiceDollar,
  faMoneyBill1Wave,
  faTags,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "antd/es/menu/SubMenu";

const { Header, Sider, Content } = Layout;
const notificationCount = 5; // Số lượng thông báo chưa đọc
const colorBgContainer = "#f0f2f5"; // Màu nền của header

const DashBoardEmployee = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="1">
        Thông tin người dùng
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} key="2">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout-employee">
      <Sider trigger={null} collapsible width={225} collapsed={collapsed}>
        <div className="logo">
          <img src={Logo} className="logo-content" />
        </div>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            className="menu-item"
            icon={
              <FontAwesomeIcon icon={faChartLine} style={{ color: "white" }} />
            }
          >
            <Link to="/dashboard">Thống Kê</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={
              <FontAwesomeIcon
                icon={faBagShopping}
                style={{ color: "white" }}
              />
            }
          >
            <Link to="/product-management">Quản Lý Đơn Hàng</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={
              <FontAwesomeIcon
                icon={faDumpsterFire}
                style={{ color: "white" }}
              />
            }
          >
            <Link to="/product-management">Bán Hàng Tại Quầy</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                style={{ color: "white" }}
              />
            }
          >
            <Link to="/product-management">Quản Lý Thu Chi</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                style={{ color: "white" }}
              />
            }
          >
            <Link to="/bill-management">Quản Lý Hóa đơn</Link>
          </Menu.Item>
          <SubMenu
            key="5"
            icon={
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                style={{ color: "white" }}
              />
            }
            title="Quản Lý Sản Phẩm"
          >
            <Menu.Item key="5.0">
              <Link to="/product-management">Sản Phẩm</Link>
            </Menu.Item>
            <Menu.Item key="5.1">
              <Link to="/category-management">Thể Loại</Link>
            </Menu.Item>
            <Menu.Item key="5.2">
              <Link to="/sole-management">Đế Giày</Link>
            </Menu.Item>
            <Menu.Item key="5.3">
              <Link to="/brand-management">Thương Hiệu</Link>
            </Menu.Item>
            <Menu.Item key="5.4">
              <Link to="/material-management">Chất Liệu</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="6"
            icon={
              <FontAwesomeIcon icon={faUserGroup} style={{ color: "white" }} />
            }
          >
            <Link to="/accc-management">Quản Lý Tài Khoản</Link>
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<FontAwesomeIcon icon={faTags} style={{ color: "white" }} />}
          >
            <Link to="/admin/label-management">Khuyến Mại</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="header-layout"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Badge count={notificationCount} style={{ backgroundColor: "red" }}>
              <Button type="text" style={{ marginRight: "16px" }}>
                <BellOutlined />
              </Button>
            </Badge>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="text">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh3o8wXCosZQv39_aJj1CfaXpX5lfgRdqsAw&usqp=CAU"
                  alt="User Avatar"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    marginRight: "50px",
                    marginLeft: "20px",
                  }}
                />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 7,
            minHeight: 280,
            borderRadius: "15px",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardEmployee;
