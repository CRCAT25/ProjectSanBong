import axios from "axios";
class AnhSan{
    constructor(idAnh, idSan, anh){
        this.IdAnh = idAnh;
        this.IdSan = idSan;
        this.Anh = anh;
    }
    GetAnhsByIDSan(id) {
        return axios.post("http://localhost:8081/getAnhsByIDSan", {IDSan:id})
            .then(response => {
                const list = this.initAnh(response.data);
                
                return list
            })
            .catch(error => {
                console.error(error);
            });
    }
    InsertAnh(IDSan, Anh) {
        return axios.post("http://localhost:8081/insertAnh", {IDSan, Anh})
            .then(response => {
                
            })
            .catch(error => {
                console.error(error);
            });
    }
    initAnh(data){
        let list =[]
        data.map(anh=>{
            list.push(new AnhSan(anh.IDAnh,anh.IDSan,anh.Anh))
        })
        return list
    }
}
export default AnhSan