import "../css/FieldManager.css";
import axios from "axios";
import FormHoanTien from './FormHoanTien';
import { 
  FontAwesomeIcon 
} from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import React, {
  useState,
   useEffect, 
  } from "react";

import { 
  getCostByShiftnTypeField, 
  getLoaiSanByIdField, 
  getAllLoaiSan, 
  insertHoaDon,
  getHoaDonByNgayKHIDSan,
  getAllSanByTaiKhoan,
  getAllHoaDonCompletedByCoSo,
  getHoaDonsByNgayKGTKTTSanIDSan,
  insertSan,
  updateHoaDon,
  onRefundHD,
  updateSanByID,
  getSanByID,
  getLoaiSanByID,
  getAnhsByIDSan,
  deleteSanByID,
  getAllKhungGio,
  getAllBillCompleteByCoso
} from "../controllers/CQuanLySan";
import Swal from 'sweetalert2'
import { 
  GetBillById
} from "../controllers/CQuanLyLich";
import Chart from "chart.js/auto";
import {searchHoaDonByDateCoso } from "../controllers/CQuanLySan";
import { faMagnifyingGlass,faXmark, faCheck,faClipboardCheck, faPiggyBank } from "@fortawesome/free-solid-svg-icons"




const generateDaysArray = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
};

const FieldManage =  () => {
  useEffect(() => {
    GetLoaiSans()
    // GetAllBillByTaiKhoan()
    // GetBillForRefund()
    document.getElementsByClassName("ngayLS")[0].value = getCurrentDate()
    handleDateChange()
    loadListFields()
    // updateSchedule();
  }, []);
  
  const [tongTienText, setTongTienText] = useState(null);
  const [showHoaDon, setShowHoaDon] = useState(false)
  let idTK = localStorage.getItem("userID")
  const Swal = require('sweetalert2')
  const [getLoaiSans, setLoaiSans] = useState([]);
  let IDLichSan = null
  const [getIDLichSan, setIDLichSan] = useState(null);
  let IDSan = null
  const [getIDSan, setIDSan] = useState(null);
  const [getBillForRefund, setBillForRefund] = useState([]);
  const [listBill, setlistBill] = useState([]);


  const ShowHD = async()=>{
    if(showHoaDon==true)
    {
      setShowHoaDon(false)
      document.body.style.overflow = 'visible'
    }
    else 
    {
      setShowHoaDon(true)
      document.body.style.overflow = 'hidden'
    }

  }
  const HuyLichSan = async()=>{
    Swal.fire({
      title: "Bạn có chắc muốn hoàn tiền?",
      showDenyButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Không`
    }).then(async (result) => {
      if (result.isConfirmed) {
        var hd = await GetBillById(getIDLichSan)
        onRefundHD(await (await hd.SanBong).IdSan,await hd.IDHoaDon,  "1", "Refunded")
        Swal.fire({
          title: "Hoàn tiền thành công!"
        }).then((result) => {
          if (result.isConfirmed) {
            ShowHD()
            resetLichSan()
          }
        });
      }
    });
  }
  const ThoatHuyLichSan = async()=>{
    ShowHD()
  }
  //     const HuyDatCoc = async () => {
//     await HuyDatSan(newHoaDonID)
//     HienThiDatCoc()
//     }

//     const DatCocV = async (NganHang, STK, SoTien) => {

//         let validTTBank = CheckTTBank(NganHang, STK, SoTien)
//         if (validTTBank == true) {
//             DatCoc(newHoaDonID)
//             HienThiThongBaoDatCocTC()
//         } else {
//             HienThiThongBaoLoiTT(validTTBank)
//         }

//     }
//   const CheckTTBank = (NganHang, STK, SoTien) => {
//     if (NganHang != "" && STK != "" && SoTien != "") {
//         if(NganHang == ""){
//             return ("Vui lòng chọn ngân hàng !")
//         }
//         if (STK.length < 10) {
//             return ("Số tài khoản phải đủ 10 ký tự !")
//         }
//         return true
//     }
//     else {
//         return ("Vui lòng nhập đầy đủ thông tin ngân hàng !")
//     }
// }

// const HienThiThongBaoDatCocTC = () => {
//     Swal.fire({
//         title: "Đặt cọc thành công!",
//         icon: "success"
//     });
//     setTimeout(() => {
//         Swal.close();
//         window.location.reload()
//     }, 1000);
// }

// const HienThiThongBaoLoiTT = (message) => {
//     Swal.fire({
//         title: message,
//         icon: "error"
//     });
//     setTimeout(() => {
//         Swal.close();
//     }, 1000);
// }
  const displayLoaiSanPrice = async () =>{
    if(document.getElementsByClassName("selectLoaiS")[0].value == "none"){
      document.getElementsByClassName("auto-group-6ywm-4sd")[0].innerHTML = "Đơn giá"
    }else{
      document.getElementsByClassName("auto-group-6ywm-4sd")[0].innerHTML = (await getLoaiSanByID(document.getElementsByClassName("selectLoaiS")[0].value)).GiaTien
    }
  }
  async function updateSchedule() {
    document.getElementById("Wa1D1TazzFCfTx5RoHkPmu").innerHTML = ""
    var listSan = await getAllSanByTaiKhoan(idTK);
    var listCa = await getAllKhungGio();
    var date = document.getElementsByClassName("ngayLS")[0].value
    var currentHour = (new Date()).getHours();
    var currentDate = (new Date()).toISOString().slice(0, 10);
    console.log(listSan)
    for (let j = 0; j < listSan.length; j++) {
      var san = listSan[j];
      let htmlString = "";
      for (let i = 0; i < listCa.length; i++) {
        var ca = listCa[i];
        var listHD = await getHoaDonsByNgayKGTKTTSanIDSan(date, ca.IdKhungGio, idTK, san.IdSan);
        if(date > currentDate){
          if (listHD.length > 0) {
            if (listHD[listHD.length - 1].TrangThai == "Completed" || listHD[listHD.length - 1].TrangThai == "Pending") {
              htmlString += `<div class="shift shift-Busy-Future shift-clickable" id="hd:${listHD[listHD.length - 1].IDHoaDon}"></div>`;
            }else {
              htmlString += `<div class="shift shift-Empty-Future shift-clickable" id="san:${san.IdSan}-ca:${ca.IdKhungGio}"></div>`;
            }
          } else {
            htmlString += `<div class="shift shift-Empty-Future shift-clickable" id="san:${san.IdSan}-ca:${ca.IdKhungGio}"></div>`;
          }
        }else{
          if (ca.ThoiGian.split("-")[0].split(":")[0] > currentHour) {
            //future
            if (listHD.length > 0) {
              if (listHD[listHD.length - 1].TrangThai == "Completed" || listHD[listHD.length - 1].TrangThai == "Pending") {
                htmlString += `<div class="shift shift-Busy-Future shift-clickable" id="hd:${listHD[listHD.length - 1].IDHoaDon}"></div>`;
              }else {
                htmlString += `<div class="shift shift-Empty-Future shift-clickable" id="san:${san.IdSan}-ca:${ca.IdKhungGio}"></div>`;
              }
            } else {
                htmlString += `<div class="shift shift-Empty-Future shift-clickable" id="san:${san.IdSan}-ca:${ca.IdKhungGio}"></div>`;
            }
          } else {
              //pass
              if (listHD.length > 0) {
                if (listHD[listHD.length - 1].TrangThai == "Completed" || listHD[listHD.length - 1].TrangThai == "Pending") {
                  htmlString += `<div class="shift shift-Busy-Pass shift-clickable" id="${listHD[listHD.length - 1].IDHoaDon}"></div>`;
                }else {
                  htmlString += `<div class="shift shift-Empty-Pass"></div>`;
                }
              } else {
                  htmlString += `<div class="shift shift-Empty-Pass"></div>`;
              }
          }
        }
        if (listCa.length - 1 == i) {
            htmlString += `<hr class="line" />`;
        }
      }
      document.getElementById("Wa1D1TazzFCfTx5RoHkPmu").innerHTML += `
      <div class="rowSan">
          <div class="tenSanLS">
              <div>${san.TenSan}</div>
          </div>
          <div class="schedule">${htmlString}</div>
      </div>`;
      if(listSan.length - 1 == j){
        for (let index = 0; index < document.getElementsByClassName("shift-clickable").length; index++) {
          document.getElementsByClassName("shift-clickable")[index].addEventListener("click",()=>{
            selectSchedule(document.getElementsByClassName("shift-clickable")[index])
          })
          
        }
      }
    }
  }
const  selectSchedule = async(element) =>{
  IDLichSan = null
  setIDLichSan(null)
  document.getElementsByClassName("tenKhach")[0].innerHTML = "Tên khách"
  document.getElementsByClassName("soDT")[0].innerHTML = "Số điện thoại"
  document.getElementById("257:945").scrollIntoView({ behavior: 'smooth' });
  if(element.classList.contains("shift-Busy-Pass") || element.classList.contains("shift-Busy-Future")){
    IDLichSan = (element.id).split(":")[1]
    setIDLichSan((element.id).split(":")[1])
    var hoadon = await GetBillById(IDLichSan)
    console.log(hoadon)
    document.getElementsByClassName("tenKhach")[0].innerHTML = await(await hoadon.TaiKhoan).Ten
    document.getElementsByClassName("soDT")[0].innerHTML = await(await hoadon.TaiKhoan).SoDienThoai
    console.log(await(await hoadon.KhungGio).IdKhungGio)
    document.getElementsByClassName("selectKhungGio")[0].value = await(await hoadon.KhungGio).IdKhungGio
    document.getElementsByClassName("selectTenLS")[0].value = await(await hoadon.SanBong).IdSan
    document.getElementsByClassName("selectGH")[0].value = await hoadon.GiaoHuu
  }else if(element.classList.contains("shift-Empty-Future")){
    document.getElementsByClassName("selectKhungGio")[0].value = ((element.id).split("-")[1].split(":")[1])
    document.getElementsByClassName("selectTenLS")[0].value = ((element.id).split("-")[0].split(":")[1])
  }
  setLoaiSanLS()
}
function resetLichSan(){
  handleDateChange()
    document.getElementsByClassName("selectGH")[0].value = 0
}
const insertLichSan = async () =>{
  var date = document.getElementsByClassName("ngayLS")[0].value
  var idKhungGio = document.getElementsByClassName("selectKhungGio")[0].value
  var idSan = document.getElementsByClassName("selectTenLS")[0].value
  var giaoHuu = document.getElementsByClassName("selectGH")[0].value
  var tongTien = (document.getElementsByClassName("tongTien")[0].innerHTML).substring(0,(document.getElementsByClassName("tongTien")[0].innerHTML).length - 3)
  if(idKhungGio != "none"){
    if(idSan != "none"){
      if((await getHoaDonByNgayKHIDSan(date,idKhungGio,idSan)).length == 0){
        Swal.fire({
          title: "Bạn có chắc muốn thêm?",
          showDenyButton: true,
          confirmButtonText: "Có",
          denyButtonText: `Không`
        }).then((result) => {
          if (result.isConfirmed) {
            insertHoaDon(idTK,idSan,idKhungGio,date,giaoHuu,tongTien)
    
            Swal.fire({
              title: "Thêm thành công!"
            }).then((result) => {
              if (result.isConfirmed) {
                resetLichSan()
              }
            });
          }
        });
      }else{
        Swal.fire({
          title: "Sân đã được đặt trước!"
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById("257:945").scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }else{
      Swal.fire({
        title: "Chọn sân!"
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementsByClassName("selectTenLS")[0].scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }else{
    Swal.fire({
      title: "Chọn khung giờ!"
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementsByClassName("selectKhungGio")[0].scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
}
const updateLichSan = async() => {
  var date = document.getElementsByClassName("ngayLS")[0].value
  var idKhungGio = document.getElementsByClassName("selectKhungGio")[0].value
  var idSan = document.getElementsByClassName("selectTenLS")[0].value
  var giaoHuu = document.getElementsByClassName("selectGH")[0].value
  var tongTien = (document.getElementsByClassName("tongTien")[0].innerHTML).substring(0,(document.getElementsByClassName("tongTien")[0].innerHTML).length - 3)
  if(idKhungGio != "none"){
    if(idSan != "none"){
      if(getIDLichSan != null){
        Swal.fire({
          title: "Bạn có chắc muốn cập nhật?",
          showDenyButton: true,
          confirmButtonText: "Cập nhật",
          denyButtonText: `Không`
        }).then((result) => {
          if (result.isConfirmed) {
            // console.log(idSan,idKhungGio,date,giaoHuu,tongTien,getIDLichSan)
            updateHoaDon(idSan,idKhungGio,date,giaoHuu,tongTien,getIDLichSan)
            Swal.fire({
              title: "Cập nhật thành công!"
            }).then((result) => {
              if (result.isConfirmed) {
                resetLichSan()
              }
            });
          }
        });
      }else{
        Swal.fire({
          title: "Yêu cầu chọn hoá đơn màu cam!"
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById("257:945").scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }else{
      Swal.fire({
        title: "Chọn sân!"
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementsByClassName("selectTenLS")[0].scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }else{
    Swal.fire({
      title: "Chọn khung giờ!"
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementsByClassName("selectKhungGio")[0].scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
}
 function deleteSanMainBTN() {
  if(getIDSan){
    deleteSan(getIDSan)
  }else{
    Swal.fire({
      title: "Yêu cầu chọn sân muốn xoá!",
      confirmButtonText: "OK",
    });
  }
 }
  function InsertSan(){
    let tenSan = document.getElementsByClassName("auto-group-1jl7-TBh")[0].value
    let loaiSan = document.getElementsByClassName("selectLoaiS")[0].value
    let files = document.getElementById("inputAnh").files
    let tenAnhs = []
    let anhs = []
    let addible = false
    if(tenSan.length > 0){
      if(loaiSan !== "none"){
        if(files.length > 0){
          const currentDate = new Date();
    
            // Format date as YYYY-MM-DD
            const formattedDate = currentDate.toISOString().slice(0, 10);
            
            // Format time as HH-mm-ss
            const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, '-');
          for(let i = 0; i < files.length; i++){
            if(i == 2){break}
            
            tenAnhs.push(`${formattedDate}_${formattedTime}_${files[i].name}`)
            anhs.push(files[i])
          }
          addible = true
        }else{
          Swal.fire({
            title: "Yêu cầu chọn ít nhất 1 ảnh.",
            confirmButtonText: "OK",
          });
        }
      }else{
        Swal.fire({
          title: "Yêu cầu chọn loại sân.",
          confirmButtonText: "OK",
        });
      }
    }else{
      Swal.fire({
        title: "Yêu cầu nhập tên sân.",
        confirmButtonText: "OK",
      });
    }
    if(addible){
      insertSan(idTK, loaiSan, tenSan, tenAnhs)
      uploadAnh(anhs)
      
  }
  }
  function uploadAnh(anhs){
    const formData = new FormData();
      for (let i = 0; i < anhs.length; i++) {
        formData.append('files', anhs[i]);
      }
      axios.post('http://localhost:8081/upload', formData)
      .then(response => {
        console.log('Files uploaded successfully:', response.data);
      })
      .catch(error => {
        console.error('Error uploading files:', error);
      });
  }
  function chooseImage(){
    document.getElementById("inputAnh").click()
  }
  const readURL = async () => {
    let files = await document.getElementById("inputAnh").files;
    if (files.length > 0) {
      document.getElementsByClassName("auto-group-bp27-YwD")[0].innerHTML = ``
      if(files.length > 2){
        Swal.fire({
          title: "Tối đa 2 hình.",
          confirmButtonText: "OK",
        });
      }
      for(let i = 0; i < files.length; i++){
        if(i == 2){
          break
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementsByClassName("auto-group-bp27-YwD")[0].innerHTML += `
                <img
              className="imgSanInput"
              src=${e.target.result}
            />`;
        };
        reader.readAsDataURL(files[i]);
      }
    }else{
      document.getElementsByClassName("auto-group-bp27-YwD")[0].innerHTML = `<i class="fa fa-image fa-2x"  id = "iconImg"></i>`
    }
  }
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; 
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  }
  const changeDate = (daysToAdd) =>{
    var currentDate = new Date(document.getElementsByClassName("ngayLS")[0].value);
    var minDate = new Date(document.getElementsByClassName("ngayLS")[0].min);
    currentDate.setDate(currentDate.getDate() + daysToAdd)
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var newDate = new Date(`${year}-${month}-${day}`)
    if(daysToAdd < 0 && newDate < minDate){
      Swal.fire({
        title: "Đã đạt ngày hiện tại.",
        confirmButtonText: "OK",
      });
    }else{
      document.getElementsByClassName("ngayLS")[0].value = `${year}-${month}-${day}`;
      handleDateChange()
    }
  }
  const handleDateChange = async () =>{
    
    document.getElementsByClassName("thng-10-WTm")[0].innerHTML = document.getElementsByClassName("ngayLS")[0].value.split("-")[1]+" / "+ document.getElementsByClassName("ngayLS")[0].value.split("-")[0]
    document.getElementsByClassName("item-4-cfD")[0].innerHTML = document.getElementsByClassName("ngayLS")[0].value.split("-")[2]
    setSelectKGByNgay()
    setSelectSanByNgayKG()
    updateSchedule()
  };


  const setSelectKGByNgay = async () =>{
    const slect =  document.getElementsByClassName("selectKhungGio")[0];
    while (slect.hasChildNodes()) {
      slect.removeChild(slect.firstChild);
    }
    slect.innerHTML = `<option value="none">--Khung giờ--</option>`
    ;(await getAllKhungGio()).map((khunggio, i)=>{
      slect.innerHTML += `<option value="${khunggio.IdKhungGio}" >${khunggio.ThoiGian}</option>`
    })
  }
  
  const GetLoaiSans = async () =>{
    setLoaiSans(await getAllLoaiSan())
  }

 
  const setSelectSanByNgayKG = async () =>{
    const slect =  document.getElementsByClassName("selectTenLS")[0];
    while (slect.hasChildNodes()) {
      slect.removeChild(slect.firstChild);
    }
    slect.innerHTML = `<option value="none">--Sân--</option>`
      ;(await getAllSanByTaiKhoan(idTK)).map(san=>{
          slect.innerHTML += `<option value="${san.IdSan}" >${san.TenSan}</option>`
      })
    setLoaiSanLS()
  }
  const setLoaiSanLS = async () =>{
    if(document.getElementsByClassName("selectTenLS")[0].value  != "none"){
      document.getElementsByClassName("loaiSanLS")[0].innerHTML = 
        (await getLoaiSanByIdField(document.getElementsByClassName("selectTenLS")[0].value)).TenLoaiSan
      document.getElementsByClassName("loaiSanLS")[0].value = 
        (await getLoaiSanByIdField(document.getElementsByClassName("selectTenLS")[0].value)).IdLoaiSan
      document.getElementsByClassName("tongTien")[0].innerHTML = 
        await getCostByShiftnTypeField(await document.getElementsByClassName("selectKhungGio")[0].value, 
                                        await document.getElementsByClassName("loaiSanLS")[0].value) +"VND"
    }else{
      document.getElementsByClassName("loaiSanLS")[0].innerHTML = "------"
      document.getElementsByClassName("loaiSanLS")[0].value = null
      document.getElementsByClassName("tongTien")[0].innerHTML = "0.000 VND"
    }
  }
  function selectSan(element){
    if(IDSan == (element.parentElement.parentElement.id).substring(4,(element.parentElement.parentElement.id).length)){
      document.getElementById("san-"+IDSan).style.background = "white"
    } else{
      if(IDSan){
        document.getElementById("san-"+IDSan).style.background = "white"
      } 
      setIDSan((element.parentElement.parentElement.id).substring(4,(element.parentElement.parentElement.id).length));
      IDSan = (element.parentElement.parentElement.id).substring(4,(element.parentElement.parentElement.id).length);

      document.getElementById("Wa15ekgLDPSUrvQVNo1jL7").value = element.parentElement.parentElement.children[0].children[0].children[0].innerHTML
      document.getElementsByClassName("selectLoaiS")[0].value = element.parentElement.parentElement.children[0].children[1].children[0].id
      document.getElementsByClassName("auto-group-6ywm-4sd")[0].innerHTML = element.parentElement.parentElement.children[0].children[2].children[0].innerHTML
      element.parentElement.parentElement.style.background = "lightCyan"
      document.getElementsByClassName("auto-group-bp27-YwD")[0].innerHTML =""
      for(let i = 0; i < element.parentElement.parentElement.children[1].children.length; i++){
        document.getElementsByClassName("auto-group-bp27-YwD")[0].innerHTML += `
                <img
              className="imgSanInput"
              src="${element.parentElement.parentElement.children[1].children[i].src}"
            />`;
      }
      document.getElementById('257:798').scrollIntoView({ behavior: 'smooth' });
    }
  }
  const updateSan = async () => {
    if(getIDSan){
      let san = await getSanByID(getIDSan)
      let tenSan = document.getElementsByClassName("auto-group-1jl7-TBh")[0].value
      let loaiSan = document.getElementsByClassName("selectLoaiS")[0].value
      let files = document.getElementById("inputAnh").files
      let tenAnhs = []
      let anhs = []
      let perGranted = false
      let newTenSan = san.TenSan
      let newLoaiSan = san.LoaiSan.IdLoaiSan
      if(tenSan.length > 0){
        if(loaiSan !== "none"){
          perGranted = true
        }else{
          Swal.fire({
            title: "Yêu cầu chọn loại sân.",
            confirmButtonText: "OK",
          });
        }
      }else{
        Swal.fire({
          title: "Yêu cầu nhập tên sân.",
          confirmButtonText: "OK",
        });
      }

      if(perGranted){
        if(tenSan != san.TenSan){
          newTenSan = tenSan
        }
        if(loaiSan != san.LoaiSan.IdLoaiSan){
          newLoaiSan = loaiSan
        }
        if(files.length > 0){
          for(let i = 0; i < files.length; i++){
            if(i == 2){break}
            tenAnhs.push(files[i].name)
            anhs.push(files[i])
          }
        }
        Swal.fire({
          title: "Bạn có chắc muốn cập nhật?",
          showDenyButton: true,
          confirmButtonText: "Có",
          denyButtonText: `Không`
        }).then((result) => {
          if (result.isConfirmed) {
            if(getIDSan == IDSan){
              setIDSan(null)
              IDSan = null
            } 
            updateSanByID(newLoaiSan,san.TaiKhoan.IdAccount, newTenSan, san.IdSan, tenAnhs)
            if(tenAnhs.length > 0){
              uploadAnh(anhs)
            }
            Swal.fire({
              title: "Cập nhật thành công!"
            }).then((result) => {
              if (result.isConfirmed) {
                reloadSan()
              }
            });
          }
        });
      }
    }else{
      Swal.fire({
        title: "Yêu cầu chọn sân!",
        confirmButtonText: "OK",
      });
    }
  }
  function reloadSan() {
    document.getElementsByClassName("auto-group-1jl7-TBh")[0].value = null
    document.getElementsByClassName("selectLoaiS")[0].value = "none"
    var newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.id = 'inputAnh';
    newInput.name = 'files';
    newInput.accept ="image/*"
    newInput.style.opacity = 0;
    newInput.multiple = true;
    newInput.addEventListener("change",readURL)
    var oldInput = document.getElementById('inputAnh');
    oldInput.parentNode.replaceChild(newInput, oldInput);
    loadListFields()
  }
  function deleteSan(IDSan){
    Swal.fire({
      title: "Bạn có chắc muốn xoá?",
      showDenyButton: true,
      confirmButtonText: "Xoá",
      denyButtonText: `Không`
    }).then((result) => {
      if (result.isConfirmed) {
        if(getIDSan == IDSan){
          setIDSan(null)
          IDSan = null
        } 
        deleteSanByID(IDSan)

        Swal.fire({
          title: "Xoá thành công!"
        }).then((result) => {
          if (result.isConfirmed) {
            loadListFields()
            
          }
        });
      }
    });
  }
  const loadListFields = async () =>{
    document.getElementsByClassName("scrollContainerSan")[0].innerHTML = ""
    let aList = await getAllSanByTaiKhoan(idTK);
    if(aList.length > 0){
      aList.map(async (san, i) => {
        let anhs = await getAnhsByIDSan(san.IdSan)
        if(anhs.length == 1){
          document.getElementsByClassName("scrollContainerSan")[0].innerHTML +=  `<div class="sn-XTh" id="san-${san.IdSan}">
          <div class="auto-group-lo8w-E7D" id="Wa17AdKabWVfpUgCKqLo8w">
            <div class="tn-sn-input-J75" id="257:849">
              <div class="tenSan" >${san.TenSan}</div>
            </div>
            <div class="tn-sn-input-Mr3" id="257:852">
              <div class="loaiSan" id="${san.LoaiSan.IdLoaiSan}">${san.LoaiSan.TenLoaiSan}</div>
            </div>
            <div class="tn-sn-input-J91" id="257:855">
              <div class="donGia">${san.LoaiSan.GiaTien}</div>
            </div>
          </div>
          <div class="auto-group-fmjy-Uhh" id="Wa17XhYoPc9NvvqEtVfmjy">
          <img
            class="imgSan"
              src="http://localhost:3000/./assets/${anhs[0].Anh}"
              id="257:863"
            />
          </div>
          <div class="auto-group-vqh9-B1m" id="Wa17oh69siGSrCKt8xvQH9">
            <button class="btnDetailSan">
              <i class="fa fa-edit fa-2x"></i>
            </button>
            <button class="btnDeleteThisSan">
              <i class="fa fa-trash fa-2x"></i>
            </button>
          </div>
        </div>`
        } else if(anhs.length == 2){
          document.getElementsByClassName("scrollContainerSan")[0].innerHTML +=  `<div class="sn-XTh" id="san-${san.IdSan}">
        <div class="auto-group-lo8w-E7D" id="Wa17AdKabWVfpUgCKqLo8w">
          <div class="tn-sn-input-J75" id="257:849">
            <div class="tenSan" >${san.TenSan}</div>
          </div>
          <div class="tn-sn-input-Mr3" id="257:852">
            <div class="loaiSan" id="${san.LoaiSan.IdLoaiSan}">${san.LoaiSan.TenLoaiSan}</div>
          </div>
          <div class="tn-sn-input-J91" id="257:855">
            <div class="donGia">${san.LoaiSan.GiaTien}</div>
          </div>
        </div>
        <div class="auto-group-fmjy-Uhh" id="Wa17XhYoPc9NvvqEtVfmjy">
        <img
          class="imgSan"
            src="http://localhost:3000/./assets/${anhs[0].Anh}"
            id="257:863"
          />
          <img
          class="imgSan"
            src="http://localhost:3000/./assets/${anhs[1].Anh}"
            id="257:863"
          />
        </div>
        <div class="auto-group-vqh9-B1m" id="Wa17oh69siGSrCKt8xvQH9">
          <button class="btnDetailSan">
            <i class="fa fa-edit fa-2x"></i>
          </button>
          <button class="btnDeleteThisSan">
            <i class="fa fa-trash fa-2x"></i>
          </button>
        </div>
          </div>`
        }
        if(aList.length - 1 == i){
          setTimeout(() => {
            addEventItemSan()
          }, 20);
          
        }
      });
    }else{
      document.getElementsByClassName("scrollContainerSan")[0].innerHTML = "Không có sân."
    }
  }
  function addEventItemSan(){
      for (let index = 0; index < document.getElementsByClassName("btnDetailSan").length; index++) {
        document.getElementsByClassName("btnDetailSan")[index].addEventListener("click", ()=>{
          selectSan(document.getElementsByClassName("btnDetailSan")[index])});
        document.getElementsByClassName("btnDeleteThisSan")[index].addEventListener("click", ()=>{
          deleteSan((document.getElementsByClassName("btnDeleteThisSan")[index].parentElement.parentElement.id).substring(4,(document.getElementsByClassName("btnDeleteThisSan")[index].parentElement.parentElement.id).length))});
      }
  }
  const GetAllBillByTaiKhoan = async () =>{
    console.log(await getAllHoaDonCompletedByCoSo(1));
  }

  const GetBillForRefund = async () =>{
    console.log(await getBillForRefund(1));
  }

   //Doanh thu
   const [totalOrders, setTotalOrders] = useState(0);
   const [totalPriceAfter, setTotalPriceAfter] = useState(0);
   const [selectedMonth, setSelectedMonth] = useState("all");
   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() + "");
   const [selectedDay, setSelectedDay] = useState("all");
 
   const [chart, setchart] = useState([]);
   const [rerunchart, setrerunchart] = useState(true);
   const [searchhdbydate, setsearchhdbydate] = useState('');
 
 
 
 
   const [years, setYears] = useState([]);
 
   useEffect(() => {
     const currentYear = new Date().getFullYear();
     const yearsArray = Array.from({ length: 4 }, (_, index) => currentYear - index);
     setYears(yearsArray);
   }, []);
 
   const monthsArray = Array.from({ length: 12 }, (_, index) => index + 1);
   const daysArray = generateDaysArray(Number(selectedYear), Number(selectedMonth));
 
   const xValues = [
     "Tháng 1",
     "Tháng 2",
     "Tháng 3",
     "Tháng 4",
     "Tháng 5",
     "Tháng 6",
     "Tháng 7",
     "Tháng 8",
     "Tháng 9",
     "Tháng 10",
     "Tháng 11",
     "Tháng 12",
   ];
   const yValues = [];
   const barColors = [
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
     "#4FC3F7",
   ];
 
   const [chartData, setChartData] = useState({
     labels: xValues,
     datasets: [
       {
         backgroundColor: barColors,
         data: yValues,
       },
     ],
   });
 
   useEffect(() => {
     const ctx = document.getElementById("myChart");
     if (ctx) {
       const existingChart = Chart.getChart(ctx);
       if (existingChart) {
         existingChart.destroy();
       }
 
       new Chart(ctx, {
         type: "bar",
         data: chartData,
         options: {
           plugins: {
             legend: { display: false },
             title: {
               display: true,
             },
           },
         },
       });
     }
   }, [chartData]);
 
   useEffect(() => {
 
   }, []);
 
   const filterDataByYear = (data, year) => {
     if (year === "all") {
       return data;
     }
 
     return data.filter((item) => {
       const TimeInsertYear = new Date(item.Ngay).getFullYear();
       return TimeInsertYear.toString() === year;
     });
   };
 
   const filterDataByMonth = (data, month) => {
     if (month === "all") {
       return data;
     }
 
     return data.filter((item) => {
       const TimeInsertMonth = new Date(item.Ngay).getMonth() + 1;
       return TimeInsertMonth.toString() === month;
     });
   };
 
   const filterDataByDay = (data, day) => {
     if (day === "all") {
       return data;
     }
 
     return data.filter((item) => {
       const TimeInsertDay = new Date(item.Ngay).getDate();
       return TimeInsertDay.toString() === day;
     });
   };
 
   useEffect(() => {
     const filteredDataByYear = filterDataByYear(
       listBill,
       selectedYear
     );
     const filteredDataByMonth = filterDataByMonth(
       filteredDataByYear,
       selectedMonth
     );
     const filterdDataByDay = filterDataByDay(
       filteredDataByMonth,
       selectedDay
     );
 
     const yearlyRevenue = Array.from({ length: 12 }, () => 0);
 
     filteredDataByYear.forEach((order) => {
       const TimeInsertMonth = new Date(order.Ngay).getMonth();
       yearlyRevenue[TimeInsertMonth] += order.TongTien;
     });
 
     setTotalOrders(filterdDataByDay.length);
     setTotalPriceAfter(
       filterdDataByDay.reduce((acc, order) => acc + order.TongTien, 0)
     );
 
     if (rerunchart == true) {
       setChartData({
         labels: xValues,
         datasets: [
           {
             backgroundColor: barColors,
             data: yearlyRevenue,
           },
         ],
       });
       setTimeout(() => {
         setrerunchart(false)
       }, 600);
 
     }
     setlistBill(filterdDataByDay);
 
   }, [chart]);
 
 
   const dateFormatter = (date) => {
     let time = new Date(date)
     const formattedDate = time.toLocaleDateString("vi-VN", {
       day: "2-digit",
       month: "2-digit",
       year: "numeric",
     });
     return formattedDate
   }
 
   useEffect(() => {
     showAllBillComplete()
   }, [selectedDay, selectedMonth, selectedYear])
 

   const showAllBillComplete = async () => {
    const list = await getAllBillCompleteByCoso(idTK);

    const allBills = [];

    for (let i = 0; i < list.length; i++) {
      let hoaDon = list[i];
      let taikhoan = await hoaDon.TaiKhoan
      let sanBong = await hoaDon.SanBong;
      let khungGio = await hoaDon.KhungGio;
      let dateFM = dateFormatter(hoaDon.Ngay);
      let date = hoaDon.Ngay;

      const valueOfHoaDon = {
        IdHD: hoaDon.IDHoaDon,
        NgayFM: dateFM,
        Ngay: date,
        Ten: taikhoan.Ten,
        TenSan: sanBong.TenSan,
        Email: taikhoan.Email,
        Sdt: taikhoan.SoDienThoai,
        KhungGio: khungGio.ThoiGian,
        TongTien: hoaDon.TongTien,
        GiaoHuu: hoaDon.GiaoHuu
      };


      allBills.push(valueOfHoaDon);
    }
    setchart(allBills);
    setlistBill(allBills);

  };



  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const Iconpx = ({ classIcon, width, height, marginRight, marginLeft, color }) => {
    const iconSize = {
      width: width,
      height: height,
      color: color,
      marginRight: marginRight,
      marginLeft: marginLeft,

    };
    return (
      <span><FontAwesomeIcon icon={classIcon} style={iconSize} /></span>
    )
  }
  const SearchHoaDonByDateAdmin = async () => {
    if (selectedMonth !== "all" && selectedDay !== "all") {
      let stringdate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
        let result = await searchHoaDonByDateCoso( idTK, searchhdbydate, stringdate)
        if (result.length > 0) {
          const searchBill = [];

          for (let i = 0; i < result.length; i++) {
            let hoaDon = result[i];
            let taikhoan = await hoaDon.TaiKhoan
            let sanBong = await hoaDon.SanBong;
            let khungGio = await hoaDon.KhungGio;
            let dateFM = dateFormatter(hoaDon.Ngay);
            let date = hoaDon.Ngay;
      
            const valueOfHoaDon = {
              IdHD: hoaDon.IDHoaDon,
              NgayFM: dateFM,
              Ngay: date,
              Ten: taikhoan.Ten,
              TenSan: sanBong.TenSan,
              Email: taikhoan.Email,
              Sdt: taikhoan.SoDienThoai,
              KhungGio: khungGio.ThoiGian,
              TongTien: hoaDon.TongTien,
              GiaoHuu: hoaDon.GiaoHuu
            };
            searchBill.push(valueOfHoaDon);
          }
          setchart(searchBill);
          setlistBill(searchBill);
        }
        else {
          Swal.fire('Không có hóa đơn muốn tìm')
        }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Vui lòng chọn đủ ngày, tháng năm',
      });
    }
  }


   //Doanh thu

  return (
    
    <div className="landing-fAj" id="257:562">
      {showHoaDon === true ? 
          <div class="fixed inset-0 z-50 flex bg-gray-800 bg-opacity-50">
            <div class="rounded w-[100%]">
            <FormHoanTien isDatCoc={false} idHD = {getIDLichSan} 
                        tongTien={tongTienText} HuyDatCoc={ThoatHuyLichSan} DatCoc={HuyLichSan}/>
            </div>
          </div>:""}
      <div className="qun-l-sn-dgX" id="257:798">
        <p className="main-advertise-letter-fNK" id="257:861">
          QUẢN LÝ SÂN
        </p>
        <div className="group-289721-jNB" id="409:239">
          <div className="auto-group-9pu3-fmd" id="Wa15WRasqVvDXdss4P9pU3">
            <div className="nhp-tn-sn-zZ1" id="257:799">
              <div className="tn-sn--vxT" id="257:802">
                Tên sân:
              </div>
              <input
                className="auto-group-1jl7-TBh"
                id="Wa15ekgLDPSUrvQVNo1jL7"
                placeholder="Tên sân"
              ></input>
            </div>
            <div className="chn-loi-sn-Ji7" id="257:803">
              <div className="loi-sn--RXq" id="257:806">
                Loại sân:
              </div>
              <div className="auto-group-xrjf-hkF" id="Wa1675FotPrCMP7b6jXrJF">
                <select  className="selectLoaiS" onChange={()=>{displayLoaiSanPrice()}}>
                <option value="none">--Loại sân--</option>
                  {
                    getLoaiSans.map((loaiSan, i) => (
                      <option value={loaiSan.IdLoaiSan} >{loaiSan.TenLoaiSan}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="nhp-gi-bUF" id="257:811">
              <div className="n-gi--LRq" id="257:814">
                Đơn giá:
              </div>
              <div className="auto-group-6ywm-4sd" >Đơn giá</div>
            </div>
          </div>
          <div className="chn-nh-u7Z" id="257:808">
            <div className="nh--pEX" id="257:810">
              Ảnh:
            </div>
            <div className="auto-group-bp27-YwD" id="Wa16pPQJdzzne9yQzcbp27" onClick={()=>chooseImage()}>
            <i class="fa fa-image fa-2x" id = "iconImg"></i>
            </div>
            <input type="file" id ="inputAnh" name="files" accept="image/*" style={{opacity: 0}} multiple onChange={readURL}/>
          </div>
          <div className="auto-group-hhjs-nKm" id="Wa16MefrYhWfBdYBexHhJs">
            <button className="btnThemSan" id="257:815" onClick={InsertSan}>
              Thêm
            </button>
            <button className="btnCapNhatSan" id="257:818" onClick={updateSan}>
              Cập nhật
            </button>
            <button className="btXoaSan" id="257:821" onClick={deleteSanMainBTN}>
              Xóa
            </button>
          </div>
        </div>
        <div className="danh-sch-sn-H3Z" id="257:824">
          Danh sách sân
        </div>
        <div className="scrollContainerSan">
          
        </div>
      </div>
      <hr className="divideLine"/>
      <div className="auto-group-hdgw-1Js" id="Wa1AzrGdhotxoxgfMXhdgw">
        <p className="main-advertise-letter-XHD" id="257:945">
          QUẢN LÝ LỊCH SÂN
        </p>
        <p className="thng-tin-khch-hng-RtP" id="257:894">
          Thông tin khách hàng
        </p>
        <div className="auto-group-jx7d-jPH" id="Wa19Bjd7ahVU2wjvJrjx7d">
          <div className="nhp-tn-sn-p9q" id="257:870">
            <div className="tn--jnb" id="257:873">
              Tên:
            </div>
            <div className="auto-group-veaw-32b" id="Wa19NeUbkp5tm2aAF8vEaw">
              <div className="tenKhach">Tên khách</div>
            </div>
          </div>
          <div className="chn-loi-sn-ofy" id="257:896">
            <div className="s-in-thoi--wGP" id="257:899">
              Số điện thoại:
            </div>
            <div className="auto-group-xznk-duu" id="Wa19VowLAGzbnXsDdvxZNK">
              <div className="soDT">Số điện thoại</div>
            </div>
          </div>
        </div>
        <div className="thng-tin-sn-rXm" id="257:895">
          Thông tin sân
        </div>
        <div className="auto-group-evfy-kt3" id="Wa19cUQtrzDDFZVKVTeVFy">
          <div className="nhp-tn-sn-wjZ" id="257:889">
            <div className="ngy--sNK" id="257:892">
              Ngày:
            </div>
            <div className="auto-group-efjs-9qd" id="Wa19yo8hWThy9FUqpkefJs">
              <input type="date" className="ngayLS" id="257:891" onChange={handleDateChange}
        min={getCurrentDate()}></input>
            </div>
          </div>
          <div className="nhp-tn-sn-Srf" id="257:874">
            <div className="tn--9FH" id="257:877">
              Tên:
            </div>
            <select name="cars" className="selectTenLS" onChange={()=>{setLoaiSanLS()}}>
            
            </select>
          </div>
        </div>
        <div className="auto-group-fpes-Zns" id="Wa1A73RdCPEMmAij96FPEs">
        <div className="groupkhGHuu">
            <div className="nhp-tn-sn-9o1" id="257:879">
              <div className="khung-gi--JA7" id="257:882">
                Khung giờ:
              </div>
              <select name="cars" className="selectKhungGio" onChange={setSelectSanByNgayKG}>
              </select>
            </div>
            <div className="nhp-tn-sn-vKu" id="257:946">
              <div className="cho-php-giao-hu-TKq" id="257:949">
                Cho phép giao hữu
              </div>
              <select name="cars" className="selectGH">
                <option value="0">Không</option>
                <option value="1">Có</option>
              </select>
            </div>
          </div>
          <div className="groupkhGHuu">
            <div className="nhp-tn-sn-9o1" id="257:884">
              
              <div className="loi--xUK" id="257:887">
                Loại:
              </div>
              <div className="loaiSanLS">None</div>
            </div>
            <div className="nhp-tn-sn-vKu" id="257:884">
              
              <div className="loi--xUK" id="257:887">
                Tổng tiền:
              </div>
              <div className="tongTien">0 VND</div>
            </div>
          </div>
        </div>
        <div className="auto-group-hhjs-nKm" id="Wa1AjrhcdDA61eXwBb9nwD">
          <div className="btnThemLich" id="257:900" onClick={insertLichSan}>
            Thêm
          </div>
          <div className="btnCapNhatLich" id="257:939" onClick={updateLichSan}>
            Cập nhật
          </div>
          <div className="btnHuyLich" id="257:942" onClick={ShowHD}>
            Huỷ
          </div>
        </div>
      </div>
      <div className="group-289693-7qd" id="293:673">
        <div className="group-289658-51m" id="293:328">
          <div className="auto-group-ootz-nwm" id="Wa1Fuxaa4Znem9NxP2ooTZ">
            5:00 - 7:00
          </div>
          <div className="auto-group-g8kj-qf9" id="Wa1G2HjMdSYXrXDkYPG8kj">
            7:30 - 9:30
          </div>
          <div className="auto-group-g8kj-qf9" id="Wa1G7TFRDtgre7pyn7tsyD">
            10:00 - 12:00
          </div>
          <div className="auto-group-g8kj-qf9" id="Wa1GCCcWQ3kmTei5Q8jdSb">
            13:00 - 15:00
          </div>
          <div className="auto-group-g8kj-qf9" id="Wa1GGnKD1HbK6MhXB4Tacj">
            15:30 - 17:30
          </div>
          <div className="auto-group-j53h-FeK" id="Wa1GT7MLCBsxfYuyeXj53h">
            19:00 - 21:00
          </div>
        </div>
        <div className="auto-group-rifm-GJX" id="Wa1CodbNh5qjDKr6i2Rifm">
          <div className="group-289691-oZM" id="293:670">
            <div className="thng-10-WTm" id="298:311">
              Tháng 10
            </div>
            <div className="auto-group-vgkk-VKh" id="Wa1FTDr7yGJXJcwj3NVgkK">
              <FontAwesomeIcon
                className="chevronLeft"
                icon={faChevronLeft}
                size="2x"
                onClick={()=>changeDate(-1)}
              />
              <div className="item-4-cfD" id="298:306">
                4
              </div>
              <FontAwesomeIcon
                className="chevronRight"
                icon={faChevronRight}
                size="2x"
                onClick={()=>changeDate(1)}
              />
            </div>
            <div className="group-289692-Kxw" id="293:672">
              <div className="lc-loi-sn-Eq1" id="293:543">
                <select name="cars" className="selectLLS">
                  <option value="none">Tất cả sân</option>
                  {
                    getLoaiSans.map((loaiSan, i) => (
                      <option value={loaiSan.IdLoaiSan} >{loaiSan.TenLoaiSan}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="auto-group-kpmu-omd" id="Wa1D1TazzFCfTx5RoHkPmu">
              
          </div>
          
        </div>
        
        {/* {getLichSans.length > 0 ? (
                getLichSans.map((element,i) => (
                  // if(element)
                  <div className="rowSan" id={"rowSan-"+element}>
                    <div className="tenSanLS">
                      <div>San 2</div>
                    </div>
                    <div className="schedule">
                      <div className="shift shift-Busy-Pass"></div>
                      <div className="shift shift-Empty-Pass"></div>
                      <div className="shift shift-Empty-Future"></div>
                      <div className="shift shift-Empty-Future"></div>
                      <div className="shift shift-Busy-Future"></div>
                      <div className="shift shift-Empty-Future"></div>
                      <hr className="line" />
                    </div>
                  </div>
                ))
              ) : (
                <div>Không có gì.</div>
              )

              } */}
        {/* <div className="ch-thch-3hD" id="293:531">
          <div className="ttlLS">Loại sân</div>
          <div className="groupLC">
            <div className="auto-group-zg8b-Kud" id="Wa1GnmTFAV54gyzyWwZG8B">
              <div className="rectangle-4318-587" id="293:524"></div>
              <p className="c-nhn-to-oiK" id="293:529">
                Cỏ nhân tạo
              </p>
            </div>
            <div className="auto-group-lpyv-fs1" id="Wa1Gtr7Ssyyu181HufLPyV">
              <div className="rectangle-4319-kk3" id="293:532"></div>
              <p className="c-t-nhin-LCT" id="293:530">
                Cỏ tự nhiên
              </p>
            </div>
          </div>
          <hr className="line1" />
          <div className="ttlLS">Trạng thái</div>
          <div className=" groupStatus">
            <div className="auto-group-ky5h-U3m" id="Wa1GzWcgBBpKMCHUgfKY5h">
              <div className="rectangle-4319-kk2"></div>
              <p className="trng-RNK" id="293:533">
                Trống
              </p>
            </div>
            <div className="auto-group-quzw-tdH" id="Wa1H5WUMCijGwy145JqUzw">
              <div className="rectangle-4319-kk4"></div>
              <p className="t-Mmm" id="293:534">
                Đã đặt
              </p>
            </div>
            <div>
              <div className="rectangle-4319-kk8"></div>
              <p classNameName="hon-thnh-BF1" id="293:535">
                Hoàn thành
              </p>
            </div>
          </div>
        </div> */}
      </div>
      <hr className="divideLine"/>
      {/* Doanh Thu */}
      <p className="main-advertise-letter-fNK  mt-[60px]" id="257:861">
          THỐNG KÊ BÁO CÁO
        </p>
      <div className="w-full h-[530px] grid grid-cols-12 mt-[60px]">
                <div className="w-full col-span-9 ml-[100px] " >
                  <div //sơ đồ
                    style={{
                      width: "78%",
                      height: "500px",
                      border: "1px solid black",
                    }}
                  >
                    <canvas
                      id="myChart"
                      style={{
                        maxWidth: "100%", marginLeft: "50px", marginTop: "-10px"
                      }} // Add maxWidth property
                    ></canvas>
                  </div>
                </div>


                <div className="w-full col-span-3 ml-[-40px]">
                  <select
                    className="w-[87%] h-[40px] border-[1px] mt-[40px]  border-[black]"
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value);
                      setrerunchart(true)
                      setSelectedMonth("all");
                      setSelectedDay("all");
                    }}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-[87%] h-[40px] border-[1px] mt-[30px] border-[black]"
                    value={selectedMonth}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setSelectedDay("all");
                    }}
                  >
                    <option value="all">
                      Chọn tháng
                    </option>
                    {monthsArray.map((month) => (
                      <option key={month} value={month}>
                        Tháng {month}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-[87%] h-[40px] border-[1px] mt-[30px] border-[black]"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                  >
                    <option value="all">Chọn ngày</option>
                    {daysArray.map((day) => (
                      <option key={day} value={day}>
                        Ngày {day}
                      </option>
                    ))}
                  </select>



                  <div className="w-[87%] h-[40px] border-[1px] grid grid-cols-12 mt-[30px] border-[black] bg-white text-[18px]">
                    <div className="col-span-3 ml-[70px] mt-[5px]" ><Iconpx classIcon={faClipboardCheck} width={"25px"} height={"25px"} marginRight={"0px"} marginLeft={"0px"} color={"black"} /></div>
                    <div className="col-span-9 ml-[20px] mt-[5px] ">Đơn hoàn thành: {totalOrders}</div>
                  </div>
                  <div className="w-[87%] h-[40px] border-[1px] grid grid-cols-12 mt-[30px] border-[black] bg-white text-[18px] ">
                    <div className="col-span-3 ml-[70px] mt-[5px]" ><Iconpx classIcon={faPiggyBank} width={"25px"} height={"25px"} marginRight={"0px"} marginLeft={"0px"} color={"black"} /></div>
                    <div className="col-span-9 ml-[20px] mt-[5px]">Doanh thu: {formatCurrency(totalPriceAfter)}</div>
                  </div>
                  <h3 className="mt-[30px] ml-[75px] text-[19px]">Tìm email hoặc số điện thoại:</h3>
                  <div className="col-span-1 flex mt-[10px]">
                    <input type="text" className="w-[87%] h-[40px] text-center border-[1px] grid grid-cols-12 border-[black]" id="rssearch" placeholder="" onChange={e => setsearchhdbydate(e.target.value)}></input>
                    <div className="ml-[-12px] mt-[8px] hover:cursor-pointer" onClick={SearchHoaDonByDateAdmin}><Iconpx classIcon={faMagnifyingGlass} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"black"} /></div>
                  </div>
                </div>
      </div>
      <div className="w-full grid grid-cols-12 bg-[#256eb3] h-[60px] font-bold pr-[10px]">
            <div className="col-span-2 text-[white] text-center pt-[17px]">Họ tên</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Số điện thoại</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Tên sân</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Ngày</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Khung giờ</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Giao hữu</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Tổng Tiền</div>

          </div>
          <div className="overflow-y-scroll h-[251px]">
            {listBill.length > 0 ? (
              <div className="w-full grid grid-cols-12 mt-[10px] h-[100px]">
                {listBill.map((bill, i) => (
                  <React.Fragment key={i}>
                    <div className=" text-[#000000] text-center pt-[30px] hidden">{bill.IdHD}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{bill.Ten}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{bill.Sdt}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]">{bill.TenSan}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{bill.NgayFM}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{bill.KhungGio}</div>
                    {bill.GiaoHuu == 1?(
                      <div className="col-span-1 text-[#000000] text-center pt-[30px]"><Iconpx classIcon={faXmark} width={"25px"} height={"25px"} marginRight={"0px"} marginLeft={"0px"} color={"red"} /></div>

                    ):(
                      <div className="col-span-1 text-[#000000] text-center pt-[30px]"><Iconpx classIcon={faCheck} width={"25px"} height={"25px"} marginRight={"0px"} marginLeft={"0px"} color={"green"} /></div>
                    )}

                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{formatCurrency(bill.TongTien)}</div>
                  </React.Fragment>
                ))}

              </div>
            ) : (
              <p className=" mt-[7%] grid justify-items-center">No Bill</p>
            )
            }
          </div>
      {/* Doanh Thu */}
    </div>
  );
};


export default FieldManage;
