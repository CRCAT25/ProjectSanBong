import React, { useCallback, useState, useEffect, useRef } from "react";
import "../css/Admintest.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faUser, faUserShield, faUserTie, faChartColumn, faArrowRightFromBracket, faXmark, faCheck, faClipboardCheck, faPiggyBank } from "@fortawesome/free-solid-svg-icons"
import { getAllCoSo, CThemTaiKhoan, ShowImgCoSo, CSearchEmailSdt, CDisableAcc, CEnableAcc, CGetAllPlayer, CGetAllAdmin, CGetAllBillComplete, CSearchHoaDonByDateAdmin } from "../controllers/CQuanLyTaiKhoan";
import axios from "axios";
import { VietQR } from 'vietqr';
import Swal from 'sweetalert2';
import Chart from "chart.js/auto";

const generateDaysArray = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
};


const Admin = () => {

  const [activeTab, setActiveTab] = useState('khachhang');
  const [checklogin, setCheckLogin] = useState(false);
  const [listCoso, setListCoso] = useState([]);
  const [listPlayer, setlistPlayer] = useState([]);
  const [listAdmin, setlistAdmin] = useState([]);
  const [listBill, setlistBill] = useState([]);



  const [apitinh, setapitinh] = useState([]);
  const [apiquan, setapiquan] = useState([]);
  const [apiphuong, setapiphuong] = useState([]);
  const idlogin = "3";
  const [kqapinh, setkqapinh] = useState([]);
  const [tinh, settinh] = useState('');
  const [quan, setquan] = useState('');
  const [phuong, setphuong] = useState('');
  let stringdiachi = "";
  //Coso
  const [idphanquyen, setidphanquyen] = useState(1);
  const [ten, setten] = useState('');
  const [email, setemail] = useState('');
  const [sdt, setsdt] = useState('');
  const [duong, setduong] = useState('');
  const [nganhangcs, setnganhangcs] = useState('');
  const [stkcs, setstkcs] = useState('');
  const [matkhau, setmatkhau] = useState('');
  const [stringsearch, setstringsearch] = useState('');
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

  //



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
    checkloginadmin();
    showAllCoSo();
    showAllPlayer();
    showAllAdmin();
    showAllBillComplete();
    callAPI(host);
    getNganHang();
  }, []);

  const checkloginadmin=() =>{
    if(localStorage.getItem("userID") === "" || localStorage.getItem("userRole") !== "3" ){
      setCheckLogin(true);
      Swal.fire({
        icon: 'error',
        text: 'Không đủ thẩm quyền để truy cập',
      }).then(() => {
        window.location.href="http://localhost:3000"
      });
    }
}
  const openTab = (tab, index, idpq) => {
    setActiveTab(tab);
    changeclassname(index);
    setidphanquyen(idpq);
  };
  // useEffect(() => {
  //   alert(listCoso.length)
  // }, [listCoso]);

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

  /*                           CITY API                            */


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
      for (let i = 0; i < apitinh.length; i++) {
        // console.log("a"+ apitinh[i].code)
        if (selectedtinh == apitinh[i].code) {
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
      for (let i = 0; i < apiquan.length; i++) {
        if (selectedquan == apiquan[i].code) {
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
      for (let i = 0; i < apiphuong.length; i++) {
        if (selectedphuong == apiphuong[i].code) {
          setphuong(apiphuong[i].name)
        }
      }
    }
  };

  // useEffect(() => {
  //   stringdiachi += duong +", " + phuong +", "+ quan +", "+ tinh ;
  // }, [duong, tinh, quan, phuong]);

  const renderOptions = (dataArray) => {
    return dataArray.map((item, i) => (
      <option key={i} value={item.code} id={item.code + "-" + item.name} className="text-[#000000] text-center bg-[white]">{item.name}</option>
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

  const showAllPlayer = async () => {
    const result = await CGetAllPlayer();
    setlistPlayer(result);
  };

  const showAllAdmin = async () => {
    const result = await CGetAllAdmin();
    setlistAdmin(result);
  };

  const showAllBillComplete = async () => {
    const list = await CGetAllBillComplete();

    const allBills = [];

    for (let i = 0; i < list.length; i++) {
      let hoaDon = list[i];
      let sanBong = await hoaDon.SanBong;
      let dateFM = dateFormatter(hoaDon.Ngay);
      let date = hoaDon.Ngay;

      let tongTien = hoaDon.TongTien * 0.1;


      const valueOfHoaDon = {
        IdHD: hoaDon.IDHoaDon,
        NgayFM: dateFM,
        Ngay: date,
        Ten: sanBong.TaiKhoan.Ten,
        EmailCoSo: sanBong.TaiKhoan.Email,
        SdtCoSo: sanBong.TaiKhoan.SoDienThoai,
        TongTien: tongTien,
      };

      // console.log(valueOfHoaDon);

      allBills.push(valueOfHoaDon);
    }
    setchart(allBills);
    setlistBill(allBills);

  };



  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  function logout() {
    localStorage.clear();
    window.location.href="http://localhost:3000"
  }

  const CheckInput = async (index) => {
    const checkaccount = ["idphanquyen", "ten", "email", "sdt", "matkhau"];
    const checkcoso = index === 2 ? [...checkaccount, "duong", "tinh", "quan", "phuong", "nganhangcs", "stkcs"] : checkaccount;

    const checkfail = checkcoso.find(value => eval(value) === "");

    if (checkfail) {
      Swal.fire({
        icon: 'error',
        title: 'Thêm thất bại!',
        text: 'Vui lòng nhập đủ thông tin',
      });
      return false;
    }

    return true;
  };

  const ThemTaiKhoan = async (index) => {
    let resultcheck = await CheckInput(index);
    if (index === 2) {
      if (resultcheck == true) {
        stringdiachi = duong + ", " + phuong + ", " + quan + ", " + tinh;
        let result = await CThemTaiKhoan(idphanquyen, ten, email, sdt, stringdiachi, nganhangcs, stkcs, matkhau)
        ShowResultThem(result)
      }
    } else {
      if (resultcheck == true) {
        let result = await CThemTaiKhoan(idphanquyen, ten, email, sdt, stringdiachi, nganhangcs, stkcs, matkhau)
        ShowResultThem(result)
      }
    }
  }
  const resetInputValues = () => {
    // alert('a')
    // document.getElementsByClassName('iptcs')[0].innerHTML = '';
    // document.getElementsByClassName('ipsdtcs')[0].innerHTML = '';
    // document.getElementsByClassName('ipmkcs')[0].innerHTML = '';
    // document.getElementsByClassName('ipemailcs')[0].innerHTML = '';
    // document.getElementsByClassName('iptinh')[0].value = '';
    // document.getElementsByClassName('ipquan')[0].value = '';
    // document.getElementsByClassName('ipphuong')[0].value = '';
    // document.getElementsByClassName('ipnh')[0].value = '';
    // document.getElementsByClassName('ipstk')[0].innerHTML = '';
    // document.getElementsByClassName('ipsonha')[0].innerHTML = '';
  };

  const ShowResultThem = async (result) => {
    if (result === "Thêm thành công") {
      resetInputValues();
      Swal.fire({
        title: 'Thêm thành công!',
        text: '',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        showAllCoSo();
        showAllPlayer();
        showAllAdmin();
      }, 1000)

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Thêm thất bại!',
        text: result,
      });
      setTimeout(() => {
        showAllCoSo();
        showAllPlayer();
        showAllAdmin();
      }, 1000)
    }
  }

  const GetIdTaiKhoan = async (idtaikhoan) => {
    try {
      const response = await ShowImgCoSo(idtaikhoan)
      if (response.Anh !== "null" && response.Anh !== null) {
        Swal.fire({
          title: `Ảnh của cơ sở ${response.Ten} `,
          html: `<div class="divimggpkd" ><img class="h-full w-full object-cover" alt="" src="../assets/${response.Anh}"></img></div>`,
          showCloseButton: true,
          showConfirmButton: false,
          customClass: {
            container: 'custom-swal-container-gpkd',
            popup: 'custom-swal-popup-gpkd',
          },
        });
      } else {
        Swal.fire({
          title: `Ảnh của cơ sở ${response.Ten}</br></br>  Chưa có ảnh`,
          showCloseButton: true,
          showConfirmButton: false,
          customClass: {
            container: 'custom-swal-container-gpkd',
            popup: 'custom-swal-popup-gpkd',
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SearchSdtEmail = async () => {
    if (stringsearch !== "") {
      let result = await CSearchEmailSdt(idphanquyen, stringsearch)
      if (result.length > 0) {
        if (idphanquyen === 2) {
          setListCoso(result)
        } else if (idphanquyen === 1) {
          setlistPlayer(result)
        } else {
          setlistAdmin(result)
        }
      }
      else {
        Swal.fire('Không có tài khoản muốn tìm')
      }
    } else {
      showAllCoSo();
      showAllPlayer();
      showAllAdmin();
    }
  }

  const Enable = async (idtaikhoan) => {
    Swal.fire({
      title: "Xác nhận kích hoạt tài khoản?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy"

    }).then((result) => {
      if (result.isConfirmed) {
        CEnableAcc(idtaikhoan)
        Swal.fire({
          title: "Kích hoạt thành công",
          icon: "success",
        });
        showAllCoSo();
        showAllPlayer();
        showAllAdmin();
      }
    });
  }

  const Disable = async (idtaikhoan) => {
    Swal.fire({
      title: "Xác nhận vô hiệu hóa tài khoản?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy"

    }).then((result) => {
      if (result.isConfirmed) {
        CDisableAcc(idtaikhoan)
        Swal.fire({
          title: "Vô hiệu hóa thành công",
          icon: "success",
        });
        showAllCoSo();
        showAllPlayer();
        showAllAdmin();
      }
    });
  }

  const Inputten = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[0-9]/g, '');
    setten(sanitizedValue);
    e.target.value = sanitizedValue;
  };

  const SearchHoaDonByDateAdmin = async () => {
    if (selectedMonth !== "all" && selectedDay !== "all") {
      let stringdate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
        let result = await CSearchHoaDonByDateAdmin(searchhdbydate, stringdate)
        if (result.length > 0) {
          console.log(result.length)
          const searchBill = [];

          for (let i = 0; i < result.length; i++) {
            let hoaDon = result[i];
            let sanBong = await hoaDon.SanBong;
            let dateFM = dateFormatter(hoaDon.Ngay);
            let date = hoaDon.Ngay;

            let tongTien = hoaDon.TongTien * 0.1;

            const valueOfHoaDon = {
              IdHD: hoaDon.IDHoaDon,
              NgayFM: dateFM,
              Ngay: date,
              Ten: sanBong.TaiKhoan.Ten,
              EmailCoSo: sanBong.TaiKhoan.Email,
              SdtCoSo: sanBong.TaiKhoan.SoDienThoai,
              TongTien: tongTien,
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



  return (
    <div>
    {checklogin ? (
      <div className="bg-[black]"></div>
    ) : (
      <div>
      <div className="w-[300px] h-[96px]  fixed  top-0 bg-white">
        <div className=" item-center justify-center w-full">
          <div className=" gap-3 justify-center bg-[#E2EDFF] h-[570px]">
            <div id="nameaccount" className="text-[25px] font-bold w-full text-center py-[20px]" >{localStorage.getItem("userName")}</div>
            <button id="tablink" className={`tablink ${activeTab === 'khachhang' ? 'active' : ''} `} data-electronic="khachhang" onClick={() => openTab('khachhang', 0, 1)}><div id="tenmenu" className="tenmenu tenmenu2" ><Iconpx classIcon={faUser} width={"19px"} height={"19px"} marginRight={"15px"} marginLeft={"0px"} color={"black"} />Khách hàng</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'coso' ? 'active' : ''}`} data-electronic="coso" onClick={() => openTab('coso', 1, 2)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faUserTie} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-40px"} color={"black"} />Partner</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'admin' ? 'active' : ''}`} data-electronic="admin" onClick={() => openTab('admin', 2, 3)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faUserShield} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-65px"} color={"black"} />Admin</div></button>
            <button id="tablink" className={`tablink ${activeTab === 'baocao' ? 'active' : ''}`} data-electronic="baocao" onClick={() => openTab('baocao', 3, 0)}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faChartColumn} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-46px"} color={"black"} />Báo cáo</div></button>
            <button id="logout" onClick={logout}><div id="tenmenu" className="tenmenu"><Iconpx classIcon={faArrowRightFromBracket} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"black"} />Đăng xuất</div></button>
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
              <div className="w-[82%] border-2 border-[grey] h-[257px] rounded-md absolute translate-x-[10px] translate-y-[-38px] z-0">

              </div>
              <div id="" className=" w-full mx-auto">
                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Họ tên:</div>
                    <input type="text" class="iptcs" onChange={e => Inputten(e)} ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Số điện thoại:</div>
                    <input type="number" class="ipsdtcs" onChange={e => setsdt(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Mật khẩu:</div>
                    <input type="text" class="ipmkcs" onChange={e => setmatkhau(e.target.value)}></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Email:</div>
                    <input type="text" class="ipemailcs" onChange={e => setemail(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <button id="btnthemcs" className="col-span-2" onClick={() => ThemTaiKhoan(1)}>Thêm tài khoản</button>
                  </div>
                </div>

                <div className="w-full flex mt-[120px] px-[60px] justify-center gap-[60px]">
                  <div className="">
                    <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>

                  </div>
                  <div className="col-span-1 flex ">
                    <input type="text" class="input_searchemailsopart" id="rssearch" placeholder="" onChange={e => setstringsearch(e.target.value)}></input>
                    <div className="ml-[-12px] hover:cursor-pointer mt-[10px]" onClick={() => SearchSdtEmail(idphanquyen)}><Iconpx classIcon={faMagnifyingGlass} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"black"} /></div>
                  </div>

                </div>


              </div>
            </div>

          </div>
          <div className="w-full grid grid-cols-12 bg-[#256eb3] h-[60px] mt-[106px]">
            <div className="col-span-4 text-[white] text-center pt-[17px]">Họ tên</div>
            <div className="col-span-4 text-[white] text-center pt-[17px]">Email</div>
            <div className="col-span-3 text-[white] text-center pt-[17px]">Số điện thoại</div>
          </div>
          <div className="overflow-y-scroll h-[251px]">
            {listPlayer.length > 0 ? (
              <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[10px] h-[100px]">
                {listPlayer.map((player, i) => (
                  <React.Fragment key={i}>
                    <div className=" text-[#000000] text-center pt-[30px] hidden">{player.IdAccount}</div>
                    <div className="col-span-4 text-[#000000] text-center pt-[30px]">{player.Ten}</div>
                    <div className="col-span-4 text-[#000000] text-center pt-[30px]">{player.Email}</div>
                    <div className="col-span-3 text-[#000000] text-center pt-[30px]">{player.SoDienThoai}</div>
                    {player.TrangThai == 1 ? (
                      <div className="col-span-1 text-[#000000] text-center pt-[30px] cursor-pointer" onClick={() => Enable(player.IdAccount)}><Iconpx classIcon={faXmark} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"red"} /></div>
                    ) : (
                      <div className="col-span-1 text-[#000000] text-center pt-[30px] cursor-pointer" onClick={() => Disable(player.IdAccount)}><Iconpx classIcon={faCheck} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"green"} /></div>
                    )}

                  </React.Fragment>
                ))}

              </div>
            ) : (
              <p>No player.</p>
            )
            }
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
                    <input type="text" class="iptcs" onChange={e => Inputten(e)} />
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Số điện thoại:</div>
                    <input type="number" class="ipsdtcs" onChange={e => setsdt(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Mật khẩu:</div>
                    <input type="text" class="ipmkcs" onChange={e => setmatkhau(e.target.value)}></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Email:</div>
                    <input type="text" class="ipemailcs" onChange={e => setemail(e.target.value)}></input>
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
                          <option value={nh.shortName}>{nh.shortName}</option>
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
                    <input type="number" class="ipstk" onChange={e => setstkcs(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%]">Số nhà / Đường:</div>
                    <input type="text" class="ipsonha" onChange={e => setduong(e.target.value)} ></input>
                  </div>

                  <button id="btnthemcs" className="col-span-2" onClick={() => ThemTaiKhoan(2)}>Thêm cơ sở</button>

                </div>
                <div className="w-full flex mt-[50px] px-[60px] justify-center gap-[60px]">
                  <div className="">
                    <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>

                  </div>
                  <div className="col-span-1 flex ">
                    <input type="text" class="input_searchemailsopart" id="rssearch" placeholder="" onChange={e => setstringsearch(e.target.value)}></input>
                    <div className="ml-[-12px] hover:cursor-pointer mt-[10px]" onClick={() => SearchSdtEmail(idphanquyen)}><Iconpx classIcon={faMagnifyingGlass} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"black"} /></div>                  </div>

                </div>


              </div>
            </div>

          </div>
          <div className="w-full grid grid-cols-12 bg-[#256eb3] h-[60px] mb-[36px] translate-y-[26px]">
            <div className="col-span-2 text-[white] text-center pt-[17px]">Tên cơ sở</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Email</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Số điện thoại</div>
            <div className="col-span-3 text-[white] text-center pt-[17px]">Địa chỉ</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Ngân hàng</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Số tài khoản</div>
            <div className="col-span-1 text-[white] text-center pt-[17px]">Ảnh</div>
            {/* <div className="col-span-1 text-[white] text-center pt-[17px]">Xác thực</div> */}

          </div>
          <div className="overflow-y-scroll h-[301px]">
            {listCoso.length > 0 ? (
              <div className="w-full grid grid-cols-12 bg-[#ffffff] h-[100px]">
                {listCoso.map((coso, i) => (
                  <React.Fragment key={i}>
                    <div className=" text-[#000000] text-center pt-[30px] hidden">{coso.IdAccount}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{coso.Ten}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{coso.Email}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]">{coso.SoDienThoai}</div>
                    <div className="col-span-3 text-[#000000] text-center pt-[30px]">{coso.DiaChiCoSo}</div>
                    <div className="col-span-1 text-[#291616] text-center pt-[30px]">{coso.NganHang}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px]">{coso.STK}</div>
                    <div className="col-span-1 text-[#000000] text-center pt-[30px] ml-[10px] underline hover:text-[red] cursor-pointer"
                      onClick={() => GetIdTaiKhoan(coso.IdAccount)}>Xem</div>
                    {coso.TrangThai == 1 ? (
                      <div className="col-span-1 text-[#000000] text-center pt-[30px] hover:text-[red]  cursor-pointer" onClick={() => Enable(coso.IdAccount)}><Iconpx classIcon={faXmark} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"red"} /></div>
                    ) : (
                      <div className="col-span-1 text-[#000000] text-center pt-[30px] hover:text-[red] cursor-pointer" onClick={() => Disable(coso.IdAccount)}><Iconpx classIcon={faCheck} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"green"} /></div>
                    )}

                  </React.Fragment>
                ))}

              </div>
            ) : (
              <p>No Co so.</p>
            )
            }
          </div>

        </div>

        {/* admin */}
        <div id="admin" className={`tabcontent ${activeTab === 'admin' ? 'active' : ''}`}>
          <div className="w-full grid grid-cols-12">
            <div className="w-full col-span-2">
              {/* kh co gi o day */}
            </div>
            <div className="w-full col-span-10">
              <div className="w-[82%] border-2 border-[grey] h-[257px] rounded-md absolute translate-x-[10px] translate-y-[-38px] z-0">

              </div>
              <div id="" className=" w-full mx-auto">
                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Họ tên:</div>
                    <input type="text" class="iptcs" onChange={e => Inputten(e)} ></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Số điện thoại:</div>
                    <input type="number" class="ipsdtcs" onChange={e => setsdt(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                    <div className="text-[20px] w-[30%] ">Mật khẩu:</div>
                    <input type="text" class="ipmkcs" onChange={e => setmatkhau(e.target.value)}></input>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <div className="text-[20px] ">Email:</div>
                    <input type="text" class="ipemailcs" onChange={e => setemail(e.target.value)}></input>
                  </div>
                </div>

                <div className="w-full grid grid-cols-6 gap-[10px] mb-[30px] px-[60px]">
                  <div className="col-span-4 flex justify-between">
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <button id="btnthemcs" className="col-span-2" onClick={() => ThemTaiKhoan(1)}>Thêm tài khoản</button>
                  </div>
                </div>

                <div className="w-full flex mt-[120px] px-[60px] justify-center gap-[60px]">
                  <div className="">
                    <h3 id="searchpartner">Tìm email hoặc số điện thoại:</h3>

                  </div>
                  <div className="col-span-1 flex ">
                    <input type="text" class="input_searchemailsopart" id="rssearch" placeholder="" onChange={e => setstringsearch(e.target.value)}></input>
                    <div className="ml-[-12px] hover:cursor-pointer mt-[10px]" onClick={() => SearchSdtEmail(idphanquyen)}><Iconpx classIcon={faMagnifyingGlass} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"black"} /></div>                  </div>

                </div>


              </div>
            </div>

          </div>
          <div className="w-full grid grid-cols-12 bg-[#256eb3] h-[60px] mt-[106px]">
            <div className="col-span-4 text-[white] text-center pt-[17px]">Họ tên</div>
            <div className="col-span-4 text-[white] text-center pt-[17px]">Email</div>
            <div className="col-span-3 text-[white] text-center pt-[17px]">Số điện thoại</div>
          </div>
          <div className="overflow-y-scroll h-[251px]">
            {listAdmin.length > 0 ? (
              <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[10px] h-[100px]">
                {listAdmin.map((admin, i) => (
                  <React.Fragment key={i}>
                    <div className=" text-[#000000] text-center pt-[30px] hidden">{admin.IdAccount}</div>
                    <div className="col-span-4 text-[#000000] text-center pt-[30px]">{admin.Ten}</div>
                    <div className="col-span-4 text-[#000000] text-center pt-[30px]">{admin.Email}</div>
                    <div className="col-span-3 text-[#000000] text-center pt-[30px]">{admin.SoDienThoai}</div>
                    {admin.TrangThai == 1 ? (
                      <div className="col-span-1 text-[#000000] text-center pt-[30px] cursor-pointer" onClick={() => Enable(admin.IdAccount)}><Iconpx classIcon={faXmark} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"red"} /></div>
                    ) : (
                      <div className="col-span-1 text-[#000000] text-center pt-[30px] cursor-pointer" onClick={() => Disable(admin.IdAccount)}><Iconpx classIcon={faCheck} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"green"} /></div>
                    )}

                  </React.Fragment>
                ))}

              </div>
            ) : (
              <p>No player.</p>
            )
            }
          </div>

        </div>



        {/* baocao */}
        <div id="baocao" className={`tabcontent ${activeTab === 'baocao' ? 'active' : ''}`}>
          <div className="w-full grid grid-cols-12">
            <div className="w-full col-span-2">
              {/* kh co gi o day */}
            </div>
            <div className="w-full col-span-10">
              <div className="w-full h-[530px] grid grid-cols-12 mt-[-60px]">
                <div className="w-full col-span-9 bg-[#fcfcfc]" >
                  <div //sơ đồ
                    style={{
                      width: "95%",
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


                <div className="w-full col-span-3">
                  <select
                    className="w-[87%] h-[40px] border-[1px] border-[black]"
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



                  <div className="w-[87%] h-[40px] border-[1px] grid grid-cols-12 mt-[30px] border-[black] text-[18px]">
                    <div className="col-span-3 ml-[70px] mt-[5px]" ><Iconpx classIcon={faClipboardCheck} width={"25px"} height={"25px"} marginRight={"0px"} marginLeft={"0px"} color={"black"} /></div>
                    <div className="col-span-9 ml-[20px] mt-[5px] ">Đơn hoàn thành: {totalOrders}</div>
                  </div>
                  <div className="w-[87%] h-[40px] border-[1px] grid grid-cols-12 mt-[30px] border-[black] text-[18px] ">
                    <div className="col-span-3 ml-[70px] mt-[5px]" ><Iconpx classIcon={faPiggyBank} width={"25px"} height={"25px"} marginRight={"0px"} marginLeft={"0px"} color={"black"} /></div>
                    <div className="col-span-9 ml-[20px] mt-[5px]">Doanh thu: {formatCurrency(totalPriceAfter)}</div>
                  </div>
                  <h3 className="mt-[30px] ml-[30px] text-[19px]">Tìm email hoặc số điện thoại:</h3>
                  <div className="col-span-1 flex mt-[10px]">
                    <input type="text" className="w-[87%] h-[40px] text-center border-[1px] grid grid-cols-12 border-[black]" id="rssearch" placeholder="" onChange={e => setsearchhdbydate(e.target.value)}></input>
                    <div className="ml-[-12px] mt-[8px] hover:cursor-pointer" onClick={SearchHoaDonByDateAdmin}><Iconpx classIcon={faMagnifyingGlass} width={"23px"} height={"23px"} marginRight={"15px"} marginLeft={"-25px"} color={"black"} /></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full grid grid-cols-12 bg-[#256eb3] h-[60px]">
            <div className="col-span-3 text-[white] text-center pt-[17px]">Cơ sở</div>
            <div className="col-span-3 text-[white] text-center pt-[17px]">Email</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Số điện thoại</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Ngày</div>
            <div className="col-span-2 text-[white] text-center pt-[17px]">Tổng Tiền</div>

          </div>
          <div className="overflow-y-scroll h-[251px]">
            {listBill.length > 0 ? (
              <div className="w-full grid grid-cols-12 bg-[#ffffff] mt-[10px] h-[100px]">
                {listBill.map((bill, i) => (
                  <React.Fragment key={i}>
                    <div className=" text-[#000000] text-center pt-[30px] hidden">{bill.IdHD}</div>
                    <div className="col-span-3 text-[#000000] text-center pt-[30px]">{bill.Ten}</div>
                    <div className="col-span-3 text-[#000000] text-center pt-[30px]">{bill.EmailCoSo}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{bill.SdtCoSo}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{bill.NgayFM}</div>
                    <div className="col-span-2 text-[#000000] text-center pt-[30px]">{formatCurrency(bill.TongTien)}</div>
                  </React.Fragment>
                ))}

              </div>
            ) : (
              <p className=" mt-[7%] grid justify-items-center">No Bill</p>
            )
            }
          </div>

        </div>
      </div>




    </div>
    )
    }
    </div>
  )
}
export default Admin;
