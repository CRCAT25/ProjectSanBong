import React, { useRef } from 'react'
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
  const lichholder = useRef()
  const getPersonalBillByIdTK = async(idTK) =>{
    let list = await GetPersonalBillByIdTK(idTK)
    setGotPersonalInfo(true)
    setPersonalLich(list)
    // loadLich(list)
}
  const loadLich = async (list)=>{
    let as="";
    for(const data of list){
      let sanBong = await data.SanBong
      as+=`
      <div className='w-[auto] bg-[#9BCE89] h-[115px] py-[10px] m-[15px] my-[5px] rounded-[15px] grid grid-cols-7 '>
      <img src="" alt="" className='w-[90px] h-[90px] col-span-1 ml-[10px] ' />
        <div className='col-span-1 grid grid-row-2 p-[10px]'>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Cơ sở sân:</div>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Mã sân:</div>
        </div>
        <div className='col-span-1 grid grid-row-2 p-[10px]'>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${sanBong.TenSan}</div>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
        </div>
        <div className='col-span-1 grid grid-row-2 p-[10px]'>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Ngày - giờ đặt:</div>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Trạng thái:</div>
        </div>
        <div className='col-span-1 grid grid-row-2 p-[10px]'>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
        </div>
        <div className='col-span-1 grid grid-row-2 p-[10px]'>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Đối thủ đăng ký:</div>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>\</div>
        </div>
        <div className='col-span-1 grid grid-row-2 p-[10px]'>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
          <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
        </div>
        
      </div>`
    }
    // list.forEach (async data => {   
      
      
      // }) 
      
      console.log(as)
      lichholder.current.innerHTML = as;
      // document.getElementById("lich").innerHTML
          
          
  }

  return (
    <div className='w-[80%] mx-auto bg-[#FFF] border-[3px] border-[#379E13] pb-[3%] rounded-[10px]'>
      <div className='font-[600] text-[36px] text-center h-[50px] py-[5%] text-[#379E13]'>LỊCH SỬ CÁ NHÂN</div>
      <div className='flex flex-row my-[2%] mx-auto w-[90%]'>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]'> Sân đã đặt</div>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] mx-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]'> Trận giao hữu</div>
        <div className='w-[200px] text-center h-[60px] p-[15px] text-[20px] font-[600] rounded-[10px] bg-[#D9D9D9]'> Đã hoàn thành</div>
      </div>
      <div ref={lichholder} id= 'lich'className='bg-[#D9D9D9] w-[90%] h-[620px] mx-auto py-[15px] rounded-[15px] flex flex-col align-middle overflow-y-visible overflow-x-hidden overflow-scroll'> 
        {gotPersonalInfo === true ? async ()=> {               
          getPersonalLich.map(async (data, i) => {
            let sanbong = await data.SanBong
            console.log(sanbong)
          })
            // if(sanBong){
              
            
            //   <div className='w-[auto] bg-[#9BCE89] h-[115px] py-[10px] m-[15px] my-[5px] rounded-[15px] grid grid-cols-7 '>
            //   <img src="" alt="" className='w-[90px] h-[90px] col-span-1 ml-[10px] ' />
            //     <div className='col-span-1 grid grid-row-2 p-[10px]'>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Cơ sở sân:</div>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Mã sân:</div>
            //     </div>
            //     <div className='col-span-1 grid grid-row-2 p-[10px]'>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>${sanBong.TenSan}</div>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
            //     </div>
            //     <div className='col-span-1 grid grid-row-2 p-[10px]'>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Ngày - giờ đặt:</div>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Trạng thái:</div>
            //     </div>
            //     <div className='col-span-1 grid grid-row-2 p-[10px]'>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
            //     </div>
            //     <div className='col-span-1 grid grid-row-2 p-[10px]'>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Đối thủ đăng ký:</div>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>\</div>
            //     </div>
            //     <div className='col-span-1 grid grid-row-2 p-[10px]'>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
            //       <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
            //     </div>
                
            //   </div>
            // }
          }: ""}
        {/* {getPersonalLich.length > 0 ? getPersonalLich.map(data=>{
           <div className='w-[auto] bg-[#9BCE89] h-[115px] py-[10px] m-[15px] my-[5px] rounded-[15px] grid grid-cols-7 '>
           <img src="" alt="" className='w-[90px] h-[90px] col-span-1 ml-[10px] ' />
             <div className='col-span-1 grid grid-row-2 p-[10px]'>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Cơ sở sân:</div>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Mã sân:</div>
             </div>
             <div className='col-span-1 grid grid-row-2 p-[10px]'>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>{data.SanBong.TaiKhoan}</div>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>{data.SanBong.TenSan}</div>
             </div>
             <div className='col-span-1 grid grid-row-2 p-[10px]'>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Ngày - giờ đặt:</div>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Trạng thái:</div>
             </div>
             <div className='col-span-1 grid grid-row-2 p-[10px]'>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>{data.Ngay}-{data.KhungGio}</div>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>{data.TrangThai}</div>
             </div>
             <div className='col-span-1 grid grid-row-2 p-[10px]'>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>Đối thủ đăng ký:</div>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'>{data.DoiThu.Ten}</div>
             </div>
             <div className='col-span-1 grid grid-row-2 p-[10px]'>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
               <div className='col-span-1 font-[600] text-[20px] h-[auto] my-auto'></div>
             </div>
             
          </div> 
        }):
        (<div className="flex flex-col justify-center">Không có trận giao hữu nào</div>)} */}
        
      </div>
      
    </div>
  )
}

export default FormLichSu