import React from 'react'
import SidebarProject from '../../../components/sidebar/SidebarProject'
import Navbar from "./../../../components/navbar/Navbar";

function MemberOffers() {
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

export default MemberOffers