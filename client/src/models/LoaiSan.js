import axios from 'axios';
class LoaiSan {
    constructor(idLoaiSan, tenLoaiSan, giaTien){
        this.IdLoaiSan = idLoaiSan;
        this.TenLoaiSan = tenLoaiSan;
        this.GiaTien = giaTien;
    }
    GetAllLoaiSan() {
        return axios.post("http://localhost:8081/getAllLoaiSan", {})
            .then(response => {
                const list = this.initLoaiSan(response.data);
                return list
            })
            .catch(error => {
                console.error(error);
            });
    }
    GetLoaiSan(idLoaiSan) {
        return axios.post("http://localhost:8081/getLoaiSanByID", {
            IdLoaiSan : idLoaiSan
        })
            .then(loaisan => {
                console.log(idLoaiSan)
                const loaiSan = new LoaiSan(loaisan.data[0].IDLoaiSan, loaisan.data[0].TenLoaiSan, loaisan.data[0].GiaTien);
                return loaiSan
            }).catch(error => {
                console.error(error);
            });
    }

    GetLoaiSanByID(id) {
        return axios.post("http://localhost:8081/getLoaiSanByID", {id})
            .then(response => {
                console.log(response.data)
                const loaiSan =  new LoaiSan(response.data[0].IDLoaiSan, response.data[0].TenLoaiSan, response.data[0].GiaTien)
                return loaiSan
            })
            .catch(error => {
                console.error(error);
            });
    }
    initLoaiSan(list){
        const resultList = [];
        list.forEach(loaisan => {
            const item = new LoaiSan(loaisan.IDLoaiSan, loaisan.TenLoaiSan, loaisan.GiaTien);
            resultList.push(item);
        });
        return resultList
    }

    getLoaiSanByID = (idSan) =>{
        return axios.post("http://localhost:8081/getLoaiSanByID",{idSan}).then(response => {
            const itemCoSo = new LoaiSan(response.data[0].IdLoaiSan, response.data[0].TenLoaiSan, response.data[0].GiaTien);
            return itemCoSo
        })
        .catch(error => {console.error(error);}
        )}
}
export default LoaiSan