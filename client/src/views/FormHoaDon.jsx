import React from 'react'

const FormHoaDon = () => {
  return (
    <div className='w-[25%] bg-[#DDFCD2] h-[auto] mx-auto my-[10%] rounded-[5]'>
        <div className='grid grid-cols-2 p-5'>
            <div className="col-span-1 font-[650]">Nguyễn Xuân Lộc</div>
            <div className="col-span-1 font-[650]">SĐT: 01234567890</div>
        </div>
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 ">Khung giờ đặt:</div>
            <div className="col-span-1 ">Ngày đặt:</div>
        </div>
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 font-[650]">17:00 - 19:00</div>
            <div className="col-span-1 font-[650]">T7 31/10/2023</div>
        </div>
        <div className='p-5'>
            <div className=''>Địa điểm:</div>
            <div className='font-[650]'>Sân Huy Hoàng</div>
            <div className=''>32 Nguyễn xuân khoát, Bình Hưng Hòa, Bình Tân</div>
            <div className=''>SĐT sân: 1234567890 </div>
        </div>
        
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 ">Mã sân</div>
            <div className="col-span-1 ">Loại sân</div>
        </div>
        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 font-[650]">Sân số 01</div>
            <div className="col-span-1 font-[650]">Cỏ nhân tạo</div>
        </div>
        <div className='p-5'>
            <div className=''>Khác:</div>
            <div className='font-[650]'>Cho phép tham gia giao hữu</div>
        </div>
       

        <div className='grid grid-cols-2 px-5'>
            <div className="col-span-1 font-[650]">Tạm tính:</div>
            <div className="col-span-1 font-[650]">90.000 VNĐ</div>
        </div>

        <div className='w-[90%] flex flex-auto justify-around p-10 mx-auto '>
            <button class=" bg-[#D9D9D9] rounded-[5px] w-[150px] h-[50px] justify-center text-[#000]" >Hủy</button>
            <button class=" bg-[#379E13] rounded-[5px] w-[150px] h-[50px] justify-center text-[#fff]" >Tiếp tục</button>
        </div>
        
        
    </div>
  )
}

export default FormHoaDon