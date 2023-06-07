import React, { useRef, useState } from 'react'
import validatorCustom from '../../../../service/validatorCustom'
import SizeService from '../../../../service/SizeService';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function CreateSize() {

    const [size, setSize] = useState({
        name: '',
        status: 0
    })
    const [closeForm, setClose] = useState(false);

    const validator = useRef(validatorCustom);
    const onChangeForm = event => {
        setSize({ ...size, [event.target.name]: event.target.value })
        validator.current.showMessages();
        validator.current.getErrorMessages();
        if (validator.current.allValid()) {
            setClose(true);
        }

    }
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmiForm = () => {

        if (validator.current.allValid()) {
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

    return (
        <div className='container ' >
            <form>
                <div className="mb-3 row">
                    <label htmlFor="exampleInputEmail1" className="form-label col-3">tên: </label>
                    <div className="col-9">
                        <input type="text" className="form-control" name="name" onChange={onChangeForm} id="exampleInputEmail1" value={size.name} />
                        {validator.current.message('tên', size.name, 'required', { className: 'text-danger' })}
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="exampleInputEmail1" className="form-label col-3">tình trạng: </label>
                    <div className="col-9">
                        <input type="text" className="form-control" name="status" onChange={onChangeForm} id="exampleInputEmail1" value={size.status} />
                    </div>
                </div>
                <button type='button' className="btn btn-primary" onClick={handleSubmiForm} {...(closeForm ? { 'data-bs-dismiss': 'offcanvas', 'aria-label': 'Close' } : {})}>
                    lưu
                </button>
            </form>
            
        </div>
    )
}

export default CreateSize