import { Button, Card, Form, Input, Row } from "antd";
import "./style-give-back-management.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { BillApi } from "../../../api/employee/bill/bill.api";
export default function GiveBackManagement() {
  const nav = useNavigate();

  const onFinish = (values) => {
    const bill = values.search;
    BillApi.BillGiveBackInformation(bill)
      .then(() => {
        nav(`/detail-give-back/${bill}`);
      })
      .catch((error) => {});
  };

  return (
    <>
      <Card className="contaier-give-back" style={{ height: "80vh" }}>
        <FontAwesomeIcon
          icon={faTruckArrowRight}
          style={{ fontSize: "30px" }}
        />
        <span style={{ fontSize: "23px" }}> Trả hàng</span>
        <div className="search-bill">
          <Row justify="center" align="middle">
            <Form
              name="customized_form_controls"
              layout="inline"
              onFinish={onFinish}
            >
              <Form.Item
                label="Mã hóa đơn "
                name="search"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã hóa đơn",
                  },
                ]}
                style={{ fontWeight: "bold", color: "blue" }}
              >
                <Input style={{ height: "35px", width: "400px" }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ height: "35px" }}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </Card>
    </>
  );
}
