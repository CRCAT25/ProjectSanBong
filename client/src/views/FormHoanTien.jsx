import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAddressBook
} from "@fortawesome/free-solid-svg-icons"

const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}

const FormHoanTien = () => {
  return (
    <div className='w-[40%] mx-auto h-auto p-[30px] bg-[#DDFCD2] my-[10%]'>
        <div className='text-center text-[30px] font-[600] text-[#2B790F]'>HOÀN TIỀN</div>
        <div className='w-90% mx-[5%] flex flex-auto justify-center'>
            <input className='w-[90%] h-[50px] my-[5px] mr-[5px] pl-[15px] rounded-[5px]' placeholder='Tên Khách Hàng' ></input>
            <div className='w-[10%] ml-[5px] h-[50px] my-[5px] rounded-[5px] text-center flex flex-col justify-center bg-white' >
            <Icon24px classIcon={faAddressBook}/>
            </div>
        </div>
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Ngân Hàng'></input>
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Số Tài Khoản'></input>
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Tên Tài Khoản'></input>
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Số tiền'></input>
        <textarea className='w-[90%] mx-[5%] my-[5px] pl-[15px] rounded-[5px] py-[10px]' name="" id="" rows="3"placeholder='Nội Dung:'></textarea>
        <div className='w-[90%] flex flex-auto justify-around mx-auto'>
            <button class=" bg-[#D9D9D9] rounded-[5px] w-[150px] h-[50px] justify-center text-[#000] " >Hủy</button>
            <button class=" bg-[#379E13] rounded-[5px] w-[150px] h-[50px] justify-center text-[#fff] " >Xác nhận</button>
        </div>
        
    
    </div>
  )
}

export default FormHoanTien