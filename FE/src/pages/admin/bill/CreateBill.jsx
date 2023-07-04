import React, { useState } from 'react'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ListIcon from '@mui/icons-material/List';
import './bill.scss'
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NavbarBill from '../../../components/navbar/NavbarBill';
import BillService from '../../../service/BillService';
import { Table } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';



var tabData = [
  { name: 'Tab 1', isActive: true },
  { name: 'Tab 2', isActive: false },
  { name: 'Tab 3', isActive: false }
];

function CreateBill() {
  const data = useSelector((state) => state.bill.billWait.value);
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabData[0])
  const handleClick = (tab) => {
    setTab(tab);
  }
  const dispatch = useDispatch();
  const addBillWait = () => {
    BillService.createBillWait(dispatch)
  }
  return (
    <div className="row ">
      <Tab.Container id="" defaultActiveKey="first">
        <Row>
          <div className="navbar row">
            <div className="home  normal-mode-actions">
              {/* mới sửa */}
              {/* <SidebarProject /> */}
              <div className="homeContainer" >
                <div className="row">
                  <div className="col-4" style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div className="row">
                      <div className=" col-8" style={{ padding: "0px" }}>
                        <div className='search'>
                          <input type="text" className='text' placeholder="Search..." />
                          <SearchOutlinedIcon />
                        </div>
                      </div>
                      <div className="col-2" style={{ padding: "0px" }}>
                        <input style={{ margin: '0 5px' }} type="text" className="form-control" placeholder="Số lượng" />
                      </div>
                      <div className="col-1" style={{ padding: '0px', margin: "0px 9px" }}>
                        <Button style={{ marginLeft: '5px' }}>mã</Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="row">
                      <div className="col-1">
                        <ArrowBackIosIcon />
                      </div>
                      <div className="col-9">
                        <Nav variant="pills" className="row">
                          {data.map((item, index) => (
                            <Nav.Item className='col-4' key={item.id}>
                              <Nav.Link eventKey={item.id}>{"Hóa đơn " + (index + 1)}</Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      </div>
                      <div className="col-2">
                        <div className="row">
                          <div className="col-6">
                            <ArrowForwardIosIcon />
                          </div>
                          <div className="col-6">
                            <AddCircleOutlineIcon onClick={addBillWait} />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="col-3">
                    <div className="items">
                      <div className="item">
                        <KeyboardReturnIcon  onClick={() => navigate(-1)}/>
                      </div>
                      <div className="item">
                        0338957590
                      </div>
                      <div className="item">
                        <ListIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <Tab.Content>
              {data.map((item, index) => (
                <Tab.Pane eventKey={item.id}>
                  <div className="row">
                    <div className="col-8">
                      <Table
                        dataSource={[]}
                        columns={[]}
                        rowKey="id"
                        pagination={false} // Disable default pagination
                        className="product-table"
                        style={{ height: "100px" }}
                      />
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col-6">
                        {item.code}
                        </div>
                        <div className="col-6">
                          <div className="items">
                          <div className="item">
                              { moment(item.createdDate).format("DD-MM-YYYY")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className='search'>
                            <input type="text" className='text' placeholder="Search..." />
                            <SearchOutlinedIcon />
                          </div>
                        </div>
                        <div className="col-6">
                          <AddCircleOutlineIcon />
                        </div>
                      </div>
                      <div className="row">
                        <div className="row"><input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Tên người người nhận  " /></div>
                        <div className="row"><input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Số điện thoại" /></div>
                        <div className="row">
                          <div className="col-4">
                            tỉnh
                            <select class="form-select" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-4">
                          Huyện
                            <select class="form-select" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-4">
                            Xã 
                            <select class="form-select" aria-label="Default select example">
                              <option selected>Open this select menu</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="row"><input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Địa chỉ " /></div>
                        <div className="row"><input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ghi chú " /></div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="row">
                        <div className="col-6">
                          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Mã giảm giá" />
                        </div>
                        <div className="col-6">
                          <Button variant="primary">Chọn mã giảm giá</Button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="row">
                          <div className="col-8">Tiền hàng</div>
                          <div className="col-4">0 đ</div>
                        </div>
                        <div className="row">
                          <div className="col-8">Giảm giá</div>
                          <div className="col-4">0 đ</div>
                        </div>
                        <div className="row">
                          <div className="col-8">Tổng tiền</div>
                          <div className="col-4">0 đ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default CreateBill