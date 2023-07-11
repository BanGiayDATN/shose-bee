import { useEffect, useState } from "react";
import EmployeeService from "../../../service/EmployeeService";
import { Button, Form, Input, Modal, Radio, Select, Table } from "antd";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchOutlined } from "@ant-design/icons";
const TableEmployee = () => {
  const [listEmployeePage, setListEmployeePage] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    status: "DANG_SU_DUNG",
  });
  const [load, setLoad] = useState(false);
  const getOne = (id) => {
    EmployeeService.getOneById(id)
      .then((response) => {
        console.log(response.data.data);
        setFormData({
          fullName: response.data.data.fullName,
          email: response.data.data.email,
          status: response.data.data.status,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const handleSearch = () => {
    EmployeeService.searchEmployee(searchValue)
      .then((res) => {
        setListEmployeePage(res.data.data.data);
        setTotalPage(res.data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDateSearch = () => {
    const formattedStartDate = startDate
      ? moment(startDate).startOf("day").valueOf()
      : 0;
    const formattedEndDate = endDate
      ? moment(endDate).endOf("day").add(1, "day").valueOf()
      : 0;

    EmployeeService.searchByDate(formattedStartDate, formattedEndDate)
      .then((res) => {
        setListEmployeePage(res.data.data.data);
        setTotalPage(res.data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageClick = (event) => {
    loadData(+event.selected);
  };
  const openModalAdd = () => {
    setFormData({
      fullName: "",
      email: "",
      status: "DANG_SU_DUNG",
    });
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      status: "DANG_SU_DUNG",
    });
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      status: "DANG_SU_DUNG",
    });
    setIsModalOpen(false);
  };
  const update = (id, employee) => {
    EmployeeService.updateEmployee(id, employee).catch((err) => {
      console.log(err);
    });
  };
  const add = (employee) => {
    EmployeeService.addEmployee(employee).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    loadData(0);
    setLoad(false);
  }, [load]);
  const loadData = async (page) => {
    EmployeeService.fetchAllEmployee(page)
      .then((res) => {
        setListEmployeePage(res.data.data.data);
        setTotalPage(res.data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName) {
      toast.error("Vui lòng nhập tên");
      return;
    }
    if (!formData.email) {
      toast.error("Vui lòng nhập email");
      return;
    }
    if (selectedEmployeeId === null) {
      add(formData);
      toast.success("Thêm thành công");
    } else {
      update(selectedEmployeeId, formData);
      setSelectedEmployeeId(null);
      toast.success("Update thành công");
    }

    setFormData({
      fullName: "",
      email: "",
      status: "DANG_SU_DUNG",
    });
    setLoad(true);
    closeModal();
    handleDateSearch();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: value,
    }));
  };
  const openModal = (id) => {
    setSelectedEmployeeId(id);
    getOne(id);
    setIsModalOpen(true);
  };
  const columns = [
    {
      title: <div className="title-employee">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-employee">Email</div>,
      dataIndex: "email",
      key: "email",
    },
    {
      title: <div className="title-employee">Họ và tên</div>,
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: <div className="title-employee">Ngày Tạo</div>,
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY");
        return formattedDate;
      },
    },
    {
      title: <div className="title-employee">Trạng Thái</div>,
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const statusClass = text === 0 ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`statu ${statusClass}`}>
            {text === 0 ? "Kích hoạt " : "Ngừng kích hoạt"}
          </button>
        );
      },
    },

    {
      title: <div className="title-employee">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <div className="action-buttons">
          <Link
            title="Chi tiết nhân viên"
            className="btn btn-warning"
            onClick={() => openModal(id)}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} />{" "}
          </Link>
          <Link className="btn btn-success" onClick={() => openModal(id)}>
            {" "}
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </div>
      ),
    },
  ];
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="row" style={{ marginBottom: "10px", marginTop: "8px" }}>
        <div className="col-md-6">
          <Input.Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            placeholder="Tìm kiếm..."
            style={{ width: "200px" }}
            enterButton={<SearchOutlined />}
          />
          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            title="Thêm nhân viên"
            className="btn btn-primary"
            onClick={() => openModalAdd()}
            style={{
              float: "right",
            }}
          >
            Tạo tài khoản
          </Button>
        </div>
      </div>
      <div className="row" style={{ marginBottom: "10px", marginTop: "10px" }}>
        <div className="col-md-12">
          Ngày bắt đầu
          <Input
            type="date"
            style={{ width: "200px" }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          Ngày kết thúc
          <Input
            type="date"
            style={{ width: "200px" }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button type="primary" onClick={handleDateSearch}>
            Tìm
          </Button>
        </div>
      </div>
      <Table
        dataSource={listEmployeePage}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      <Modal
        title="Nhân viên"
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form onSubmit={handleSubmit} layout="vertical">
          <Form.Item label="Tên nhân viên">
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Select
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
            >
              <option value="DANG_SU_DUNG">Kích hoạt</option>
              <option value="KHONG_SU_DUNG">Ngừng kích hoạt</option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TableEmployee;
