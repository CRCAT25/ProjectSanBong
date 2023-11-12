import "../css/LichGiaoHuu.css"
const LichGiaoHuu = () =>{
    return (
      <div className="ThamGiaGiaoHU" >
        <div className="Topic">LỊCH GIAO HỮU</div>
        <div className="BNgLCh text-center" >
          <div class="grid grid-cols-12 w-full">
              <div class="col-span-2 px-5">Tên</div>
              <div class="col-span-2 px-5">SĐT</div>
              <div class="col-span-2 px-5">Địa điểm</div>
              <div class="col-span-2 px-5">Mã sân</div>
              <div class="col-span-2 px-5">Thời gian</div>
              <div class="col-span-2 px-5">Xác nhận</div>
          </div>
          
          {/* <div className="ChiTiTLCh" >
            <div class="Name">Nguyễn Xuân Lộc</div>
            <div class="PhoneNumber">1234567890</div>
            <div class="Location">Sân Huy Hoàng<br/>D/c: 3123, Nguyễn xuân khoát, Bình Hưng Hòa, Bình Tân</div>
            <div class="FieldId">Sân 01</div>
            <div class="DateTime">T7 31/12/2023<br/>19h00 - 21h00 </div>
            <button class="XacNhN">Tham gia</button>
          </div>     */}

          <div className="mt-10 grid grid-cols-6 bg-[#379E13] text-center justify-center" >
            <div className="col-span-1 px-5 justify-center">Nguyễn Xuân Lộc</div>
            <div class="col-span-1 px-5">1234567890</div>
            <div class="col-span-1 px-5">Sân Huy Hoàng<br/>D/c: 3123, Nguyễn xuân khoát, Bình Hưng Hòa, Bình Tân</div>
            <div class="col-span-1 px-5">Sân 01</div>
            <div class="col-span-1 px-5">T7 31/12/2023<br/>19h00 - 21h00 </div>
            <button class="col-span-1 px-5">Tham gia</button>
          </div>  
        </div>
    </div>
    )
};

export default LichGiaoHuu;