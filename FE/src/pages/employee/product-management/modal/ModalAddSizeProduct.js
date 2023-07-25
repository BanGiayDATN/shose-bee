import React, { useState } from "react";
import { Modal, Button, InputNumber, Row, Col, Input } from "antd";
import "./style-addSize.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ModalAddSizeProduct = ({ visible, onCancel, onSaveData }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState(
    Array.from({ length: 10 }, (_, index) => index + 35)
  );
  const [isAddSizeModalVisible, setAddSizeModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOkAddSize = () => {
    if (inputValue) {
      setSizes([...sizes, parseInt(inputValue)]);
      setInputValue("");
    }
    setInputValue("");
    setAddSizeModalVisible(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOk = () => {
    if (selectedSizes.length > 0) {
      // Check if there are selected sizes
      const selectedSizeData = selectedSizes.map((size) => ({
        size: size,
        quantity: quantity,
      }));

      onSaveData(selectedSizeData); // Save the array of selected sizes and quantities
      console.log(selectedSizeData);
      setSelectedSizes([]); // Reset selected sizes after saving
      setQuantity(1); // Reset quantity after saving
      onCancel();
    }
  };
  const toggleSizeSelection = (size) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((selected) => selected !== size)
        : [...prevSelected, size]
    );
  };

  const handleCancel = () => {
    setInputValue(""); // Reset the input value if canceled without saving
    onCancel();
    onCancel();
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <Modal
        title="Chọn kích thước và số lượng"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <Button
              onClick={() => setAddSizeModalVisible(true)}
              icon={<FontAwesomeIcon icon={faPlus} />}
            >
              Thêm kích thước
            </Button>
          </div>
        </div>
        <Row gutter={[16, 16]}>
          {/* Hiển thị các nút button cho các kích thước */}
          {sizes.map((size) => (
            <Col key={size} span={6}>
              <Button
                block
                className={selectedSizes.includes(size) ? "selected" : ""}
                onClick={() => toggleSizeSelection(size)} // Updated to use toggleSizeSelection function
              >
                {size}
              </Button>
            </Col>
          ))}
        </Row>

        {/* Label và input để nhập số lượng */}
        <div style={{ marginTop: 16 }}>
          <label>Số lượng:</label>
          <Button onClick={handleDecrease} style={{ margin: "0 4px 0 10px" }}>
            -
          </Button>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value)}
          />
          <Button onClick={handleIncrease} style={{ margin: "0 4px 0 4px" }}>
            +
          </Button>
        </div>
      </Modal>
      <Modal
        title="Nhập kích thước"
        visible={isAddSizeModalVisible}
        onOk={handleOkAddSize}
        onCancel={() => setAddSizeModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input value={inputValue} onChange={handleChange} />
        </div>
      </Modal>
    </>
  );
};

export default ModalAddSizeProduct;
