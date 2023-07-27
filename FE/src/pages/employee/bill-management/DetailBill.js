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
    method: "",
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
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
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
          <Row style={{ width: "100%", marginBottom: "20px" }}>
            <Row style={{ width: "100%" }}>
              <Col style={{ width: "100%" }} span={statusPresent < 4 ? 3 : 0}>
                {statusPresent < 4 ? (
                  <Button
                    type="primary"
                    className="btn btn-primary"
                    onClick={() => showModalChangeStatus()}
                    style={{ marginLeft: "10px" }}
                  >
                    {listStatus[statusPresent + 1].name}
                  </Button>
                ) : (
                  <div></div>
                )}
              </Col>
              <Col span={statusPresent < 4 ? 2 : 0}>
                {statusPresent < 4 ? (
                  <Button
                    type="danger"
                    onClick={() => showModalCanCel()}
                    style={{ backgroundColor: "red", marginLeft: "10px" }}
                  >
                    Hủy
                  </Button>
                ) : (
                  <div></div>
                )}
              </Col>
              <Col span={3}>
                <Button
                  type="primary"
                  onClick={showModal}
                  style={{ marginLeft: "10px" }}
                >
                  Lịch sử
                </Button>
              </Col>
            </Row>
            <Modal
              title="Xác nhận"
              open={isModalOpenChangeStatus}
              onOk={handleOkChangeStatus}
              onCancel={handleCancelChangeStatus}
            >
              <Row> Mã Hóa đơn: {bill.code}</Row>
              {bill.statusBill === "VAN_CHUYEN" ? (
                <div>
                  <Row style={{ width: "100%", marginTop: "10px" }}>
                    <Col span={5}>Nhập Số tiền: </Col>
                    <Col span={19}>
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder="vui lòng số"
                        onChange={(value) =>
                          onChangeDescStatusBill("totalMoney", value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row style={{ width: "100%" }}>
                    <Col span={5}>Hình thức: </Col>
                    <Col span={19}>
                      <Select
                        showSearch
                        style={{ width: "100%", margin: "10px 0" }}
                        placeholder="Chọn hình thức"
                        optionFilterProp="children"
                        onChange={(value) =>
                          onChangeDescStatusBill("method", value)
                        }
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
                <Col span={5}>Nhập mô tả: </Col>
                <Col span={19}>
                  <Input
                    placeholder="vui lòng nhập mô tả"
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
                <p className="row"> Mã Hóa đơn: {bill.code}</p>
                <p className="row">
                  <div className="mb-3">
                    <label className="form-label">Nhập mô tả</label>
                    <input
                      type="text"
                      className="form-control"
                      name="actionDescription"
                      value={statusBill.actionDescription}
                      onChange={(e) => onChangeDescStatusBill(e)}
                      id="exampleInputEmail1"
                    />
                  </div>
                </p>
              </Modal>
            </div>
            <div className="offset-6 col-2">
              <Modal
                title="Lịch sử"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="widthModal"
                style={{ marginLeft: "15%" }}
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
        <Row style={{ width: "100%" }}>
          <Col span={20}>
            <h2
              className="text-center"
              style={{ width: "100%", marginLeft: "20px" }}
            >
              Lịch sử thanh toán
            </h2>
          </Col>
          <Col span={4}>
            <Button
              type="dashed"
              align={"end"}
              style={{ margin: "17.430px 0" }}
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
              style={{ width: "100%", textAlign: "center" }}
            >
              {" "}
              Thông tin hóa đơn
            </h2>
          </Row>
          <Row>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>Mã hóa đơn: {bill.code}</div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Trạng thái:{" "}
               <span className={`trangThai ${" status_" + bill.statusBill} `}>
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
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Loại:{" "}
                <span
                  style={{
                    backgroundColor: " #9ff905",
                    color: "white",
                    width: "180px",
                    borderRadius: "15px",
                    padding: " 5px 19px",
                    marginLeft: "10px"
                  }}
                >
                  {bill.typeBill}
                </span>
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Tên khách hàng: {bill.userName == '' ? (<span style={{
                    backgroundColor: " #ccc",
                    color: "white",
                    width: "180px",
                    borderRadius: "15px",
                    padding: " 5px 19px",
                    marginLeft: "10px"
                  }}>Khách lẻ</span>) : (<span>{bill.userName}</span>)} 
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Số điện thoại: {bill.phoneNumber}
              </div>
            </Col>
            {/* <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>Gmail: {bill.account != null ? bill.account.email : bill.account.customer }</div>
            </Col> */}
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>Địa chỉ: {bill.address}</div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>ghi chú: {bill.note}</div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Tiền giảm:{" "}
                {bill.itemDiscount >= 1000
                  ? bill.itemDiscount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : bill.itemDiscount}
              </div>
            </Col>
            <Col span={12} className="text">
              <div style={{ marginLeft: "20px" }}>
                Tổng tiền:{" "}
                {bill.totalMoney >= 1000
                  ? bill.totalMoney.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : bill.totalMoney}
              </div>
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
          <Col span={5}>Nhập Số tiền: </Col>
          <Col span={19}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="vui lòng số"
              onChange={(value) => onChangeDescStatusBill("totalMoney", value)}
            />
          </Col>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={5}>Hình thức: </Col>
          <Col span={19}>
            <Select
              showSearch
              style={{ width: "100%", margin: "10px 0" }}
              placeholder="Chọn hình thức"
              optionFilterProp="children"
              onChange={(value) => onChangeDescStatusBill("method", value)}
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
          <Col span={5}>Nhập mô tả: </Col>
          <Col span={19}>
            <Input
              placeholder="vui lòng nhập mô tả"
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
