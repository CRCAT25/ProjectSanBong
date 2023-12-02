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

    getAllLichGiaoHuu() {
        return axios.post("http://localhost:8081/getLichGiaoHuuToMatch", {})
            .then(response => {
                const list = this.initBill(response.data);              
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }

    getBillById(IDHoaDon){
        return axios.post("http://localhost:8081/getBillByIDBill", {IDHoaDon: IDHoaDon})
            .then(response => {
                const list = this.initBill(response.data);    
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }

    huySanByID(IDHoaDon){
        return axios.post("http://localhost:8081/huyLichDaDat", {IDHoaDon: IDHoaDon})
            .then(response => {
                return true
            })
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
    GetBusyHoaDonsByNgayKGTTSan(day,idKhungGio, idTK) {
        return axios.post("http://localhost:8081/getBusyHoaDonsByNgayKGTKTTSan", {Ngay: day, IDKhungGio: idKhungGio, IDTaiKhoan: idTK})
            .then(response => {
                const list = this.initBill(response.data);                  
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }getHoaDonsByNgayKGIDSan
    GetHoaDonsByNgayKGTTSanIDSan(day,idKhungGio, idTK, idSan) {
        return axios.post("http://localhost:8081/getHoaDonsByNgayKGTKTTSanIDSan", {Ngay: day, IDKhungGio: idKhungGio, IDTaiKhoan: idTK, IDSan:idSan})
            .then(response => {
                const list = this.initBill(response.data);                  
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }
    GetHoaDonsByNgayKGIDSan(day,idKhungGio, idSan) {
        return axios.post("http://localhost:8081/getHoaDonsByNgayKGIDSan", {Ngay: day, IDKhungGio: idKhungGio, IDSan:idSan})
            .then(response => {
                const list = this.initBill(response.data);                  
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }
    InsertHoaDon(IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien){
        return axios.post("http://localhost:8081/insertHoaDon", {IDTaiKhoan, IDSan ,  IDKhungGio,  Ngay,  GiaoHuu, TongTien})
            .then(response => {
            })
            .catch(error => {
                console.error(error);
            });
    }
    UpdateHoaDon(IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien, IDHoaDon){
        return axios.post("http://localhost:8081/updateHoaDon", {IDSan ,  IDKhungGio,  Ngay,  GiaoHuu, TongTien,  IDHoaDon})
            .then(response => {
            })
            .catch(error => {
                console.error(error);
            });
    }
    UpdateTTHoaDon(TrangThai, IDHoaDon){
        return axios.post("http://localhost:8081/updateTTHoaDon", {TrangThai, IDHoaDon})
            .then(response => {
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

    getAllBillByIdTk(IDTaiKhoan)
    {
        // console.log(IDTaiKhoan+"   "+ GiaoHuu)
        return axios.post("http://localhost:8081/getAllBillByIdTk",{IDTaiKhoan})
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

    GetAllBillComplete() {
        return axios.post("http://localhost:8081/getallbillcomplete", {})
            .then(response => {
                const list = this.initBill(response.data);    
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }

    SearchHoaDonByDateAdmin(search, date) {
        return axios.post("http://localhost:8081/searchemailsdthdadmin", {search, date})
            .then(response => {
                const list = this.initBill(response.data);    
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }

}
export default HoaDon
