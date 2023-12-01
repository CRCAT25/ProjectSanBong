import axios from "axios";
import "../css/LichGiaoHuu.css"
import Swal from 'sweetalert2'
import { useEffect, useId } from "react";
import { useState } from "react";
import { 
  getAllLichGiaoHuu,
  updateBillDoiThuByIdBill

} from "../controllers/CQuanLyLich";

const LichGiaoHuu = () =>{

  const [getLichs, setLichs] = useState([]);
  const [getIdBill, setIdBill] = useState([]);
  const [getIdDoiThu, setIDDoiThu] = useState([]);
  const idUser= localStorage.getItem("userID")

  useEffect( () => {
     GetAllLichGiaoHuu()
  }, []);

  const conFirmClicked=(IdBill,idTk,idNgdat)=>{
    
    Swal.fire({
      title: "Bạn có muốn tham gia vào trận đấu này ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, tôi tham gia!",
      cancelButtonText:"Hủy"
      
    }).then((result)  => {
      if (result.isConfirmed) {
        if(idTk == idNgdat)
        {
          Swal.fire({
            title:"Thất bại",
            text: "Bạn không thể tham gia vào trận của chính mình",
            icon:"error",
          });
        }
        else{
          console.log("lmao:"+IdBill)
          console.log("lmao:"+idTk)
          console.log("lmao:"+idNgdat)
          ThamGiaGiaoHuu(idTk,IdBill);

          Swal.fire({
            title:"Thành công",
            text: "Bạn có thể xem thông tin trận tại lịch sử",
            icon: "success",
          });
          GetAllLichGiaoHuu();
        }
      }
    });
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

  const GetAllLichGiaoHuu = async () =>{
    let list = await getAllLichGiaoHuu()
    console.log(list)
    const allLichs = [];
  
    for (let i = 0; i < list.length; i++) {
      let hoaDon = list[i];
      let sanBong = await hoaDon.SanBong;
      let khungGio = await hoaDon.KhungGio;
      let nguoiDat = await hoaDon.TaiKhoan;
      let date = dateFormatter(await hoaDon.Ngay);
        
      const valueOfLich = {
        NgDat: nguoiDat.Ten,
        IdNgDat:nguoiDat.IdAccount,
        IdHD: hoaDon.IDHoaDon,
        LienHe: nguoiDat.SoDienThoai,
        CoSo: sanBong.TaiKhoan.Ten,
        DiaChi: sanBong.TaiKhoan.DiaChiCoSo,
        TenSan: sanBong.TenSan,
        Ngay: date,
        KhungGio: khungGio.ThoiGian
      };
      allLichs.push(valueOfLich);
    }
    setLichs(allLichs)
  }  

  const ThamGiaGiaoHuu = async (IdBill,IdTK) =>{
    await updateBillDoiThuByIdBill(IdBill,IdTK)
  }

  return (
    <div className="ThamGiaGiaoHU mb-[80px] mt-[120px]" >
      <div className="Topic">LỊCH GIAO HỮU</div>
      <div className="BNgLCh text-center p-3 h-[795px] bg-black"  >
        <div class="grid grid-cols-7 w-full bg-[#D4D4D4] rounded-[10px] pr-2">
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Tên</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">SĐT</div>
            <div class="col-span-2 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Địa điểm</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Mã sân</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Thời gian</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Xác nhận</div>
        </div>
        <div className="overflow-y-auto my-0 w-full pr-1">
    
          {getLichs.length > 0 ? getLichs.map((data,i)=>(
            <div key={i} className="mt-3 rounded-[10px] grid grid-cols-7 bg-[#379E13] w-[100%] text-center justify-center py-5 text-[#fff] text-[20px]" >
            <div className="col-span-1 px-5 flex flex-col justify-center">{data.NgDat}</div>
            <div className="hidden">{data.IdHD}</div>
            <div className="hidden">{data.IdNgDat}</div>
            <div class="col-span-1 px-5 flex flex-col justify-center">{data.LienHe}</div>
            <div class="col-span-2 px-5 flex flex-col justify-center">{data.CoSo}<br/>{data.DiaChi}</div>
            <div class="col-span-1 px-5 flex flex-col justify-center">{data.TenSan}</div>
            <div class="col-span-1 px-5 flex flex-col justify-center">{data.Ngay}<br/>{data.KhungGio}</div>
            <div className="relative">
              <button class="col-span-1 px-5 bg-[#FFEB37] rounded-[15px] w-[150px] h-[60px] justify-center text-[#000] my-3 font-bold" 
              onClick={() => conFirmClicked(data.IdHD,idUser,data.IdNgDat)}>Tham gia</button>
            </div>
            </div>  
          )): 
          (<div className="flex flex-col justify-center">Không có trận giao hữu nào</div>)}
         
          
        </div>

        
      </div>
  </div>
  )
};

export default LichGiaoHuu;