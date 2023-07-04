import { Button, Table } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductService from "../../service/ProductDetailService";
import { useDispatch, useSelector } from "react-redux";

const TableProductDetail = () => {

  const [listProductDetail, setListProductDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  // Gọi khi người dùng nhấp để yêu cầu một trang khác.
  // Xử lý sự kiện click của nút button tại đây
  const handlePageClick = (event) => {
    loadData(+event.selected);
  };

  const handleButtonClick = (id) => {
    // Xử lý sự kiện click của nút button tại đây
    console.log("Edit button clicked for ID:", id);
  };
  useEffect(() => {
    loadData(0);
  }, []);
  const loadData = async (page) => {
    ProductService.fetchAllProductDetail(page)
      .then((res) => {
        setListProductDetail(res.data.data.data);
        setCurrentPage(res.data.data.currentPage);
        setTotalPage(res.data.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
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
        dataSource={listProductDetail}
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
