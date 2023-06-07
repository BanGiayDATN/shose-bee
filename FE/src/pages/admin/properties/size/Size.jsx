import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreateSize from './CreateSize';
import SizeService from '../../../../service/SizeService';

function Size() {
    const sizes = useSelector((state) => state.sizes.sizes.value);
    const dispatch = useDispatch();
    useEffect(() => {
        SizeService.getAll(dispatch);
        
    },[])
    return (

        <div>
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Thêm mới</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">tên</th>
                        <th scope="col">trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="offcanvas offcanvas-end" style={{width: "40%"}} tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">Thêm kích thước</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body" >
                    <CreateSize/>
                </div>
            </div>
        </div>
    )
}

export default Size