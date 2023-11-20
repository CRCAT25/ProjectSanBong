import axios from 'axios';
class KhungGio{
    constructor(idKhungGio, thoiGian, giaTien){
        this.IdKhungGio = idKhungGio;
        this.ThoiGian = thoiGian;
        this.GiaTien = giaTien;
    }
    GetAllKhungGio() {
        return axios.post("http://localhost:8081/getAllKhungGio", {})
            .then(response => {
                const list = this.initKhungGio(response.data);
                return list
            })
            .catch(error => {
                console.error(error);
            });
    }
    // GetKhungGioByDay(day) {
    //     return axios.post("http://localhost:8081/GetKhungGioByDay",{})
    //         .then(response => {
    //             const list = this.initKhungGio(response.data);
    //             return list
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    initKhungGio(list){
        const resultList = [];
        list.forEach(khungGio => {
            const item = new KhungGio(khungGio.IDKhungGio, khungGio.ThoiGian, khungGio.GiaTien);
            resultList.push(item);
        });
        
        return resultList
    }
    GetShiftByID(id) {
        return axios.post("http://localhost:8081/getShiftByID", {id})
            .then(response => {
                const khungGio =  new KhungGio(response.data[0].IDKhungGio, response.data[0].ThoiGian, response.data[0].GiaTien)
                return khungGio
            })
            .catch(error => {
                console.error(error);
            });
    }
    getKhungGioById(idKhungGio){
        return this.getAllKhungGio()
            .then(allKhungGio => allKhungGio.find(khungGio => khungGio.IdKhungGio === idKhungGio))
            .catch(error => {
                console.error(error);
            });
        
    }
}
export default KhungGio