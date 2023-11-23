import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUser, faEnvelope, faPhone, faKey
} from "@fortawesome/free-solid-svg-icons"
import { ResPass, UpdatePass } from '../controllers/CDangNhap'


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

const FormResPass = () => {

    const [isTiepTheo, setIsTiepTheo] = useState("0");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [sdt, setSdt] = useState("");
    const [matKhauMoi, setMatKhauMoi] = useState("");
    const [nhapLaiMK, setNhapLaiMK] = useState("");


    // const ResPassSucessful = () => {
    //     Swal.fire({
    //         title: "Đặt lại mật khẩu thành công",
    //         icon: "success"
    //     });
    //     setTimeout(() => {
    //         Swal.close();
    //         window.location.reload();
    //     }, 1000);
    // }

    const TiepTheo = async () => {
        let result = await (ResPass(name, email, sdt))
        console.log(result)
        if (result != "khong") {
            setIsTiepTheo("1")
        }
        else {
            setIsTiepTheo("0")
            Swal.fire({
                title: "Tài khoản không hợp lệ",
                icon: "error"
            });

            setTimeout(() => {
                Swal.close();
            }, 1000);
        }
    }

    const ResPassSucessful = async () => {
        let result = await (UpdatePass(email, matKhauMoi, nhapLaiMK))
        if (result != "khong") {
            Swal.fire({
                title: "Đặt lại mật khẩu thành công",
                icon: "success"
            });
            setTimeout(() => {
                Swal.close();
                window.location.reload();
            }, 1000);
        }
        else {
            Swal.fire({
                title: "Mật khẩu nhập lại không trùng khớp",
                icon: "error"
            });

            setTimeout(() => {
                Swal.close();
            }, 1000);
        }
    }


    return (
        (isTiepTheo == "0" ? (<div className='bg-white rounded-[10px] px-[70px] pt-[40px] pb-[50px] relative'>
            <div id='khoiPhuc'>
                <div className='text-[40px] font-[400] text-center mb-[51px]'>Khôi phục mật khẩu</div>
                <input
                    className='bg-[#E9E9E9] w-full pl-14 mt-3 h-[60px] rounded-[150px]'
                    placeholder='Họ và tên'
                    onChange={(event) => { setName(event.target.value) }} />
                <Icon24px classIcon={faUser} top={"34.2%"} />

                <input
                    className='bg-[#E9E9E9] w-full pl-14 mt-3 h-[60px] rounded-[150px]'
                    placeholder='Email'
                    onChange={(event) => { setEmail(event.target.value) }} />
                <Icon24px classIcon={faEnvelope} top={"47.9%"} />

                <input
                    className='bg-[#E9E9E9] w-full pl-14 mt-3 h-[60px] rounded-[150px]'
                    placeholder='Số điện thoại'
                    onChange={(event) => { setSdt(event.target.value) }} />
                <Icon24px classIcon={faPhone} top={"61.6%"} />
                <button onClick={TiepTheo} className='buttonLogin text-[22px] rounded-[150px] w-full h-[60px] mt-[51px] '>Tiếp theo</button>
            </div>
        </div>) : (<div className='bg-white rounded-[10px] px-[70px] pt-[40px] pb-[50px] relative'>
            <div id='matKhauMoi'>
                <div className='text-[40px] font-[400] text-center mb-[51px]'>Đặt lại mật khẩu</div>
                <input
                    className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3'
                    placeholder='Mật khẩu'
                    onChange={(event) => { setMatKhauMoi(event.target.value) }} />
                <Icon24px classIcon={faKey} top={"182px"} />

                <input
                    className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3'
                    placeholder='Nhập lại mật khẩu'
                    onChange={(event) => { setNhapLaiMK(event.target.value) }} />
                <Icon24px classIcon={faKey} top={"253px"} />

                <button onClick={ResPassSucessful} className='buttonLogin text-[22px] rounded-[150px] w-full h-[60px] mt-[51px] '>Đặt lại</button>
                <button onClick={() => setIsTiepTheo("0")} className=' bottom-6 text-[#4D74FF] cursor-pointer w-full flex justify-center mt-[1px]'>Quay lại</button>
            </div></div>))
    )
}

export default FormResPass