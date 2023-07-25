import { useState } from "react";
import "./style-menu.css";
import logo from "./../../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Select, Space, Input, Button,Menu } from "antd";
import { SearchOutlined, LoginOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Option } = Select;
function HeaderMenu() {
  const [isOptionVisible, setOptionVisible] = useState(false);
  const [modal, setModal] = useState(false);

  const fields = [
    {
      className: "title-menu",
      title: "TRANG CHỦ",
    },
    {
      className: "title-menu",
      title: "SẢN PHẨM",
    },
    {
      className: "title-menu",
      title: "ABOUT US",
      option: [
        { title: "Blog styte", className: "title-option" },
        { title: "About us", className: "title-option" },
        { title: "Contact", className: "title-option" },
      ],
    },
    {
      className: "title-menu",
      title: "SALE OFF",
    },
  ];

  const handleMenuHover = () => {
    setOptionVisible(true);
  };

  const handleMenuLeave = () => {
    setOptionVisible(false);
  };
  const onSearch = () => {
    if (window.scrollY === 0) {
                    setModal(true);
                    console.log(modal);
                  } else {
                     
                          setModal(true);
                          //  window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn trang lên đầu
                    console.log(modal);
                  }
  };

  const offSearch = () => {
    setModal(false);
   
  };

  return (
    <div>
      <div className="menu">
        <div className="logo-menu">
          <img className="logo" src={logo} alt="..." />
        </div>
        <div className="space-menu">
          {fields.map((field, index) => {
            return (
              <div
                key={index}
                className={field.className}
                onMouseEnter={field.title === "ABOUT US" ? handleMenuHover : null}
                onMouseLeave={field.title === "ABOUT US" ? handleMenuLeave : null}
              >
                {field.option ? (
                  field.title
                ) : (
                  <Link className="link-menu" to={"/a"}>
                    {field.title}
                  </Link>
                )}

                {field.option && isOptionVisible && (
                  <Menu className="option-container">
                    {field.option.map((option, optionIndex) => (
                     <div key={optionIndex} className={option.className}>
                     {option.title}
                   </div>
                    ))}
                  </Menu>
                )}
              </div>
            );
          })}
        </div>
        <div className="search-menu">
          <SearchOutlined onClick={() => onSearch()} />
        </div>
      </div>

      <div>
        {modal && (
          <div className={`search-panel ${modal ? "open" : ""}`}>
            <div className="header-search">
              <div className="text-search">Tìm kiếm sản phẩm</div>

              <div className="exit-search">
                <LoginOutlined onClick={offSearch} />
              </div>
            </div>

            {/* content */}
            <div>
              <Input
                className="input-search-products"
                placeholder="Sản phẩm..."
              />

              <Select className=" custom-select" style={{ width: "100%" }}>
                <Option>aa</Option>
              </Select>

              <Button className=" button-search">Tìm kiếm</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderMenu;
