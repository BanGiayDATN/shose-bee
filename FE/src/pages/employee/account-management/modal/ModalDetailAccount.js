import React, { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { useParams, useNavigate } from "react-router-dom";
import "../style-account.css";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalDetailAccount = ({ visible }) => {
  const { id } = useParams();
  const [account, setAcount] = useState({});
  const navigate = useNavigate();

  const getOne = () => {
    AccountApi.getOne(id).then((res) => {
      setAcount(res.data.data);
    });
  };
  const handleCancel = () => {
    navigate("/staff-management");
  };

  useEffect(() => {
    console.log(id);
    if (id != null && id !== "") {
      getOne();
    }
    return () => {
      setAcount({});
    };
  }, [id, visible]);

  return (
    <div>
      <div className="title_account">
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý nhân viên</span>
      </div>
      <div className="filter">
        <div
          className="content-wrapper"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px" }}
          >
            CHI TIẾT NHÂN VIÊN
          </span>
        </div>
        <div className="title_add">
          <Form layout="vertical">
            <Form.Item label="Tên nhân viên">
              <Input
                value={account != null ? account.fullName : null}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={account != null ? account.email : null} readOnly />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input
                value={account != null ? account.phoneNumber : null}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <Input
                value={
                  account != null
                    ? moment(account.dateOfBirth).format("DD-MM-YYYY")
                    : null
                }
                readOnly
              />
            </Form.Item>
            <Form.Item label="Mật khẩu">
              <Input
                value={account != null ? account.password : null}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Input
                value={
                  account != null
                    ? account.status == "DANG_SU_DUNG"
                      ? "Kích hoạt"
                      : "Ngừng kích hoạt"
                    : null
                }
                readOnly
              />
            </Form.Item>

            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalDetailAccount;
