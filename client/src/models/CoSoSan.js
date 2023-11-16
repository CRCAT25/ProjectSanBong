import axios from "axios";
import Account from "./Account";
class CoSoSan extends Account{
    constructor(idAccount, idPhanQuyen, ten, email, soDienThoai, tenCoSo, diaChiCoSo, nganHang, sTK, matKhau, xacThuc){
        super(idAccount, idPhanQuyen, ten, email, soDienThoai, nganHang, sTK, matKhau, xacThuc)
        this.TenCoSo = tenCoSo;
        this.DiaChiCoSo = diaChiCoSo;
    }
    GetAllCoSo() {
        axios.post("http://localhost:8081/getAllCoSo", {})
            .then(response => {
                const listCoSo = this.initCoSo(response.data);
                console.log(response.data);
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
            console.log(response.data)
            return listCoSo;
        })
        .catch(error => {
        console.error(error);
        });
    }

    initCoSo(listCoSo){
        const coSoList = [];
        listCoSo.forEach(coso => {
            const itemCoSo = new CoSoSan(coso.idAccount, coso.idPhanQuyen, coso.ten, coso.email, coso.soDienThoai, coso.tenCoSo, coso.diaChiCoSo, coso.nganHang, coso.sTK, coso.matKhau, coso.xacThuc);
            coSoList.push(itemCoSo);
        });
        return coSoList
    }
}

export default CoSoSan