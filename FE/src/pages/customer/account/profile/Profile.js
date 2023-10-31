import React from "react";
import "./style-profile.css"
import { Form, Radio } from "antd";
function profile() {
    return (<React.Fragment>
        <div className="profile-account">
            <div className="title-profile-account">
                <p className="title-profile">Hồ sơ của tôi</p>
                <p className="sub-title-profile"> Quản lý thông tin để bảo mật tài khoản</p>
            </div>
            <div className="content-profile-account">
                <div className="form-profile-account">

                    <Form
                        labelCol={{
                            span: 5,
                        }}

                    >
                        <Form.Item
                            label="Họ và tên">
                            <input className="input-info-profile" />
                        </Form.Item>
                        <Form.Item
                            label="Email">
                            <div className="box-input-info-profile">
                                diem05152003@gmail.com
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại">
                            <div className="box-input-info-profile">
                                0971833489
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="Giới tính"

                        >
                            <Radio.Group
                                style={{ display: "flex" }}
                            >
                                <Radio>Nam</Radio>
                                <Radio>Nam</Radio>
                                <Radio>Khác</Radio>
                            </Radio.Group>

                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh">
                            <select></select>
                        </Form.Item>
                    </Form>

                </div>

                <div className="form-image-account">

                </div>

            </div>
        </div>
    </React.Fragment>);
}

export default profile;