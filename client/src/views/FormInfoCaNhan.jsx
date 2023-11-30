import React, { useCallback, useState, useEffect, useRef } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faImage} from "@fortawesome/free-solid-svg-icons"
import {
    getTKCoSoByIdTK,
    getTKUserByIdTK,
    updateTkByIdTK
}from "../controllers/CTaiKhoan.js"
import axios from "axios";
import Swal from 'sweetalert2'
import { VietQR } from 'vietqr';

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
  const [effectActive, setEffectActive] = useState(true);
  const [countapi, setCountapi] = useState(0);
  const [getTen,setTen] = useState("")
  const [getEmail,setEmail] = useState("")
  const [getSDT,setSDT] = useState("")
  const [getDiaChi,setDiaChi] = useState("")
  const [getNganHang,setNganHang] = useState("")
  const [getSTK,setSTK] = useState("")
  const [getAnh,setAnh] = useState("")
  const [kqapinh, setkqapinh] = useState([]);
  const [selectedQuan, setSelectedQuan] = useState("");
  const [selectedPhuong, setSelectedPhuong] = useState("");


  const idUser= localStorage.getItem("userID")
  const role = localStorage.getItem("userRole")

  const host = 'https://provinces.open-api.vn/api/';
  let stringdiachi = "";

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
        // alert(countapi)

        if(countapi>3)
        {
          // setapiquan('')
          // setapiphuong('')
          // setduong('')
          setSelectedQuan("a")
          setSelectedPhuong("a")

          document.getElementById("duong").value=''
        } 
        setapiquan(sortQuan);
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const fetchPhuong = (idquan) => {
    const phuongAPI = `${host}d/${idquan}?depth=2`;
    return axios.get(phuongAPI)
      .then((response) => {
        const sortPhuong = response.data.wards.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        if(countapi>3)
        {

          // setapiphuong('')
          // document.getElementById("duong").value=''
        }
        setapiphuong(sortPhuong);
      })
      .catch((error) => {
        console.error('Error', error);
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
  const handleProvinceChangeQuan = (event) => {
    const selectedquan = event.target.value;
    if (selectedquan) {
      fetchPhuong(selectedquan);
      for(let i=0;i<apiquan.length;i++){
        if(selectedquan == apiquan[i].code){
          setSelectedQuan(apiquan[i].code)
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
          setSelectedPhuong(apiphuong[i].code)
          setphuong(apiphuong[i].name)
        }
      }
    }
  };
  const renderOptions = (dataArray) => {
    if(dataArray!==''){
      return dataArray.map((item, i) => (
        <option key={i} value={item.code} id={item.code+"-"+item.name} 
        className="">{item.name}</option>
      ));
    }
  };
  function getBank() {
    const nganHang = async () => {
      let vietQR = new VietQR({
        clientID: '7d8635e1-1751-455a-bacb-5b23ff254943',
        apiKey: '54c2ad4f-9485-445e-b9e0-5593699ab26b',
      });

      await vietQR.getBanks().then((banks) => {
        const sortedBanks = banks.data.sort((a, b) => {
          return a.shortName.localeCompare(b.shortName);
        });
        setkqapinh(sortedBanks);
      }).catch((err) => {
        console.error('Error fetching banks:', err);
      });
    };

    nganHang();
  }

  // useEffect(() => {
  //   console.log(stringdiachi+" a")

  // }, [tinh, quan, phuong, duong]);

  useEffect(() => {
    if (countapi <= 3 ) {
      // console.log('a')
      // console.log(countapi)
      setCountapi(countapi +1)
      GetPersonalInfoByIdTK(idUser);
      getBank()
      // console.log(getDiaChi+" b")
      stringdiachi=getDiaChi
      
    }
  }, [apitinh, apiquan, apiphuong]);

  const UpdateEffectActive = () => {
    setEffectActive(false);  
  };

  useEffect(()=>{
      GetPersonalInfoByIdTK(idUser)
  },[])
  const GetPersonalInfoByIdTK= async(idTK)=>{
    if(role == 1)
    {
      let list = await getTKUserByIdTK(idTK);
      // console.log(list)
      setTen(list.Ten)
      setEmail(list.Email)
      setSDT(list.SoDienThoai)
      setDiaChi(list.DiaChiCoSo)
      setNganHang(list.NganHang)
      setSTK(list.STK)
      setAnh(list.Anh)
      document.getElementById("anh").src = `./assets/${getAnh}`
      document.getElementById("hoTen").value=getTen
      document.getElementById("email").value=getEmail
      document.getElementById("sdt").value=getSDT
    }
    else
    {
      let list = await getTKCoSoByIdTK(idTK);
      
      setTen(list.Ten)
      setEmail(list.Email)
      setSDT(list.SoDienThoai)
      setDiaChi(list.DiaChiCoSo)
      setNganHang(list.NganHang)
      setSTK(list.STK)
      setAnh(list.Anh)
      let location = getDiaChi.split(', ');
      document.getElementById("anh").src = `./assets/${getAnh}`
      document.getElementById("hoTen").value=getTen
      document.getElementById("email").value=getEmail
      document.getElementById("sdt").value=getSDT
      document.getElementById("bank").value=getNganHang
      document.getElementById("stk").value=getSTK
      
      for(let i=0;i<apitinh.length;i++){
        if(location[3] == apitinh[i].name){
          // console.log(apitinh[i].code +" a")
          const selectTinh = document.getElementById("tinh")
          // console.log(location[3])
          selectTinh.value=apitinh[i].code
          settinh(apitinh[i].name)
          fetchQuan(apitinh[i].code)
        }
      }
      
      for(let i=0;i<apiquan.length;i++){
        // console.log("a"+ apitinh[i].code)
        if(location[2] == apiquan[i].name){
          const selectQuan = document.getElementById("quan")
          // console.log(location[2])
          // console.log(apiquan[i].name)
          selectQuan.value=apiquan[i].code
          setSelectedQuan(apiquan[i].code)
          setquan(apiquan[i].name)
          fetchPhuong(apiquan[i].code)
        }
      }
      
      for(let i=0;i<apiphuong.length;i++){
        // console.log("a"+ apitinh[i].code)
        if(location[1] == apiphuong[i].name){
          const selectPhuong = document.getElementById("phuong")
          // console.log(location[1])
          // console.log(apiphuong[i].name)
          selectPhuong.value=apiphuong[i].code
          setSelectedPhuong(apiphuong[i].code)
          setphuong(apiphuong[i].name)
        }
      }
      // setduong(location[0])
      // const selectDuong = document.getElementById("duong")
      // selectDuong.value="aaa"
      // alert(location[0])
      // alert(duong+ " duong")
      setduong(location[0])
      document.getElementById("duong").value = duong;


    }
  }   

  const updateInfoCaNhanByID=async(idTK,role)=>
  {
    Swal.fire({
      title: "Bạn có muốn cập nhật lại thông tin của mình ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText:"Kiểm tra lại"
      
    }).then(async (result) => {
      if (result.isConfirmed) {
        if(role==2)
        {
          // setduong(document.getElementById("duong").value)
          // console.log("asdsad "+duong) 
          if(checkInfo() && checkLocation() && checkNganHang()){
            stringdiachi= duong+", "+phuong+", "+quan+", "+tinh

             // console.log(idTK)
            console.log(getTen)
            console.log(getEmail)
            console.log(getSDT)
            console.log(stringdiachi+" string")
            console.log(getDiaChi+" getDC")

            console.log(getNganHang)   
            console.log(getSTK)
            console.log(getAnh)
            await updateTkByIdTK(getTen,getEmail,getSDT,stringdiachi,getNganHang,getSTK,getAnh,idTK)
            Swal.fire({
              title: "Cập nhật thông tin thành công",
              icon: "success"
            })
            await GetPersonalInfoByIdTK(idTK)
          }
        }
        else{
            if(checkInfo())
            {
            console.log(getTen)
            console.log(getEmail)
            console.log(getSDT)
            console.log(stringdiachi)
            console.log(getNganHang)   
            console.log(getSTK)
            console.log(getAnh)
            await updateTkByIdTK(getTen,getEmail,getSDT,stringdiachi,getNganHang,getSTK,getAnh,idTK)
            Swal.fire({
              title: "Cập nhật thông tin thành công",
              icon: "success"
            })
            await GetPersonalInfoByIdTK(idTK)
            }
        }
      }
    });
    
  }
  const checkLocation=()=>
  {
    console.log(tinh+" "+ quan+" "+ phuong+" "+duong+" check")
    if(tinh=="" || quan=="" || phuong==""||duong=="")
    {
      Swal.fire({
        title: "Vui lòng kiểm tra lại địa chỉ !",
        icon: "error"
      })
      return false;
    }
    else{
      return true
    }
   
  }
  const checkInfo=()=>
  {
    if(getTen=="" || getSDT.length < 10 || getEmail=="")
    {
      Swal.fire({
        title: "Vui lòng kiểm tra lại thông tin cá nhân ! ",
        icon: "error"
      })
      return false;
    }
    else{
      return true
    }
  }
  const checkNganHang=()=>
  {
    if(getNganHang=="" || getSTK.length < 10)
    {
      Swal.fire({
        title: "Vui lòng kiểm tra lại thông tin ngân hàng ! ",
        icon: "error"
      })
      return false;
    }
    else{
      return true
    }
  }
   
  return (
    <div className='w-[80%] mx-auto bg-[#379E13] border-[2px] border-[#379E13] h-[500px] rounded-[10px] my-[5%]'>
        <div className='mx-auto w-auto font-[600] text-[36px] text-center text-white p-10'>THÔNG TIN CÁ NHÂN</div>
        <div className='grid grid-cols-11 mx-5 '>
            <img id ='anh' className='col-span-2 h-[250px] w-[250px] rounded-[10px] m-5 bg-white text-center flex flex-col justify-center'
            alt="" />
              {/* <Icon24px classIcon={faImage}/> */}
            
            <div className='col-span-4 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h-[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5  flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Tên:</div>
                            <input id='hoTen' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]' 
                            onChange={e=>setTen(e.target.value)} placeholder="" type="text" />
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>SĐT:</div>
                            <input id='sdt' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] my-auto'
                            onChange={e=>setSDT(e.target.value)} type="number-moz-appearance: textfield" />
                          </div>
                    </div>
                    {role == 1 ? (<></>) : (<>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>Ngân hàng:</div>
                            <select class='w-[70%] h-[50px] pl-[10px] font-[600] 
                             text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]' type="text" id="bank" 
                             onChange={e => setNganHang(e.target.value)} >
                              <option disable value="">Chọn ngân hàng</option>
                              {kqapinh.map((nh, i) => (
                                <React.Fragment key={i}>
                                  <option value={nh.shortName}>{nh.shortName}</option>
                                </React.Fragment>
                              ))}
                            </select>
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 flex justify-between'>
                            <div className='w-[30%] text-[19px] h-[auto] my-auto text-white'>STK:</div>
                            <input id='stk' className='w-[70%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]'
                            onChange={e=>setSTK(e.target.value)} type="number-moz-appearance: textfield"  />
                        </div>
                    </div></>)}
                </div>
            </div> 
            <div className='col-span-5 h-[auto] w-[100%] my-[auto]'>
                <div className='grid grid-rows-2 w-[100%] h[50%]'>
                    <div className='row-span-1 h-[auto] my-[5px]'>
                        <div className='mx-5 ml-0 flex justify-between '>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto text-white'>Email:</div>
                            <input id='email' className='w-[85%] h-[50px] pl-[10px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px]'  
                            onChange={e=>setEmail(e.target.value)} type="text" />
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
                            onChange={handleProvinceChangeQuan} value={selectedQuan}>
                                <option value="a" selected>Chọn quận huyện</option>
                                {renderOptions(apiquan)}
                            </select>       
                        </div>
                    </div>
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-center'>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto bg-white'></div>
                            <select type="text" id ="phuong"
                                className="w-[42%] mr-[0.5%] h-[50px] font-[600] text-[black] text-[19px] bg-[#D9D9D9] rounded-[5px] pl-2 " 
                                onChange={handleProvinceChangePhuong} value={selectedPhuong}>
                                <option value="a" >Chọn phường xã</option>
                                {renderOptions(apiphuong)}
                            </select>
                        <input id='duong' 
                            className='w-[42%] ml-[0.5%] h-[50px] font-[600] text-[black] text-[19px] text-center bg-[#D9D9D9] rounded-[5px] pl-2 ' 
                            onChange={e=>setduong(e.target.value)} type="text" />
                        </div>
                    </div>
                    </> )}             
                    
                    <div className='row-span-1 h-[auto] my-[5px] '>
                        <div className='mx-5 ml-0 flex justify-between font-[600]'>
                            <div className='w-[15%] text-[19px] h-[auto] my-auto'></div>
                            <button class=" w-[42%] mr-[0.5%] h-[50px] text-[15px] text-[#FFFFFF] bg-[#6BA6FF] font-[600] rounded-[5px] "
                            onClick={()=>{}}>Đổi mật khẩu</button>
                            <button class=" w-[42%] ml-[0.5%] h-[50px] text-[15px] text-[#FFFFFF] bg-[#6BA6FF] font-[600] rounded-[5px] "
                            onClick={()=>{updateInfoCaNhanByID(idUser,role)}}>CẬP NHẬT</button>
                        </div>
                    </div>
                    
                </div>
            </div>  
        </div>
      
              
    </div>
  )
}


export default FormInfoCaNhan