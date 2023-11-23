import axios from "axios";
import TaiKhoan from "./TaiKhoan";
import LoaiSan from "./LoaiSan";
import CoSoSan from "./CoSoSan";
import SanBong from './SanBong'
import KhungGio from './KhungGio'
class HoaDon{
    constructor(idHoaDon, taiKhoan, sanBong, khungGio, ngay, giaoHuu, doiThu, tongTien, thoiGianDat, trangThai){
        this.IDHoaDon = idHoaDon;
        this.TaiKhoan = taiKhoan;
        this.SanBong = sanBong;
        this.KhungGio = khungGio;
        this.Ngay = ngay;
        this.GiaoHuu = giaoHuu;
        this.DoiThu = doiThu;
        this.TongTien = tongTien;
        this.ThoiGianDat = thoiGianDat;
        this.TrangThai = trangThai;
    }


    GetAllBill() {
        return axios.post("http://localhost:8081/getAllBill", {})
            .then(response => {
                const list = this.initBill(response.data);               
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }
    initBill(list){
        const resultList = [];
        list.forEach(bill => {
            const taiKhoan = new TaiKhoan()
            taiKhoan.SetTK(bill.IDTaiKhoan)
            const loaiSan = new LoaiSan(bill.IDLoaiSan)
            const khungGio = new KhungGio(bill.IDKhungGio)
            const doiThu = new TaiKhoan(bill.IDDoiThu)
            const sanBong = new SanBong(bill.IDSan)
            const coSo = new TaiKhoan(bill.Coso)
            const item = new HoaDon(bill.IDHoaDon, taiKhoan, sanBong, khungGio,
               bill.GiaoHuu, bill.Ngay,doiThu,bill.TongTien,bill.ThoiGianDat,bill.TrangThai);
            resultList.push(item);
        });
        
        return resultList
    }

    getBillById(idBill){
        return this.getAllBill()
            .then(allBill => allBill.find(bill => bill.idBill === idBill))
            .catch(error => {
                console.error(error);
            });
        
    }

    //Tấn - Start
    // GetHoaDonsCompleteByNgaySan(day,idSan) {
    //     return axios.post("http://localhost:8081/getHoaDonsCompleteByNgaySan", {Ngay: day, IDSan: idSan})
    //         .then(response => {
    //             const list = this.initBill(response.data);               
    //             return list;
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    GetHoaDonsCompleteByNgayKG(day,idKhungGio, idTK) {
        return axios.post("http://localhost:8081/getHoaDonsCompleteByNgayKGTK", {Ngay: day, IDKhungGio: idKhungGio, IDTaiKhoan: idTK})
            .then(response => {
                const list = this.initBill(response.data);                  
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }
    //Tấn - End
    
    getBillByIdCoSo(idCoSo){
        return axios.post("http://localhost:8081/getAllHoaDonCompletedByCoSo",{IDTaiKhoan:idCoSo})
        .then(response => {
            const list = this.initBill(response.data);    
            return list;
        })
        .catch(error => {
            console.error(error);
        });

    }

    GetNotEmptyKhungGioByIDSanANDDate(idSan, date){
        return axios.post("http://localhost:8081/getNotEmptyKhungGioByIDnDate", {IdSan: idSan, Date : date})
            .then(response => {
                const list = this.initBill(response.data);   
                return list;
            })
            .catch(error => {
                console.error(error);
            });
        }
    getBillForRefund(idCoSo){
        return axios.post("http://localhost:8081/getAllBillForRefund",{IDTaiKhoan:idCoSo})
        .then(response => {
            const list = this.initBill(response.data);    
            return list;
        })
        .catch(error => {
            console.error(error);
        });
    }

    UpdateBillDoiThuByIdBill(IDDoiThu,IDHoaDon)
    {
        return axios.post("http://localhost:8081/updateDoiThuInBill",{IDDoiThu,IDHoaDon})
        .then(response => {
            return "yeah"
        })
        .catch(error => {
            console.log(error)
        });
    }

    

}
export default HoaDon
