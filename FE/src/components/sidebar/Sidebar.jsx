import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Accordion } from "react-bootstrap";

const menu = [{ name: 'Thống Kê', url: '', status: 0, icon: DashboardIcon },
{ name: 'Quản lý đơn hàng', url: '', status: 0, icon: ShoppingCartIcon },
{ name: 'Bán tại quầy', url: '', status: 0, icon: ShoppingCartCheckoutIcon },
{ parent: 'Quản lý sản phẩm', child: [{ name: 'Sản Phẩm', url: '', icon: StoreIcon }], status: 1 },
{ parent: 'Quản lý tài khoản', child: [{ name: 'Nhân Viên', url: '', icon: AccountCircleOutlinedIcon }, { name: 'Khách hàng', url: '', icon: AccountCircleOutlinedIcon }], status: 1 }]
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">lamadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* {
            menu.map((item, index) => {
              if (item.status == 0) {
                const Icon = item.icon;
                return <Link key={index} to={item.url} style={{ textDecoration: "none" }}>
                  <li>
                    <Icon className="icon" />
                    <span className="title" >{item.name}</span>
                  </li>
                </Link>
              } else {
                return  <div className="">
                  <Accordion defaultActiveKey={index} >
                    <Accordion.Item eventKey={0} style={{ border: "none"}}>
                     <Accordion.Header className="title" >{item.parent}</Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          {item.child.map((childMenu, indexChild) =>{
                            const Icon = childMenu.icon;
                             return <Link key={indexChild} to={childMenu.url} style={{ textDecoration: "none" }}>
                             <li>
                               <Icon className="icon" />
                               <span className="title" >{childMenu.name}</span>
                             </li>
                           </Link>
                          })}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              }
            })
          } */}
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">Quản Lý sản phẩm</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Sản Phẩm</span>
            </li>
          </Link>
          <Link to="/create-product" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Tạo sản phẩm</span>
            </li>
          </Link>
          <Link to="/properties" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Thuộc tính</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
