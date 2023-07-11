import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap';
import BillService from '../../../service/BillService';

const data = [
    {
        id: "0",
        name: "Tạo Hóa đơn"
    },
    {
        id: "1",
        name: "Chờ xác nhận"
    },
    {
        id: "2",
        name: "Đang vận chuyển"
    },
    {
        id: "3",
        name: "Đã thanh toán"
    },
    {
        id: "4",
        name: "Thành công"
    },
    {
        id: "5",
        name: "Đã hủy"
    },
];

function Search({ fillter, changFillter, searchBill, changeStatusValue }) {

    const [dataCheck, setData] = useState([])
    BillService.getAllUser();
    BillService.getAllEmployees();
    var users = BillService.getDataUser();
    var employess = BillService.getDataEmployess();
    const changStatust = (e, item) => {

        if (e.target.checked) {
            const dataChecks = dataCheck
            dataCheck.push(item)
            setData(dataChecks)
            changeStatusValue(dataChecks)
        } else {
            var index = dataCheck.findIndex((people) => people.id !== item.id)
            var datas = dataCheck;
            datas.splice(index, 1)
            setData(data)
            changeStatusValue(datas)
        }

    };

    // begin check outslide 
    const ref = React.createRef();
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // onchange()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    //  end 

    return (
        <div className='container' ref={ref} style={{ height: '100%', marginLeft: "10px" }}> <Offcanvas.Header closeButton>
            <Offcanvas.Title>Tìm kiếm</Offcanvas.Title>
        </Offcanvas.Header>
            <Offcanvas.Body style={{ height: '500px' }}>
                <div className="row">
                    <div className="row">
                        <div className="row">Mã hóa đơn</div>
                        <div className="row">
                            <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => changFillter(e)} value={fillter.code} name="code" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">Ngày tạo: </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} name="startTime" value={fillter.startTime} />
                            </div>
                            <div className="col-6">
                                <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} name="endTime" value={fillter.endTime} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">Ngày thanh toán: </div>
                        <div className="row">
                            <div className="col-6">
                                <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} value={fillter.startDeliveryDate} name={"startDeliveryDate"} />
                            </div>
                            <div className="col-6">
                                <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} value={fillter.endDeliveryDate} name={"endDeliveryDate"} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">Trạng thái</div>
                        <div className="row">
                            {data.map((item, index) => (
                                <div className="" key={index}>
                                    <input type="checkbox" name="status" value={item.id} onChange={(e) => changStatust(e, item.id)} id="" /> {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row">Nhân viên</div>
                    <div className="row">
                         <select value={fillter.user} className="form-select" aria-label="Default select example" name={"employees"} onChange={(e) => changFillter(e)} >
                            <option value={''} disabled>Open this select menu</option>
                            {employess.map((item, index) => (
                                <option value={item.id} key={item.id}>{item.userName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row">Khách hàng: </div>
                    <div className="row">
                        <select value={fillter.user} className="form-select" aria-label="Default select example" name={"user"} onChange={(e) => changFillter(e)} >
                            <option value={''} disabled>Open this select menu</option>
                            {users.map((item, index) => (
                                <option value={item.id} key={item.id}>{item.userName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row">Số điện thoại: </div>
                    <div className="row">
                        <input type="text" className="form-control " id="phone" name={"phoneNumber"} onChange={(e) => changFillter(e)} value={fillter.phoneNumber} />
                    </div>
                    <div className="row">
                        <div className="row">Phương thức</div>
                        <div className="row">
                            <div className="col-1"><input type="radio" className=" " id="exampleFormControlInput1" name={"type"} onChange={(e) => changFillter(e)} value={0} /> </div>
                            <label className="form-check-label col-11" htmlFor="flexRadioDefault1">
                                Online
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-1"><input type="radio" className=" " id="exampleFormControlInput1" name={"type"} onChange={(e) => changFillter(e)} value={1} /> </div>
                            <label className="form-check-label col-11" htmlFor="flexRadioDefault1">
                                Tại Quầy
                            </label>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body></div>
    )
}

export default Search