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
                // Do something with listCoSo if needed
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    TimKiemSanBong(tenCoSo, diaChiCoSo) {
        axios.post("http://localhost:8081/getAllCoSo", {
        })
        .then(response => {
            const listCoSo = this.initCoSo(response.data);
            console.log(listCoSo)
            return listCoSo;
        })
        .catch(error => {
        console.error(error);
        });
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