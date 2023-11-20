import axios from "axios";
class LichGiaoHuu{
    constructor(idBill, idTaiKhoan, idTen, soDienThoai, coSo, diaChiCoSo, maSan, ngay,thoiGian){
        this.IDBill = idBill;
        this.IDTaiKhoan = idTaiKhoan;
        this.IDNgDat = idTen;
        this.SoDienThoai = soDienThoai;
        this.TenCoSo = coSo;
        this.DiaChiCoSo = diaChiCoSo;
        this.MaSan = maSan;
        this.Ngay = ngay;
        this.ThoiGian = thoiGian;
    }

    getAllLichGiaoHuu() {
        return axios.post("http://localhost:8081/getAllLichGiaoHuu", {})
            .then(response => {
                const list = this.initLichGiaoHuu(response.data);        
                return list;
            })
            .catch(error => {
                console.error(error);
            });
    }
    initLichGiaoHuu(list){
        const resultList = [];
        list.forEach(lich => {
            const item = new LichGiaoHuu(lich.IDHoaDon, lich.IDTaiKhoan, lich.Ten, lich.SoDienThoai,
                lich.CoSo, lich.DiaChiCoSo,lich.MaSan,lich.Ngay,lich.ThoiGian);
            resultList.push(item);
        });
        return resultList
    }

    getLichById(idBill){
        return this.getAllBill()
            .then(allBill => allBill.find(bill => bill.idBill === idBill))
            .catch(error => {
                console.error(error);
            });
        
    }
}
export default LichGiaoHuu