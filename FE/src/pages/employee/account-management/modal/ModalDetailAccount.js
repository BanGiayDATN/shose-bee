import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  Row,
  Col,
  Upload,
  message,
  Radio,
} from "antd";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { AccountApi } from "../../../../api/employee/account/account.api";
import { useParams, useNavigate } from "react-router-dom";
import "../style-account.css";
import { faKaaba } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Option } = Select;

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
      <div
        className="content-wrapper"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          CHI TIẾT NHÂN VIÊN
        </span>
      </div>
      <Row gutter={[24, 8]}>
        <Col
          className="filter"
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <div>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
              marginBottom: "50px",
              fontSize: "20px",
            }}
          >
            Ảnh đại diện
          </h1>
          <div>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              fileList={uploadedFile ? [uploadedFile] : []}
              onPreview={handlePreview}
              onChange={handleChange}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                showErrorTips: true,
              }}
            >
              {uploadedFile ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancelImagel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </div> */}
        </Col>

        <Col className="filter" span={17} style={{ marginLeft: "20px" }}>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "15px",
              marginBottom: "30px",
              fontSize: "20px",
            }}
          >
            Thông tin nhân viên
          </h1>
          <Form layout="vertical">
            <div className="title_add">
              <Row gutter={[24, 8]}>
                <Col span={10} style={{ marginLeft: "6%" }}>
                  <Form.Item label="Tên nhân viên">
                    <Input
                      value={account != null ? account.fullName : null}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input
                      value={account != null ? account.email : null}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label="Tỉnh/Thành phố">
                    <Select defaultValue="">
                      <Option value="">--Chọn Tỉnh/Thành phố--</Option>
                      {/* {listProvince?.map((item) => {
                        return (
                          <Option
                            key={item.ProvinceID}
                            value={item.ProvinceName}
                            valueProvince={item.ProvinceID}
                          >
                            {item.ProvinceName}
                          </Option>
                        );
                      })} */}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Xã/Phường">
                    <Select defaultValue="">
                      <Option value="">--Chọn Xã/Phường--</Option>
                      {/* {listWard?.map((item) => {
                        return (
                          <Option key={item.WardCode} value={item.WardName}>
                            {item.WardName}
                          </Option>
                        );
                      })} */}
                    </Select>
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
                  <Form.Item label="Giới tính">
                    <Radio.Group value={account.gender}>
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={10} style={{ marginLeft: "40px" }}>
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

                  <Form.Item label="Quận/Huyện">
                    <Select defaultValue=" ">
                      <Option value=" ">--Chọn Quận/Huyện--</Option>
                      {/* {listDistricts?.map((item) => {
                        return (
                          <Option
                            key={item.DistrictID}
                            value={item.DistrictName}
                            valueDistrict={item.DistrictID}
                          >
                            {item.DistrictName}
                          </Option>
                        );
                      })} */}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Số nhà/Ngõ/Đường">
                    <Input
                      className="input-item"
                      placeholder="Số nhà/Ngõ/Đường"
                    />
                  </Form.Item>
                  <Form.Item label="Mật khẩu">
                    <Input
                      value={account != null ? account.password : null}
                      readOnly
                    />
                  </Form.Item>
                  {/* <div>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%" }}
                />
                <p>Scanned Data: {qrData}</p>
              </div> */}
                </Col>
              </Row>
            </div>
          </Form>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
              marginRight: "8%",
              marginBottom: "20px",
            }}
          >
            <Button
              key="cancel"
              onClick={handleCancel}
              style={{ width: "100px", height: "40px" }}
            >
              Hủy
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ModalDetailAccount;
