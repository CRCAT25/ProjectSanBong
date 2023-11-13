import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faLock
} from "@fortawesome/free-solid-svg-icons"
import "../css/OrderField.css"


const Icon24px = ({classIcon, top}) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        position: "absolute",
        top: top,
        left: "16%"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}




const FormLogin = () => {
  return (
    <div className='main w-[50%] mx-auto grid grid-cols-5'>
        <div className="col-span-2">
            <img className='rounded-l-[10px]' src="../assets/imgLogin.png" alt="" />
        </div>

        <div className="col-span-3 relative rounded-r-[10px] bg-white">
            <div className='absolute top-[12%] left-1/2 translate-x-[-50%] text-[40px] font-[400] text-center'>Đăng nhập</div>
            <input className='absolute bg-[#E9E9E9] top-[32%] left-1/2 translate-x-[-50%] w-[75%] h-[60px] rounded-[150px] pl-14' placeholder='Tên đăng nhập'></input>
            <Icon24px classIcon={faUser} top={"35.2%"}/>
            <input className='absolute bg-[#E9E9E9] top-[45%] left-1/2 translate-x-[-50%] w-[75%] h-[60px] rounded-[150px] pl-14' placeholder='Mật khẩu'></input>
            <Icon24px classIcon={faLock} top={"48.2%"}/>
            <button className='buttonLogin absolute top-[65%] text-[22px] left-1/2 translate-x-[-50%] rounded-[150px] w-[75%] h-[60px] '>Đăng nhập</button>
            <div className='absolute top-[76%] left-1/2 translate-x-[-50%] w-[75%] text-[18px] flex justify-between'>
                <a className='text-[#4D74FF] cursor-pointer'>Quên mật khẩu ?</a>
                <a className=' cursor-pointer'>Tạo tài khoản</a>
            </div>

            
        </div>
    </div>
  )
}

export default FormLogin