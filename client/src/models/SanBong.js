import axios from 'axios';
class SanBong{
    constructor(idSan, idTaiKhoan, idLoaiSan, tenSan, giaTien, trangThai){
        this.IdSan = idSan;
        this.IdTaiKhoan = idTaiKhoan;
        this.IdLoaiSan = idLoaiSan;
        this.TenSan = tenSan;
        this.GiaTien = giaTien;
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
    initSan(list){
        const resultList = [];
        list.forEach(san => {
            const item = new SanBong(san.IDSan, san.IDTaiKhoan, san.IDLoaiSan, san.TenSan, san.TrangThai);
            resultList.push(item);
        });
        return resultList
    }
}

export default SanBong