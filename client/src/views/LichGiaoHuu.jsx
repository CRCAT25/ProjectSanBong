import "../css/LichGiaoHuu.css"
import Swal from 'sweetalert2'

const LichGiaoHuu = () =>{
  const conFirmClicked=()=>{
    Swal.fire({
      title: "Bạn có muốn tham gia vào trận đấu này ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý, tôi tham gia!",
      cancelButtonText:"Hủy"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:"Thành công",
          text: "Bạn có thể xem thông tin trận tại lịch sử",
          icon: "success"
        });
      }
    });
  }
  return (
    <div className="ThamGiaGiaoHU mb-[80px] mt-[120px]" >
      <div className="Topic">LỊCH GIAO HỮU</div>
      <div className="BNgLCh text-center p-3 h-[795px] bg-black"  >
        <div class="grid grid-cols-7 w-full bg-[#D4D4D4] rounded-[10px] pr-2">
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Tên</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">SĐT</div>
            <div class="col-span-2 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Địa điểm</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Mã sân</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Thời gian</div>
            <div class="col-span-1 px-5 text-[28px] font-bold h-[60px] flex flex-col justify-center">Xác nhận</div>
        </div>
        <div className="overflow-y-auto my-0 w-full pr-1">
          <div className="mt-3 rounded-[10px] grid grid-cols-7 bg-[#379E13] w-[100%] text-center justify-center py-5 text-[#fff] text-[20px]" >
            <div className="col-span-1 px-5 flex flex-col justify-center">Nguyễn Xuân Lộc</div>
            <div class="col-span-1 px-5 flex flex-col justify-center">1234567890</div>
            <div class="col-span-2 px-5 flex flex-col justify-center text-left">Sân Huy Hoàng<br/>D/c: 3123, Nguyễn xuân khoát, Bình Hưng Hòa, Bình Tân</div>
            <div class="col-span-1 px-5 flex flex-col justify-center">Sân 01</div>
            <div class="col-span-1 px-5 flex flex-col justify-center">T7 31/12/2023<br/>19h00 - 21h00 </div>
            <div className="relative">
              <button class="col-span-1 px-5 bg-[#FFEB37] rounded-[15px] w-[150px] h-[60px] justify-center text-[#000] my-3 font-bold" onClick={conFirmClicked}>Tham gia</button>
            </div>
          </div>  
          
        </div>

        
      </div>
  </div>
  )
};

export default LichGiaoHuu;