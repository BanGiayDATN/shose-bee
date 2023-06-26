import React, { useEffect, useRef, useState } from 'react'
import validatorCustom from '../../../../service/validatorCustom'
import SizeService from '../../../../service/SizeService';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Offcanvas } from 'react-bootstrap';

function CreateSize({ onchange }) {

    const [size, setSize] = useState({
        name: '',
        status: 0
    })
    const validator = useRef(validatorCustom);
    const onChangeForm = event => {
        setSize({ ...size, [event.target.name]: event.target.value })
        validator.current.showMessages();
        validator.current.getErrorMessages();
    }
    const dispatch = useDispatch();
    const handleSubmiForm = () => {

        if (validator.current.allValid()) {
            console.log(size);
            SizeService.create(dispatch, size);
            setSize({
                name: '',
                status: 0
            })

        } else {
            validator.current.showMessages();
            validator.current.getErrorMessages();
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
                onchange()
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
            <Offcanvas.Title>Thêm kích thước</Offcanvas.Title>
        </Offcanvas.Header>
            <Offcanvas.Body>
                <form>
                    <div className="mb-3 row">
                        <label htmlFor="exampleInputEmail1" className="form-label col-4">tên: </label>
                        <div className="col-8">
                            <input type="text" className="form-control" name="name" onChange={onChangeForm} id="exampleInputEmail1" value={size.name} />
                            {validator.current.message('tên', size.name, 'required', { className: 'text-danger' })}
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="exampleInputEmail1" className="form-label col-4">tình trạng: </label>
                        <div className="col-8">
                            <div className="form-check row">
                                <input type="radio" className="col-1" checked name="status" onChange={onChangeForm} id="exampleInputEmail1" value="0" />
                                <label className="form-check-label col-11" htmlFor="flexRadioDefault1">
                                    Hoạt động
                                </label>
                            </div>
                            <div className="form-check row">
                                <input type="radio" className="col-1 col-1" name="status" onChange={onChangeForm} id="exampleInputEmail1" value="1" />
                                <label className="form-check-label col-11" htmlFor="flexRadioDefault2">
                                    Không Hoạt động
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type='button' className="btn btn-primary" onClick={handleSubmiForm} >
                        lưu
                    </button>
                </form>
            </Offcanvas.Body></div>
    )
}

export default CreateSize