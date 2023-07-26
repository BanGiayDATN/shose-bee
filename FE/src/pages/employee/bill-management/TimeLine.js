import React, { useEffect } from "react";
import "./timeline.css";
import moment from "moment";

function TimeLine({ listStatus, data, statusPresent }) {
  return (
    <div className="container" style={{width: "100%"}}>
      <div className="row text-center justify-content-center mb-5">
        <div className="col-xl-6 col-lg-8">
          <h2 className="font-weight-bold" style={{marginLeft: "20px", marginBottom: "30px"}}>Trạng thái đơn hàng</h2>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
            {data.map((item) => (
              <div className="timeline-step" key={item.id}>
                <div
                  className="timeline-content " 
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                  title=""
                  data-content="And here's some amazing content. It's very engaging. Right?"
                  data-original-title="2003"
                >
                  <div className={`inner-circle ` + item.statusBill}></div>
                  <p className="h6 mt-3 mb-1">
                    {moment(item.createDate).format("DD-MM-YYYY")}
                  </p>
                  <p className="h6 text-muted mb-0 mb-lg-0">
                    {item.statusBill === "TAO_HOA_DON"
                      ? "Tạo Hóa đơn"
                      : item.statusBill === "CHO_XAC_NHAN"
                      ? "Chờ xác nhận"
                      : item.statusBill === "VAN_CHUYEN"
                      ? "Đang vận chuyển"
                      : item.statusBill === "DA_THANH_TOAN"
                      ? "Đã thanh toán"
                      : item.statusBill === "TRA_HANG"
                      ? "Trả hàng"
                      : item.statusBill === "KHONG_TRA_HANG"
                      ? "Thành công"
                      : "Đã hủy"}
                  </p>
                </div>
              </div>
            ))}

            {listStatus.map((item) => {
              if (item.id <= statusPresent ) {
                return;
              }
              return (
                <div className="timeline-step disabled" key={item.id}>
                  <div
                    className= {`timeline-content ` }
                    data-toggle="popover"
                    data-trigger="hover"
                    data-placement="top"
                    title=""
                    data-content="And here's some amazing content. It's very engaging. Right?"
                    data-original-title="2004"
                  >
                    <div className="disabled-inner-circle"></div>
                    <p className="h6 mt-3 mb-1">-------</p>
                    <p className="h6 text-muted mb-0 mb-lg-0">{item.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
