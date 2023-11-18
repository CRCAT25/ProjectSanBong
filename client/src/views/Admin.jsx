import React, { useCallback, useState, useEffect, useRef } from "react";
import "../css/Admintest.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faUser, faUserShield, faUserTie, faChartColumn, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

const Admin = () => {

  const [activeTab, setActiveTab] = useState('khachhang');
  const [index, setindex] = useState('0');
  const [listtenmenu, setListtenmenu] = useState([]);


  const openTab = (tab, index) => {
    const buttonElement = document.getElementById('tablink');
    setActiveTab(tab);
    // buttonElement.classList.remove('active');
    // buttonElement.classList.add('active2');
    changeclassname(index);
  };
  function changeclassname(index) {
    // alert(document.getElementsByClassName('tenmenu').length)
    if (document.getElementsByClassName('tenmenu2').length > 0) {
      document.getElementsByClassName('tenmenu2')[0].classList.remove('tenmenu2')
    }
    document.getElementsByClassName('tenmenu')[index].classList.add('tenmenu2')
    // const buttonElement = document.getElementById('tenmenu');
  };
  // const changeClassName = (classNameToAdd, classNameToRemove) => {
  //   const elements = document.getElementsByClassName(classNameToRemove);
  //   const updatedList = Array.from(elements);

  //   setListtenmenu(updatedList);

  //   updatedList.forEach(element => {
  //     element.classList.remove(classNameToRemove);
  //     element.classList.add(classNameToAdd);
  //   });
  // };


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

  return (
    <div>
      <div className="w-[300px] h-[96px]  fixed  top-0 bg-white">
        <div className=" item-center justify-center w-full">
          <div className=" gap-3 justify-center bg-[#E2EDFF] h-[570px]">
            <div id="nameaccount" className="text-[25px] font-bold w-full text-center py-[20px]" >Lê Hữu Minh</div>
            <button id="tablink" className={`tablink ${activeTab === 'khachhang' ? 'active' : ''} `} data-electronic="khachhang" onClick={() => openTab('khachhang', 0)}><div id="tenmenu" className="tenmenu tenmenu2" ><Iconpx classIcon={faUser} width={"19px"} height={"19px"} marginRight={"15px"} marginLeft={"0px"} />Khách hàng</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'coso' ? 'active' : ''}`} data-electronic="coso" onClick={() => openTab('coso', 1)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faUserTie} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-40px"} />Partner</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'admin' ? 'active' : ''}`} data-electronic="admin" onClick={() => openTab('admin', 2)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faUserShield} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-65px"} />Admin</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'doanhthu' ? 'active' : ''}`} data-electronic="doanhthu" onClick={() => openTab('doanhthu', 3)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faChartColumn} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} />Doanh thu</div></button>
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
                    <input type="text" class="ipmkcs" ></input>
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
                    <input type="text" class="ipnh" ></input>
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

                  <button id="btnthemcs" className="col-span-2 flex justify-between">Thêm</button>
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
              <div id="" className=" w-full mx-auto">
                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Tên cơ sở:</div>
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
                    <input type="text" class="ipmkcs" ></input>
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
                    <input type="text" class="ipnh" ></input>
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

                  <button id="btnthemcs" className="col-span-2 flex justify-between">Thêm</button>
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
            <div className="col-span-1 text-[white] text-center pt-[17px]">ID</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Số điện thoại</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Email</div>
            <div className="col-span-3 text-[white] text-center pt-[17px]">Địa chỉ</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Ngân hàng</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Số tài khoản</div>
          </div>
          <div className="overflow-y-scroll h-[200px]">
          <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[20px] h-[100px]">
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">1</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">0855280747</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">lehuuminhtc30@gmail.com</div>
            <div className="col-span-3 text-[#000000] text-center pt-[30px]">68 đường Lê Lợi, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh 0000000000000</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">MBBank - Ngân hàng quân đội</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">4123215223</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">X</div>
          </div>

          <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[20px] h-[100px]">
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">2</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">0913126754</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">huyhoangct@gmail.com</div>
            <div className="col-span-3 text-[#000000] text-center pt-[30px]">69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh, Thành phố Hồ Chí Minh</div>
            <div className="col-span-2 text-[#000000] text-center pt-[30px]">ACB - Ngân hàng quốc tế Á Châu</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">42332362212443</div>
            <div className="col-span-1 text-[#000000] text-center pt-[30px]">X</div>
          </div>
          </div>

        </div>
      </div>




    </div>
  )
}
export default Admin;
