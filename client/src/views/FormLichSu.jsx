import React, { useRef } from 'react'
import Calendar from 'react-calendar'
import Swal from 'sweetalert2'
import { useEffect } from "react";
import { useState } from "react";
import { 
  GetPersonalBillByIdTK

} from "../controllers/CQuanLyLich";
import SanBong from '../models/SanBong';
const FormLichSu = () => {
  useEffect(()=>{
    getPersonalBillByIdTK(3)
  },[])
  // var doiThu="Trống";
  // if(data.DoiThu)
  // {
  //   doiThu=data.DoiThu
  // }
  const [getPersonalLich,setPersonalLich] = useState([]);
  const [gotPersonalInfo,setGotPersonalInfo] = useState(false);
  const [getSanBong, setSanBong] = useState([])
  const [getSelectedList,setSelectedList] = useState([]);
  const lichholder = useRef()

  const loadSelectedLich=async (idSelected)=>{
    let selected = idSelected
    await loadLich(getSelectedList, selected);
    
  }


  const getPersonalBillByIdTK = async(idTK) =>{
    let list = await GetPersonalBillByIdTK(idTK)
    setSelectedList(list);
    setGotPersonalInfo(true)
    setPersonalLich(list)
    loadLich(list)
}

  const dateFormatter  = (date) =>{

    let time = new Date(date)
    const formattedDate = time.toLocaleDateString("vi-VN", {
      weekday: "short", // Abbreviated weekday name (e.g., "Mon")
      day: "2-digit",   // Two-digit day of the month (e.g., "01")
      month: "2-digit", // Two-digit month (e.g., "10")
      year: "numeric",  // Full year (e.g., "2023")
    });
    // console.log(formattedDate)
    return formattedDate
  }

  const loadLich = async (list, getSelected)=>{
    let as="";

    for(const data of list){
      
      let sanBong = await data.SanBong
      let hoaDon = await data
      let khungGio = await data.KhungGio
      let doiThu
      let date = dateFormatter (hoaDon.Ngay)
      if(hoaDon.DoiThu == null)
      {
        doiThu = "Không có"
      }else{
        doiThu = hoaDon.DoiThu.Ten
      }
    
      // console.log(hoaDon)
      as+=`
      <div class='w-[auto] bg-[#9BCE89] h-[auto] py-[10px] m-[15px] my-[5px] rounded-[15px] grid grid-cols-${getSelected == 2 ? ('6') : '5'} '>
      <img src="" alt="" class='w-[90px] h-[90px] col-span-1 ml-[10px]' />
        <div class='col-span-1 grid grid-row-2 p-[10px]'>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Cơ sở sân:</div>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Mã sân:</div>
        </div>
        <div class='col-span-1 grid grid-row-2 p-[10px]'>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${sanBong.TaiKhoan.Ten}</div>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${sanBong.TenSan}</div>
        </div>
        <div class='col-span-1 grid grid-row-2 p-[10px]'>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Ngày - giờ đặt:</div>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Trạng thái:</div>
        </div>
        <div class='col-span-1 grid grid-row-2 p-[10px] text-center'>
          <div class='col-span-1 font-[600] text-[18px] h-[auto] my-auto'>${date}<p>${khungGio.ThoiGian}</p></div>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${hoaDon.TrangThai}</div>
        </div>
        ${getSelected == 2 ? ( `<div class='col-span-1 grid grid-row-2 p-[10px]'>
        <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Đối thủ:</div>
        <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${doiThu}</div>
      </div>`):""}
      </div>`
    }
      lichholder.current.innerHTML = as; 
  }

  return (
    <div className='w-[80%] mx-auto bg-[#FFF] border-[3px] border-[#379E13] pb-[3%] rounded-[10px]'>
      <div className='font-[600] text-[36px] text-center h-[50px] py-[5%] text-[#379E13]'>LỊCH SỬ CÁ NHÂN</div>
      <div className='flex flex-row my-[2%] mx-auto w-[90%]'>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]' onClick={()=> loadSelectedLich(1)}> Sân đã đặt</div>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] mx-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]'onClick={()=> loadSelectedLich(2)}> Trận giao hữu</div>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]' onClick={()=> loadSelectedLich(2)}> Đã hoàn thành</div>
      </div>
      <div ref={lichholder} id= 'lich'className='bg-[#D9D9D9] w-[90%] h-[620px] mx-auto py-[15px] rounded-[15px] flex flex-col align-middle overflow-y-visible overflow-x-hidden overflow-scroll'> 
        {/* {gotPersonalInfo === true ? async ()=> {               
          getPersonalLich.map(async (data, i) => {
          })
          }: ""} */}
      
      </div>
      
    </div>
  )
}

export default FormLichSu