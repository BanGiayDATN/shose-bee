import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SidebarProject = () => {
  return (
    <Sider width={250} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0  }}
      >
        <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Menu 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" icon={<LaptopOutlined />} title="Quản Lý Sản Phẩm">
          <Menu.Item key="5">Thể Loại</Menu.Item>
          <Menu.Item key="6">Đế Giày</Menu.Item>
          <Menu.Item key="7">Màu Sắc</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="sub3"
          icon={<NotificationOutlined />}
          title="Menu 3"
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default SidebarProject;
