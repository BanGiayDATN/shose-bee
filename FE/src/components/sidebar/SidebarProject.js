import React from "react";
import { Layout, Menu } from "antd";
import "./sidebar.scss";

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const menu = [
  { name: "Thống kê", url: "/", icon: UserOutlined },
  { name: "Hóa đơn", url: "/bill", icon: UserOutlined },
  { name: "Quản lý đơn hàng", url: "/don-hang", icon: UserOutlined },
  { name: "Địa chỉ", url: "/address", icon: UserOutlined },
];

const subMenu = [
  {
    parent: "Quản lý sản phẩm",
    child: [
      { name: "Sản Phẩm", url: "/products" },
      { name: "Thể loại ", url: "/category" },
      { name: "Đế giày", url: "/sole" },
      { name: "Màu", url: "/mau" },
    ],
    icon: LaptopOutlined,
  },
  {
    parent: "Quản lý Tài khoản",
    child: [
      { name: "Nhân viên", url: "/employee" },
      { name: "Khách hàng", url: "/user" },
    ],
    icon: UserOutlined,
  },
  {
    parent: "Mã khuyến mãi",
    child: [
      {
        name: "Ưu đãi thành viên ",
        url: "/member-offers",
      },
      { name: "Mã giảm giá", url: "/voucher" },
    ],
    icon: UserOutlined,
  },
];
const SidebarProject = () => {
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {menu.map((item, index) => {
          var Icon = item.icon;
          return (
            <Link
              key={"M" + index}
              to={item.url}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                className="ant-menu-submenu-title"
                style={{ paddingLeft: "24px" }}
              >
                <Icon
                  className="anticon anticon-user ant-menu-item-icon"
                  style={{ color: "black" }}
                />
                <p
                  className="ant-menu-title-content"
                  style={{ margin: "0px 0px 0px 10px" }}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          );
        })}
        {subMenu.map((item, index) => {
          var Icon = item.icon;
          return (
            <Menu.SubMenu
              key={"Sb" + index}
              icon={<Icon />}
              title={item.parent}
            >
              {item.child.map((child, keyChild) => {
                return (
                  <Menu.Item>
                    <Link
                      style={{ textDecoration: "none" }}
                      key={"Sb" + index + "" + keyChild}
                      to={child.url}
                    >
                      {child.name}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          );
        })}
        {/* <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Menu 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub2"
          icon={<LaptopOutlined />}
          title="Quản Lý Sản Phẩm"
        >
          <Menu.Item key="5">Thể Loại</Menu.Item>
          <Menu.Item key="6">Đế Giày</Menu.Item>
          <Menu.Item key="7">Màu Sắc</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" icon={<NotificationOutlined />} title="Menu 3">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </Menu.SubMenu> */}
      </Menu>
    </Sider>
  );
};

export default SidebarProject;
