import React from 'react'

const FormSignUp = () => {

    return (
        <div className='bg-white rounded-[10px] px-[70px] pt-[40px] pb-[50px] relative'>
            <div className='text-[40px] font-[400] text-center mb-[51px]'>Đăng ký</div>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14' placeholder='Họ và tên'></input>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Email'></input>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Nhập lại Email'></input>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Mật khẩu'></input>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Nhập lại mật khẩu'></input>
            <input className='bg-[#E9E9E9] h-[60px] rounded-[150px] w-full pl-14 mt-3' placeholder='Số điện thoại'></input>
            <button className='buttonLogin text-[22px] rounded-[150px] w-full h-[60px] mt-[51px] '>Đăng ký</button>
        </div>
    )
}

export default FormSignUp