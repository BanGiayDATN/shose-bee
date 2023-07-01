import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap';

const data = [
    {
        id: "1",
        name: "Jane",
        lastName: "Doe",
        age: "25"
    },
    {
        id: "2",
        name: "James",
        lastName: "Doe",
        age: "40"
    },
    {
        id: "3",
        name: "Alexa",
        lastName: "Doe",
        age: "27"
    },
    {
        id: "4",
        name: "Jane",
        lastName: "Brown",
        age: "40"
    }
];

function Search({fillter, changFillter, searchBill,changeStatusValue}) {

    const [dataCheck, setData] = useState([])
    const changStatust = (e, item) => {
     
      if (e.target.checked) {
        console.log(item);
        const dataChecks  = dataCheck
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
        <div className='container' ref={ref} style={{ height: '100%' }}> <Offcanvas.Header closeButton>
            <Offcanvas.Title>Tìm kiếm</Offcanvas.Title>
        </Offcanvas.Header>
            <Offcanvas.Body style={{height: '500px'}}>
                <div  className="row">
                <div className="row">
                    <div className="row">Mã hóa đơn</div>
                    <div className="row">
                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => changFillter(e)} value={fillter.code} name="code"/>
                    </div>
                </div>
                <div className="row">
                    <div className="row">Ngày tạo: </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} name="startTime" value={fillter.startTime}/>
                        </div>
                        <div className="col-6">
                            <input type="date" className="form-control " id="exampleFormControlInput1"  onChange={(e) => changFillter(e)} name="endTime" value={fillter.endTime}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row">Ngày thanh toán: </div>
                    <div className="row">
                        <div className="col-6">
                            <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} value={fillter.startDeliveryDate} name={"startDeliveryDate"}/>
                        </div>
                        <div className="col-6">
                            <input type="date" className="form-control " id="exampleFormControlInput1" onChange={(e) => changFillter(e)} value={fillter.endDeliveryDate} name={"endDeliveryDate"}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row">Trạng thái</div>
                    <div className="row">
                        {data.map((item, index) => (
                            <div className="" key={index}>
                                <input type="checkbox" name="status" value={item} onChange={(e) => changStatust(e, item)} id="" /> {item.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row">Nhân viên</div>
                <div className="row">
                    {data.map((item, index) => (
                        <div className="" key={index}>
                            <input type="radio" name={"employees"} value={fillter.employees} onChange={(e) => changFillter(e)} /> {item.name}
                        </div>
                    ))}
                </div>
                <div className="row">Khách hàng: </div>
                <div className="row">
                    {data.map((item, index) => (
                        <div className="" key={index}>
                            <input type="radio"  value={item.id} name={"user"} onChange={(e) => changFillter(e)} id="" /> {item.name}
                        </div>
                    ))}
                </div>
                <div className="row">Số điện thoại: </div>
                <div className="row">
                    <input type="text" className="form-control " id="phone" name={"phoneNumber"} onChange={(e) => changFillter(e)} value={fillter.phoneNumber} />
                </div>
                <div className="row">
                    <div className="row">Phương thức</div>
                    <div className="row">
                        <div className="col-1"><input type="radio" className=" " id="exampleFormControlInput1" name={"type"} onChange={(e) => changFillter(e)} value={0}/> </div>
                        <label className="form-check-label col-11" htmlFor="flexRadioDefault1">
                            Online
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-1"><input type="radio" className=" " id="exampleFormControlInput1" name={"type"} onChange={(e) => changFillter(e)} value={0}/> </div>
                        <label className="form-check-label col-11" htmlFor="flexRadioDefault1">
                            Online
                        </label>
                    </div>
                </div>
                </div>
            </Offcanvas.Body></div>
    )
}

export default Search