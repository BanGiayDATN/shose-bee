import React from "react";
import "./style-profile.css"
import { Form, Radio } from "antd";
import avatar from "../../../../assets/images/trending_banner03.jpg";
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
                            <input className="input-info-profile" placeholder="Điền họ và tên"/>
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
                                className="box-input-info-profile"
                            >

                                <Radio name="gender" value="Nam">Nam</Radio>
                                <Radio name="gender" value="Nữ">Nữ</Radio>
                                <Radio name="gender" value="Khác">Khác</Radio>
                            </Radio.Group>

                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh">
                            <input className="input-date-of-birth-profile" type="date" />
                        </Form.Item>

                    </Form>

                        <div style={{display:"flex",justifyContent:"center"}}>
                            <div className="button-update-profile">
                            Cập nhập
                            </div>
                        </div>
                </div>

                <div className="form-image-account">
                    <img src={avatar} alt="..." className="img-form-edit-profile" />
                    <div style={{display:"flex",justifyContent:"center"}}>
                    <p className="button-upload-image-profile">Chọn ảnh</p>
                    </div>
                </div>

            </div>
        </div>
    </React.Fragment>);
}

export default profile;