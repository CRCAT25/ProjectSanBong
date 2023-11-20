import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css"
import  "../css/OrderField.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import axios from "axios";
import {faLocationDot, 
    faChevronDown, 
    faMagnifyingGlass,
    faCheck
} from "@fortawesome/free-solid-svg-icons"
import CDatSan, { GetInfoCoSo } from "../controllers/CDatSan";
import {React,useState, useEffect, useRef } from "react";
import { getAllKhungGio, getAllOccuredKhungGio, GetAllSanFromCoSo, GetAllSanFromCoSoBySearch, GetInfoSanBong, GetTenLoaiSan } from "../controllers/CDatSan";

import "../controllers/CTimKiem";
import { TimKiemSanBong, getAllCoSo, TimKiemSanBongC, GetInfoCoSoSan } from "../controllers/CTimKiem";
import CoSoSan from "../models/CoSoSan";
import LoaiSan from "../models/LoaiSan";
const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}

const IconCheck = ({classIcon}) => {
    const iconSize = {
        width: "20px",
        height: "20px",
        color: "#fff"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
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
    const [DBDate,setDBDate] = useState("");
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [textofDate, setTextofDate] = useState(new Date().toLocaleDateString("vi-VN", {
        weekday: "short", // Abbreviated weekday name (e.g., "Mon")
        day: "2-digit",   // Two-digit day of the month (e.g., "01")
        month: "2-digit", // Two-digit month (e.g., "10")
        year: "numeric",  // Full year (e.g., "2023")
    }));
    const calendarRef = useRef();
    const handleCalendarClick = () =>{
        setIsCalendarVisible(true); 
        if(isCalendarVisible){
            setIsCalendarVisible(false);
    }

    }
    useEffect(() => {
        callAPI(host);
        TimKiemSanBong();
        GetAllLoaiSan();
        handleChangeCalendar(selectedDate);
      }, []);

    const handleChangeCalendar = (date) =>{
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
        let stringDate = ""
        stringDate = formattedDBDate.split('/').reverse().join('-')
        setDBDate(formattedDBDate.split('/').reverse().join('-'))
        setTextofDate(formattedDate);
        handleCalendarClick();
    }
    const[coSo, setCoSo] = useState([])
    const[coSoMSG, setCoSoMSG] = useState("")
    const[coSoIsAString, setCoSoIsAString] = useState(false)
    const[tenCoSoInput, setTenCoSoInput] = useState("")
    const[diaDiemInput, setDiaDiemInput] = useState("")

    const TimKiemSanBong = async () => {
        
        let result = await TimKiemSanBongC(tenCoSoInput, diaDiemInput)
        if(typeof result === 'string'){
            setCoSoIsAString(true)
            setCoSoMSG(result)
        }else{
            setCoSoIsAString(false)
            setCoSo(result)   
        }
    }

    const[infoCoSo, setInfoCoSo] = useState(new CoSoSan)
    const[gotInfo, setGotInfo] = useState(false)
    const[gotInfoSan, setGotInfoSan] = useState(false)
    const[sanBongs, setSanBongs] = useState([]);
    const[sanBongInfo, setSanBongInfo] = useState([]);
    const[loaiSans, setLoaiSans] = useState([]);
    const[tenLoaiSan, setTenLoaiSan] = useState("");
    const ChonCoSoSan = async (idCoso) => {
        setInfoCoSo(await GetInfoCoSoSan(idCoso))
        setSanBongs(await GetAllSanFromCoSo(idCoso))
        setGotInfo(true)
    }

    const GetAllLoaiSan = async () =>{
        const loaisan = new LoaiSan();
        let lstLoaiSan = await loaisan.GetAllLoaiSan();
        setLoaiSans(lstLoaiSan)
    }

    const HandleClickLoaiSan = async (IdLoaiSan) =>{
        setSanBongs(await GetAllSanFromCoSoBySearch(infoCoSo.IdAccount, IdLoaiSan))
    }

    const ChonSanBong = async (idSan) =>{
        let infoSanBong = await GetInfoSanBong(idSan)
        setTenLoaiSan(await GetTenLoaiSan(infoSanBong.IdLoaiSan))  
        GetEmptyKhungGio(idSan) 
        GetAllKhungGio()   
        setSanBongInfo(infoSanBong)
        setGotInfoSan(true)
    }

    const[khungGios, setKhungGios] = useState([])
    const[occuredKhungGios, setoccuredKhungGios] = useState([])
    const[gotInfoKhungGio, setGotInfoKhungGio] = useState(false)
    const GetAllKhungGio = async () => {
        setKhungGios(await getAllKhungGio())
        setGotInfoKhungGio(true)
    }

    const GetEmptyKhungGio = async (idSan) =>{
        let ocurKhungGio = await getAllOccuredKhungGio(idSan, DBDate)
        setoccuredKhungGios(ocurKhungGio)
    }

    
       

  return (
    <div className="w-[80%] mx-auto mt-5 orderField">
        <div className="grid grid-cols-12">
            <div className="h-[3px] lineCustom col-span-5 rotate-180 mt-[59px]"></div>
            <div className="text-[48px] font-[600] my-6 text-center col-span-2 text-[#30691b]">ĐẶT SÂN</div>
            <div className="h-[3px] lineCustom col-span-5 mt-[59px]"></div>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 border-[#379E13] border-[3px] rounded-[10px] p-5">
                <div className="flex justify-between">
                    <div className="text-[24px] justify-center flex flex-col">Vị trí:</div>
                    <div className="relative left-[70px] top-2"><Icon24px classIcon={faLocationDot}/></div>
                    <select id="cityLocation" className={`border-2 border-[#000] py-2 w-[300px] rounded-[10px] cursor-pointer justify-center text-center"`} onChange={(event) => {
                        setDiaDiemInput(event.target.value);
                    }}> 

                    </select>
                </div>
                <div className="flex relative">
                    <input className="flex justify-between mt-5 rounded-[15px] bg-[#E9E9E9] p-3 pr-12 mb-3 w-[470px]" onChange={(event) => {
                        setTenCoSoInput(event.target.value);
                    }} placeholder="Tìm kiếm tên cơ sở ..." />
                    <div className="absolute right-4  top-[32px] cursor-pointer" onClick={TimKiemSanBong}> <Icon24px classIcon={faMagnifyingGlass}/> </div>
                </div>
                
                {coSoIsAString === false ? coSo.map((data, i) => (
                    <div className="border-[#379E13] border-[3px] rounded-[15px] p-3 mt-4 flex cursor-pointer" key={i} onClick={() => {
                        ChonCoSoSan(data.IdAccount)
                    }}>
                        <img className="w-[100px] h-[100px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
                        <span className="justify-center flex flex-col ml-5 text-[#2B790F] text-[26px] ">{data.Ten}</span>
                    </div>
                )) : (<div>{coSoMSG}</div>)}
                
                

            </div>



            <div className="col-span-8 border-[#379E13] border-[3px] rounded-[10px] p-5 relative">
            {
                gotInfo === true ? ( 
                <div className="flex gap-6 " >
                         <img className="w-[240px] h-[240px] rounded-[15px]" src="./assets/sanbong.jpg" alt="" />
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
                                        <div className="border-2 border-[#379E13] py-1 px-4 rounded-[10px] cursor-pointer w-[230px]  text-center" onClick = {handleCalendarClick}>
                                            <span className="text-[20px] mx-4 textofDate">{textofDate}</span>
                                        </div>
                        
                                        <select className="border-2 border-[#379E13] py-1 px-4 rounded-[10px] cursor-pointer justify-center text-center" onChange={(event) => {

                                            HandleClickLoaiSan(event.target.value)}}>
                                            <option className="text-[19px]" disable value="">Lọc loại sân</option>
                                            {loaiSans.map((data, i) =>( <option className="text-[19px]" key={i} value={data.IdLoaiSan} >{data.TenLoaiSan}</option>))}
                                            <Icon24px classIcon={faChevronDown}/>
                                        </select>
                                    </div>
                                        {isCalendarVisible === false ? <Calendar ref={calendarRef} onChange={handleChangeCalendar} value = {selectedDate}/> : ""}
                                </div>
        
                                <div className="grid grid-cols-10 mt-5 gap-3">
                                    {selectedDate != null && sanBongs != null ? sanBongs.map((data, i) => (<div className="col-span-2 bg-[#FFEB37] text-center px-4 py-2 rounded-[10px] cursor-pointer" value={data.IdSan} key={i} onClick={()=>ChonSanBong(data.IdSan)}>{data.TenSan}</div>)) : ""}
                                </div>
                            </div>                   
                </div> ) : ("noo")
                }
                <div className="mt-[30px] relative">
                    <div className="text-[24px] text-[#2B790F]">Chi tiết sân bóng:</div>            
                    <div className="w-full h-[3px] lineCustom"></div>
                    {gotInfoSan === true ? (
                    <div className="mt-4 flex gap-6">
                        <img className="w-[300px] h-[300px] rounded-[15px] mb-[50px]" src="./assets/sanbong.jpg" alt="" />
                        <div className="w-full">

                            <div className="text-[20px] mt-1">
                                <span className="font-[600]">Loại sân:</span>
                                <span className="font-[400] ml-3">{tenLoaiSan}</span>
                            </div>
                            

                            <div className="mt-7 w-full gap-3 grid grid-cols-12">
                            {gotInfoKhungGio === true ? (
                                khungGios.map((data, i) => {
                                    const isOccured = occuredKhungGios.some(ocurkhunggio => ocurkhunggio.IDKhungGio === data.IdKhungGio);                    
                                    return (    
                                    <div className={`col-span-3 ${isOccured ? 'bg-[#D9D9D9] pointer-event-none' : 'bg-[#FFEB37] cursor-pointer'} text-center px-4 py-2 rounded-[10px]`} key={i}>{data.ThoiGian} </div>
                                    );
                                })
                                ) : ""}                                                
                            </div>
                            <div className="absolute flex gap-3 my-10">
                                <div className="w-[30px] h-[30px] bg-[#2AB514] border-[2px] border-[#2AB514] rounded-[5px] cursor-pointer p-1">
                                    <IconCheck classIcon={faCheck}/>
                                </div>
                                <div className="flex flex-col justify-center font-[600]">Cho phép người khác tham gia giao hữu</div>

                            </div>
                            
                        </div>
                    </div>): ""}
                    
                </div>

                <div className="text-[28px] font-[600] absolute bottom-5 left-5">Tạm tính:</div>
                <div className="text-[28px] font-[400] absolute bottom-5 left-[165px]">900.000</div>
                <button className="buttonXacNhan w-[250px] h-[50px] absolute bottom-5 right-5 text-[28px]">Xác nhận</button>

            </div>

            
        </div>
  </div>
  )
}


