import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAddressBook
} from "@fortawesome/free-solid-svg-icons"
import {VietQR} from 'vietqr';
import axios from 'axios';
import {
    GetBillById
}from "../controllers/CQuanLyLich.js"

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

    const [kqapinh, setkqapinh] = useState([]);
    const [selectedNganHang, setSelectedNganHang] = useState("")
    const [inputSTK, setInputSTK] = useState("")
    const [getCusBank, setCusBank] = useState("")

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


const [seconds, setSeconds] = useState(300);
const [isActive, setIsActive] = useState(true);

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

    useEffect(() => {
        let interval;

        if(isDatCoc){
            if (isActive) {
                interval = setInterval(() => {
                setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
                }, 1000);
            }
    }
    
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
      // Reload the page when the timer reaches zero
      window.location.reload();
    }
  }, [seconds]);
  useEffect(() => {
    getBillByID(15)
  }, []);

  let idCoSo = localStorage.getItem("userID")

  const getBillByID = async(idBill)=>{
    let list = await GetBillById(idBill)
    let khachHang = await list.TaiKhoan
    let sanBong = await list.SanBong
    let khungGio = await list.KhungGio
    let tienHoan = await list.TongTien
    
    setCusBank(khachHang.STK)
    console.log("aaaa"+getCusBank)
    document.getElementById("idBank").value=getCusBank
    // console.log(list)
    console.log(khachHang)
    // console.log(sanBong)
    // console.log(khungGio)
    // console.log(tienHoan)
    
  }
  
  return (
    <div className='w-[40%] left-1/2 -translate-x-1/2 h-auto p-[30px] relative bg-[#DDFCD2] my-[10%] z-1200'>
        {isDatCoc == true ? (
        <div>
        <div className='text-center text-[30px] font-[600] text-[#2B790F] mb-10'>ĐẶT CỌC</div>
        <div className='text-[20px] font-[600] absolute top-5 right-8 text-[#FF0000] '>{formatTime(seconds)}</div>
        </div>
        ) : (
        <div className='text-center text-[30px] font-[600] text-[#2B790F]'>HOÀN TIỀN</div>)}
        <div className='w-90% mx-[5%] flex justify-center'>
            {isDatCoc == true ? (
                <div className='w-[100%] h-[50px] my-[5px] mr-[5px] pl-[15px] rounded-[5px] flex flex-col justify-center bg-white'>Tên KH: {tenKH}</div>
            ) : (
                <div class='w-[100%] flex flex-row justify-center'>
                    {/* <input className=' w-[90%] h-[50px] my-[5px] mr-[5px] pl-[15px] rounded-[5px]' value={tenKH} ></input>
                    <div className=' w-[10%] h-[50px] my-[5px] rounded-[5px] text-center flex flex-col justify-center bg-white' onClick={getCustomerFromHDByIdCoSo(idCoSo)}>
                    <Icon24px classIcon={faAddressBook} />
                    </div> */}
                </div>
            )}
        </div>
        <select id='idBank' className='w-[90%] mx-[5%] h-[50px] my-[5px] rounded-[5px]' 
            onChange={(e) =>{setSelectedNganHang(e.target.value)}}>
        </select>   
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Số Tài Khoản' onChange={e => setInputSTK(e.target.value)}></input>
        <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' placeholder='Tên Tài Khoản'></input>
        {isDatCoc == true ? (
            <div className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]  flex flex-col justify-center bg-white'>Số tiền: {tongTien}</div>
        ) : (
            <input className='w-[90%] mx-[5%] h-[50px] my-[5px] pl-[15px] rounded-[5px]' value={tongTien} ></input>
        )}
        
        {isDatCoc === true ? "" : (<textarea className='w-[90%] mx-[5%] my-[5px] pl-[15px] rounded-[5px] py-[10px]' name="" id="" rows="3"placeholder='Nội Dung:'></textarea>)}
        <div className='w-[90%] flex flex-auto justify-around mx-auto'>
            {isDatCoc === true ? (
            <div> 
            <button class=" bg-[#D9D9D9] rounded-[5px] w-[150px] h-[50px] justify-center text-[#000] " onClick={() => {HuyDatCoc(); setIsActive(false)}}>Hủy</button>
            <button class=" bg-[#379E13] rounded-[5px] w-[150px] h-[50px] justify-center text-[#fff] " onClick={() => {DatCoc(selectedNganHang, inputSTK, tongTien);
            setIsActive(false)}}>Xác nhận</button>
            <div> <b>Lưu ý:</b> Bạn phải thực hiện đặt cọc trong vòng 5 phút nếu không hệ thống sẽ huỷ mọi thao tác vừa rồi của bạn !</div>
            </div>) : ""}
            
        </div>
        
    
    </div>
  )
}

export default FormHoanTien