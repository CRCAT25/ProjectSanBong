import React, { useCallback, useState, useEffect, useRef } from "react";
import "../css/Admintest.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faUser, faUserShield, faUserTie, faChartColumn, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { getAllCoSo, getNameLogin, CheckEmailSdt } from "../controllers/CQuanLyTaiKhoan";
import axios from "axios";
import { VietQR } from 'vietqr';



const Admin = () => {

  const [activeTab, setActiveTab] = useState('coso');
  const [index, setindex] = useState('0');
  const [listtenmenu, setListtenmenu] = useState([]);
  const [listCoso, setListCoso] = useState([]);
  const [apitinh, setapitinh] = useState([]);
  const [apiquan, setapiquan] = useState([]);
  const [apiphuong, setapiphuong] = useState([]);
  const idlogin = "3";
  let namelogin = "";
  const [kqapinh, setkqapinh] = useState([]);
  const [tinh, settinh] = useState('');
  const [quan, setquan] = useState('');
  const [phuong, setphuong] = useState('');
  let stringdiachi = "";
  //Coso
  const [idphanquyen, setidphanquyen] = useState('2');
  const [tencs, settencs] = useState('');
  const [email, setemail] = useState('');
  const [sdt, setsdt] = useState('');
  const [duong, setduong] = useState('');
  const [nganhangcs, setnganhangcs] = useState('');
  const [stkcs, setstkcs] = useState('');
  const [matkhaucs, setmatkhaucs] = useState('');




  // const openTab = (tab, index, idpq) => {    
  //   setActiveTab(tab);
  //   alert(activeTab)
  //   setPQ(idpq);
  //   alert(idphanquyen)
  //   changeclassname(index);
  // };
  // function changeclassname(index) {
  //   // alert(document.getElementsByClassName('tenmenu').length)
  //   if (document.getElementsByClassName('tenmenu2').length > 0) {
  //     document.getElementsByClassName('tenmenu2')[0].classList.remove('tenmenu2')
  //   }
  //   document.getElementsByClassName('tenmenu')[index].classList.add('tenmenu2')
  //   // const buttonElement = document.getElementById('tenmenu');
  // };

  useEffect(() => {
    showAllCoSo();
    showNameLogin();
    callAPI(host);
    getNganHang();
  }, []);

  const openTab = (tab, index, idpq) => {    
    setActiveTab(tab);
    changeclassname(index);
    setidphanquyen(idpq);
  };

  function changeclassname(index) {
    const elements = document.querySelectorAll('.tenmenu');
    elements.forEach((element) => {
      element.classList.remove('tenmenu2');
    });
    elements[index].classList.add('tenmenu2');
  }
  
  useEffect(() => {
    // alert(activeTab);
    // alert(idphanquyen + " b");
  }, [idphanquyen, activeTab]);


  const Icon18px = ({ classIcon }) => {
    const iconSize = {
      width: "18px",
      height: "18px",
      color: "#black",
    };
    return (
      <span><FontAwesomeIcon icon={classIcon} style={iconSize} /></span>
    )
  }
  const Iconpx = ({ classIcon, width, height, marginRight, marginLeft }) => {
    const iconSize = {
      width: width,
      height: height,
      color: "#black",
      marginRight: marginRight,
      marginLeft: marginLeft,

    };
    return (
      <span><FontAwesomeIcon icon={classIcon} style={iconSize} /></span>
    )
  }

  /*                           CITY API                            */
  // const host = 'https://provinces.open-api.vn/api/?depth=2';

  // var callAPI = (api) => {
  //   return axios.get(api)
  //     .then((response) => {
  //       console.log('Full API Response:', response.data);
  //       setapitinh(response.data);
  //       setapiquan(response.data[0].districts);
  //       // setapiphuong(response.data[0].districts.wards)
  //       // response.data[0].wards.forEach(wards => {
  //       //   // console.log('District Name:', district.name);
  //       //   console.log(wards)
  //       // });
  //     });
  // }

  const host = 'https://provinces.open-api.vn/api/';

  useEffect(() => {
    callAPI('https://provinces.open-api.vn/api/?depth=1');
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

  useEffect(() => {
    stringdiachi += duong +", " + phuong +", "+ quan +", "+ tinh ;
  }, [duong, tinh, quan, phuong]);

  const renderOptions = (dataArray) => {
    return dataArray.map((item, i) => (
      <option key={i} value={item.code} id={item.code+"-"+item.name} className="text-[#000000] text-center bg-[white]">{item.name}</option>
    ));
  };

  function getNganHang() {
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



  const showAllCoSo = async () => {
    const result = await getAllCoSo();
    setListCoso(result);
  };

  function formattedDate(date) {
    const formatted = new Date(date).toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return formatted;
  }

  const showNameLogin = async () => {
    const result = await getNameLogin(idlogin);
    namelogin = result.Ten;

    // alert(namelogin)
  };


  function test() {
    alert(stringdiachi)
    alert(idphanquyen)
    alert(nganhangcs)
  }

  function checkEmailSdt(){
    CheckEmailSdt(idphanquyen, tencs, email, sdt, stringdiachi, nganhangcs, stkcs, matkhaucs)
  }

  return (
    <div>
      <div className="w-[300px] h-[96px]  fixed  top-0 bg-white">
        <div className=" item-center justify-center w-full">
          <div className=" gap-3 justify-center bg-[#E2EDFF] h-[570px]">
            <div id="nameaccount" className="text-[25px] font-bold w-full text-center py-[20px]" >{namelogin}</div>
            <button id="tablink" className={`tablink ${activeTab === 'khachhang' ? 'active' : ''} `} data-electronic="khachhang" onClick={() => openTab('khachhang', 0, 1)}><div id="tenmenu" className="tenmenu tenmenu2" ><Iconpx classIcon={faUser} width={"19px"} height={"19px"} marginRight={"15px"} marginLeft={"0px"} />Khách hàng</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'coso' ? 'active' : ''}`} data-electronic="coso" onClick={() => openTab('coso', 1, 2)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faUserTie} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-40px"} />Partner</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'admin' ? 'active' : ''}`} data-electronic="admin" onClick={() => openTab('admin', 2, 3)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faUserShield} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-65px"} />Admin</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'doanhthu' ? 'active' : ''}`} data-electronic="doanhthu" onClick={() => openTab('doanhthu', 3, 0)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faChartColumn} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-46px"} />Báo cáo</div></button>
            <button id="logout"><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faArrowRightFromBracket} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} />Đăng xuất</div></button>
          </div>
        </div>
      </div>


      <div class="wrapper_tabcontent font-bold">
        {/* khachhang */}
        <div id="khachhang" className={`tabcontent ${activeTab === 'khachhang' ? 'active' : ''}`}>
          <div className="w-full grid grid-cols-12">
            <div className="w-full col-span-2">
              {/* kh co gi o day */}
            </div>
            <div className="w-full col-span-10">
              <div id="" className=" w-full mx-auto">
                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Họ tên:</div>
                    <input type="text" class="iptcs" ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Số điện thoại:</div>
                    <input type="text" class="ipsdtcs" ></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Mật khẩu:</div>
                    <input disabled type="text" class="ipmkcs" ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Email:</div>
                    <input type="text" class="ipemailcs" ></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Tỉnh thành phố:</div>
                    <input type="text" class="iptinh" ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Ngân hàng:</div>
                    <select type="text" class="ipnh" >
                      <option disable value="">Chọn ngân hàng</option>
                      {kqapinh.map((nh, i) => (
                        <React.Fragment key={i}>
                          <option value="${nh.code}">${nh.code} - ${nh.shortName}</option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="w-full grid grid-cols-6 mb-[30px]  px-[60px]">
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Quận/ Huyện:</div>
                    <input type="text" class="ipquan" ></input>
                  </div>
                  <div className="col-span-2 flex justify-between translate-x-[-50px]">
                    <div className="text-[20px] w-[30%] ">Phường:</div>
                    <input type="text" class="ipphuong" ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] translate-x-[5px] ">Số tài khoản:</div>
                    <input type="text" class="ipstk" ></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%]">Số nhà / Đường:</div>
                    <input type="text" class="ipsonha" ></input>
                  </div>

                  <button id="btnthemcs" onClick={test} className="col-span-2 flex justify-between">Thêm tài khoản</button>
                </div>
                <div className="w-full flex mt-[40px] px-[60px] justify-center gap-[60px]">
                  <div className="">
                    <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>

                  </div>
                  <div className="col-span-1 ">
                    <input type="text" class="input_searchemailsopart" id="rssearch" placeholder=""></input>
                  </div>

                </div>


              </div>
            </div>

          </div>
          <div className="w-full grid grid-cols-12 bg-[red] h-[100px] translate-y-[36px]">

          </div>

        </div>






        {/* partner */}
        <div id="coso" className={`tabcontent ${activeTab === 'coso' ? 'active' : ''}`}>
          <div className="w-full grid grid-cols-12">
            <div className="w-full col-span-2">
              {/* kh co gi o day */}
            </div>
            <div className="w-full col-span-10">
              <div className="w-[82%] border-2 border-[grey] h-[406px] rounded-md absolute translate-x-[10px] translate-y-[-38px] z-0">

              </div>
              <div id="" className=" w-full mx-auto">
                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Tên cơ sở:</div>
                    <input type="text" class="iptcs" onChange={e => settencs(e.target.value)} ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Số điện thoại:</div>
                    <input type="text" class="ipsdtcs" onChange={e => settencs(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Mật khẩu:</div>
                    <input type="text" class="ipmkcs" onChange={e => settencs(e.target.value)}></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Email:</div>
                    <input type="text" class="ipemailcs" onChange={e => settencs(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Tỉnh thành phố:</div>
                    <select type="text" class="iptinh" onChange={handleProvinceChangeTinh}>
                      <option value="" selected>Chọn tỉnh thành</option>
                      {renderOptions(apitinh)}
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Ngân hàng:</div>
                    <select type="text" class="ipnh" onChange={e => setnganhangcs(e.target.value)} >
                      <option disable value="">Chọn ngân hàng</option>
                      {kqapinh.map((nh, i) => (
                        <React.Fragment key={i}>
                          <option value={nh.code}>{nh.shortName}</option>
                        </React.Fragment>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="w-full grid grid-cols-6 mb-[30px]  px-[60px]">
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Quận/ Huyện:</div>
                    <select type="text" class="ipquan" onChange={handleProvinceChangeQuan}>
                      <option value="" selected>Chọn quận huyện</option>
                      {renderOptions(apiquan)}
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-between translate-x-[-60px]">
                    <div className="text-[20px] w-[30%] ">Phường:</div>
                    <select type="text" class="ipphuong" onChange={handleProvinceChangePhuong}>
                      <option value="" selected>Chọn phường xã</option>
                      {renderOptions(apiphuong)}
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] translate-x-[5px] ">Số tài khoản:</div>
                    <input type="text" class="ipstk" onChange={e => setstkcs(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%]">Số nhà / Đường:</div>
                    <input type="text" class="ipsonha" onChange={e => setduong(e.target.value)} ></input>
                  </div>

                  <button id="btnthemanh" className="col-span-1">Thêm ảnh</button>
                  <button id="btnthemcs" className="col-span-1" onClick={checkEmailSdt}>Thêm cơ sở</button>

                </div>
                <div className="w-full flex mt-[40px] px-[60px] justify-center gap-[60px]">
                  <div className="">
                    <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>

                  </div>
                  <div className="col-span-1 ">
                    <input type="text" class="input_searchemailsopart" id="rssearch" placeholder=""></input>
                  </div>

                </div>


              </div>
            </div>

          </div>
          <div className="w-full grid grid-cols-12 bg-[#256eb3] h-[60px] mb-[36px] translate-y-[36px]">
            <div className="col-span-1 text-[white] text-center pt-[17px]">Tên cơ sở</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Email</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Số điện thoại</div>
            <div className="col-span-3 text-[white] text-center pt-[17px]">Địa chỉ</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Ngân hàng</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Số tài khoản</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Ảnh</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Xác thực</div>

          </div>
          <div className="overflow-y-scroll h-[200px]">
            {listCoso.length > 0 ? (
              <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[20px] h-[100px]">
                {listCoso.map((coso, i) => (
                  <React.Fragment key={i}>
                    <div className=" text-[#000000] text-center pt-[30px] hidden">{coso.idAccount}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]" onClick={test}>{coso.Ten}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{coso.Email}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]">{coso.SoDienThoai}</div>
                    <div className="col-span-3 text-[#000000] text-center pt-[30px]">{coso.DiaChiCoSo}</div>
                    <div className="col-span-1 text-[#291616] text-center pt-[30px]">{coso.NganHang}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]">{coso.STK}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px] underline hover:text-[red] cursor-pointer">Xem</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]">{formattedDate(coso.XacThuc)}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px] hover:text-[red] cursor-pointer">X</div>
                  </React.Fragment>
                ))}

              </div>
            ) : (
              <p>No Co so.</p>
            )
            }


            {/* <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[20px] h-[100px]">
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">2</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">0913126754</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">huyhoangct@gmail.com</div>
            <div className="col-span-3 text-[#000000] text-center pt-[30px]">69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh, Thành phố Hồ Chí Minh</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">ACB - Ngân hàng quốc tế Á Châu</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">42332362212443</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">09:30 am 11/19/2023</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">X</div>
          </div> */}
          </div>

        </div>
      </div>




    </div>
  )
}
export default Admin;
