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
            
            const taiKhoan = (new TaiKhoan).getTKByID(bill.IDTaiKhoan)
            const khungGio = (new KhungGio).getKhungGioById(bill.IDKhungGio)
            let doiThu=null
            if(bill.IDDoiThu){
                doiThu = (new TaiKhoan).getTKByID(bill.IDDoiThu)
            }
            const sanBong = (new SanBong).getSanByID(bill.IDSan)
            const item = new HoaDon(bill.IDHoaDon, taiKhoan, sanBong, khungGio,
               bill.Ngay, bill.GiaoHuu,doiThu,bill.TongTien,bill.ThoiGianDat,bill.TrangThai);            
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

    getPersonalLichFromBillByIdTK(IDTaiKhoan, GiaoHuu)
    {
        // console.log(IDTaiKhoan+"   "+ GiaoHuu)
        return axios.post("http://localhost:8081/getPersonalLichFromBillByIdTK",{IDTaiKhoan,GiaoHuu})
        .then(response => {
            // console.log(response.data)
            const list = this.initBill(response.data);               
            return list;
        })
        .catch(error => {
            console.log(error)
        });
    }

    selectTop5InHoaDon(IDTaiKhoan){
        return axios.post("http://localhost:8081/selectTop5InHoaDon",{IDTaiKhoan:IDTaiKhoan})
        .then(response => {
            const list = this.initBill(response.data);    
            return (list);
        })
        .catch(error => {
            console.error(error);
        });

    }

}
export default HoaDon
