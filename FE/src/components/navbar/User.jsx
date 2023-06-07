import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap';
import Dropdown from "react-bootstrap/Dropdown";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="a"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

var menuUser = [{ href: "/", name: " Cài đặt", icon:"feather icon-settings" }, { href: "/", name: " Hồ sơ ", icon: " feather icon-user " }, { href: "/", name: " Đăng xuất ", icon: " feather icon-log-out " }]
function User() {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      alt=""
      className="avatar" />
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} style={{margin: "10px -10px 0 0"}}>
        
      {menuUser.map((menu, index) => (
            <Dropdown.Item key={index} href={menu.href}> <i className="fa-regular fa-right-from-bracket"></i>  {menu.name}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default User