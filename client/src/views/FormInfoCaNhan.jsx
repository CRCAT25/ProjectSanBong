import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faImage} from "@fortawesome/free-solid-svg-icons"
import {
    getPersonalInfoByIdTK
}from "../controllers/CQuanLyTaiKhoan.js"

const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px",
        color: "#B3E15B",
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}




const FormInfoCaNhan = () => {
  return (
    <div className='w-[80%] mx-auto bg-[#379E13] border-[2px] border-[#379E13] h-[500px] rounded-[10px] my-[5%]'>
        <div className='mx-auto w-auto font-[600] text-[36px] text-center text-white p-10'>THÔNG TIN CÁ NHÂN</div>
        <div className='grid grid-cols-9 mx-5 '>
            <div className='col-span-2 h-[230px] rounded-[10px] m-5 bg-white text-center flex flex-col justify-center'>
                <Icon24px classIcon={faImage}/>
            </div>
            <div className='col-span-3 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h-[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5  flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Họ tên:</div>
                            <input className='w-[70%] h-[50px] bg-[#D9D9D9] rounded-[5px]' type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Email:</div>
                            <input className='w-[70%] h-[50px] bg-[#D9D9D9] rounded-[5px]' type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Năm sinh:</div>
                            <input className='w-[70%] h-[50px] bg-[#D9D9D9] rounded-[5px]' type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Ngân hàng:</div>
                            <input className='w-[70%] h-[50px] bg-[#D9D9D9] rounded-[5px]' type="text" />
                        </div>
                    </div>
                </div>
            </div> 
            <div className='col-span-4 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 ml-0 flex justify-between '>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto text-white'>SĐT:</div>
                            <input className='w-[80%] h-[50px] bg-[#D9D9D9] rounded-[5px] my-auto' type="text" />
                        </div>
                    </div>
                    
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between'>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto text-white'>Địa chỉ:</div>
                            <input className='w-[39%] mr-[0.5%] h-[50px] bg-[#D9D9D9] rounded-[5px] pl-2 ' placeholder='Địa chỉ/Đường' type="text" />
                            <input className='w-[40%] ml-[0.5%] h-[50px] bg-[#D9D9D9] rounded-[5px] pl-2 'placeholder='Quận/Huyện' type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between'>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto'></div>
                            <input className='w-[39%] mr-[0.5%] h-[50px] bg-[#D9D9D9] rounded-[5px] pl-2 'placeholder='Phường/Xã' type="text" />
                            <input className='w-[40%] ml-[0.5%] h-[50px] bg-[#D9D9D9] rounded-[5px] pl-2 'placeholder='Tỉnh/Thành' type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between'>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto text-white'>Số tài khoản:</div>
                            <input className='w-[80%] h-[50px] bg-[#D9D9D9] rounded-[5px]' type="text" />
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        <div className='pr-[40px] mt-5 float-right flex justify-center'>
            <div className='flex flex-col justify-center text-[#04294E] font-underline font-[600] w-[150px] h-[50px]'>Đổi mật khẩu</div>
            <button class="bg-[#D9D9D9] rounded-[5px] font-[600] w-[150px] h-[50px] justify-center">CẬP NHẬT</button>
        </div>
              
    </div>
  )
}

export default FormInfoCaNhan