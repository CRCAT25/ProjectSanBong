import axios from "axios";
import TaiKhoan from "./TaiKhoan";
import PhanQuyen from "./PhanQuyen";
class CoSoSan extends TaiKhoan{
    constructor(idAccount, phanQuyen, tenCoSo, email, soDienThoai, diaChiCoSo, nganHang, sTK, anh, matKhau, trangThai){
        super(idAccount, phanQuyen, tenCoSo, email, soDienThoai, nganHang, sTK, matKhau, trangThai)
        this.DiaChiCoSo = diaChiCoSo;
        this.Anh = anh;
    }
    GetAllCoSo() {
        return axios.post("http://localhost:8081/getAllCoSo", {})
            .then(response => {
                const listCoSo = this.initCoSo(response.data);
                return listCoSo
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    TimKiemSanBong(tenCoSo, diaDiem) {
        return axios.post("http://localhost:8081/getCoSoBySearch", {
            tenCoSo : tenCoSo,
            diaDiem : diaDiem
            })
            .then(response => {
                const listCoSo = this.initCoSo(response.data);
                return listCoSo
            })
            .catch(error => {
            console.error(error);
        });
    }

    GetInfoCoSoSan = (idCoSo) =>{
        return axios.post("http://localhost:8081/getInfoCoSo",{
                idCoSo: idCoSo
            }).then(response => {
                const phanQuyen = new PhanQuyen(response.data[0].IDPhanQuyen, response.data[0].TenPhanQuyen)
                const itemCoSo = new CoSoSan(response.data[0].IDTaiKhoan, phanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].DiaChiCoSo, response.data[0].NganHang, response.data[0].STK, response.data[0].Anh, response.data[0].MatKhau, response.data[0].TrangThai);
                return itemCoSo
            })
            .catch(error => {
            console.error(error);
        })
    }

    SearchEmailSdt = (phanquyen, search) =>{
        return axios.post("http://localhost:8081/searchemailsdt",{phanquyen, search}
        ).then(response => {
            let list = []
            list.push(response.data)
            if(list.length >= 1 && list[0][0]){
                const phanQuyen = new PhanQuyen(response.data[0].IDPhanQuyen, response.data[0].TenPhanQuyen)
                const itemCoSo = new CoSoSan(response.data[0].IDTaiKhoan, phanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].DiaChiCoSo, response.data[0].NganHang, response.data[0].STK, response.data[0].Anh, response.data[0].MatKhau, response.data[0].TrangThai);
                return itemCoSo
            }
            else{
                return null
            }
            })
            .catch(error => {
            console.error(error);
        })  
    }

    initCoSo(listCoSo){
        const coSoList = [];
        listCoSo.forEach(coso => {
            const phanQuyen = new PhanQuyen(coso.IDPhanQuyen, coso.TenPhanQuyen)
            const itemCoSo = new CoSoSan(coso.IDTaiKhoan, phanQuyen, coso.Ten, coso.Email, coso.SoDienThoai, coso.DiaChiCoSo, coso.NganHang, coso.STK, coso.Anh, coso.MatKhau, coso.TrangThai);
            coSoList.push(itemCoSo);
        });
        return coSoList
    }
}

export default CoSoSan