import React, { useEffect } from 'react'
import "../css/Header.css"
import "../css/OrderField.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell, faXmark} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import FormLogin from './FormLogin'
import FormSignUp from './FormSignUp'

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


const IconClose = () => {
    const iconSize = {
        width: "36px",
        height: "36px",
    };
    return(
        <span><FontAwesomeIcon icon={faXmark} style = {iconSize}/></span>
    )
}


export default function Header() {
    const navigate = useNavigate();

    const OpenFormLogin = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        var formLogin = document.getElementById('formLogin');
        formLogin.style.opacity = "10"
        formLogin.style.top = "24%"
        CloseFormSignUp()
        bgCus.style.opacity = "0.6"
    }

    const CloseFormLogin = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        bgCus.style.opacity = "0.1";
        var formLogin = document.getElementById('formLogin');
        formLogin.style.opacity = "0";
        formLogin.style.top = "-100%";
    }

    const OpenFormSignUp = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        var formSignUp = document.getElementById('formSignUp');
        formSignUp.style.opacity = "10"
        formSignUp.style.top = "-60%"
        CloseFormLogin()
        bgCus.style.opacity = "0.6"
    }

    const CloseFormSignUp = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        bgCus.style.opacity = "0.1";
        var formSignUp = document.getElementById('formSignUp');
        formSignUp.style.opacity = "0";
        formSignUp.style.top = "-100%";
    }

    useEffect(() => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        bgCus.addEventListener('click', CloseFormLogin);
        bgCus.addEventListener('click', CloseFormSignUp);
        var iconClose = document.getElementsByClassName('iconClose')[0];
        iconClose.addEventListener('click', CloseFormLogin);


        // Cleanup the event listener when the component unmounts
        return () => {
            bgCus.removeEventListener('click', CloseFormLogin);
        };
    }, []);


  return (
    <div className='w-full bgHeader h-[839px] relative'>
        <div className='bg-[#000] bgCus opacity-10 h-[839px] w-full absolute z-1'></div>
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
                    <button className='buttonXacNhan w-[130px] h-[40px]' onClick={OpenFormSignUp}>Sign up</button>
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
        <div id="formLogin" className='top-[-100%] duration-300 relative z-1000 opacity-0 w-[50%] mx-auto'>
            <FormLogin/>
            <div className='absolute top-1 right-1 cursor-pointer iconClose'><IconClose/></div>
        </div>  
        <div id="formSignUp" className='top-[-100%] duration-300 relative z-1000 opacity-0 w-[30%] mx-auto'>
            <FormSignUp/>
            <button className='absolute bottom-6 text-[#4D74FF] cursor-pointer w-full flex justify-center mt-[1px]' onClick={OpenFormLogin}>Đã có tài khoản</button>
        </div>  
    </div>
  )
}
