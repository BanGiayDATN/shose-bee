import React, { useState } from "react";
import "./style-layout-account.css"
import avatar from "../../../../assets/images/logo sneaker 2.png";
import { EditOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faStore, faTags, faUser } from "@fortawesome/free-solid-svg-icons";
function LayoutAccount({ children }) {
    const [id, setId] = useState(1);
    const [idChild, setIdChild] = useState(1);
    const openCateprofile = (id) => {
        setId(id)
        setIdChild(1)
    }
    const openCateChildProfile = (id) => {
        setIdChild(id)
    }
    const category = [
        {
            id: 1,
            name: "Tài khoản của tôi",
            page: "/profile",
            icon: <FontAwesomeIcon icon={faUser} style={{ color: "#ff4400" }} />,
            children: [
                {
                    id: 1,
                    name: "Hồ sơ",
                    page: "/profile",
                },
                {
                    id: 2,
                    name: "Địa chỉ",
                    page: "/address",
                },
                {
                    id: 3,
                    name: "Đổi mật khẩu",
                    page: "/password",
                }
            ]
        },
        {
            id: 2,
            name: "Đơn mua",
            page: "/purchase",
            icon: <FontAwesomeIcon icon={faStore} style={{ color: "#ff4400" }} />,
        },
        {
            id: 3,
            name: "Thông báo",
            page: "/notifications",
            icon: <FontAwesomeIcon icon={faBell} style={{ color: "#ff4400" }} />,
        },
        {
            id: 4,
            name: "Kho voucher",
            page: "/repository-voucher",
            icon: <FontAwesomeIcon icon={faTags} style={{ color: "#ff4400" }} />,
        }
    ]
    return (<React.Fragment>
        <div className="layout-account">
            <div className="sidebar-account">
                <div className="box-persional-profile">
                    <img className="avatar-account" src={avatar} alt="..." />
                    <div className="name-account">
                        <p style={{ fontWeight: 500 }}>
                            Đinh Khắc Diệm
                        </p>

                        <div style={{ color: "grey", fontSize: 14 }}> <EditOutlined /> Sửa hồ sơ</div>
                    </div>

                </div>
                <div className="caterory-account">
                    {category.map((item, index) => (
                        <>
                            <div key={index} className="box-title-category-account"

                                onClick={() => openCateprofile(item.id)}>
                                <span style={{ width: "30px" }}>{item.icon}</span>
                                <span
                                    style={{ color: id === 1 ? "black" : (id === item.id ? "#ff4400" : "black") }}
                                    className="title-category-account">{item.name}</span>
                            </div>

                            {id === 1 && item.children ? (
                                <div className="box-child-category"
                                >
                                    {
                                        item.children.map((itemChild, indexChild) => (
                                            <div className="title-child-category" key={indexChild} style={{ color: idChild === itemChild.id ? "#ff4400" : "gray" }} onClick={() => openCateChildProfile(itemChild.id)}>
                                                {itemChild.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (null)}
                        </>

                    ))}
                </div>
            </div>
            <div className="children-account">
                {children}
            </div>
        </div>
    </React.Fragment>);
}

export default LayoutAccount;