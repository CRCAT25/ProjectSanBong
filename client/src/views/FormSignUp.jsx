import React from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser, faEnvelope, faKey, faPhone
} from "@fortawesome/free-solid-svg-icons"

const Icon24px = ({ classIcon, top }) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        position: "absolute",
        top: top,
        left: "16%"
    };
    return (
        <span><FontAwesomeIcon icon={classIcon} style={iconSize} /></span>
    )
}


const FormSignUp = () => {

    const SignUp = () => {
        Swal.fire({
            title: "Đăng ký thành công",
            icon: "success"
        });
        setTimeout(() => {
            Swal.close();
        }, 1000);
    }

    return (
        <div className='bg-white rounded-[10px] px-[70px] pt-[40px] pb-[50px] relative'>
            <div className='text-[40px] font-[400] text-center mb-[51px]'>Đăng ký</div>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14' placeholder='Họ và tên'></input>
            <Icon24px classIcon={faUser} top={"23.1%"} />
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Email'></input>
            <Icon24px classIcon={faEnvelope} top={"32.9%"} />
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Nhập lại Email'></input>
            <Icon24px classIcon={faEnvelope} top={"42.7%"} />
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Mật khẩu'></input>
            <Icon24px classIcon={faKey} top={"52.6%"} />
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Nhập lại mật khẩu'></input>
            <Icon24px classIcon={faKey} top={"62.4%"} />
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Số điện thoại'></input>
            <Icon24px classIcon={faPhone} top={"72.3%"} />
            <button onClick={SignUp} className='buttonLogin text-[22px] rounded-[150px] w-full h-[60px] mt-[51px] '>Đăng ký</button>
        </div>
    )
}

export default FormSignUp