import React, { useState, useRef } from "react";
import { Modal, Button } from "antd";
import { QrReader } from "react-qr-reader";

const QRScannerModal = ({ visible, onCancel, onQRCodeScanned }) => {
  const [qrCode, setQRCode] = useState(null);
  const qrReaderRef = useRef(null); // Thêm useRef để tham chiếu đến thư viện quét mã QR

  const handleScan = (data) => {
    if (data) {
      setQRCode(data.text);
      onQRCodeScanned(data.text);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleCloseModal = () => {
    if (qrReaderRef.current) {
      qrReaderRef.current.closeImageDialog(); // Đóng camera khi đóng Modal
    }
    onCancel();
  };

  return (
    <Modal
      title="QR Code Scanner"
      visible={visible}
      onCancel={handleCloseModal}
      footer={[
        <Button key="cancel" onClick={handleCloseModal}>
          Cancel
        </Button>,
      ]}
    >
      <QrReader
        delay={300}
        onError={handleError}
        // onScan={handleScan}
        style={{ width: "100%" }}
        onResult={handleScan}
        ref={qrReaderRef} // Gán ref cho thư viện quét mã QR
      />
      {qrCode && <p>Scanned QR Code: {qrCode}</p>}
    </Modal>
  );
};

export default QRScannerModal;