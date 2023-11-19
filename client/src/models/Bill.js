import axios from "axios";
class Bill{
    constructor(idHoaDon, idTaiKhoan, idSan, idKhungGio, ngay, giaoHuu, idDoiThu, tongTien, thoiGianDat, trangThai){
        this.IDHoaDon = idHoaDon;
        this.IDTaiKhoan = idTaiKhoan;
        this.IDSan = idSan;
        this.IDKhungGio = idKhungGio;
        this.Ngay = ngay;
        this.GiaoHuu = giaoHuu;
        this.IDDoiThu = idDoiThu;
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
            const item = new Bill(bill.IDHoaDon, bill.IDTaiKhoan, bill.IDSan, bill.IDKhungGio,
               bill.GiaoHuu, bill.Ngay,bill.IDDoiThu,bill.TongTien,bill.ThoiGianDat,bill.TrangThai);
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

    }

}
export default Bill
