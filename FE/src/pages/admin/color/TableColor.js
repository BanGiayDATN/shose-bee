import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import ReactPaginate from "react-paginate";
import moment from "moment";
import "./color.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColorService from "../../../service/ColorService";
import { SketchPicker } from "react-color";
import { Col, Row } from "react-bootstrap";

const TableColor = () => {
  const [listColorPage, setListColorPage] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);

  // tạo đối tượng để hứng data inputs
  const [formData, setFormData] = useState({ name: "", status: "" });
  const [load, setLoad] = useState(false);

  // gọi hàm getOneById ở service sang
  const getOne = (id) => {
    ColorService.getOneById(id)
      .then((response) => {
        console.log(response.data.data);
        setFormData({
          code: response.data.data.code,
          name: response.data.data.name,
          status: response.data.data.status,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  const [selectedColor, setSelectedColor] = useState({ code: "" });
  const handleColorChange = (color) => {
    const colorCode = color.hex;

    setSelectedColor({
      code: colorCode,
    });
    console.log(selectedColor);
    setFormData((prevData) => ({ ...prevData, code: colorCode }));

    console.log(formData);
  };

  const openModal = (id) => {
    setSelectedColorId(id);
    getOne(id);
    setIsModalOpen(true);
  };

  const openModalAdd = () => {
    setFormData({ code: "", name: "", status: "Mời chọn trạng thái" });
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

  const update = (id, Color) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn upadate sản phẩm này?",
      onOk() {
        ColorService.updateColor(id, Color).catch((err) => {
          console.log(err);
        });
        toast.success("update thành công");
      },
      onCancel() {
        toast.warning("Hủy thành công");
      },
    });
  };

  console.log(formData);
  const add = (Color) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn thêm sản phẩm này?",
      onOk() {
        ColorService.addColor(Color).catch((err) => {
          console.log(err);
        });
        toast.success("Thêm thành công");
        loadData(0);
      },
      onCancel() {
        toast.warning("Hủy thành công");
      },
    });
  };

  useEffect(() => {
    loadData(0);
    setLoad(false);
  }, [load]);

  const loadData = async (page) => {
    ColorService.fetchAllColor(page)
      .then((res) => {
        setListColorPage(res.data.data.data);
        setTotalPage(res.data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // xử lý update Color

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
    if (selectedColorId === null) {
      add(formData);
    } else {
      update(selectedColorId, formData);
      setSelectedColorId(null);
    }

    // update(selectedColorId, formData);
    setFormData({ name: "", status: "Mời chọn trạng thái" });
    setLoad(true);
    closeModal();
  };

  // lấy dữ liệu ở ô inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
      title: <div className="title-Color">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-Color"> Màu</div>,
      dataIndex: "code",
      key: "code",
      render: (colorCode) => (
        <div className="color-box" style={{ backgroundColor: colorCode }} />
      ),
    },
    {
      title: <div className="title-Color">Mã Màu </div>,
      dataIndex: "code",
      key: "code",
    },
    {
      title: <div className="title-Color">Tên Màu </div>,
      dataIndex: "name",
      key: "name",
    },
    {
      title: <div className="title-Color">Ngày Tạo</div>,
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-Color">Ngày Cập Nhập</div>,
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-Color">Trạng Thái</div>,
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
      title: <div className="title-Color">Thao Tác</div>,
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
        dataSource={listColorPage}
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
          <Row gutter={16} align="middle" style={{ marginBottom: "20px" }}>
            <Col flex="auto">
              <SketchPicker
                color={selectedColor.code}
                onChange={handleColorChange}
              />
            </Col>
            <Col style={{ marginLeft: "auto" }}>
              <div
                style={{
                  width: "200px",
                  height: "100px",
                  marginLeft: "10px",
                  backgroundColor: selectedColor.code,
                  borderRadius: "10px",
                }}
              ></div>
            </Col>
          </Row>
          <Form.Item label="Mã Màu" style={{ marginTop: "20px" }}>
            <Input
              type="text"
              name="color"
              value={selectedColor.code}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Tên Màu" style={{ marginTop: "20px" }}>
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
export default TableColor;
