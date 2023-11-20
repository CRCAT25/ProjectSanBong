import axios from "axios"
class Account {
    constructor (idAccount, idPhanQuyen, ten, email, soDienThoai, nganHang, sTK, matKhau, xacThuc) {
        this.IdAccount = idAccount;
        this.IdPhanQuyen = idPhanQuyen;
        this.Ten = ten;
        this.Email = email;
        this.SoDienThoai = soDienThoai;
        this.NganHang = nganHang;
        this.STK = sTK;
        this.MatKhau = matKhau;
        this.XacThuc = xacThuc;
    }

    // LoginUser(userName, passWord) {
    //     return axios.post("http://localhost:8081/loginUser", {
    //         userName : userName,
    //         passWord : passWord
    //     })
    //         .then(response => {
    //             // const account = new Account(response.data[0].IDTaiKhoan, response.data[0].IDPhanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].NganHang, response.data[0].STK, response.data[0].MatKhau, response.data[0].XacThuc);
    //             // return account
    //             console.log(response.data[0].IDTaiKhoan)

    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }

    LoginUser = (userName, passWord) =>{
        return axios.post("http://localhost:8081/loginUser",{
                userName : userName,
                passWord : passWord
            }).then(response => {
                const itemCoSo = new Account(response.data[0].IDTaiKhoan, response.data[0].IDPhanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].NganHang, response.data[0].STK, response.data[0].MatKhau, response.data[0].XacThuc);
                return itemCoSo
            })
            .catch(error => {
            console.error(error);
        })
    }

    NameUser(idlogin){
        return axios.post("http://localhost:8081/searchtentk",{idlogin}
        ).then(response => {
            
                return response.data[0]
            })
            .catch(error => {
            console.error(error);
        })
    }


    
}
export default Account