import axios from "axios";
import Account from "./Account";
class CoSoSan extends Account{
    constructor(idAccount, idPhanQuyen, tenCoSo, email, soDienThoai, diaChiCoSo, nganHang, sTK, anh, matKhau, xacThuc){
        super(idAccount, idPhanQuyen, tenCoSo, email, soDienThoai, nganHang, sTK, matKhau, xacThuc)
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
                const itemCoSo = new CoSoSan(response.data[0].IDTaiKhoan, response.data[0].IDPhanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].DiaChiCoSo, response.data[0].NganHang, response.data[0].STK, response.data[0].Anh, response.data[0].MatKhau, response.data[0].XacThuc);
                return itemCoSo
            })
            .catch(error => {
            console.error(error);
        })
    }

    initCoSo(listCoSo){
        const coSoList = [];
        listCoSo.forEach(coso => {
            const itemCoSo = new CoSoSan(coso.IDTaiKhoan, coso.IDPhanQuyen, coso.Ten, coso.Email, coso.SoDienThoai, coso.DiaChiCoSo, coso.NganHang, coso.STK, coso.Anh, coso.MatKhau, coso.XacThuc);
            coSoList.push(itemCoSo);
        });
        return coSoList
    }
}

export default CoSoSan