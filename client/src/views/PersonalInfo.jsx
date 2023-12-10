import React from 'react'
import FormInfoCaNhan from './FormInfoCaNhan'
import FormLichSu from './FormLichSu'
import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'






const PersonalInfo = () => {
  const roleUser = localStorage.getItem("userRole")
  const idUser = localStorage.getItem("userID")

  useEffect( ()=>{
    Checklogin();
    },[])
  
  const Checklogin=() =>{
    if(idUser == null || roleUser === "3" ){
      Swal.fire({
      icon: 'error',
      text: 'Không đủ thẩm quyền để truy cập',
    }).then(() => {
      if(roleUser === "3"){
        window.location.href = "http://localhost:3000/admin"
      } else if(roleUser === "3"){
        window.location.href = "http://localhost:3000"
      }
    });
  }
  }

  return (
<div className='PersonalInfo bg-[#DFFFD3]'>
    <Header/>
    {roleUser === "3" ? (
        <></>
    ) : roleUser === "1" ? (
        <>
            <FormInfoCaNhan/>
            <FormLichSu/>
        </>
    ) : (
        <>
            <FormInfoCaNhan/>
        </>
    )}
    <Footer/>
</div>
  )
}

export default PersonalInfo