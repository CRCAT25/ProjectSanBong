import React from 'react'
import { OrderField } from './OrderField'
const FormHoaDon = ({TenKH, SDTKH, KhungGio, NgayDat, TenSan, DiaDiem, SDTSan, MaSan, LoaiSan, GiaoHuu, TongTien, HienThiXacNhanDatSan, DatSan}) => {
  return (
    <div className='w-[25%] bg-slate-200 h-[auto] left-1/2 -translate-x-1/2 my-[10%] rounded-[5] absolute z-1005'>
        <div className='grid grid-cols-2 p-5'>
            <div className="col-span-1 font-[650]">Tên KH: {TenKH}</div>
            <div className="col-span-1 font-[650]">SĐT: {SDTKH}</div>
        </div>
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 ">Khung giờ đặt:</div>
            <div className="col-span-1 ">Ngày đặt:</div>
        </div>
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 font-[650]">{KhungGio}</div>
            <div className="col-span-1 font-[650]">{NgayDat}</div>
        </div>
        <div className='p-5'>
            <div className=''>Địa điểm:</div>
            <div className='font-[650]'>{TenSan}</div>
            <div className=''>{DiaDiem}</div>
            <div className=''>SĐT sân: {SDTSan} </div>
        </div>
        
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 ">Mã sân</div>
            <div className="col-span-1 ">Loại sân</div>
        </div>
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 font-[650]">{MaSan}</div>
            <div className="col-span-1 font-[650]">{LoaiSan}</div>
        </div>
        <div className='p-5'>
            <div className=''>Khác:</div>
            <div className='font-[650]'>{GiaoHuu}</div>
        </div>
       

        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 font-[650]">Tạm tính:</div>
            <div className="col-span-1 font-[650]">{TongTien}</div>
        </div>

        <div className='w-[90%] flex flex-auto justify-around p-10 mx-auto '>
            <button class=" bg-[#D9D9D9] rounded-[5px] w-[150px] h-[50px] justify-center text-[#000]" onClick={HienThiXacNhanDatSan}>Hủy</button>
            <button class=" bg-[#379E13] rounded-[5px] w-[150px] h-[50px] justify-center text-[#fff]" onclick={DatSan}>Tiếp tục</button>
        </div>
        
        
    </div>
  )
}

export default FormHoaDon