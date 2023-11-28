import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAddressBook
} from "@fortawesome/free-solid-svg-icons"
import {VietQR} from 'vietqr';
import axios from 'axios';

// const host = 'https://api.vietqr.io/v2/banks';

const Icon24px = ({classIcon}) => {
    const iconSize = {
        width: "24px",
        height: "24px"
    };
    return(
        <span><FontAwesomeIcon icon={classIcon} style = {iconSize}/></span>
    )
}

const FormHoanTien = ({isDatCoc, tenKH, tongTien, HuyDatCoc, DatCoc}) => {
    let kq = [];
    const [selectedNganHang, setSelectedNganHang] = useState("")
    const [inputSTK, setInputSTK] = useState("")
    function getNganHang () {
        const nganHang = async () => {
            let vietQR = new VietQR({
                clientID: '7d8635e1-1751-455a-bacb-5b23ff254943',
                apiKey: '54c2ad4f-9485-445e-b9e0-5593699ab26b',
            });
            // list banks are supported create QR code by Vietqr
            await vietQR.getBanks().then((banks)=>{
                let row = ' <option disable value="">Chọn ngân hàng</option>';
                banks.data.forEach(nghg => {
                    row += `<option value="${nghg.code}">${nghg.code} - ${nghg.shortName}</option>`
                });
                
                document.querySelector("#idBank").innerHTML = row
            }).catch((err)=>{});
        }
        nganHang();
        // alert(kq)
    }
    useEffect(()=>{
        getNganHang();
    },[])
  return (
    <div className='w-[40%] mx-auto left-1/2 -translate-x-1/2 h-auto p-[30px] absolute bg-[#DDFCD2] my-[10%] z-1200'>
        {isDatCoc === true ? (<div className='text-center text-[30px] font-[600] text-[#2B790F]'>ĐẶT CỌC</div>) : (<div className='text-center text-[30px] font-[600] text-[#2B790F]'>HOÀN TIỀN</div>)}
        
        <div className='w-90% mx-[5%] flex justify-center'>
            {isDatCoc == true ? (
                <div className='w-[100%] h-[50px] my-[5px] mr-[5px] pl-[15px] rounded-[5px] flex flex-col justify-center bg-white'>Tên KH: {tenKH}</div>
            ) : (
                <div>
                    <input className='w-[90%] h-[50px] my-[5px] mr-[5px] pl-[15px] rounded-[5px]' value={tenKH} disabled></input>
                    <div className='w-[10%] ml-[5px] h-[50px] my-[5px] rounded-[5px] text-center flex flex-col justify-center bg-white' >
                    <Icon24px classIcon={faAddressBook}/>
                    </div>
                </div>
                
            )}
        </div>
        <select id='idBank' className='w-[90%] mx-[5%] h-[50px] my-[5px] rounded-[5px]' onChange={(e) =>{setSelectedNganHang(e.target.value)}}>
        </select>   
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Số Tài Khoản' onChange={e => setInputSTK(e.target.value)}></input>
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Tên Tài Khoản'></input>
        {isDatCoc == true ? (
            <div className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]  flex flex-col justify-center bg-white'>Số tiền: {tongTien}</div>
        ) : (
            <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' value={tongTien} disabled></input>
        )}
        
        {isDatCoc === true ? "" : (<textarea className='w-[90%] mx-[5%] my-[5px] pl-[15px] rounded-[5px] py-[10px]' name="" id="" rows="3"placeholder='Nội Dung:'></textarea>)}
        <div className='w-[90%] flex flex-auto justify-around mx-auto'>
            {isDatCoc === true ? (
            <div> <button class=" bg-[#D9D9D9] rounded-[5px] w-[150px] h-[50px] justify-center text-[#000] " onClick={HuyDatCoc}>Hủy</button>
            <button class=" bg-[#379E13] rounded-[5px] w-[150px] h-[50px] justify-center text-[#fff] " onClick={() => DatCoc(selectedNganHang, inputSTK, tongTien)}>Xác nhận</button>
            </div>) : ""}
            
        </div>
        
    
    </div>
  )
}

export default FormHoanTien