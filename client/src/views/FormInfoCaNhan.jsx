import React, { useCallback, useState, useEffect, useRef } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faImage} from "@fortawesome/free-solid-svg-icons"
import {
    getTKCoSoByIdTK,
    getTKUserByIdTK,
    updateTkByIdTK
}from "../controllers/CTaiKhoan.js"
import axios from "axios";

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

    const [apitinh, setapitinh] = useState([]);
    const [apiquan, setapiquan] = useState([]);
    const [apiphuong, setapiphuong] = useState([]);
    const [tinh, settinh] = useState('');
    const [quan, setquan] = useState('');
    const [phuong, setphuong] = useState('');
    const [duong, setduong] = useState('');
    let stringdiachi = "";
    const [effectActive, setEffectActive] = useState(true);
    const [countapi, setCountapi] = useState(0);



    const host = 'https://provinces.open-api.vn/api/';

  useEffect(() => {
    callAPI('https://provinces.open-api.vn/api/?depth=2');
  }, []);

  const callAPI = (api) => {
    return axios.get(api)
      .then((response) => {
        const sorttinh = response.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setapitinh(sorttinh);
      })
      .catch((error) => {
        console.error('Error fetching province data:', error);
      });
  };

  const fetchQuan = (idtinh) => {
    const quanAPI = `${host}p/${idtinh}?depth=2`;
    return axios.get(quanAPI)
      .then((response) => {
        const sortQuan = response.data.districts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setapiquan(sortQuan);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleProvinceChangeTinh = (event) => {
    const selectedtinh = event.target.value;
    if (selectedtinh) {
      fetchQuan(selectedtinh);
      UpdateEffectActive();
      // console.log(apitinh.length)
      // console.log(selectedtinh)
      for(let i=0;i<apitinh.length;i++){
        // console.log("a"+ apitinh[i].code)
        if(selectedtinh == apitinh[i].code){
          settinh(apitinh[i].name)
        }
      }
    } else {
      setapiquan([]);
    }
  };
  const fetchPhuong = (idquan) => {
    const phuongAPI = `${host}d/${idquan}?depth=2`;
    return axios.get(phuongAPI)
      .then((response) => {
        const sortPhuong = response.data.wards.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setapiphuong(sortPhuong);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleProvinceChangeQuan = (event) => {
    const selectedquan = event.target.value;
    if (selectedquan) {
      fetchPhuong(selectedquan);
      for(let i=0;i<apiquan.length;i++){
        if(selectedquan == apiquan[i].code){
          setquan(apiquan[i].name)
        }
      }
    } else {
      setapiphuong([]);
    }
  };

  const handleProvinceChangePhuong = (event) => {
    const selectedphuong = event.target.value;
    if (selectedphuong) {
      for(let i=0;i<apiphuong.length;i++){
        if(selectedphuong == apiphuong[i].code){
          setphuong(apiphuong[i].name)
        }
      }
    }
  };
  const renderOptions = (dataArray) => {
    return dataArray.map((item, i) => (
      <option key={i} value={item.code} id={item.code+"-"+item.name} 
      className="">{item.name}</option>
    ));
  };

  useEffect(() => {
    if (countapi <= 3 ) {
      console.log('a')
      console.log(countapi)
      setCountapi(countapi +1)
      GetPersonalInfoByIdTK(idUser);
    }
  }, [apitinh, apiquan, apiphuong]);

  const UpdateEffectActive = () => {
    setEffectActive(false);  
  };


    
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
            let location = list.DiaChiCoSo.split(', ');
            document.getElementById("hoTen").value=list.Ten
            document.getElementById("email").value=list.Email
            document.getElementById("bank").value=list.NganHang
            document.getElementById("stk").value=list.STK
            document.getElementById("sdt").value=list.SoDienThoai

            for(let i=0;i<apitinh.length;i++){
              if(location[3] == apitinh[i].name){
                console.log(apitinh[i].code +" a")
                const selectTinh = document.getElementById("tinh")
                console.log(location[3])
                selectTinh.value=apitinh[i].code
                fetchQuan(apitinh[i].code)
              }
            }
            
            for(let i=0;i<apiquan.length;i++){
              // console.log("a"+ apitinh[i].code)
              if(location[2] == apiquan[i].name){
                const selectQuan = document.getElementById("quan")
                console.log(location[2])
                console.log(apiquan[i].name)
                selectQuan.value=apiquan[i].code
                fetchPhuong(apiquan[i].code)
              }
            }
            
            for(let i=0;i<apiphuong.length;i++){
              // console.log("a"+ apitinh[i].code)
              if(location[1] == apiphuong[i].name){
                const selectPhuong = document.getElementById("phuong")
                console.log(location[1])
                console.log(apiphuong[i].name)
                selectPhuong.value=apiphuong[i].code
              }
            }
          
            document.getElementById("duong").value = location[0];

        }
    }   
    const updateInfoCaNhanByID=(idTK)=>
    {
      
    } 
   
  return (
    <div className='w-[80%] mx-auto bg-[#379E13] border-[2px] border-[#379E13] h-[500px] rounded-[10px] my-[5%]'>
        <div className='mx-auto w-auto font-[600] text-[36px] text-center text-white p-10'>THÔNG TIN CÁ NHÂN</div>
        <div className='grid grid-cols-11 mx-5 '>
            <div className='col-span-2 h-[230px] rounded-[10px] m-5 bg-white text-center flex flex-col justify-center'>
                <Icon24px classIcon={faImage}/>
            </div>
            <div className='col-span-4 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h-[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5  flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Tên:</div>
                            <input id='hoTen' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]' placeholder="" type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>SĐT:</div>
                            <input id='sdt' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] my-auto'placeholder="" type="number" />
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
            <div className='col-span-5 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 ml-0 flex justify-between '>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto text-white'>Email:</div>
                            <input id='email' className='w-[85%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]'  placeholder="" type="text" />
                        </div>
                    </div>  
                    {role == 1 ? (<></>) : (<>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between'>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto text-white'>Địa chỉ:</div>
                            {/* <div className='w-[42%] mr-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 hidden'></div> */}
                            <select type="text" id ="tinh"
                            class=" w-[42%] mr-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2" 
                            onChange={handleProvinceChangeTinh}>
                            <option value="" >Chọn tỉnh thành</option>
                                {renderOptions(apitinh)}
                            </select>
                            <select type="text" id ="quan"
                            className=" w-[42%] ml-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2  "  
                            onChange={handleProvinceChangeQuan}>
                                <option value="" selected>Chọn quận huyện</option>
                                {renderOptions(apiquan)}
                            </select>       
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-center'>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto bg-white'></div>
                            <select type="text" id ="phuong"
                                className="w-[42%] mr-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 " 
                                onChange={handleProvinceChangePhuong}>
                                <option value="" >Chọn phường xã</option>
                                {renderOptions(apiphuong)}
                            </select>
                        <input id='duong' 
                            className='w-[42%] ml-[0.5%] h-[50px] font-[600] text-[black] text-[19px] text-center bg-[#D9D9D9] rounded-[5px] pl-2 ' 
                            placeholder='' type="text" />
                        </div>
                    </div>
                    </> )}             
                    
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between font-[600]'>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto'></div>
                            <button class=" w-[42%] mr-[0.5%] h-[50px] text-[15px] text-[#FFFFFF] bg-[#6BA6FF] font-[600] rounded-[5px] "
                            onClick={()=>{}}>Đổi mật khẩu</button>
                            <button class=" w-[42%] ml-[0.5%] h-[50px] text-[15px] text-[#FFFFFF] bg-[#6BA6FF] font-[600] rounded-[5px] "
                            onClick={()=>{}}>CẬP NHẬT</button>
                        </div>
                    </div>
                    
                </div>
            </div>  
        </div>
      
              
    </div>
  )
}

export default FormInfoCaNhan