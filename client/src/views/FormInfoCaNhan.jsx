import React, { useEffect } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faImage} from "@fortawesome/free-solid-svg-icons"
import {
    getTKCoSoByIdTK,
    getTKUserByIdTK
}from "../controllers/CTaiKhoan.js"

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
    
    const idUser= localStorage.getItem("userID")
    const role = localStorage.getItem("userRole")
    useEffect(()=>{
        GetPersonalInfoByIdTK(idUser)
    },[]) 
    const GetPersonalInfoByIdTK= async(idTK)=>{
        if(role == 1)
        {
            let list = await getTKUserByIdTK(idTK);
            console.log(list)
            document.getElementById("hoTen").value=list.Ten
            document.getElementById("email").value=list.Email
            document.getElementById("sdt").value=list.SoDienThoai
        }
        else
        {
            let list = await getTKCoSoByIdTK(idTK);
            console.log(list)
            document.getElementById("hoTen").value=list.Ten
            document.getElementById("email").value=list.Email
            document.getElementById("bank").value=list.NganHang
            document.getElementById("stk").value=list.STK
            document.getElementById("sdt").value=list.SoDienThoai
            
            let location = list.DiaChiCoSo.split(',')
            console.log(location)
            document.getElementById("duong").value=location[0]
            document.getElementById("quan").value=location[1]
            document.getElementById("phuong").value=location[2]
            document.getElementById("tinh").value=location[3]
        }
    }        
    
  return (
    <div className='w-[80%] mx-auto bg-[#379E13] border-[2px] border-[#379E13] h-[500px] rounded-[10px] my-[5%]'>
        <div className='mx-auto w-auto font-[600] text-[36px] text-center text-white p-10'>THÔNG TIN CÁ NHÂN</div>
        <div className='grid grid-cols-10 mx-5 '>
            <div className='col-span-2 h-[230px] rounded-[10px] m-5 bg-white text-center flex flex-col justify-center'>
                <Icon24px classIcon={faImage}/>
            </div>
            <div className='col-span-4 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h-[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5  flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Tên người dùng:</div>
                            <input id='hoTen' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]' placeholder="" type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Email:</div>
                            <input id='email' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]'  placeholder="" type="text" />
                        </div>
                    </div>
                    {role == 1 ? (<></>) : (<>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Ngân hàng:</div>
                            <input id='bank' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]' placeholder="" type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>STK:</div>
                            <input id='stk' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]'placeholder="" type="text" />
                        </div>
                    </div></>)}
                </div>
            </div> 
            <div className='col-span-4 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 ml-0 flex justify-between '>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto text-white'>SĐT:</div>
                            <input id='sdt' className='w-[80%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] my-auto'placeholder="" type="text" />
                        </div>
                    </div>  
                    {role == 1 ? (<></>) : (<>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between'>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto text-white'>Địa chỉ:</div>
                            <input id='duong' className='w-[39%] mr-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 ' placeholder='Địa chỉ/Đường' type="text" />
                            <input id='quan' className='w-[40%] ml-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 'placeholder='Quận/Huyện' type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between'>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto'></div>
                            <input id='phuong' className='w-[39%] mr-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 'placeholder='Phường/Xã' type="text" />
                            <input id='tinh' className='w-[40%] ml-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 'placeholder='Tỉnh/Thành' type="text" />
                        </div>
                    </div></> )}             
                    
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between font-[600]'>
                            <div className='w-[20%] text-[19px] h-[auto] my-auto'></div>
                            <button class=" w-[39%] mr-[0.5%] h-[50px] bg-[#F00000] rounded-[5px] ">Đổi mật khẩu</button>
                            <button class=" w-[40%] ml-[0.5%] h-[50px] bg-[#F00000] rounded-[5px] ">CẬP NHẬT</button>
                        </div>
                    </div>
                    
                </div>
            </div>  
        </div>
      
              
    </div>
  )
}

export default FormInfoCaNhan