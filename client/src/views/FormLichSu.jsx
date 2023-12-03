import React, { useRef } from 'react'
import Calendar from 'react-calendar'
import Swal from 'sweetalert2'
import { useEffect } from "react";
import { useState } from "react";
import { 
  GetPersonalLichFromBillByIdTK,
  GetAllBillByIDTk,
  GetBillById,
  HuySanByIDHd
} from "../controllers/CQuanLyLich";
import FormHoaDon from './FormHoaDon';

const FormLichSu = () => {  
  
  const [getSelectedBtn, setSelectedBtn] = useState(1)
  const [getSelectedList,setSelectedList] = useState([])
  const [showHoaDon, setShowHoaDon] = useState(false)
  const [valueForHoaDon, setValueForHoaDon] = useState({})
  const [getIdHD, setIdHD] = useState()
  const FromLichSu = false;
  
  const lichholder = useRef()
  const idUser= localStorage.getItem("userID")


  useEffect( ()=>{
    Checklogin();
    loadSelectedLich(0);
    },[])

    const Checklogin=() =>{
        if(localStorage.getItem("userID") == null || localStorage.getItem("userRole") !== "1" ){
          Swal.fire({
          icon: 'error',
          text: 'Không đủ thẩm quyền để truy cập',
        }).then(() => {
          if(localStorage.getItem("userRole") === "3"){
            window.location.href = "http://localhost:3000/admin"
          } else{
            window.location.href = "http://localhost:3000"
          }
        });
      }
  }

  const loadSelectedLich = async (idSelected)=>{
    let selected = idSelected
    setSelectedBtn(selected)
    // getPersonalLichFromBillByIdTK(3, selected)
    // await loadLich(getSelectedList, selected);
  }

  const getPersonalLichFromBillByIdTK = async(idTK,selected) =>{
    // console.log("nut "+selected)
    let list
    if(selected ==2){
      list = await GetAllBillByIDTk(idTK)
      // console.log("need"+list)
    }
    else if(selected == 1){
     list = await GetPersonalLichFromBillByIdTK(idTK,selected)
    }
    else{
      list = await GetPersonalLichFromBillByIdTK(idTK,selected)
    }
    setSelectedList(list);
  }

  useEffect(()=>{
    getPersonalLichFromBillByIdTK(idUser, getSelectedBtn)
    },[getSelectedBtn])
    
  useEffect( ()=>{
    // console.log("hayya "+getSelectedList)
    if(localStorage.getItem("userRole") === '1'){
      loadLich(getSelectedList, getSelectedBtn);
    }
      },[getSelectedList])
      
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

  const huyDatSanByID = async () =>{   
    // await HuySanByIDHd(idHD)
    let list = await GetBillById(getIdHD)
    console.log("plapla"+list.TrangThai)
    if(list.TrangThai === "Cancelled")
    {
      Swal.fire({
        title: "Bạn không thể hủy trận đấu này !",
        text:"Trận đấu này đã bị hủy!",
        icon: "error"
      })
    }
    else{
      Swal.fire({
        title: "Bạn có muốn hủy trận đấu này ?",
        text:"Bạn sẽ không được hoàn lại tiền đã đặt!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText:"Khoan đã"
        
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:"Hủy sân thành công",
            icon: "success",
          });
          await HuySanByIDHd(getIdHD);
          setShowHoaDon(false)
          getPersonalLichFromBillByIdTK(idUser, getSelectedBtn)
        }
      });
    }
  }
  
  const hienInfoHoaDon = async(idHD)=>{
      let list = await GetBillById(idHD)
      let hoaDon = await list
      console.log(hoaDon)
      let taiKhoan = await hoaDon.TaiKhoan;
      let sanBong = await hoaDon.SanBong;
      let khungGio = await hoaDon.KhungGio;
      let date = dateFormatter (hoaDon.Ngay);
      let doiThu = await hoaDon.DoiThu;
      let khac="Trận đấu như bao người"
      if(hoaDon.GiaoHuu==='1' )
      {
        if(doiThu !="")
        {
          khac=doiThu.TaiKhoan.Ten
        }
        else khac="Cho phép tham gia giao hữu"
      }
  
      const valueOfHoaDon = {
        TenKH : taiKhoan.Ten,
        SDTKH : taiKhoan.SoDienThoai,
        KhungGio : khungGio.ThoiGian,
        NgayDat : date , 
        TenSan : sanBong.TaiKhoan.Ten, 
        DiaDiem : sanBong.TaiKhoan.DiaChiCoSo, 
        SDTSan: sanBong.TaiKhoan.SoDienThoai, 
        MaSan : sanBong.TenSan, 
        LoaiSan : sanBong.LoaiSan.TenLoaiSan, 
        GiaoHuu : khac, 
        TongTien : hoaDon.TongTien,
      }
      setValueForHoaDon(valueOfHoaDon)
    }
  
  const ShowHD = async(iDHoaDon)=>{
    if(showHoaDon==true)
    {
      setShowHoaDon(false)
      document.body.style.overflow = 'visible'
    }
    else 
    {
      await hienInfoHoaDon(iDHoaDon)
      setShowHoaDon(true)
      document.body.style.overflow = 'hidden'
    }

  }
 
  const loadLich = async (list, selected)=>{
    lichholder.current.innerHTML="";
    if(list.length == 0){
      lichholder.current.innerHTML= `<div class=" rounded-[10px] h-[150px] w-[100%] my-[17%] text-center py-5
        text-[#379E13] text-[30px] font-[600] flex flex-col justify-center">BẠN HIỆN KHÔNG CÓ LỊCH ĐÁ NÀO</div>`
    }
    else{
      list.map( async(data,i)=>{
        let hoaDon = await data
        let sanBong = await data.SanBong
        let khungGio = await data.KhungGio
        let date = dateFormatter (hoaDon.Ngay)
        let doiThu = await data.DoiThu
        let tenDoiThu
        doiThu == null ? tenDoiThu = "Không có" :tenDoiThu = doiThu.Ten
        // console.log(hoaDon)
        lichholder.current.innerHTML+=`
        <div class='lich w-[auto] bg-[#9BCE89] h-[auto] p-[10px] m-[10px] my-[5px] rounded-[15px] grid grid-cols-${selected != 0 ? '6' : '5'}' >
        <img src="./assets/${sanBong.TaiKhoan.Anh}" alt="" class='w-[150px] h-[150px] col-span-1 rounded-[15px]' />
          <div class='col-span-1 grid grid-row-2 p-[10px]'>
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Cơ sở sân:</div>
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Mã sân:</div>
          </div>
          <div class='col-span-1 grid grid-row-2 p-[10px]'> 
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${sanBong.TaiKhoan.Ten}</div>
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${sanBong.TenSan}</div>
          </div>
          ${selected != 0 ? ( `<div class='col-span-1 grid grid-row-2 p-[10px]'>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Đối thủ:</div>
          <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${tenDoiThu}</div>
        </div>`):""}
          <div class='col-span-1 grid grid-row-2 p-[10px]'>
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Ngày - giờ đặt:</div>
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Trạng thái:</div>
          </div>
          <div class='col-span-1 grid grid-row-2 p-[10px] text-center'>
            <div class='col-span-1 font-[600] text-[18px] h-[auto] my-auto'>${date}<p>${khungGio.ThoiGian}</p></div>
            <div class='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${hoaDon.TrangThai}</div>
          </div>
        </div>`
        if(list.length-1==i){
          setTimeout( async() => {
            for(let i = 0; i <  document.getElementsByClassName("lich").length;i++)
            {
              document.getElementsByClassName("lich")[i].addEventListener("click",()=>{
              ShowHD(hoaDon.IDHoaDon)
              console.log("hoaDon.IDHoaDon")
              console.log(hoaDon.IDHoaDon)
              setIdHD(hoaDon.IDHoaDon);
              })
            };
          }, 200);
        }
      })
    }
  }
  return (
  <div>
    {localStorage.getItem("userRole") !== '1' ? (
      <></>
    ) : (
    <div className='w-[80%] mx-auto bg-[#FFF] border-[3px] border-[#379E13] pb-[3%] rounded-[10px]'>
      <div className='font-[600] text-[36px] text-center h-[50px] py-[5%] text-[#379E13]'>LỊCH SỬ CÁ NHÂN</div>
      <div className='flex flex-row my-[2%] mx-auto w-[90%]'>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]' 
        onClick={()=> loadSelectedLich(0)}>Sân đã đặt</div>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] mx-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]'
        onClick={()=> loadSelectedLich(1)}>Trận giao hữu</div>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]' 
        onClick={()=> loadSelectedLich(2)}>Đã hoàn thành</div>
      </div>
      <div ref={lichholder} id= 'lich'className='bg-[#D9D9D9] w-[90%] h-[570px] mx-auto py-[15px] rounded-[15px] flex flex-col align-middle overflow-y-visible overflow-x-hidden overflow-scroll'> 
        {/* {gotPersonalInfo === true ? async ()=> {               
          getPersonalLich.map(async (data, i) => {
          })
          }: ""} */}
      </div>
      {showHoaDon === true ? 
          <div className="fixed inset-0 z-50 flex  bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded shadow-md">
                <FormHoaDon {...valueForHoaDon} HienThiXacNhanDatSan = {(getIdHD) =>ShowHD(getIdHD)} 
                                              XacNhanDatSanV = {huyDatSanByID} isDatSan={FromLichSu} />
            </div>
          </div>:""}
    </div>
    )
      }
      </div>
  )
}


export default FormLichSu