import React, { useEffect } from 'react'
import './timeline.scss'
import moment from 'moment'


function TimeLine({ listStatus, data, statusPresent }) {
    return (
        <div class="container">
            <div class="row text-center justify-content-center mb-5">
                <div class="col-xl-6 col-lg-8">
                    <h2 class="font-weight-bold">Trạng thái đơn hàng</h2>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="timeline-steps aos-init aos-animate" data-aos="fade-up">

                        {data.map(item => (

                            <div class="timeline-step" key={item.id}>
                                <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                                    <div class="inner-circle"></div>
                                    <p class="h6 mt-3 mb-1">{moment(item.createDate).format("DD-MM-YYYY")}</p>
                                    <p class="h6 text-muted mb-0 mb-lg-0"> {item.statusBill === 0 ? "Tạo Hóa đơn" : (item.statusBill === 1 ? "Chờ xác nhận" : (item.statusBill === 2 ? "Đang vận chuyển" : (item.statusBill === 3 ? "Đã thanh toán" : (item.statusBill === 4 ? "Trả hàng" : (item.statusBill === 5 ? "Thành công" : "Đã hủy")))))}</p>
                                </div>
                            </div>
                        ))}

                        {
                            
                            listStatus.map(item => {
                                if (item.id <= statusPresent) {
                                    return
                                }
                                return <div class="timeline-step disabled" key={item.id}>
                                    <div class="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                                        <div  class="disabled-inner-circle"></div>
                                        <p class="h6 mt-3 mb-1">-------</p>
                                        <p class="h6 text-muted mb-0 mb-lg-0">{item.name}</p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLine