import { Select, Space, Input, Button, Image, Row, Col } from "antd";
import { RiseOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom";
import banner1 from "./../../../assets/images/banner-2.png";
import banner2 from "./../../../assets/images/b-7.png";
import banner3 from "./../../../assets/images/b-8.png";

import "./style-home.css";
function Home() {
  return (
    <div className="home">
      <div className="banner">
        <img className="banner1" src={banner1} alt="..." />
      </div>
      <div className="">
        <Row justify="center">
          <Col
           
            lg={{ span: 7, offset: 0 }}
          >
            <div className="type-gender">
              <Link>
                <img className="choose-gender" src={banner3} alt="..." />
                <Button type="" className="button-choose-gender">Giày Nữ <RiseOutlined /></Button>
              </Link>
            </div>
          </Col>

          <Col
          
            lg={{ span: 7, offset: 1 }}
          >
            <div  className="type-gender">
              <Link className="hover-wrapper">
                <img className="choose-gender" src={banner2} alt="..." />
                <Button type="" className="button-choose-gender">Giày Nam <RiseOutlined /></Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
