import React from 'react'
import SidebarProject from '../../../components/sidebar/SidebarProject'
import Navbar from "./../../../components/navbar/Navbar";

function Employee() {
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