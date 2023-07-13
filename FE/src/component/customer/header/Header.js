import { Layout, Row, Col, Avatar, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const SalesHeader = () => {
  return (
    <Header className="sales-header">
      <Row align="middle" justify="space-between">
        <Col>
          <div className="logo">Logo</div>
        </Col>
        <Col>
          <div className="header-icons">
            <Badge count={3}>
              <ShoppingCartOutlined style={{ fontSize: "18px" }} />
            </Badge>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default SalesHeader;
