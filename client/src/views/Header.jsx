import React from 'react'
import "../css/Header.css"
import "../css/OrderField.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import FormLogin from './FormLogin'

const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        color: "#B3E15B",
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}


export default function Header() {
    const navigate = useNavigate();

    const OpenFormLogin = () => {
        var formLogin = document.getElementById('formLogin');
        // formLogin.classList.toggle('hidden');
        formLogin.style.opacity = "10"
        formLogin.style.top = "24%"
    }
  return (
    <div className='w-full bgHeader h-[839px] relative'>
        <div className='bg-[#000] opacity-50 h-[839px] w-full absolute z-1'></div>
        <nav className='px-[10%] mt-11 w-full text-[#fff] z-100 flex justify-between absolute'>
            <ul className='text-[24px] flex gap-10'>
                <li>ĐẶT SÂN</li>
                <li>THAM GIA GIAO HỮU</li>
            </ul>

            <ul className='flex gap-6'>
                <li className='flex flex-col justify-center invisible'>
                    <Icon24px classIcon={faBell}/>
                </li>
                <li>
                    <button className='buttonXacNhan w-[130px] h-[40px]'>Sign up</button>
                </li>
                <li>
                    <button className='w-[130px] h-[40px]' onClick={OpenFormLogin}>Sign in</button>
                </li>
            </ul>
        </nav>
        <div className='ml-[10%] text-[44px] font-[600] absolute z-100 text-[#fff] top-[50%] translate-y-[-50%]'>TÌM SÂN BÓNG <p>YÊU THÍCH CỦA BẠN</p> </div>
        <button className='ml-[10%] top-[60%] absolute text-[20px] font-[400] z-100 buttonXacNhan px-8 py-2'>Đặt sân ngay</button>
        <img className='absolute z-100 w-[220px] bottom-[-150px]' src="../assets/football1.png" alt="" />
        <img className='absolute z-100 w-[170px] bottom-[-140px] right-0' src="../assets/ball2.png" alt="" />
        <div id="formLogin" className='top-1/2 duration-300 relative z-1000 opacity-0'><FormLogin/></div>  
    </div>
  )
}
