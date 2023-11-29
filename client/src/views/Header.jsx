import React, { useEffect, useState } from 'react'
import "../css/Header.css"
import "../css/OrderField.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faXmark, faBell } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import FormLogin from './FormLogin'
import FormSignUp from './FormSignUp'
import FormResPass from './FormResPass'
import { GetPersonalBillByIdAccount } from '../controllers/CQuanLyLich'

const Icon24px = ({ classIcon, color }) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        color: color,
        cursor: "pointer"
    };
    return (
        <FontAwesomeIcon icon={classIcon} style={iconSize} />
    )
}


const IconClose = () => {
    const iconSize = {
        width: "36px",
        height: "36px",
    };
    return (
        <span><FontAwesomeIcon icon={faXmark} style={iconSize} /></span>
    )
}


export default function Header() {
    const navigate = useNavigate();

    const OpenFormLogin = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        var formLogin = document.getElementById('formLogin');
        var textLogin = document.getElementById('text-login');
        formLogin.style.opacity = "10"
        formLogin.style.top = "24%"
        CloseFormSignUp()
        CloseFormResPass()
        textLogin.style.color = "white"
        bgCus.style.opacity = "0.6"
    }

    const CloseFormLogin = () => {
        var textLogin = document.getElementById('text-login');
        textLogin.style.color = "black"
        var bgCus = document.getElementsByClassName('bgCus')[0];
        bgCus.style.opacity = "0.1";
        var formLogin = document.getElementById('formLogin');
        formLogin.style.opacity = "0";
        formLogin.style.top = "-100%";
    }

    const OpenFormSignUp = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        var formSignUp = document.getElementById('formSignUp');
        var textLogin = document.getElementById('text-login');
        formSignUp.style.opacity = "10"
        formSignUp.style.top = "8%"
        CloseFormLogin()
        CloseFormResPass()
        textLogin.style.color = "white"
        bgCus.style.opacity = "0.6"
    }

    const CloseFormSignUp = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        bgCus.style.opacity = "0.1";
        var textLogin = document.getElementById('text-login');
        textLogin.style.color = "black"
        var formSignUp = document.getElementById('formSignUp');
        formSignUp.style.opacity = "0";
        formSignUp.style.top = "-100%";
    }

    const OpenFormResPass = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        var formResPass = document.getElementById('formResPass');
        var textLogin = document.getElementById('text-login');
        formResPass.style.opacity = "10"
        formResPass.style.top = "23%"
        CloseFormLogin()
        CloseFormSignUp()
        textLogin.style.color = "white"
        bgCus.style.opacity = "0.6"
    }

    const CloseFormResPass = () => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        bgCus.style.opacity = "0.1";
        var textLogin = document.getElementById('text-login');
        textLogin.style.color = "black"
        var formResPass = document.getElementById('formResPass');
        formResPass.style.opacity = "0";
        formResPass.style.top = "-100%";
    }

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpenNotify, setDropdownOpenNotify] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const toggleDropdownNotify = () => {
        setDropdownOpenNotify(!isDropdownOpenNotify);
    };

    const closeDropdownNotify = () => {
        setDropdownOpenNotify(false);
    };

    useEffect(() => {
        var bgCus = document.getElementsByClassName('bgCus')[0];
        if (!userName) {
            bgCus.addEventListener('click', CloseFormLogin);
            bgCus.addEventListener('click', CloseFormSignUp);
            bgCus.addEventListener('click', CloseFormResPass);
        }
        bgCus.addEventListener('click', closeDropdown);
        bgCus.addEventListener('click', closeDropdownNotify
        );
        var iconClose = document.getElementsByClassName('iconClose')[0];
        iconClose.addEventListener('click', CloseFormLogin);




        // Cleanup the event listener when the component unmounts
        return () => {
            bgCus.removeEventListener('click', CloseFormLogin);
        };
    }, []);

    const [listNoti, setListNoti] = useState({})

    useEffect(() => {
        async function fetchData() {
            if (userName) {
                let list = await GetPersonalBillByIdAccount(localStorage.getItem("userID"));
                let jsonDataArray = [];
                
                for (let i = 0; i < list.length; i++) {
                    let sanbong = await list[i].SanBong;
                    let cososan = await sanbong.TaiKhoan;
                    let trangthai = await list[i].TrangThai;
                    if (trangthai == "Completed") trangthai = "Đã đặt sân thành công";
                    if (trangthai == "Refunded") trangthai = "Đã hoàn tiền thành công";
                    let giaohuu = await list[i].GiaoHuu;
                    let doiThu, tenDoiThu;

                    if (giaohuu == 1) {
                        doiThu = await list[i].DoiThu;
                        giaohuu = "Trận giao hữu";
                    } else {
                        giaohuu = "Trận thường";
                    }
                    if(doiThu.length > 0)
                        tenDoiThu = await doiThu.Ten;                        
                    else tenDoiThu = ""


                    let ten = await cososan.Ten;

                    // Tạo một đối tượng JSON từ các thuộc tính
                    let jsonObject = {
                        ten: ten,
                        tenDoiThu: tenDoiThu,
                        trangthai: trangthai,
                        giaohuu: giaohuu
                    };

                    // Thêm đối tượng JSON vào mảng
                    jsonDataArray.push(jsonObject);
                }
                setListNoti(jsonDataArray)
            }
        }
        fetchData()
    }, [])

    const userName = localStorage.getItem("userName");

    const GoPersonalInfor = () => {
        navigate("/PersonalInfo");
    }

    const GoHome = () => {
        navigate("/*");
    }

    return (
        <div className='w-full bgHeader h-[839px] relative'>
            <div className='bg-[#000] bgCus opacity-10 h-[839px] w-full absolute z-1'></div>
            <nav className='px-[10%] mt-11 w-full text-[#fff] z-100 flex justify-between absolute'>
                <ul className='text-[24px] flex gap-10 cursor-pointer'>
                    <li onClick={() => GoHome()}>TRANG CHỦ</li>
                    <li id='textDatSanNgay'>ĐẶT SÂN</li>
                    <li id='textLichGiaoHuu'>THAM GIA GIAO HỮU</li>
                </ul>

                <ul className='flex gap-6'>
                    {userName ? (
                        <>
                            <li className='flex flex-col justify-center' onClick={() => toggleDropdownNotify()}>
                                <Icon24px classIcon={faBell} color={"FFE500"} />
                            </li>
                            <li className='flex flex-col justify-center cursor-pointer'>
                                <span className='text-[24px]'>{userName}</span>
                            </li>
                            <li className='flex flex-col justify-center cursor-pointer' onClick={() => toggleDropdown()}>
                                <Icon24px classIcon={faAngleDown} />
                            </li>
                            {isDropdownOpen && (
                                <div className="w-[242px] bg-white text-black absolute transition duration-500 ease-in-out top-10 cursor-pointer right-[187px] rounded-b-[8px] rounded-tl-[8px]">
                                    <div onClick={() => GoPersonalInfor()} className='p-3 hover:bg-slate-200 rounded-tl-[8px]'>Thông tin cá nhân</div>
                                    <div onClick={() => { localStorage.clear(); window.location.reload() }} className='p-3 hover:bg-slate-200 rounded-b-[8px]'>Đăng xuất</div>
                                </div>
                            )}
                            {isDropdownOpenNotify && (
                                <div className="w-[400px] p-3 bg-white text-black absolute transition duration-500 ease-in-out top-10 cursor-pointer right-[455px]">
                                    <div className='text-[26px] font-[600]'>Thông báo</div>
                                    <div className=''>
                                        {listNoti.length > 0 ? listNoti.map((data, index) => (
                                            <div className='mt-2' key={index}>
                                                <div>
                                                    <span className='font-[600] text-[#DF0000]'>{data.giaohuu}</span>
                                                    <span className='px-1'>tại</span>
                                                    <span className='font-[600]'>Sân bóng {data.ten}</span>
                                                </div>
                                                <div className=''>{data.trangthai}</div>
                                                {data.giaohuu == "Trận giao hữu" ? (data.tenDoiThu ? (<div className=''>Đối thủ: {data.tenDoiThu}</div>) : (<div className=''>Chưa tìm thấy đối thủ</div>)) : ""}
                                            </div>
                                        )) : (<div className='mt-2'>Không có trận đấu nào</div>)}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <li>
                                <button className='buttonXacNhan w-[130px] h-[40px]' onClick={OpenFormSignUp}>Đăng ký</button>
                            </li>
                            <li>
                                <button id='text-login' className='w-[130px] h-[40px] text-black' onClick={OpenFormLogin}>Đăng nhập</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className='ml-[10%] text-[44px] font-[600] absolute z-100 text-[#fff] top-[50%] translate-y-[-50%]'>TÌM SÂN BÓNG <p>YÊU THÍCH CỦA BẠN</p> </div>
            <button id="buttonDatSanNgay" className='ml-[10%] top-[60%] absolute text-[20px] font-[400] z-100 buttonXacNhan px-8 py-2'>Đặt sân ngay</button>
            <img className='absolute z-100 w-[220px] bottom-[-150px]' src="../assets/football1.png" alt="" />
            <img className='absolute z-100 w-[170px] bottom-[-140px] right-0' src="../assets/ball2.png" alt="" />
            <div id="formLogin" className='top-[-300%] duration-300 absolute z-1000 opacity-0 w-[50%] left-1/2 -translate-x-1/2'>
                <FormLogin />
                <button className='absolute cursor-pointer right-[70px] bottom-[110px]' onClick={OpenFormSignUp}>Tạo tài khoản</button>
                <button className='absolute text-[#4D74FF] cursor-pointer bottom-[110px] left-[445px] z-1006' onClick={OpenFormResPass}>Quên mật khẩu ?</button>
                <div className='absolute top-1 right-1 cursor-pointer iconClose'><IconClose /></div>
            </div>
            <div id="formSignUp" className='top-[-100%] duration-300 absolute z-1000 opacity-0 w-[30%] left-1/2 -translate-x-1/2'>
                <FormSignUp />
                <button className='absolute bottom-6 text-[#4D74FF] cursor-pointer w-full flex justify-center mt-[1px]' onClick={OpenFormLogin}>Đã có tài khoản</button>
            </div>
            <div id="formResPass" className='duration-300 absolute z-1000 opacity-0 w-[30%] left-1/2 -translate-x-1/2'>
                <FormResPass />
            </div>
        </div>
    )
}
