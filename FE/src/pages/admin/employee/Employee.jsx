import React from 'react'
import SidebarProject from '../../../components/sidebar/SidebarProject'
import Navbar from "./../../../components/navbar/Navbar";
import { useSelector } from 'react-redux';

function Employee() {
  const data = useSelector((state) => state.employees.employees.value);
  return (
    <div className="home">
      {/* mới sửa */}
      <SidebarProject /> 
      <div className="homeContainer">
        <Navbar />
       
      </div>
    </div>
  )
}

export default Employee