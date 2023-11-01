import React, { useEffect, useState } from "react";
import "./style-address.css"
import { AddressClientApi } from "../../../../api/customer/address/addressClient.api";
import {GetAddressAccountClient,SetAddressAccountClient}
 from "../../../../app/reducer/AddressAccountClient.reducer";
 import { useAppDispatch, useAppSelector } from "../../../../app/hook";

function Address() {
const dispatch = useAppDispatch();
  const data = useAppSelector(GetAddressAccountClient);
  useEffect(() => {
    if (data != null) {
      setList(data);
      console.log(data);
    }
  }, [data]);
    const [list, setList] = useState([]);
    const id = localStorage.getItem("idAccount")
    useEffect(() => {
        AddressClientApi.getListByAccount(id).then((res) => {
            dispatch(SetAddressAccountClient(res.data.data))
            console.log(res.data.data);
        })
    }, []);
    const setDefault = (id) =>{
        AddressClientApi.setDefault(id).then((res)=>{
            dispatch(SetAddressAccountClient(res.data.data))
        })
    }
    return (
        <React.Fragment>
            <div className="address-account-profile">
                <div className="header-new-add">
                    <h5 style={{ fontSize: 18 }}>Danh sách địa chỉ</h5>
                    <div className="button-add-address-account">Thêm mới</div>
                </div>
                <div className="list-address-account">
                    {list.map((item, index) => (
                        <div key={index} className={index < list.length-1 ? "item-address-account" : "item-address-account-last"}>
                            <div>
                                <div>
                                    <span>{item.fullName}</span>
                                    {" | "}
                                    <span style={{ color: "gray", fontSize: 15 }}>   {item.phoneNumber}
                                    </span>
                                </div>
                                <div style={{ color: "gray", fontSize: 14, marginTop: 5 }}>
                                    <p>{item.line}</p>
                                    <p>
                                        {item.ward}, {item.district}, {item.province}
                                    </p>
                                </div>

                                {item.status === "DANG_SU_DUNG" ? (
                                    <div className="status-default-address-account">Mặc định</div>
                                ) : (null)}


                            </div>
                            <div style={{ marginLeft: "auto", textAlign: "right" }}>

                                <div style={{ color: "#ff4400", display: "flex", marginBottom: 10 }}>
                                    <div style={{ marginLeft: "auto",cursor:"pointer" }}>
                                        Cập nhập
                                    </div>
                                    {item.status !== "DANG_SU_DUNG" ? (
                                        <div style={{marginLeft: "10px",cursor:"pointer"}}>Xoá</div>
                                    ) : (null)}
                                </div>
                                {item.status !== "DANG_SU_DUNG" ? (
                                    <div className="add-default-address-account" onClick={()=>setDefault(item.id)}>Thiết lập mặc định</div>
                                ) : (null)}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>);
}

export default Address;