import { Button, Table } from "antd";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductService from "../../service/ProductService";
import { useDispatch, useSelector } from "react-redux";

const TableProductDetail = () => {

  const dataSource = useSelector((state) => state.products.products.value);
  const currentPage = useSelector((state) => state.products.products.currentPage);
  const totalPage = useSelector((state) => state.products.products.totalPage);
  const[page, setCurrentPage] = useState(0)

  // Gọi khi người dùng nhấp để yêu cầu một trang khác.
  const handlePageClick = (event) => {
    // Xử lý sự kiện click của nút button tại đây
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    loadData(page);
  };

  const handleButtonClick = (id) => {
    // Xử lý sự kiện click của nút button tại đây
    console.log("Edit button clicked for ID:", id);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    ProductService.getAll(dispatch,page);
  }, []);
  const loadData = async (page) => {
    ProductService.getAll(page);
    // axios
    //   .get(`http://localhost:8080/admin/product-detail?page=${page}`)
    //   .then((response) => {
    //     setDataSource(response.data.data.data);
    //     setCurrentPage(response.data.data.currentPage);
    //     setTotalPage(response.data.data.totalPages);
    //   })
    //   .catch((error) => {});
  };

  const columns = [
    {
      title: <div className="title-product">STT</div>,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: <div className="title-product">Ảnh</div>,
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="Product Image" className="tableProduct" />
      ),
    },
    {
      title: <div className="title-product">Tên Sản Phẩm</div>,
      dataIndex: "nameProduct",
      key: "nameProduct",
    },
    {
      title: <div className="title-product">Giá</div>,
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span>
          {price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: <div className="title-product">Ngày Tạo</div>,
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => {
        const formattedDate = moment(text).format("DD-MM-YYYY"); // Định dạng ngày
        return formattedDate;
      },
    },
    {
      title: <div className="title-product">Giới Tính</div>,
      dataIndex: "gender",
      key: "gender",
      render: (text) => {
        const genderClass =
          text === 0 ? "male" : text === 1 ? "female" : "both";
        return (
          <button className={`gender ${genderClass}`}>
            {text === 0 ? "Nam" : text === 1 ? "Nữ" : "Nam và Nữ"}
          </button>
        );
      },
    },
    {
      title: <div className="title-product">Trạng Thái</div>,
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <button className="trangThai">
          {text === 0 ? "Kinh doanh" : text === 1 ? "Không kinh doanh" : ""}
        </button>
      ),
    },
    {
      title: <div className="title-product">Thao Tác</div>,
      dataIndex: "id",
      key: "actions",
      render: (id) => (
        <Button onClick={() => handleButtonClick(id)}>Chi tiết</Button>
      ),
    },
  ];

  return (
    <>
      {/* Bảng sản phẩm */}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={false} // Disable default pagination
        className="product-table"
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
    </>
  );
};
export default TableProductDetail;
