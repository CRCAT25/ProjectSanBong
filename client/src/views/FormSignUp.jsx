import React, {useState} from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser, faEnvelope, faKey, faPhone
} from "@fortawesome/free-solid-svg-icons"
import { SignUp } from '../controllers/CDangKy'

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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [resEmail, setResEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resPass, setResPass] = useState("");
    const [sdt, setSdt] = useState("");

    const DangKy = async () => {
        let signup = await SignUp(name, email, resEmail, password, resPass, sdt);
        if(signup === "ton tai"){
            Swal.fire({
                title: "Tài khoản đã tồn tại",
                icon: "error"
            });
            document.getElementsByClassName("inputEmail")[0].value = ""
            document.getElementsByClassName("inputResEmail")[0].value = ""
            document.getElementsByClassName("inputSdt")[0].value = ""
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
        else if(signup === "nhap thieu"){
            Swal.fire({
                title: "Vui lòng nhập đầy đủ thông tin",
                icon: "error"
            });
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
        else if(signup === "email khong khop"){
            Swal.fire({
                title: "Email nhập không trùng khớp",
                icon: "error"
            });
            document.getElementsByClassName("inputEmail")[0].value = ""
            document.getElementsByClassName("inputResEmail")[0].value = ""
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
        else if(signup === "matkhau khong khop"){
            Swal.fire({
                title: "Mật khẩu nhập không trùng khớp",
                icon: "error"
            });
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
        else if(signup === "email khong dung format"){
            Swal.fire({
                title: "Email không hợp lệ",
                icon: "error"
            });
            document.getElementsByClassName("inputEmail")[0].value = ""
            document.getElementsByClassName("inputResEmail")[0].value = ""
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
        else if(signup === "sdt khong dung format"){
            Swal.fire({
                title: "Số điện thoại không hợp lệ",
                icon: "error"
            });
            document.getElementsByClassName("inputSdt")[0].value = ""
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
        else{
            Swal.fire({
                title: "Đăng ký thành công",
                icon: "success"
            });
            setTimeout(() => {
                Swal.close();
                window.location.reload();
            }, 600);
        }
    }

    return (
        <div className='bg-white rounded-[10px] px-[70px] pt-[40px] pb-[50px] relative'>
            <div className='text-[40px] font-[400] text-center mb-[51px]'>Đăng ký</div>
            <input 
            className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14' 
            placeholder='Họ và tên'
            onChange={(event) => { setName(event.target.value) }}/>
            <Icon24px classIcon={faUser} top={"23.1%"} />

            <input 
            className='inputEmail bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' 
            placeholder='Email'
            onChange={(event) => { setEmail(event.target.value) }}/>
            <Icon24px classIcon={faEnvelope} top={"32.9%"} />

            <input 
            className='inputResEmail bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' 
            placeholder='Nhập lại Email'
            onChange={(event) => { setResEmail(event.target.value) }}/>
            <Icon24px classIcon={faEnvelope} top={"42.7%"} />

            <input 
            className='inputPass bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' 
            placeholder='Mật khẩu'
            onChange={(event) => { setPassword(event.target.value) }}/>
            <Icon24px classIcon={faKey} top={"52.6%"} />

            <input 
            className='inputResPass bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' 
            placeholder='Nhập lại mật khẩu'
            onChange={(event) => { setResPass(event.target.value) }}/>
            <Icon24px classIcon={faKey} top={"62.4%"} />

            <input 
            className='inputSdt bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' 
            placeholder='Số điện thoại'
            onChange={(event) => { setSdt(event.target.value) }}/>
            <Icon24px classIcon={faPhone} top={"72.3%"} />

            <button onClick={DangKy} className='buttonLogin text-[22px] rounded-[150px] w-full h-[60px] mt-[51px] '>Đăng ký</button>
        </div>
    )
}

export default FormSignUp