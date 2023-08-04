import React from "react";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { ProducDetailtApi } from "../../../api/employee/product-detail/productDetail.api";
import { useAppDispatch } from "../../../app/hook";
import { SetProduct } from "../../../app/reducer/ProductDetail.reducer";
import { useEffect } from "react";

const ModalDetailProductManagment = ({ id, visible, onCancel }) => {
  // Sử dụng giá trị của id trong component
  // console.log("ID:", id);
  const [listProduct, setListProduct] = useState([]);
  const dispatch = useAppDispatch();
  const loadData = () => {
    ProducDetailtApi.fetchAll().then(
      (res) => {
        console.log(res);
        setListProduct(res.data.data);
        // dispatch(SetProduct(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    loadData();
  }, []);

  const getPromotionStyle = (promotion) => {
    return promotion >= 50 ? { color: "white" } : { color: "#000000" };
  };
  const getPromotionColor = (promotion) => {
    return promotion >= 50 ? { color: "#FF0000" } : { color: "#FFCC00" };
  };

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row"; // Áp dụng lớp 'even-row' cho hàng chẵn và 'odd-row' cho hàng lẻ
  };
  // format tiền
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    });
    return formatter.format(value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 70,
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (text, record) => (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={text}
            alt="Ảnh sản phẩm"
            style={{ width: "120px", borderRadius: "10%", height: "100px" }}
          />
          {record.promotion !== null && (
            <div
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                padding: "0px",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{
                  ...getPromotionColor(record.promotion),
                  fontSize: "3.5em",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "calc(50% - 10px)", // Đặt "50%" lên trên biểu tượng (từ 50% trừ 10px)
                  left: "50%", // Để "50%" nằm chính giữa biểu tượng
                  transform: "translate(-50%, -50%)", // Dịch chuyển "50%" đến vị trí chính giữa
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  ...getPromotionStyle(record.promotion),
                }}
              >
                {`${record.promotion}%`}
              </span>
              <span
                style={{
                  position: "absolute",
                  top: "60%", // Để "Giảm" nằm chính giữa biểu tượng
                  left: "50%", // Để "Giảm" nằm chính giữa biểu tượng
                  transform: "translate(-50%, -50%)", // Dịch chuyển "Giảm" đến vị trí chính giữa
                  fontSize: "0.8em",
                  fontWeight: "bold",
                  ...getPromotionStyle(record.promotion),
                }}
              >
                Giảm
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
    },
    {
      title: "Giá ",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => formatCurrency(text),
    },
    {
      title: "Số Lượng Tồn ",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      sorter: (a, b) => a.totalQuantity - b.totalQuantity,
      align: "center",
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <Button
          className={
            gender === "NAM"
              ? "primary-btn"
              : gender === "NU"
              ? "danger-btn"
              : "default-btn"
          }
        >
          {gender === "NAM" ? "Nam" : gender === "NU" ? "Nữ" : "Nam và Nữ"}
        </Button>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass =
          text === "DANG_SU_DUNG" ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === "DANG_SU_DUNG" ? "Đang kinh doanh " : "Không kinh doanh"}
          </button>
        );
      },
    },
  ];

  const data = [
    {
      key: "1",
      name: "vinh",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
  ];

  return (
    <Modal
      title="Table Modal"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
    >
      <Table
        dataSource={listProduct}
        rowKey="id"
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ y: 400 }}
        rowClassName={getRowClassName}
      />
    </Modal>
  );
};

export default ModalDetailProductManagment;
