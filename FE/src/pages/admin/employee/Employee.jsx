import React from "react";
import SidebarProject from "../../../components/sidebar/SidebarProject";
import Navbar from "./../../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmployeeService from "../../../service/EmployeeService";
import { useState } from "react";
import { useEffect } from "react";
import TableEmployee from "./TableEmployee";
const Employee = () => {
  const employees = useSelector((state) => state.employees.employees.value);
  return (
    <div className="home">
      {/* mới sửa */}
      <SidebarProject />
      <div className="homeContainer">
        <Navbar />
<<<<<<< HEAD
        <div className="row">
          <TableEmployee rows={employees} />
        </div>
=======
       
       
>>>>>>> 21295480e028d5228983bc5c92f5e25a1908aa5b
      </div>
    </div>
  );
};

export default Employee;
