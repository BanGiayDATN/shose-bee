import { useEffect, useState } from "react";
import CategoryService from "../../../service/CategoryService";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import ReactPaginate from "react-paginate";
import moment from "moment";
import "./category.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchOutlined } from "@mui/icons-material";

const TableCategory = () => {
  const [listCategoryPage, setListCategoryPage] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // tạo đối tượng để hứng data inputs
  const [formData, setFormData] = useState({ name: "", status: "" });
  const [load, setLoad] = useState(false);
  // gọi hàm getOneById ở service sang
  const getOne = (id) => {
    CategoryService.getOneById(id)
      .then((response) => {
        console.log(response.data.data);
        setFormData({
          name: response.data.data.name,
          status: response.data.data.status,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };


  //    Modal update category
  //   -- showModal là mở modal lên
  //   -- handleOk là mở modal xác nhận
  //   -- handleCancel là đóng lại modanl
  const openModal = (id) => {
    setSelectedCategoryId(id);
    // Lấy dữ liệu từ máy chủ trước khi mở modal
    // gán dư liệu cho formdata
    getOne(id);
    setIsModalOpen(true);
  };

  const openModalAdd = () => {
    setFormData({ name: "", status: "Mời chọn trạng thái" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", status: "Mời chọn trạng thái" });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ name: "", status: "Mời chọn trạng thái" });
  };

  const handlePageClick = (event) => {
    loadData(+event.selected);
  };

  const update = (id, category) => {
    CategoryService.updateCategory(id, category).catch((err) => {
      console.log(err);
    });
  };

  const add = (category) => {
    CategoryService.addCategory(category).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    loadData(0);
    setLoad(false);
  }, [load]);

  const loadData = async (page) => {
    CategoryService.fetchAllCategory(page)
      .then((res) => {
        setListCategoryPage(res.data.data.data);
        setTotalPage(res.data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // xử lý update category

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Vui lòng nhập tên");
      return;
    }
    if (!formData.status) {
      toast.error("Vui lòng chọn trạng thái");
      return;
    }
    if (selectedCategoryId === null) {
      add(formData);
      toast.success("Thêm thành công");
    } else {
      update(selectedCategoryId, formData);
      setSelectedCategoryId(null);
      toast.success("Update thành công");
    }

    // update(selectedCategoryId, formData);
    setFormData({ name: "", status: "Mời chọn trạng thái" });
    setLoad(true);
    closeModal();
  };

  // lấy dữ liệu ở ô inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Cập nhật đối tượng formData với các giá trị đầu vào
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // lấy dữ liệu ở combox
  const handleSelectChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: value,
    }));
  };

  // colum table
  const columns = [
    {
      title: <div className="title-category">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-category">Tên Thể Loại</div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div className="title-category">Ngày Tạo</div>,
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-category">Ngày Cập Nhập</div>,
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-category">Trạng Thái</div>,
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const genderClass = text === 0 ? "trangthai-sd" : "trangthai-ksd";
        return (
          <button className={`gender ${genderClass}`}>
            {text === 0 ? "Đang sử dụng " : "Không sử dụng"}
          </button>
        );
      },
    },
    {
      title: <div className="title-category">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <div className="action-buttons">
          <Link
            title="Chi tiết thể loại"
            className="btn btn-warning"
            onClick={() => openModal(id)}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} />{" "}
          </Link>
          <Link
            title="Chỉnh sửa thể loại"
            className="btn btn-success"
            onClick={() => openModal(id)}
          >
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
      <div className="row">
        <div>
          <Button
            title="Thêm thể loại"
            className="btn btn-primary"
            onClick={() => openModalAdd()}
            style={{
              float: "right",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            + Thêm
          </Button>
        </div>
      </div>
      {/* Bảng hiện thị */}
      <Table
        dataSource={listCategoryPage}
        columns={columns}
        rowKey="id"
        pagination={false} // Disable default pagination
      />

      {/* Phân trang */}
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

      {/* Modal */}
      <Modal
        title="Thể loại"
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form onSubmit={handleSubmit} layout="vertical">
          <Form.Item label="Tên thể loại">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Select
              name="status"
              value={formData.status}
              onChange={handleSelectChange}
            >
              <option value="DANG_SU_DUNG">Đang sử dụng</option>
              <option value="KHONG_SU_DUNG">Không sử dụng</option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TableCategory;
