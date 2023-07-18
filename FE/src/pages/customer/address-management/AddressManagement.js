import React, { Children, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Modal,
  Popconfirm,
  Col,
  Row,
} from "antd";
import "./style-address.css";
import { AddressApi } from "../../../api/customer/address/address.api";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { ToastContainer, toast } from "react-toastify";
import {
  CreateAddress,
  GetAddress,
  SetAddress,
  SetProvince,
  UpdateAddress,
} from "../../../app/reducer/Address.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faFilter,
  faKaaba,
  faListAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import ModalCreateAddress from "./modal/ModalCreateAddress";
import ModalUpdateAddress from "./modal/ModalUpdateAddress";
import ModalDeatailAddress from "./modal/ModalDetailAddress";

const { Option } = Select;

const AddressManagement = () => {
  const [listAddress, setListAddress] = useState([]);
  const [listProvinceSearch, setListProvinceSearch] = useState([]);
  const [listDistrictsSearch, setListDistrictsSearch] = useState([]);
  const [listWardSearch, setListWardSearch] = useState([]);
  const dispatch = useAppDispatch();
  const [searchAddress, setSearchAddress] = useState({
    keyword: "",
    city: "",
    province: "",
    country: "",
  });

  const [addressId, setAddressId] = useState("");
  const [addressIdDeatail, setAddressIdDetail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleDetail, setModalVisibleDetail] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
    setModalVisibleUpdate(false);
    setModalVisibleDetail(false);
  };

  const handleViewUpdate = (id) => {
    setAddressId(id);
    setModalVisibleUpdate(true);
  };

  const handleViewDetail = (id) => {
    setAddressIdDetail(id);
    setModalVisibleDetail(true);
  };

  // lấy mảng redux ra
  const data = useAppSelector(GetAddress);
  useEffect(() => {
    if (data != null) {
      setListAddress(data);
    }
  }, [data]);

  // search address
  const handleInputChangeSearch = (name, value) => {
    setSearchAddress((prevSearchAddress) => ({
      ...prevSearchAddress,
      [name]: value,
    }));
  };

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    handleInputChangeSearch("keyword", value);
    AddressApi.fetchAll({
      line: value,
      province: searchAddress.province,
      city: searchAddress.city,
      country: searchAddress.country,
    }).then((res) => {
      setListAddress(res.data.data);
      dispatch(SetAddress(res.data.data));
    });
  };

  const handleProvinceChangeSearch = (value, valueProvinceS) => {
    handleInputChangeSearch("province", valueProvinceS.valueProvince);
    handleClearDistrictWardSearch(valueProvinceS.valueProvince);
    AddressApi.fetchAllProvinceDistricts(value).then((res) => {
      setListDistrictsSearch(res.data.districts);
    });
    AddressApi.fetchAll({
      line: searchAddress.keyword,
      province: valueProvinceS.valueProvince,
      city: searchAddress.city,
      country: searchAddress.country,
    }).then((res) => {
      setListAddress(res.data.data);
      dispatch(SetAddress(res.data.data));
    });
  };

  const handleCityChangeSearch = (value, valueDistrictS) => {
    handleInputChangeSearch("city", valueDistrictS.valueDistrict);
    handleClearWardSearch(valueDistrictS.valueDistrict);
    AddressApi.fetchAllProvinceWard(value).then((res) => {
      setListWardSearch(res.data.wards);
    });
    AddressApi.fetchAll({
      line: searchAddress.keyword,
      province: searchAddress.province,
      city: valueDistrictS.valueDistrict,
      country: searchAddress.country,
    }).then((res) => {
      setListAddress(res.data.data);
      dispatch(SetAddress(res.data.data));
    });
  };

  const handleCountryChangeSearch = (value) => {
    handleInputChangeSearch("country", value);
    AddressApi.fetchAll({
      line: searchAddress.keyword,
      province: searchAddress.province,
      city: searchAddress.city,
      country: value,
    }).then((res) => {
      setListAddress(res.data.data);
      dispatch(SetAddress(res.data.data));
    });
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    AddressApi.fetchAll({
      line: searchAddress.keyword,
      province: searchAddress.province,
      city: searchAddress.city,
      country: searchAddress.country,
    }).then((res) => {
      setListAddress(res.data.data);
      dispatch(SetAddress(res.data.data));
    });
  };

  // Xử lý làm mới bộ lọc
  const handleClear = () => {
    setSearchAddress({
      keyword: "",
      city: "",
      province: "",
      country: "",
    });
    loadData();
  };

  const handleClearDistrictWardSearch = (valueProvinceS) => {
    setSearchAddress({
      province: valueProvinceS,
      city: "",
      country: "",
    });
    setListDistrictsSearch(null);
    setListWardSearch(null);
  };

  const handleClearWardSearch = (valueDistrictS) => {
    setSearchAddress({
      province: searchAddress.province,
      city: valueDistrictS,
      country: "",
    });
    setListWardSearch(null);
  };

  const loadData = () => {
    AddressApi.fetchAll().then(
      (res) => {
        console.log(res.data.data);
        setListAddress(res.data.data);
        dispatch(SetAddress(res.data.data));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  //load dataProvince
  const loadDataProvince = () => {
    AddressApi.fetchAllProvince().then(
      (res) => {
        setListProvinceSearch(res.data);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    loadData();
    loadDataProvince();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Số nhà/Ngõ/Đường",
      dataIndex: "line",
      key: "line",
      sorter: (a, b) => a.line.localeCompare(b.line),
    },
    {
      title: "Xã/Phường",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Quận/Huyện",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "province",
      key: "province",
      sorter: (a, b) => a.province.localeCompare(b.province),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      sorter: (a, b) => a.lastModifiedDate - b.lastModifiedDate,
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Hành động",
      dataIndex: "hanhDong",
      key: "hanhDong",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            title="Chi tiết địa chỉ"
            style={{ backgroundColor: "#FF9900" }}
            onClick={() => handleViewDetail(record.id)}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            type="primary"
            title="Chỉnh sửa địa chỉ"
            style={{ backgroundColor: "green", borderColor: "green" }}
            onClick={() => handleViewUpdate(record.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="title_address">
        {" "}
        <FontAwesomeIcon icon={faKaaba} style={{ fontSize: "26px" }} />
        <span style={{ marginLeft: "10px" }}>Quản lý địa chỉ</span>
      </div>
      <div className="filter">
        <FontAwesomeIcon icon={faFilter} size="2x" />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        <hr />
        <div className="content">
          <div className="content-wrapper">
            <div>
              <Row>
                <Input
                  placeholder="Số nhà/Ngõ/Đường"
                  type="text"
                  style={{
                    width: "200px",
                    marginRight: "8px",
                  }}
                  name="keyword"
                  value={searchAddress.keyword}
                  onChange={handleKeywordChange}
                />
                <Button
                  className="btn_filter"
                  type="submit"
                  onClick={handleSubmitSearch}
                >
                  Tìm kiếm
                </Button>
                <Popconfirm
                  title="Làm mới bộ lọc"
                  description="Bạn có chắc chắn muốn làm mới bộ lọc không ?"
                  onConfirm={() => {
                    handleClear();
                  }}
                  okText="Có"
                  cancelText="Không"
                >
                  <Button className="btn_clear" key="submit" type="primary">
                    Làm mới bộ lọc
                  </Button>
                </Popconfirm>
                ,
              </Row>
            </div>
          </div>
        </div>
        <div>
          <Row gutter={[24, 16]}>
            <Col span={6}>
              <div>
                Tỉnh/Thành phố :{" "}
                <Select
                  style={{ width: "60%", marginLeft: "" }}
                  name="province"
                  value={searchAddress.province}
                  onChange={handleProvinceChangeSearch}
                >
                  <Option value="">--Chọn Tỉnh/Thành phố--</Option>
                  {listProvinceSearch?.map((item) => {
                    return (
                      <Option
                        key={item.code}
                        value={item.code}
                        valueProvince={item.name}
                      >
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div>
                Quận/Huyện :{" "}
                <Select
                  style={{ width: "70%", marginLeft: "5px" }}
                  name="city"
                  value={searchAddress.city}
                  onChange={handleCityChangeSearch}
                >
                  <Option value="">--Chọn Quận/Huyện--</Option>
                  {listDistrictsSearch?.map((item) => {
                    return (
                      <Option
                        key={item.code}
                        value={item.code}
                        valueDistrict={item.name}
                      >
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div>
                Xã/Phường :{" "}
                <Select
                  style={{ width: "70%", marginLeft: "5px" }}
                  name="country"
                  value={searchAddress.country}
                  onChange={handleCountryChangeSearch}
                >
                  <Option value="">--Chọn Xã/Phường--</Option>
                  {listWardSearch?.map((item) => {
                    return (
                      <Option key={item.code} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="address-table">
        <div
          className="title_address"
          style={{ display: "flex", alignItems: "center" }}
        >
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ fontSize: "26px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Danh sách địa chỉ
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => setModalVisible(true)}
            >
              Thêm
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "25px" }}>
          <Table
            dataSource={listAddress}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 6 }}
            className="address-table"
          />
        </div>
      </div>
      {/* modal addaddress */}
      <ModalCreateAddress visible={modalVisible} onCancel={handleCancel} />
      {/* modal updatedAddress */}
      <ModalUpdateAddress
        visible={modalVisibleUpdate}
        onCancel={handleCancel}
        id={addressId}
      />
      {/* modal deatailAddress */}
      <ModalDeatailAddress
        visible={modalVisibleDetail}
        onCancel={handleCancel}
        id={addressIdDeatail}
      />
    </>
  );
};

export default AddressManagement;
