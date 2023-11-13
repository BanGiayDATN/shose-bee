import React, { useState } from "react";
import "./Style-sign-up.css";
import { Link, useNavigate } from "react-router-dom";
import logoLogin from "./../../../assets/images/logo_client.png";
import Footer from "../../../component/customer/footer/Footer";
import { Form, Input } from "antd";
import { LoginApi } from "../../../api/employee/login/Login.api";
import { toast } from "react-toastify";
function SignUp() {
    const [formSignUp, setFormSignUp] = useState({
        roles: "ROLE_USER"
    })
    const [formErrors, setFormErrors] = useState({});
    const changeFormSignUp = (name, value) => {
        setFormSignUp((prev) => ({
            ...prev,
            [name]: value
        }))
        setFormErrors({})
    }
    const handleSignUp = () => {
        debugger
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passPattern = /^(?=.*[0-9])(.{8,})$/
        const isFormValid =
            formSignUp.email &&
            formSignUp.password;

        if (!isFormValid) {
            const errors = {
                email: !formSignUp.email
                    ? "Vui lòng nhập email"
                    : "",
                password: !formSignUp.password
                    ? "Vui lòng nhập mật khẩu"
                    : ""
            }
            setFormErrors(errors);
            return;
        } else if (isFormValid) {
            const errors = {
                email: !emailPattern.test(formSignUp.email)
                    ? "Vui lòng nhập đúng định dạng email"
                    : "",
                password: !passPattern.test(formSignUp.password)
                    ? "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất 1 số"
                    : ""
            }
            if (!errors.password === '' && !errors.email === '') {
                setFormErrors(errors);
                return;
            }
        }
        LoginApi.authenticationUp(formSignUp).then((res) => {
            toast.success("Đăng ký thành công");
        }, (err) => {
            if (err.response.data.message !== '') {
                setFormErrors((prev) => (
                    {
                        ...prev,
                        "email": err.response.data.message
                    }
                ))
            }

        })
    }
    return (<React.Fragment>
        <div className="sign-up">
            <div className="header-login">
                <Link style={{ marginLeft: "20%" }} to="/home">
                    <img className="logo-login" src={logoLogin} alt="..." />
                </Link>
            </div>
            <div className="box-sign-up">
                <div className="box-form-sign-up">
                    <div className="title-signup">
                        Đăng ký
                    </div>
                    <div className="form-signup">


                        <Form>
                            <Form.Item
                                validateStatus={formErrors["email"] ? "error" : ""}
                                help={formErrors["email"] || ""}
                            >
                                <Input
                                    className="input-form-signup" placeholder="Email"
                                    onChange={(e) => changeFormSignUp("email", e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                validateStatus={formErrors["password"] ? "error" : ""}
                                help={formErrors["password"] || ""}
                            >
                                <Input.Password
                                    type="password"
                                    className="input-form-signup" placeholder="Mật khẩu"
                                    onChange={(e) => changeFormSignUp("password", e.target.value)} />
                            </Form.Item>

                <Form.Item>
                  <div className="button-signup" onClick={handleSignUp}>
                    Đăng ký
                  </div>
                </Form.Item>
                <Form.Item>
                  <div>
                    Bạn đã có tài khoản?{" "}
                    <Link style={{ color: "#e7511a" }} to={"/login"}>
                      Đăng nhập
                    </Link>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default SignUp;
