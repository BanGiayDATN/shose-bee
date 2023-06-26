import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreateSize from './CreateSize';
import SizeService from '../../../../service/SizeService';
import { Button, Nav, Navbar, Offcanvas } from 'react-bootstrap'

function Size() {
    const sizes = useSelector((state) => state.sizes.sizes.value);
    const dispatch = useDispatch();
    useEffect(() => {
        SizeService.getAll(dispatch);
    }, [])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <div>
            <Button variant="primary" onClick={handleShow} > Thêm </Button>
            <table className="table ">
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
                            <td className='float-right'>
                                <p className={`status w-25 ${item.status == 'DANG_SU_DUNG'? 'Approved':'Pending'}`}>{item.status == 'DANG_SU_DUNG' ? 'Hoạt động':'Không hoạt động'}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Offcanvas show={show} onHide={handleClose} placement={'end'} >
                <CreateSize onchange={handleClose}/>
            </Offcanvas>
        </div>
    )
}

export default Size