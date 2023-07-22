import React, { Children, useEffect, useState } from "react";
import { Form, Input, Button, Select, Table, Modal, Popconfirm } from "antd";
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
} from "../../../app/reducer/address.reducer";
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

const { Option } = Select;

const AddressManagement = () => {
  const [listAddress, setListAddress] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [listProvinceSearch, setListProvinceSearch] = useState([]);
  const [listDistrictsSearch, setListDistrictsSearch] = useState([]);
  const [listWardSearch, setListWardSearch] = useState([]);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [searchAddress, setSearchAddress] = useState({
    keyword: "",
    city: "",
    province: "",
    country: "",
  });

  const [addressId, setAddressId] = useState("");
  const [formData, setFormData] = useState({
    line: "",
    city: "",
    province: "",
    country: "",
    userId: "7d27cbd0-6569-48f8-8286-378b956dab26",
    // status: " Vui lòng chọn trạng thái ",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdadte, setModalVisibleUpdate] = useState(false);

  // lấy mảng redux ra
  const data = useAppSelector(GetAddress);
  useEffect(() => {
    if (data != null) {
      setListAddress(data);
    }
  }, [data]);

  // seach  address
  const handleInputChangeSearch = (name, value) => {
    setSearchAddress((prevSearchAddress) => ({
      ...prevSearchAddress,
      [name]: value,
    }));
  };

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    handleInputChangeSearch("keyword", value);
  };

  const handleProvinceChangeSearch = (value, valueProvinceS) => {
    handleInputChangeSearch("province", valueProvinceS.valueProvince);
    handleClearDistrictWardSearch(valueProvinceS.valueProvince);
    AddressApi.fetchAllProvinceDistricts(value).then((res) => {
      setListDistrictsSearch(res.data.districts);
    });
  };

  const handleCityChangeSearch = (value, valueDistrictS) => {
    handleInputChangeSearch("city", valueDistrictS.valueDistrict);
    handleClearWardSearch(valueDistrictS.valueDistrict);
    AddressApi.fetchAllProvinceWard(value).then((res) => {
      setListWardSearch(res.data.wards);
    });
  };

  const handleCountryChangeSearch = (value) => {
    handleInputChangeSearch("country", value);
  };

  const handleProvinceChange = (value, valueProvince) => {
    setFormData({ ...formData, province: valueProvince.valueProvince });
    // handleClearDistrictWard();
    AddressApi.fetchAllProvinceDistricts(value).then((res) => {
      setListDistricts(res.data.districts);
    });
  };

  const handleCityChange = (value, valueDistrict) => {
    // handleClearWard(valueDistrict.valueDistrict);
    setFormData({ ...formData, city: valueDistrict.valueDistrict });
    AddressApi.fetchAllProvinceWard(value).then((res) => {
      setListWard(res.data.wards);
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
    setListDistricts(null);
    setListWard(null);
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

  const handleClearDistrictWard = (valueProvince) => {
    setListAddress({
      province: valueProvince,
      city: "",
      country: "",
    });
    setListDistricts(null);
    setListWard(null);
  };

  const handleClearWard = (valueDistrict) => {
    setListAddress({
      province: formData.province,
      city: valueDistrict,
      country: "",
    });
    setListWard(null);
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
        setListProvince(res.data);
        setListProvinceSearch(res.data);
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // thêm address
  const handleAddAddress = () => {
    AddressApi.create(formData).then((res) => {
      console.log(res.data);
      dispatch(CreateAddress(res.data.data));
    });

    // Đóng modal
    setFormData({
      line: "",
      city: "",
      province: "",
      country: "",
      userId: "7d27cbd0-6569-48f8-8286-378b956dab26",
    });
    setModalVisible(false);
  };

  // upadte address
  const handleUpdateAddress = () => {
    AddressApi.update(addressId, formData).then((res) => {
      dispatch(UpdateAddress(res.data.data));
      console.log(res.data.data);
    });
    // Đóng modal
    setFormData({
      line: "",
      city: "",
      province: "",
      country: "",
      userId: "7d27cbd0-6569-48f8-8286-378b956dab26",
    });
    setModalVisibleUpdate(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý logic chỉnh sửa
  const handleViewDetail = (id) => {
    console.log(id);
  };

  const handleUpdate = (id) => {
    setAddressId(id);
    AddressApi.getOne(id).then(
      (res) => {
        setFormData({
          line: res.data.data.line,
          province: res.data.data.province,
          city: res.data.data.city,
          country: res.data.data.country,
          userId: "7d27cbd0-6569-48f8-8286-378b956dab26",
        });
        console.log(res);
      },
      (err) => console.log(err)
    );
    setModalVisibleUpdate(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadDataProvince();
    // loadDataDistricts();
    // loadDataWard();
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
            onClick={() => handleUpdate(record.id)}
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
            <div className="content-left">
              Tỉnh/Thành phố :{" "}
              <Select
                style={{ width: "70%", marginLeft: "10px" }}
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
            <div className="content-left">
              Quận/Huyện :{" "}
              <Select
                style={{ width: "50%", marginLeft: "5px" }}
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
            <div className="content-left">
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
            <div className="content-left">
              Số nhà/Ngõ/Đường :{" "}
              <Input
                placeholder="--Số nhà/Ngõ/Đường--"
                type="text"
                style={{ width: "70%", marginLeft: "5px" }}
                name="keyword"
                value={searchAddress.keyword}
                onChange={handleKeywordChange}
              />
            </div>
          </div>
        </div>
        <div className="box_btn_filter">
          <Button
            className="btn_filter"
            type="submit"
            onClick={handleSubmitSearch}
          >
            Tìm kiếm
          </Button>
          {/* <Button className="btn_clear" onClick={handleClear}>
            Làm mới bộ lọc
          </Button> */}
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
      {/* modal thêm address */}
      <Modal
        key="add"
        title="Thêm địa chỉ"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Hủy
          </Button>,
          <Popconfirm
            title="Thêm địa chỉ"
            description="Bạn có chắc chắn muốn thêm địa chỉ không ?"
            onConfirm={() => {
              handleAddAddress();
            }}
            okText="Có"
            cancelText="Không"
          >
            <Button key="submit" type="primary">
              Thêm
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form onSubmit={handleAddAddress} layout="vertical">
          <Form.Item
            label="Tỉnh/Thành phố"
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <Select
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
            >
              <Option value="">--Chọn Tỉnh/Thành phố--</Option>
              {listProvince?.map((item) => {
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
          </Form.Item>

          <Form.Item
            label="Quận/Huyện"
            rules={[{ required: true, message: "Vui lòng chọn Quận/Huyện" }]}
          >
            <Select
              name="city"
              value={formData.city}
              onChange={handleCityChange}
            >
              <Option value="">--Chọn Quận/Huyện--</Option>
              {listDistricts?.map((item) => {
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
          </Form.Item>

          <Form.Item
            label="Xã/Phường"
            rules={[{ required: true, message: "Vui lòng chọn Xã/Phường" }]}
          >
            <Select
              name="country"
              value={formData.country}
              onChange={(value) => setFormData({ ...formData, country: value })}
            >
              <Option value="">--Chọn Xã/Phường--</Option>
              {listWard?.map((item) => {
                return (
                  <Option key={item.code} value={item.name}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Số nhà/Ngõ/Đường"
            style={{ marginTop: "40px" }}
            rules={[{ required: true, message: "Vui lòng số nhà/ngõ/đường" }]}
          >
            <Input
              placeholder="Số nhà/Ngõ/Đường"
              name="line"
              value={formData.line}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* modal updatedAddress */}
      <Modal
        key="update"
        title="Update địa chỉ"
        visible={modalVisibleUpdadte}
        onCancel={() => setModalVisibleUpdate(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisibleUpdate(false)}>
            Hủy
          </Button>,
          // <Button key="submit" type="primary" onClick={handleUpdateAddress}>
          //   update
          // </Button>,
          <Popconfirm
            title="Update địa chỉ"
            description="Bạn có chắc chắn muốn cập nhật địa chỉ không ?"
            onConfirm={() => {
              handleUpdateAddress();
            }}
            okText="Có"
            cancelText="Không"
          >
            <Button key="submit" type="primary">
              Update
            </Button>
          </Popconfirm>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label=" Tỉnh/Thành phố">
            <Select
              name="province"
              value={formData.province}
              onChange={handleProvinceChange}
            >
              <Option value="">--Chọn Tỉnh/Thành phố--</Option>
              {listProvince?.map((item) => {
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
          </Form.Item>

          <Form.Item label="Quận/Huyện">
            <Select
              name="city"
              value={formData.city}
              onChange={handleCityChange}
            >
              <Option value="">--Chọn Quận/Huyện--</Option>
              {listDistricts?.map((item) => {
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
          </Form.Item>

          <Form.Item label="Xã/Phường">
            <Select
              name="country"
              value={formData.country}
              onChange={(value) => setFormData({ ...formData, country: value })}
            >
              <Option value="">--Chọn Xã/Phường--</Option>
              {listWard?.map((item) => {
                return (
                  <Option key={item.code} value={item.name}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Số nhà/Ngõ/Đường" style={{ marginTop: "40px" }}>
            <Input
              placeholder="Số nhà/Ngõ/Đường"
              name="line"
              value={formData.line}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddressManagement;
