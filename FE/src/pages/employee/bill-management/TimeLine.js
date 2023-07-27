import React, { useEffect } from "react";
import "./timeline.css";
import moment from "moment";
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline'
import { FaBug, FaRegCalendarCheck } from "react-icons/fa";

function TimeLine({ listStatus, data, statusPresent }) {
  return (
    <div className="container" style={{ width: "100%" }}>
      <Timeline minEvents={5} placeholder>
        {/* <TimelineEvent
          icon={FaRegFileAlt}
          title="Em rascunho"
          subtitle="26/03/2019 09:51"
        />
        <TimelineEvent
          color="#87a2c7"
          icon={FaRegCalendarCheck}
          title="Agendado"
          subtitle="26/03/2019 09:51"
        />
        <TimelineEvent
          color="#9c2919"
          icon={FaBug}
          title="Erro"
          subtitle="26/03/2019 09:51"
          action={{
            label: "Ver detalhes...",
            onClick: () => window.alert("Erro!"),
          }}
        /> */}
       {
        data.map((item) => (
          <TimelineEvent
          color="#03fa53"
          icon={FaRegCalendarCheck}
          title={
            item.statusBill === "TAO_HOA_DON"
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
              : "Đã hủy"
          }
          subtitle={moment(item.createDate).format("DD-MM-YYYY HH:mm")}
        />
        ))
       }
      {/* {
        listStatus.map((item) => {
          if (item.id <= statusPresent) {
            return;
          }
          return (
            <TimelineEvent
          color="#ccc"
          icon={FaRegCalendarCheck}
          title={
            item.statusBill === "TAO_HOA_DON"
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
              : "Đã hủy"
          }
          subtitle=""
        />
          )
        })
      } */}
            {/* {data.map((item) => (
              <div className="timeline-step" key={item.id}>
                <TimelineEvent
                  key={item.id}
                  color="#9c2919"
                  icon={FaBug}
                  title={
                    item.statusBill === "TAO_HOA_DON"
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
                      : "Đã hủy"
                  }
                  subtitle={moment(item.createDate).format("DD-MM-YYYY")}
                  action={{
                    label: "Ver detalhes...",
                    onClick: () => window.alert("Erro!"),
                  }}
                />
            {listStatus.map((item) => {
              if (item.id <= statusPresent) {
                return;
              }
              return (
                <div className="timeline-step disabled" key={item.id}>
                  <div
                    className={`timeline-content `}
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
            })} */}
      </Timeline>
    </div>
  );
}

export default TimeLine;
