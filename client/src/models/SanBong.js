import axios from 'axios';
import LoaiSan from "./LoaiSan"
import CoSoSan from "./CoSoSan"
import PhanQuyen from './PhanQuyen';
import HoaDon from './HoaDon';
class SanBong{
    constructor(idSan, taiKhoan, loaiSan, tenSan, trangThai){
        this.IdSan = idSan;
        this.TaiKhoan = taiKhoan;   
        this.LoaiSan = loaiSan;
        this.TenSan = tenSan;
        this.TrangThai = trangThai;
    }
    GetAllSanByTaiKhoan(id) {
        return axios.post("http://localhost:8081/getAllSanByTaiKhoan", {IDTaiKhoan: id})
            .then(response => {
                const list = this.initSan(response.data);
                return list
            })
            .catch(error => {
                console.error(error);
            });
    }
       

    getSanByID(idSan) {
        return axios.post("http://localhost:8081/getSanByID", {IdSan: idSan})
            .then(response => {
                let data = response.data[0]
                const phanQuyen = new PhanQuyen(data.IDPhanQuyen,data.TenPhanQuyen)
                const coSoSan = new CoSoSan(data.IDTaiKhoan, phanQuyen, data.Ten, data.Email, data.SoDienThoai, data.DiaChiCoSo, data.NganHang, data.STK, data.Anh, data.MatKhau, data.XacThuc)
                const loaiSan = new LoaiSan(data.IDLoaiSan, data.TenLoaiSan,data.GiaTien)
                const sanBong = new SanBong(data.IDSan, coSoSan, loaiSan, data.TenSan, data.TrangThai);
                return sanBong
            });
    }
    
    GetFieldByIDField(idField) {
        return axios.post("http://localhost:8081/getFieldByIDField", {IdSan: idField})
            .then(response => {
                let data = response.data[0]
                const phanQuyen = new PhanQuyen(data.IDPhanQuyen,data.TenPhanQuyen)
                const coSoSan = new CoSoSan(data.IDTaiKhoan, phanQuyen, data.Ten, data.Email, data.SoDienThoai, data.DiaChiCoSo, data.NganHang, data.STK, data.Anh, data.MatKhau, data.XacThuc)
                const loaiSan = new LoaiSan(data.IDLoaiSan, data.TenLoaiSan,data.GiaTien)
                const field = new SanBong(data.IDSan, coSoSan, loaiSan, data.TenSan, data.TrangThai);
                return field
            })
            .catch(error => {
                console.error(error);
            });
    }

    FindSanByIDnCate(IdCoSo, loaiSan) {
        return axios.post("http://localhost:8081/getSanByIDnCate", {IDCoSo: IdCoSo, IDLoaiSan : loaiSan})
            .then(response => {
                const list = this.initSan(response.data);
                return list
            })
            .catch(error => {
                console.error(error);
            });
    }

    DatSan(IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien){
        return axios.post("http://localhost:8081/datSan", {IDTaiKhoan: IDTaiKhoan, IDSan : IDSan, IDKhungGio : IDKhungGio, Ngay : Ngay, GiaoHuu : GiaoHuu, TongTien : TongTien})
            .then(response => {
                return response.data[0].IDHoaDon
            })
            .catch(error => {
                console.error(error);
            });
    }

    HuyDatSan(IDHoaDon){
        return axios.post("http://localhost:8081/huyDatSan", {IDHoaDon: IDHoaDon})
            .then(response => {
                
            })
            .catch(error => {
                console.error(error);
            });
    }

    DatCoc(IDHoaDon){
        return axios.post("http://localhost:8081/DatCoc", {IDHoaDon: IDHoaDon})
            .then(response => {
                
            })
            .catch(error => {
                console.error(error);
            });
    }
    InsertSan(iDTaiKhoan, loaiSan, tenSan, anhs){
        return axios.post("http://localhost:8081/InsertSan", {IDTaiKhoan: iDTaiKhoan, IDLoaiSan : loaiSan, TenSan : tenSan, Anhs : anhs})
            .then(response => {})
            .catch(error => {
                console.error(error);
            });
    }
    initSan(list){
        const resultList = [];
        list.forEach(data => {
            const phanQuyen = new PhanQuyen(data.IDPhanQuyen,data.TenPhanQuyen)
            const coSoSan = new CoSoSan(data.IDTaiKhoan, phanQuyen, data.Ten, data.Email, data.SoDienThoai, data.DiaChiCoSo, data.NganHang, data.STK, data.Anh, data.MatKhau, data.XacThuc)
            const loaiSan = new LoaiSan(data.IDLoaiSan, data.TenLoaiSan,data.GiaTien)
            const item = new SanBong(data.IDSan, coSoSan, loaiSan, data.TenSan, data.TrangThai);
            resultList.push(item);
        });
        return resultList
    }
    
}

export default SanBong