import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import TimeLine from "./TimeLine";
import {
  addPaymentsMethod,
  addStatusPresent,
  getBill,
  getBillHistory,
  getPaymentsMethod,
  getProductInBillDetail,
} from "../../../app/reducer/Bill.reducer";
import moment from "moment";
import { useState } from "react";
import { BillApi } from "../../../api/employee/bill/bill.api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addBillHistory } from "../../../app/reducer/Bill.reducer";
import { PaymentsMethodApi } from "../../../api/employee/paymentsmethod/PaymentsMethod.api";
import "./detail.css";
import TextArea from "antd/es/input/TextArea";

var listStatus = [
  { id: 0, name: "Tạo hóa đơn", status: "TAO_HOA_DON" },
  { id: 1, name: "Chờ xác nhận", status: "CHO_XAC_NHAN" },
  { id: 2, name: "Vận chuyển", status: "VAN_CHUYEN" },
  { id: 3, name: "Đã thanh toán", status: "DA_THANH_TOAN" },
  { id: 4, name: "Thành công", status: "KHONG_TRA_HANG" },
];

function DetailBill() {
  const { id } = useParams();
  const detailProductInBill = useSelector(
    (state) => state.bill.bill.billDetail
  );
  const billHistory = useSelector((state) => state.bill.bill.billHistory);
  const paymentsMethod = useSelector((state) => state.bill.bill.paymentsMethod);
  const bill = useSelector((state) => state.bill.bill.value);
  const statusPresent = useSelector((state) => state.bill.bill.status);
  const [statusBill, setStatusBill] = useState({
    actionDescription: "",
    method: "TIEN_MAT",
    totalMoney: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    BillApi.fetchAllProductsInBillByIdBill(id).then((res) => {
      console.log(res);
      dispatch(getProductInBillDetail(res.data.data));
    });
    BillApi.fetchDetailBill(id).then((res) => {
      console.log(res);
      dispatch(getBill(res.data.data));
      var index = listStatus.findIndex(
        (item) => item.status == res.data.data.statusBill
      );
      if (res.data.data.statusBill == "TRA_HANG") {
        index = 6;
      }
      if (res.data.data.statusBill == "DA_HUY") {
        index = 7;
      }
      dispatch(addStatusPresent(index));
    });
    BillApi.fetchAllHistoryInBillByIdBill(id).then((res) => {
      dispatch(getBillHistory(res.data.data));
      console.log(res.data.data);
    });
    PaymentsMethodApi.findByIdBill(id).then((res) => {
      dispatch(getPaymentsMethod(res.data.data));
    });
  }, []);

  // begin cancelBill
  const [isModalCanCelOpen, setIsModalCanCelOpen] = useState(false);
  const showModalCanCel = () => {
    setIsModalCanCelOpen(true);
  };
  const handleCanCelOk = () => {
    setIsModalCanCelOpen(false);
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có đồng ý xác nhận không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        BillApi.changeCancelStatusBill(id, statusBill).then((res) => {
          dispatch(getBill(res.data.data));
          var index = listStatus.findIndex(
            (item) => item.status == res.data.data.statusBill
          );
          if (res.data.data.statusBill == "TRA_HANG") {
            index = 5;
          }
          if (res.data.data.statusBill == "DA_HUY") {
            index = 6;
          }
          var history = {
            stt: billHistory.length + 1,
            statusBill: res.data.data.statusBill,
            actionDesc: statusBill.actionDescription,
            id: "",
            createDate: new Date().getTime(),
          };
          dispatch(addStatusPresent(index));
          dispatch(addBillHistory(history));
        });
        setIsModalCanCelOpen(false);
      },
      onCancel: () => {
        setIsModalCanCelOpen(false);
      },
    });

    setStatusBill({
      actionDescription: "",
      method: "TIEN_MAT",
      totalMoney: 0,
    });
  };
  const handleCanCelClose = () => {
    setIsModalCanCelOpen(false);
  };
  // end  cancelBill

  // begin modal thanh toán
  const [isModalPayMentOpen, setIsModalPayMentOpen] = useState(false);
  const showModalPayMent = (e) => {
    setIsModalPayMentOpen(true);
  };
  const handleOkPayMent = () => {
    setIsModalPayMentOpen(false);
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có đồng ý thanh toán không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: async () => {
        await PaymentsMethodApi.payment(id, statusBill).then((res) => {
          dispatch(addPaymentsMethod(res.data.data));
          console.log(res.data.data);
        });
        await BillApi.fetchAllProductsInBillByIdBill(id).then((res) => {
          console.log(res.data.data);
          dispatch(getProductInBillDetail(res.data.data));
        });
        await BillApi.fetchDetailBill(id).then((res) => {
          console.log(res.data.data);
          dispatch(getBill(res.data.data));
          var index = listStatus.findIndex(
            (item) => item.status == res.data.data.statusBill
          );
          if (res.data.data.statusBill == "TRA_HANG") {
            index = 6;
          }
          if (res.data.data.statusBill == "DA_HUY") {
            index = 7;
          }
          dispatch(addStatusPresent(index));
          console.log(index);
        });
        await BillApi.fetchAllHistoryInBillByIdBill(id).then((res) => {
          dispatch(getBillHistory(res.data.data));
          console.log(res.data.data);
        });
        setIsModalPayMentOpen(false);
      },
      onCancel: () => {
        setIsModalPayMentOpen(false);
      },
    });
  };
  const handleCancelPayMent = () => {
    setIsModalPayMentOpen(false);
  };
  // enad modal thanh toán

  //  begin modal change status

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenChangeStatus, setIsModalOpenChangeStatus] = useState(false);

  const showModalChangeStatus = () => {
    setIsModalOpenChangeStatus(true);
  };

  const handleOkChangeStatus = () => {
    setIsModalOpenChangeStatus(false);
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có đồng ý thêm sản phẩm không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        BillApi.changeStatusBill(id, statusBill).then((res) => {
          console.log("change");
          console.log(res.data.data);
          dispatch(getBill(res.data.data));
          var index = listStatus.findIndex(
            (item) => item.status == res.data.data.statusBill
          );
          console.log(index);
          if (res.data.data.statusBill == "TRA_HANG") {
            index = 5;
          }
          if (res.data.data.statusBill == "DA_HUY") {
            index = 6;
          }
          console.log(res.data.data.statusBill);
          var history = {
            stt: billHistory.length + 1,
            statusBill: res.data.data.statusBill,
            actionDesc: statusBill.actionDescription,
            id: "",
            createDate: new Date().getTime(),
          };
          dispatch(addStatusPresent(index));
          dispatch(addBillHistory(history));
        });
        PaymentsMethodApi.findByIdBill(id).then((res) => {
          dispatch(getPaymentsMethod(res.data.data));
        });
        setIsModalOpenChangeStatus(false);
      },
      onCancel: () => {
        setIsModalOpenChangeStatus(false);
      },
    });
    setStatusBill({
      actionDescription: "",
      method: "TIEN_MAT",
      totalMoney: 0,
    });
    setIsModalOpenChangeStatus(false);
  };

  const handleCancelChangeStatus = () => {
    setIsModalOpenChangeStatus(false);
  };

  const onChangeDescStatusBill = (fileName, value) => {
    setStatusBill({ ...statusBill, [fileName]: value });
  };

  // end modal change statust

  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Mã sản phẩm</div>,
      dataIndex: "codeProduct",
      key: "codeProduct",
    },
    {
      title: <div className="title-product">Tên Sản Phẩm</div>,
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: <div className="title-product">Kích thước</div>,
      dataIndex: "nameSize",
      key: "nameSize",
    },
    {
      title: <div className="title-product">Màu</div>,
      dataIndex: "nameColor",
      key: "nameColor",
    },
    {
      title: <div className="title-product">Đế giày</div>,
      dataIndex: "nameSole",
      key: "nameSole",
    },
    {
      title: <div className="title-product">Chất liệu</div>,
      dataIndex: "nameMaterial",
      key: "nameMaterial",
    },
    {
      title: <div className="title-product">Giá</div>,
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: <div className="title-product">Số lượng </div>,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title:
        bill.statusBill == "DA_THANH_TOAN" ||
        bill.statusBill == "TAO_HOA_DON" ? (
          <div className="title-product">hành động</div>
        ) : (
          <div></div>
        ),
      dataIndex: "action",
      key: "id",
      render: (id) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {bill.statusBill == "TAO_HOA_DON" ? (
            <Button
              type="primary"
              title="Hủy"
              style={{ backgroundColor: "red" }}
              // onClick={() => handleViewDetail(record.id)}
            >
              Thay đổi
            </Button>
          ) : bill.statusBill == "DA_THANH_TOAN" ? (
            <Button
              type="primary"
              title="Hủy"
              style={{ backgroundColor: "red" }}
              // onClick={() => handleViewDetail(record.id)}
            >
              Hủy
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      ),
    },
  ];

  const columnsHistory = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Trạng thái</div>,
      dataIndex: "statusBill",
      key: "statusBill",
      render: (statusBill) => (
        <span>
          {statusBill == "TAO_HOA_DON"
            ? "Tạo Hóa đơn"
            : statusBill == "CHO_XAC_NHAN"
            ? "Chờ xác nhận"
            : statusBill === "VAN_CHUYEN"
            ? "Đang vận chuyển"
            : statusBill === "DA_THANH_TOAN"
            ? "Đã thanh toán"
            : statusBill === "KHONG_TRA_HANG"
            ? "Thành công"
            : statusBill === "TRA_HANG"
            ? "Trả hàng"
            : "Đã hủy"}
        </span>
      ),
    },
    {
      title: <div className="title-product">Ngày</div>,
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => {
        const formattedDate = moment(text).format(" HH:mm:ss DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-product">Người xác nhận</div>,
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: <div className="title-product">Ghi chú</div>,
      dataIndex: "actionDesc",
      key: "actionDesc",
    },
  ];

  const columnsPayments = [
    {
      title: <div className="title-product">Số tiền</div>,
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (totalMoney) => (
        <span>
          {totalMoney >= 1000
            ? totalMoney.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            : totalMoney + " đ"}
        </span>
      ),
    },
    {
      title: <div className="title-product">Trạng thái</div>,
      dataIndex: "method",
      key: "method",
      render: (method) => (
        <span>
          {method == "TIEN_MAT"
            ? "Tiền mặt"
            : method == "CHUYEN_KHOAN"
            ? "Chuyển khoản"
            : "Tiền mặt và chuyển khoản"}
        </span>
      ),
    },
    {
      title: <div className="title-product">thời gian</div>,
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-product">Ghi chú</div>,
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div>
      <Row style={{ width: "100%" }}>
        {/* <TimelineTest></TimelineTest> */}
        <div
          className="row"
          style={{
            backgroundColor: "white",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <Row style={{ backgroundColor: "white", width: "100%" }}>
            <TimeLine
              style={{ with: "100%" }}
              listStatus={listStatus}
              data={billHistory}
              statusPresent={statusPresent}
            />
          </Row>
          <Row
            style={{ width: "100%", marginBottom: "20px" }}
            justify={"space-around"}
          >
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <Row>
                  <Col
                    style={{ width: "100%" }}
                    span={statusPresent < 4 ? 7 : 0}
                  >
                    {statusPresent < 4 ? (
                      <Button
                        type="primary"
                        className="btn btn-primary"
                        onClick={() => showModalChangeStatus()}
                        style={{
                          fontSize: "medium",
                          fontWeight: "500",
                          marginLeft: "20px",
                        }}
                      >
                        {listStatus[statusPresent + 1].name}
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                  <Col span={statusPresent < 4 ? 6 : 0}>
                    {statusPresent < 4 ? (
                      <Button
                        type="danger"
                        onClick={() => showModalCanCel()}
                        style={{
                          fontSize: "medium",
                          fontWeight: "500",
                          marginLeft: "20px",
                          backgroundColor: "red",
                          color: "white",
                        }}
                      >
                        Hủy
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={12} align={"end"}>
                <Button
                  type="primary"
                  onClick={showModal}
                  style={{
                    fontSize: "medium",
                    fontWeight: "500",
                    marginRight: "20px",
                    backgroundColor: "#ccc",
                  }}
                >
                  Lịch sử
                </Button>
              </Col>
            </Row>
            <Modal
              title="Xác nhận Đơn hàng"
              open={isModalOpenChangeStatus}
              onOk={handleOkChangeStatus}
              onCancel={handleCancelChangeStatus}
            >
              {bill.statusBill === "VAN_CHUYEN" ? (
                <div>
                  <Row style={{ width: "100%", marginTop: "10px" }}>
                    <Col span={24}>
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Nhập số tiền"
                        onChange={(value) =>
                          onChangeDescStatusBill("totalMoney", value)
                        }
                        value={statusBill.totalMoney}
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%" }}>
                    <Col span={24}>
                      <Select
                        showSearch
                        style={{ width: "100%", margin: "10px 0" }}
                        placeholder="Chọn hình thức"
                        optionFilterProp="children"
                        onChange={(value) =>
                          onChangeDescStatusBill("method", value)
                        }
                        value={statusBill.method}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "TIEN_MAT",
                            label: "Tiền mặt",
                          },
                          {
                            value: "CHUYEN_KHOAN",
                            label: "Chuyển khoản",
                          },
                          {
                            value: "TIEN_MAT_VA_CHUYEN_KHOAN",
                            label: "Tiền mặt và chuyển khoản",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
                </div>
              ) : (
                <div></div>
              )}
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                  <TextArea
                    rows={bill.statusBill === "VAN_CHUYEN" ? 3 : 4}
                    value={statusBill.actionDescription}
                    placeholder="Nhập mô tả"
                    onChange={(e) =>
                      onChangeDescStatusBill(
                        "actionDescription",
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Row>
            </Modal>
            <div className="col-2">
              <Modal
                title="Hủy đơn hàng"
                open={isModalCanCelOpen}
                onOk={handleCanCelOk}
                onCancel={handleCanCelClose}
              >
                <Col span={24}>
                  <TextArea
                    rows={4}
                    value={statusBill.actionDescription}
                    placeholder="Nhập mô tả"
                    onChange={(e) =>
                      onChangeDescStatusBill(
                        "actionDescription",
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Modal>
            </div>
            <div className="offset-6 col-2">
              <Modal
                title="Lịch sử"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="widthModal"
                style={{}}
              >
                <Table
                  dataSource={billHistory}
                  columns={columnsHistory}
                  rowKey="id"
                  pagination={false} // Disable default pagination
                  className="product-table"
                />
              </Modal>
            </div>
          </Row>
        </div>
      </Row>

      <Row
        style={{
          width: "100%",
          marginBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <Row
          style={{
            width: "100%",
            borderBottom: "2px solid #ccc",
            padding: "12px",
            margin: "0px 20px",
          }}
        >
          <Col span={20}>
            <h2
              className="text-center"
              style={{
                width: "100%",
                fontSize: "x-large",
                fontWeight: "500",
                // margin: "10px 20px 20px 20px",
              }}
            >
              Lịch sử thanh toán
            </h2>
          </Col>
          <Col span={4}>
            <Button
              type="dashed"
              align={"end"}
              style={{ margin: "" }}
              onClick={(e) => showModalPayMent(e)}
            >
              Xác nhận thanh toán
            </Button>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Table
            dataSource={paymentsMethod}
            columns={columnsPayments}
            rowKey="id"
            pagination={false} // Disable default pagination
            className="product-table"
          />
        </Row>
      </Row>
      <Row>
        <div style={{ backgroundColor: "white" }}>
          <Row>
            <h2
              className="text-center"
              style={{
                width: "100%",
                fontSize: "x-large",
                fontWeight: "500",
                margin: "10px 20px 20px 20px",
                borderBottom: "2px solid #ccc",
                padding: "12px",
              }}
            >
              Thông tin đơn hàng
            </h2>
          </Row>
          <Row>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>Trạng thái:</Col>
                <Col span={16}>
                  <span
                    className={`trangThai ${" status_" + bill.statusBill} `}
                  >
                    {bill.statusBill == "TAO_HOA_DON"
                      ? "Tạo Hóa đơn"
                      : bill.statusBill == "CHO_THANH_TOAN"
                      ? "Chờ xác nhận"
                      : bill.statusBill === "VAN_CHUYEN"
                      ? "Đang vận chuyển"
                      : bill.statusBill === "DA_THANH_TOAN"
                      ? "Đã thanh toán"
                      : bill.statusBill === "KHONG_TRA_HANG"
                      ? "Thành công"
                      : bill.statusBill === "TRA_HANG"
                      ? "Trả hàng"
                      : "Đã hủy"}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>Tên khách hàng:</Col>
                <Col span={16}>
                  {bill.userName == "" ? (
                    <span
                      style={{
                        backgroundColor: " #ccc",
                        color: "white",
                        width: "180px",
                        borderRadius: "15px",
                        padding: " 5px 19px",
                        marginLeft: "10px",
                      }}
                    >
                      Khách lẻ
                    </span>
                  ) : (
                    <span>{bill.userName}</span>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>Loại:</Col>
                <Col span={16}>
                  <span
                    style={{
                      backgroundColor: " #9ff905",
                      color: "white",
                      width: "180px",
                      borderRadius: "15px",
                      padding: " 5px 19px",
                    }}
                  >
                    {bill.typeBill}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}> Số điện thoại:</Col>
                <Col span={16}>
                  <span>{bill.phoneNumber}</span>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>Mã hóa đơn:</Col>
                <Col span={16}>
                  <span>{bill.code}</span>
                </Col>
              </Row>
            </Col>

            {/* <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>Gmail: {bill.account != null ? bill.account.email : bill.account.customer }</div>
            </Col> */}
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>Địa chỉ:</Col>
                <Col span={16}>
                  <span>{bill.address}</span>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>ghi chú:</Col>
                <Col span={16}>
                  <span>{bill.note}</span>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}>Tiền giảm:</Col>
                <Col span={16}>
                  <span>
                    {bill.itemDiscount >= 1000
                      ? bill.itemDiscount.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : bill.itemDiscount + " đ"}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="text">
              <Row style={{ marginLeft: "20px" }}>
                <Col span={8}> Tổng tiền:</Col>
                <Col span={16}>
                  <span>
                    {bill.totalMoney >= 1000
                      ? bill.totalMoney.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : bill.totalMoney + " đ"}
                  </span>
                </Col>
              </Row>
            </Col>

            {/* <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Ngày xác nhận:{" "}
                {bill.confirmationDate != null
                  ? moment(bill.confirmationDate).format("DD-MM-YYYY")
                  : ""}{" "}
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Ngày nhận:{" "}
                {bill.receiveDate != null
                  ? moment(bill.receiveDate).format("DD-MM-YYYY")
                  : ""}
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Ngày giao hàng:{" "}
                {bill.deliveryDate != null
                  ? moment(bill.deliveryDate).format("DD-MM-YYYY")
                  : ""}
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                ngày hoàn thành:{" "}
                {bill.completionDate != null
                  ? moment(bill.completionDate).format("DD-MM-YYYY")
                  : ""}
              </div>
            </Col> */}
          </Row>
        </div>
      </Row>
      <Row
        style={{ width: "100%", backgroundColor: "white", marginTop: "20px" }}
      >
        {bill.statusBill == "TAO_HOA_DON" ? (
          <Row style={{ width: "100%" }} justify="end">
            <Button type="primary" style={{ margin: "10px 20px 0 0 " }}>
              Thêm sản phẩm
            </Button>
          </Row>
        ) : (
          <div></div>
        )}
        <Row style={{ width: "100%" }}>
          <Table
            dataSource={detailProductInBill}
            columns={columns}
            rowKey="id"
            pagination={false} // Disable default pagination
            className="product-table"
          />
        </Row>
      </Row>
      {/* begin modal payment  */}
      <Modal
        title="Xác nhận thanh toán"
        open={isModalPayMentOpen}
        onOk={handleOkPayMent}
        onCancel={handleCancelPayMent}
      >
        <Row style={{ width: "100%", marginTop: "10px" }}>
          <Col span={24}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập số tiền"
              onChange={(value) => onChangeDescStatusBill("totalMoney", value)}
              value={statusBill.totalMoney}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <Select
              showSearch
              style={{ width: "100%", margin: "10px 0" }}
              placeholder="Chọn hình thức"
              optionFilterProp="children"
              onChange={(value) => onChangeDescStatusBill("method", value)}
              value={statusBill.method}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "TIEN_MAT",
                  label: "Tiền mặt",
                },
                {
                  value: "CHUYEN_KHOAN",
                  label: "Chuyển khoản",
                },
                {
                  value: "TIEN_MAT_VA_CHUYEN_KHOAN",
                  label: "Tiền mặt và chuyển khoản",
                },
              ]}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <TextArea
              rows={bill.statusBill === "VAN_CHUYEN" ? 3 : 4}
              value={statusBill.actionDescription}
              placeholder="Nhập mô tả"
              onChange={(e) =>
                onChangeDescStatusBill("actionDescription", e.target.value)
              }
            />
          </Col>
        </Row>
      </Modal>
      {/* end modal payment  */}
    </div>
  );
}

export default DetailBill;
