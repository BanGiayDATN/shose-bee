import React from 'react';
import { Menu } from 'antd';

const HeaderMenu = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="1">Trang chủ</Menu.Item>
      <Menu.Item key="2">Giới thiệu</Menu.Item>
      <Menu.Item key="3">Dịch vụ</Menu.Item>
      <Menu.Item key="4">Liên hệ</Menu.Item>
    </Menu>
  );
};

export default HeaderMenu;
