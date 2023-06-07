import React, { useEffect, useRef, useState } from "react";
import { FormControl } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="a"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");
        const [open, setOpen] = useState(false);
        const changeOpen = () => {
            setOpen(true)
        }
        const changeClose = () => {
            setOpen(false)
        }
        // const handleClickOutside = (event) => {
        //     if (ref.current && !ref.current.contains(event.target)) {
        //         setOpen(false);
        //     }
        // };
    
        // useEffect(() => {
        //     document.addEventListener('click', handleClickOutside, true);
        //     return () => {
        //         document.removeEventListener('click', handleClickOutside, true);
        //     };
        // }, []);
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled" style={{ height: "150px", overflow: "auto" }}>
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value) 
                    )}
                </ul>
                <div className={`${open ? "d-none" : " d-block"} row text-center`}>
                    <i className=" uil uil-plus-circle" onClick={changeOpen}  > thêm thuộc tính mới</i>
                </div>
                <div className={`${open ? "d-block" : "d-none"} row`}>
                    <form action="">
                        <div class="ms-2 row">
                            <div className="col-9" style={{ padding: "0px" }}>
                                {/* <input type="text" class="form-control" placeholder='Vui lòng nhập' /> */}
                            </div>
                            <div className="col-3" style={{ padding: "0px" }}>
                                    <div className="col-3 " style={{ padding: "0px" , marginLeft: "5px"}}>
                                    <i class="uil uil-check-circle"></i>
                                    </div>
                                    {/* <div className="col-3" style={{ padding: "0px" }}>
                                    <i class="uil uil-times-circle" onClick={changeClose}></i>
                                    </div> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
);

export  {CustomMenu,CustomToggle}