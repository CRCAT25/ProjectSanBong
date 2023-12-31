import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css"
import "../css/OrderField.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import {
    faLocationDot,
    faChevronDown,
    faMagnifyingGlass,
    faCheck,
    faAngleLeft,
    faAngleRight
} from "@fortawesome/free-solid-svg-icons"
import { React, useState, useEffect, useRef } from "react";
import { getAllKhungGio, getAllOccuredKhungGio, GetAllSanFromCoSo, GetAllSanFromCoSoBySearch, GetInfoSanBong, GetTenLoaiSan, DatSanC, HuyDatSan, DatCoc, getAnhSanByID } from "../controllers/CDatSan";

import "../controllers/CTimKiem";
import { TimKiemSanBong, getAllCoSo, TimKiemSanBongC, GetInfoCoSoSan } from "../controllers/CTimKiem";
import Swal from 'sweetalert2'
import CoSoSan from "../models/CoSoSan";
import LoaiSan from "../models/LoaiSan";
import KhungGio from '../models/KhungGio';
import FormHoaDon from './FormHoaDon';
import FormHoanTien from './FormHoanTien';
const Icon24px = ({ classIcon, color }) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        color: color
    };
    return (
        <span><FontAwesomeIcon icon={classIcon} style={iconSize} /></span>
    )
}

const IconCheck = ({ classIcon }) => {
    const iconSize = {
        width: "20px",
        height: "20px",
        color: "#fff"
    };
    return (
        <span><FontAwesomeIcon icon={classIcon} style={iconSize} /></span>
    )
}


/*                           CITY API                            */
const host = 'https://provinces.open-api.vn/api/?depth=1';

var callAPI = (api) => {
    return axios.get(api)
        .then((response) => {
            renderData(response.data, "cityLocation");
        });
}

var renderData = (array, select) => {
    let row = ' <option disable value="">Chọn thành phố</option>';
    array.forEach(tinhthanh => {
        row += `<option data-id="${tinhthanh.code}" value="${tinhthanh.name}">${tinhthanh.name}</option>`
    });
    document.querySelector("#" + select).innerHTML = row
    // const tkhText = document.querySelector(`.tkh-${id}`).textContent;

}

/*                                                        */
export const OrderField = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [DBDate, setDBDate] = useState("");
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [isValidDate, setIsValidDate] = useState(true);
    const [textofDate, setTextofDate] = useState(new Date().toLocaleDateString("vi-VN", {
        weekday: "short", // Abbreviated weekday name (e.g., "Mon")
        day: "2-digit",   // Two-digit day of the month (e.g., "01")
        month: "2-digit", // Two-digit month (e.g., "10")
        year: "numeric",  // Full year (e.g., "2023")
    }));
    const calendarRef = useRef();
    const handleCalendarClick = () => {
        setIsCalendarVisible(true);
        if (isCalendarVisible) {
            setIsCalendarVisible(false);
        }

    }
    useEffect(() => {
        callAPI(host);
        TimKiemSanBong();
        GetAllLoaiSan();
        ChonNgay(selectedDate);
        checkDangNhap();
    }, []);



    const ChonNgay = (date) => {
        setSelectedDate(date)
        const formattedDate = date.toLocaleDateString("vi-VN", {
            weekday: "short", // Abbreviated weekday name (e.g., "Mon")
            day: "2-digit",   // Two-digit day of the month (e.g., "01")
            month: "2-digit", // Two-digit month (e.g., "10")
            year: "numeric",  // Full year (e.g., "2023")
        });
        const formattedDBDate = date.toLocaleDateString("vi-VN", {
            year: "numeric",  // Full year (e.g., "2023")
            month: "2-digit", // Two-digit month (e.g., "10")
            day: "2-digit",   // Two-digit day of the month (e.g., "01")

        });
        let currentdate = new Date()
        if (date < currentdate) {
            setIsValidDate(false)
        } else {
            setIsValidDate(true)
        }
        let stringDate = ""
        stringDate = formattedDBDate.split('/').reverse().join('-')
        setDBDate(formattedDBDate.split('/').reverse().join('-'))
        setTextofDate(formattedDate);
        setGotInfoSan(false)
        handleCalendarClick();
        setSelectedSanBong(0)
        ClearSelected()
    }
    const [coSo, setCoSo] = useState([])
    const [coSoMSG, setCoSoMSG] = useState("")
    const [coSoIsAString, setCoSoIsAString] = useState(false)
    const [tenCoSoInput, setTenCoSoInput] = useState("")
    const [diaDiemInput, setDiaDiemInput] = useState("")
    const selectLoaiBoxRef = useRef(null)
    const [isDangNhap, setIsDangNhap] = useState(false)

    const trangChu = false;
    const TimKiemSanBong = async () => {
        setGotInfo(false)
        setGotInfoSan(false)
        let result = await TimKiemSanBongC(tenCoSoInput, diaDiemInput)
        if (typeof result === 'string') {
            setCoSoIsAString(true)
            setCoSoMSG(result)
        } else {
            setCoSoIsAString(false)
            setCoSo(result)
        }
    }

    const [infoCoSo, setInfoCoSo] = useState(new CoSoSan)
    const [gotInfo, setGotInfo] = useState(false)
    const [gotInfoSan, setGotInfoSan] = useState(false)
    const [selectedSanBong, setSelectedSanBong] = useState([]);
    const [sanBongs, setSanBongs] = useState([]);
    const [sanBongInfo, setSanBongInfo] = useState([]);
    const [loaiSans, setLoaiSans] = useState([]);
    const [tenLoaiSan, setTenLoaiSan] = useState("");
    const FromDatSan = true;

    const ChonCoSoSan = async (idCoso) => {
        if (selectLoaiBoxRef.current) {
            selectLoaiBoxRef.current.value = "";
        }
        await ShowListSanBongnInfoCS(idCoso)
        setSelectedSanBong(0)
        ClearSelected()
    }

    const ShowListSanBongnInfoCS = async (idCoso) =>{
        setInfoCoSo(await GetInfoCoSoSan(idCoso))
        setSanBongs(await GetAllSanFromCoSo(idCoso))
        setGotInfo(true)
        setGotInfoSan(false)
    }

    const GetAllLoaiSan = async () => {
        const loaisan = new LoaiSan();
        let lstLoaiSan = await loaisan.GetAllLoaiSan();
        setLoaiSans(lstLoaiSan)
    }

    const ChonLoaiSan = async (IdLoaiSan) => {
        setGotInfoSan(false)
        setSelectedSanBong(0)
        ClearSelected()
        setSanBongs(await GetAllSanFromCoSoBySearch(infoCoSo.IdAccount, IdLoaiSan))
    }

    const [anhSan, setAnhSan] = useState([])
    const ChonSanBong = async (idSan) => {
        let infoSanBong = await GetInfoSanBong(idSan)
        setSelectedSanBong(idSan)
        let anhs = await getAnhSanByID(idSan)
        setAnhSan(anhs)
        setTenLoaiSan(infoSanBong.LoaiSan.TenLoaiSan)
        await GetEmptyKhungGio(idSan)
        GetAllKhungGio()
        setSanBongInfo(infoSanBong)
        setGotInfoSan(true)
        ClearSelected()
    }

    useEffect(() => {
          TimKiemSanBong()
      }, [diaDiemInput]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % anhSan.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + anhSan.length) % anhSan.length
        );
    };


    const [khungGios, setKhungGios] = useState([])
    const [occuredKhungGios, setoccuredKhungGios] = useState([])
    const [gotInfoKhungGio, setGotInfoKhungGio] = useState(false)
    const GetAllKhungGio = async () => {
        let khungGios = await getAllKhungGio()
        setKhungGios(khungGios)
        setGotInfoKhungGio(true)
    }

    const GetEmptyKhungGio = async (idSan) => {
        let ocurKhungGio = await getAllOccuredKhungGio(idSan, DBDate)
        let listOccuredKhungGio = []
        ocurKhungGio.map(async (data, i) => listOccuredKhungGio.push(await data.KhungGio))
        setoccuredKhungGios(listOccuredKhungGio)
    }

    const [selectedKhungGio, setSelectedKhungGio] = useState(new KhungGio())
    const ChonKhungGio = (khungGio) => {
        setSelectedKhungGio(khungGio)
        HienThiTongTien(khungGio)
    }

    const HienThiTongTien = (khungGio) => {
        let TongTien = sanBongInfo.LoaiSan.GiaTien + khungGio.GiaTien
        setTongTien(TongTien)
        setTongTienText(formatCurrency(TongTien))
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(0)
    const [textForGiaoHuu, setTextForGiaoHuu] = useState("")
    const TaoGiaoHuu = () => {
        const currentdate = new Date()
        if(selectedDate.getDate() == currentdate.getDate()){
            Swal.fire({
                title: "Bạn chỉ có thể bật giao hữu trước ít nhất 1 ngày !",
                icon: "information"
            });
            setTimeout(() => {
                Swal.close();
            }, 1000);
        }else{
            
            CheckBoxChecked();
        }
        
    }

    const CheckBoxChecked = () =>{
        
        if (isCheckBoxChecked == 0) {
            setIsCheckBoxChecked(1)
            setTextForGiaoHuu("Cho phép tham gia giao hữu !")
        } else {
            setIsCheckBoxChecked(0)
            setTextForGiaoHuu("Trận đấu như bao người")
        }
    }

    const [showHoaDon, setShowHoaDon] = useState(false)
    const [tongTien, setTongTien] = useState(0)
    const [tongTienText, setTongTienText] = useState("0")
    const [valueForHoaDon, setValueForHoaDon] = useState({})

    const checkDangNhap = async () => {
        if (localStorage.getItem('userName') != null) {
            setIsDangNhap(true)
            return true
        } else {
            setIsDangNhap(false)
            return false
        }
    }

    const DatSan = async () => {
        let dangnhap = await checkDangNhap()
        console.log(dangnhap)
        setIsDangNhap(dangnhap)
        if (isDangNhap) {
            const checkKhungGio = checkSelectKhungGio()
            if (!checkKhungGio) {
                HienThiThongBaoChonKhungGio()
            } else {
                HienThiXacNhanDatSan()
            }
        } else {
            Swal.fire({
                title: "Vui lòng đăng nhập trước khi thực hiện!",
                icon: "error"
            });
            setTimeout(() => {
                Swal.close();
            }, 1000);
        }
    }


    

    const checkSelectKhungGio = () => {
        if (selectedKhungGio.IdKhungGio == 0 || selectedKhungGio == "") {
            return false
        } else {
            return true
        }
    }

    const HienThiThongBaoChonKhungGio = () => {
        Swal.fire({
            title: "Vui lòng chọn khung giờ để đặt sân!",
            icon: "error"
        });
        setTimeout(() => {
            Swal.close();
        }, 1000);
    }

    const HienThiXacNhanDatSan = () => {
        if (showHoaDon == true) {
            setShowHoaDon(false)
            document.body.style.overflow = 'visible'
        } else {
            setShowHoaDon(true)
            document.body.style.overflow = 'hidden'
            const valueForHoaDon = {
                TenKH: localStorage.getItem('userName'),
                SDTKH: localStorage.getItem('userSDT'),
                KhungGio: selectedKhungGio.ThoiGian,
                NgayDat: textofDate,
                TenSan: infoCoSo.Ten,
                DiaDiem: infoCoSo.DiaChiCoSo,
                SDTSan: infoCoSo.SoDienThoai,
                MaSan: sanBongInfo.TenSan,
                LoaiSan: sanBongInfo.LoaiSan.TenLoaiSan,
                GiaoHuu: textForGiaoHuu,
                TongTien: tongTienText,
            }
            setValueForHoaDon(valueForHoaDon)
        }
    }

    const [showDatCoc, setShowDatCoc] = useState(false)
    const HienThiDatCoc = async () => {
        if (showDatCoc == true) {
            setShowDatCoc(false)
        }
        else {
            setShowDatCoc(true)
        }

    }

    const HuyDatCoc = async () => {
        await HuyDatSan(newHoaDonID)
        HienThiDatCoc()
    }

    const DatCocV = async (NganHang, STK, SoTien) => {

        let validTTBank = CheckTTBank(NganHang, STK, SoTien)
        if (validTTBank == true) {
            DatCoc(newHoaDonID)
            HienThiThongBaoDatCocTC()
        } else {
            HienThiThongBaoLoiTT(validTTBank)
        }

    }

    const CheckTTBank = (NganHang, STK, SoTien) => {
        if (NganHang != "" && STK != "" && SoTien != "") {
            if(NganHang == ""){
                return ("Vui lòng chọn ngân hàng !")
            }
            if (STK.length < 10) {
                return ("Số tài khoản phải đủ 10 ký tự !")
            }
            return true
        }
        else {
            return ("Vui lòng nhập đầy đủ thông tin ngân hàng !")
        }
    }

    const HienThiThongBaoDatCocTC = () => {
        Swal.fire({
            title: "Đặt cọc thành công!",
            icon: "success"
        });
        setTimeout(() => {
            Swal.close();
            window.location.reload()
        }, 1000);
    }

    const HienThiThongBaoLoiTT = (message) => {
        Swal.fire({
            title: message,
            icon: "error"
        });
        setTimeout(() => {
            Swal.close();
        }, 1000);
    }

    const [newHoaDonID, setNewHoaDonID] = useState(null)
    const XacNhanDatSanV = async () => {
        let newestHoaDonID = await DatSanC(localStorage.getItem('userID'), sanBongInfo.IdSan, selectedKhungGio.IdKhungGio, DBDate, isCheckBoxChecked, tongTien)
        setNewHoaDonID(newestHoaDonID)
        await HienThiDatCoc()
    }

    const ClearSelected = () => {
        setSelectedKhungGio(0);
        setTongTien(0)
        setIsCheckBoxChecked(0)
        setTongTienText("")

    }

    const checkPassedTime = (thoiGian) => {
        let time = thoiGian.split(":")[0]
        let currentDate = new Date()

        if (selectedDate.getDate() == currentDate.getDate()) {
            if (currentDate.getHours() >= time) {
                console.log(true)
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    return (
        <div className="w-[80%] mx-auto mt-5 orderField relative">
            <div className="grid grid-cols-12">
                <div className="h-[3px] lineCustom col-span-5 rotate-180 mt-[59px]"></div>
                <div className="text-[48px] font-[600] my-6 text-center col-span-2 text-[#30691b]">ĐẶT SÂN</div>
                <div className="h-[3px] lineCustom col-span-5 mt-[59px]"></div>
            </div>
            {showHoaDon === true ? (
                <div className="fixed inset-0 z-50 flex  bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded shadow-md">
                        <FormHoaDon {...valueForHoaDon} HienThiXacNhanDatSan={HienThiXacNhanDatSan} XacNhanDatSanV={XacNhanDatSanV} isDatSan={true} />
                        {showDatCoc === true ? (<div className="fixed inset-0 z-51 flex bg-gray-800 bg-opacity-50"> 
                        <FormHoanTien isDatCoc={true} idHD={newHoaDonID} 
                        tongTien={tongTienText} HuyDatCoc={HuyDatCoc} DatCoc={(selectednganhang, stk, tongtien) => DatCocV(selectednganhang, stk, tongtien)}/>
                        </div>
                        ) : ""}
                    </div>
                </div>) : ""}

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 border-[#379E13] border-[3px] rounded-[10px] p-5">
                    <div className="flex justify-between">
                        <div className="text-[24px] justify-center flex flex-col">Vị trí:</div>
                        <div className="relative left-[70px] top-2"><Icon24px classIcon={faLocationDot} /></div>
                        <select id="cityLocation" className={`border-2 border-[#000] py-2 w-[300px] rounded-[10px] cursor-pointer justify-center text-center"`} onChange={(event) => {                          
                            setDiaDiemInput(event.target.value);
                        }}>

                        </select>
                    </div>
                    <div className="flex relative">
                        <input className="flex justify-between mt-5 rounded-[15px] bg-[#E9E9E9] p-3 pr-12 mb-3 w-[470px]" onChange={(event) => {
                            setTenCoSoInput(event.target.value);
                        }} placeholder="Tìm kiếm tên cơ sở ..." />
                        <div className="absolute right-4  top-[32px] cursor-pointer" onClick={TimKiemSanBong}> <Icon24px classIcon={faMagnifyingGlass} /> </div>
                    </div>
                    <div className='overflow-y-auto h-[600px]'>
                    {coSoIsAString === false ? coSo.map((data, i) => (
                        <div className="border-[#379E13] border-[3px] rounded-[15px] p-3 mt-4 flex cursor-pointer" key={i} onClick={() => {
                            ChonCoSoSan(data.IdAccount)
                        }}>
                            <img className="w-[100px] h-[100px] rounded-[15px]" src={"./assets/" + `${data.Anh}`} alt="" />
                            <span className="justify-center flex flex-col ml-5 text-[#2B790F] text-[26px] ">{data.Ten}</span>
                        </div>
                    )) : (<div>{coSoMSG}</div>)}
                    </div>
                    
                </div>

                <div className="col-span-8 border-[#379E13] border-[3px] rounded-[10px] p-5 relative h-[770px]">
                    {
                        gotInfo === true ? (
                            <div className="flex gap-6 " >
                                <img className="w-[240px] h-[240px] rounded-[15px]" src={"./assets/" + `${infoCoSo.Anh}`} alt="" />
                                <div className="block w-full ">
                                    <div className="text-[32px] font-[600] mb-2">{infoCoSo.Ten}</div>

                                    <div className="text-[20px] mt-1">
                                        <span className="font-[600]">Địa chỉ:</span>
                                        <span className="font-[400] ml-3">{infoCoSo.DiaChiCoSo}</span>
                                    </div>

                                    <div className="text-[20px] mt-1">
                                        <span className="font-[600]">Số điện thoại:</span>
                                        <span className="font-[400] ml-3">{infoCoSo.SoDienThoai}</span>
                                    </div>

                                    <div className="text-[20px] mt-5 flex">
                                        <span className="font-[600] justify-center flex flex-col">Ngày đặt sân:</span>
                                        <div className="flex gap-4 ml-3">
                                            <div className="border-2 border-[#379E13] py-1 px-4 rounded-[10px] cursor-pointer w-[230px]  text-center" onClick={handleCalendarClick}>
                                                <span className="text-[20px] mx-4 textofDate">{textofDate}</span>
                                            </div>

                                            <select ref={selectLoaiBoxRef} className="border-2 border-[#379E13] py-1 px-4 rounded-[10px] cursor-pointer justify-center text-center" onChange={(event) => {

                                                ChonLoaiSan(event.target.value)
                                            }}>
                                                <option className="text-[19px]" value="">Chọn loại sân</option>
                                                {loaiSans.map((data, i) => (<option className="text-[19px]" key={i} value={data.IdLoaiSan} >{data.TenLoaiSan}</option>))}
                                                <Icon24px classIcon={faChevronDown} />
                                            </select>
                                        </div>
                                        {isCalendarVisible === false ? <Calendar ref={calendarRef} onChange={ChonNgay} value={selectedDate} minDate={new Date()} /> : ""}
                                    </div>

                                    <div className="grid grid-cols-7 mt-5 gap-3 overflow-x-auto w-[700px]">
                                        {selectedDate != null && sanBongs != null && setIsValidDate != false ? sanBongs.map((data, i) =>
                                        (<div className={`'col-span-2 bg-[#FFEB37] text-center px-4 py-2 rounded-[10px] cursor-pointer' ${selectedSanBong == data.IdSan ? 'border-2 border-[#000000]' : ''}`} value={data.IdSan} key={i}
                                            onClick={() => ChonSanBong(data.IdSan)}>{data.TenSan}</div>)) : ""}
                                    </div>
                                </div>
                            </div>) : ("")
                    }
                    <div className="mt-[30px] relative">
                        <div className="text-[24px] text-[#2B790F]">Chi tiết sân bóng:</div>
                        <div className="w-full h-[3px] lineCustom"></div>
                        {gotInfoSan === true ? (
                            <div className="mt-4 flex gap-6">


                                {anhSan.length > 1 && (
                                    <>
                                        <img
                                            className="w-[300px] h-[300px] rounded-[15px] mb-[50px]"
                                            src={`./assets/${anhSan[currentImageIndex].Anh}`}
                                            alt="" />
                                            <button onClick={prevImage} className="absolute top-1/2 left-1 "><Icon24px classIcon={faAngleLeft} color={"#fff"}/></button>
                                            <button onClick={nextImage} className="absolute top-1/2 left-[272px]"><Icon24px classIcon={faAngleRight} color={"#fff"}/></button>
                                    </>
                                )}
                                {anhSan.length === 1 && (
                                    <img
                                        className="w-[300px] h-[300px] rounded-[15px] mb-[50px]"
                                        src={`./assets/${anhSan[0].Anh}`}
                                        alt=""
                                    />
                                )}
                                <div className="w-full">

                                    <div className="text-[20px] mt-1">
                                        <span className="font-[600]">Tên sân:</span>
                                        <span className="font-[400] ml-3">{sanBongInfo.TenSan}</span>
                                    </div>
                                    <div className="text-[20px] mt-1">
                                        <span className="font-[600]">Loại sân:</span>
                                        <span className="font-[400] ml-3">{tenLoaiSan}</span>
                                    </div>


                                    <div className="mt-7 w-full gap-3 grid grid-cols-12">
                                        {gotInfoKhungGio === true ? (
                                            khungGios.map((data, i) => {
                                                const isOccured = occuredKhungGios.some((ocurkhunggio) => ocurkhunggio.IdKhungGio === data.IdKhungGio);
                                                const isPassed = checkPassedTime(data.ThoiGian)

                                                return (

                                                    <div className={`col-span-3 ${isOccured || isPassed ? 'bg-[#D9D9D9] pointer-event-none' : 'bg-[#FFEB37] cursor-pointer'} ${selectedKhungGio.IdKhungGio == data.IdKhungGio && !isPassed ? 'border-2 border-[#000000]' : ''} text-center px-4 py-2 rounded-[10px]`} onClick={() => { if (!isOccured && !isPassed) { ChonKhungGio(data) } }} key={i}>{data.ThoiGian} </div>
                                                );
                                            })
                                        ) : ""}
                                    </div>
                                    <div className="absolute flex gap-3 my-10">
                                        <div className="w-[30px] h-[30px] bg-[#2AB514] border-[2px] border-[#2AB514] rounded-[5px] cursor-pointer p-1" onClick={TaoGiaoHuu}>
                                            {isCheckBoxChecked === 1 ? (<div><IconCheck classIcon={faCheck} /></div>) : ""}
                                        </div>
                                        <div className="flex flex-col justify-center font-[600]">Cho phép người khác tham gia giao hữu</div>

                                    </div>

                                </div>
                            </div>) : ""}

                    </div>
                    {gotInfoSan ?

                        (<div>
                            <div className="text-[28px] font-[600] absolute bottom-5 left-5">Tạm tính:</div>
                            <div className="text-[28px] font-[400] absolute bottom-5 left-[165px]">{tongTienText}</div>
                            <button className="buttonXacNhan w-[250px] h-[50px] absolute bottom-5 right-5 text-[28px]" onClick={() => { DatSan() }}>Xác nhận</button>
                        </div>
                        ) : ""}


                </div>


            </div>
        </div>
    )
}


