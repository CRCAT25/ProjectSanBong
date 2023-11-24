import "../css/FieldManager.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import { getCostByShiftnTypeField, getLoaiSanByIdField, getAllLoaiSan, getEmptyFieldByDayShift, getEmptyShiftByDay} from "../controllers/CQuanLySan";
import { getAllSanByTaiKhoan, getAllHoaDonCompletedByCoSo, getBillForRefund, insertSan, getAnhsByIDSan} from "../controllers/CQuanLySan";




const FieldManage =  () => {
  useEffect(() => {
    GetLoaiSans()
    // GetAllBillByTaiKhoan()
    // GetBillForRefund()
    document.getElementsByClassName("ngayLS")[0].value = getCurrentDate()
    handleDateChange()
    loadListFields()

  }, []);
  const [getLoaiSans, setLoaiSans] = useState([]);
  const [getSans, setSans] = useState([]);
  const [getKhungGios, setKhungGios] = useState([]);
  const [getBills, setBills] = useState([]);
  const [getBillForRefund, setBillForRefund] = useState([]);
  function InsertSan(){
    let tenSan = document.getElementsByClassName("auto-group-1jl7-TBh")[0].value
    let loaiSan = document.getElementsByClassName("selectLoaiS")[0].value
    let idTK = "7"
    let anhs = document.getElementById("inputAnh").files
    let tenAnhs = []
    let addible = false
    if(tenSan.length > 0){
      if(loaiSan !== "none"){
        if(anhs.length > 0){
          for(let i = 0; i < anhs.length; i++){
            if(i == 2){break}
            tenAnhs.push(anhs[i].name)
          }
          addible = true
        }else{
          alert("Yêu cầu nhập đơn giá.")
        }
      }else{
        alert("Yêu cầu chọn loại sân.")
      }
    }else{
      alert("Yêu cầu nhập tên sân.")
    }
    if(addible){
      insertSan(idTK, loaiSan, tenSan, tenAnhs)
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
  }
  function chooseImage(){
    document.getElementById("inputAnh").click()
  }
  const readURL = async () => {
    let files = await document.getElementById("inputAnh").files;
    if (files.length > 0) {
      document.getElementsByClassName("auto-group-bp27-YwD")[0].innerHTML = ``
      if(files.length > 2){
        alert("Tối đa 2 hình.")
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
  const loadListFields = async () =>{
    let list = ""
    let aList = await getAllSanByTaiKhoan("7");
    if(aList.length > 0){
      aList.map( async san=>{
        let anhs = await getAnhsByIDSan(san.IdSan)
        switch(anhs.length){
          case 0:{
            list +=  `<div class="sn-XTh" id="257:844">
        <div class="auto-group-lo8w-E7D" id="Wa17AdKabWVfpUgCKqLo8w">
          <div class="tn-sn-input-J75" id="257:849">
            <div class="tenSan" value="${san.IdSan}">${san.TenSan}</div>
          </div>
          <div class="tn-sn-input-Mr3" id="257:852">
            <div class="loaiSan" value="${san.LoaiSan.IdLoaiSan}">${san.LoaiSan.TenLoaiSan}</div>
          </div>
          <div class="tn-sn-input-J91" id="257:855">
            <div class="donGia">${san.LoaiSan.GiaTien}</div>
          </div>
        </div>
        <div class="auto-group-fmjy-Uhh" id="Wa17XhYoPc9NvvqEtVfmjy">
        
        </div>
        <div class="auto-group-vqh9-B1m" id="Wa17oh69siGSrCKt8xvQH9">
          <button class="btn">
            <i class="fa fa-edit fa-2x"></i>
          </button>
          <button class="btn">
            <i class="fa fa-trash fa-2x"></i>
          </button>
        </div>
      </div>`
          }
          case 1:{
            list +=  `<div class="sn-XTh" id="257:844">
        <div class="auto-group-lo8w-E7D" id="Wa17AdKabWVfpUgCKqLo8w">
          <div class="tn-sn-input-J75" id="257:849">
            <div class="tenSan" value="${san.IdSan}">${san.TenSan}</div>
          </div>
          <div class="tn-sn-input-Mr3" id="257:852">
            <div class="loaiSan" value="${san.LoaiSan.IdLoaiSan}">${san.LoaiSan.TenLoaiSan}</div>
          </div>
          <div class="tn-sn-input-J91" id="257:855">
            <div class="donGia">${san.LoaiSan.GiaTien}</div>
          </div>
        </div>
        <div class="auto-group-fmjy-Uhh" id="Wa17XhYoPc9NvvqEtVfmjy">
        <img
          class="imgSan"
            src="../public/asset/${anhs[0].Anh}"
            id="257:863"
          />
        </div>
        <div class="auto-group-vqh9-B1m" id="Wa17oh69siGSrCKt8xvQH9">
          <button class="btn">
            <i class="fa fa-edit fa-2x"></i>
          </button>
          <button class="btn">
            <i class="fa fa-trash fa-2x"></i>
          </button>
        </div>
      </div>`
          }
          case 2:{
            list +=  `<div class="sn-XTh" id="257:844">
        <div class="auto-group-lo8w-E7D" id="Wa17AdKabWVfpUgCKqLo8w">
          <div class="tn-sn-input-J75" id="257:849">
            <div class="tenSan" value="${san.IdSan}">${san.TenSan}</div>
          </div>
          <div class="tn-sn-input-Mr3" id="257:852">
            <div class="loaiSan" value="${san.LoaiSan.IdLoaiSan}">${san.LoaiSan.TenLoaiSan}</div>
          </div>
          <div class="tn-sn-input-J91" id="257:855">
            <div class="donGia">${san.LoaiSan.GiaTien}</div>
          </div>
        </div>
        <div class="auto-group-fmjy-Uhh" id="Wa17XhYoPc9NvvqEtVfmjy">
        <img
          class="imgSan"
            src="../public/asset/${anhs[0].Anh}"
            id="257:863"
          />
          <img
          class="imgSan"
            src="../public/asset/${anhs[1].Anh}"
            id="257:863"
          />
        </div>
        <div class="auto-group-vqh9-B1m" id="Wa17oh69siGSrCKt8xvQH9">
          <button class="btn">
            <i class="fa fa-edit fa-2x"></i>
          </button>
          <button class="btn">
            <i class="fa fa-trash fa-2x"></i>
          </button>
        </div>
      </div>`
          }
        }
      })
    }else{
      list = "Không có sân."
    }
    
    document.getElementsByClassName("scrollContainerSan")[0].innerHTML = await list
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
                <select  className="selectLoaiS">
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
              <input
              type="number"
                placeholder="Đơn giá"
                className="auto-group-6ywm-4sd"
                id="Wa16GQKbfnkeocz8Vg6Ywm"
              ></input>
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
            <button className="btnCapNhatSan" id="257:818">
              Cập nhật
            </button>
            <button className="btXoaSan" id="257:821">
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
            <select name="cars" className="selectTenLS" onChange={()=>{
              setLoaiSanLS()
            }}>
            
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
