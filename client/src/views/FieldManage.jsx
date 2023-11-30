import "../css/FieldManager.css";
import axios from "axios";
import { 
  FontAwesomeIcon 
} from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { 
  useEffect, useState 
} from "react";
import { 
  getCostByShiftnTypeField, 
  getLoaiSanByIdField, 
  getAllLoaiSan, 
  getEmptyFieldByDayShift, 
  getEmptyShiftByDay,
  getAllSanByTaiKhoan,
  getAllHoaDonCompletedByCoSo,
  getBillForRefund,
  insertSan,
  updateSanByID,
  getSanByID,
  getLoaiSanByID,
  getAnhsByIDSan,
  deleteSanByID
} from "../controllers/CQuanLySan";
import Swal from 'sweetalert2'




const FieldManage =  () => {
  useEffect(() => {
    GetLoaiSans()
    // GetAllBillByTaiKhoan()
    // GetBillForRefund()
    document.getElementsByClassName("ngayLS")[0].value = getCurrentDate()
    handleDateChange()
    loadListFields()

  }, []);
  const Swal = require('sweetalert2')
  const [getLoaiSans, setLoaiSans] = useState([]);
  let IDSan = null
  const [getIDSan, setIDSan] = useState(null);
  const [getBillForRefund, setBillForRefund] = useState([]);
  
  const displayLoaiSanPrice = async () =>{
    if(document.getElementsByClassName("selectLoaiS")[0].value == "none"){
      document.getElementsByClassName("auto-group-6ywm-4sd")[0].innerHTML = "Đơn giá"
    }else{
      document.getElementsByClassName("auto-group-6ywm-4sd")[0].innerHTML = (await getLoaiSanByID(document.getElementsByClassName("selectLoaiS")[0].value)).GiaTien
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
    let idTK = "7"
    let files = document.getElementById("inputAnh").files
    let tenAnhs = []
    let anhs = []
    let addible = false
    if(tenSan.length > 0){
      if(loaiSan !== "none"){
        if(files.length > 0){
          for(let i = 0; i < files.length; i++){
            if(i == 2){break}
            tenAnhs.push(files[i].name)
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
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      var day = currentDate.getDate().toString().padStart(2, '0');
      document.getElementsByClassName("ngayLS")[0].value = `${year}-${month}-${day}`;
      handleDateChange()
  }
  const handleDateChange = async () =>{
    
    document.getElementsByClassName("thng-10-WTm")[0].innerHTML = document.getElementsByClassName("ngayLS")[0].value.split("-")[1]+" / "+ document.getElementsByClassName("ngayLS")[0].value.split("-")[0]
    document.getElementsByClassName("item-4-cfD")[0].innerHTML = document.getElementsByClassName("ngayLS")[0].value.split("-")[2]
    setSelectKGByNgay()
    setSelectSanByNgayKG()
  };


  const setSelectKGByNgay = async () =>{
    const slect =  document.getElementsByClassName("selectKhungGio")[0];
    while (slect.hasChildNodes()) {
      slect.removeChild(slect.firstChild);
    }
    slect.innerHTML = `<option value="none">--Khung giờ--</option>`
    ;(await getEmptyShiftByDay("7", await document.getElementsByClassName("ngayLS")[0].value)).map((khunggio, i)=>{
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
    ;(await getEmptyFieldByDayShift("7", await document.getElementsByClassName("ngayLS")[0].value,await document.getElementsByClassName("selectKhungGio")[0].value)).map((san, i)=>{
      slect.innerHTML += `<option value="${san.IdSan}" >${san.TenSan}</option>`
    })
    setLoaiSanLS()
  }
  const setLoaiSanLS = async () =>{
    if(document.getElementsByClassName("selectTenLS")[0].value  != "none"){
      document.getElementsByClassName("loaiSanLS")[0].innerHTML = (await getLoaiSanByIdField(document.getElementsByClassName("selectTenLS")[0].value)).TenLoaiSan
      document.getElementsByClassName("loaiSanLS")[0].value = (await getLoaiSanByIdField(document.getElementsByClassName("selectTenLS")[0].value)).IdLoaiSan
      document.getElementsByClassName("tongTien")[0].innerHTML = await getCostByShiftnTypeField(await document.getElementsByClassName("selectKhungGio")[0].value  , await document.getElementsByClassName("loaiSanLS")[0].value) +".000 VND"
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
    let aList = await getAllSanByTaiKhoan("7");
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

  return (
    <div className="landing-fAj" id="257:562">
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
          <div className="btnThemLich" id="257:900">
            Thêm
          </div>
          <div className="btnCapNhatLich" id="257:939">
            Cập nhật
          </div>
          <div className="btnXoaLich" id="257:942">
            Xóa
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
            <div className="rowSan">
              <div className="tenSanLS">
                <div>San 1</div>
              </div>
              <div className="schedule">
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <hr className="line" />
              </div>
            </div>
            <div className="rowSan">
              <div className="tenSanLS">
                <div>San 1</div>
              </div>
              <div className="schedule">
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <hr className="line" />
              </div>
            </div>
            <div className="rowSan">
              <div className="tenSanLS">
                <div>San 1</div>
              </div>
              <div className="schedule">
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <hr className="line" />
              </div>
            </div>
            <div className="rowSan">
              <div className="tenSanLS">
                <div>San 1</div>
              </div>
              <div className="schedule">
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <hr className="line" />
              </div>
            </div>
            <div className="rowSan">
              <div className="tenSanLS">
                <div>San 1</div>
              </div>
              <div className="schedule">
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <div className="date"></div>
                <hr className="line" />
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};


export default FieldManage;
