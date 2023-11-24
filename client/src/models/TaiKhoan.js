import axios from "axios"
import PhanQuyen from "./PhanQuyen"
class TaiKhoan {
    constructor (idAccount, phanQuyen, ten, email, soDienThoai, nganHang, sTK, matKhau, xacThuc) {
        this.IdAccount = idAccount;
        this.PhanQuyen = phanQuyen;
        this.Ten = ten;
        this.Email = email;
        this.SoDienThoai = soDienThoai;
        this.NganHang = nganHang;
        this.STK = sTK;
        this.MatKhau = matKhau;
        this.XacThuc = xacThuc;
    }

    LoginUser = (userName, passWord) =>{
        return axios.post("http://localhost:8081/loginUser",{
                userName : userName,
                passWord : passWord
            }).then(response => {
                const phanQuyen = new PhanQuyen(response.data[0].IDPhanQuyen, response.data[0].TenPhanQuyen)
                const itemCoSo = new TaiKhoan(response.data[0].IDTaiKhoan, phanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].NganHang, response.data[0].STK, response.data[0].MatKhau, response.data[0].XacThuc);
                return itemCoSo
            })
            .catch(error => {
            console.error(error);
        })
    }

    ResPassUser = (Ten, Email, SoDienThoai) =>{
        return axios.post("http://localhost:8081/resPassUser",{
                Email : Email,
                Ten : Ten,
                SoDienThoai : SoDienThoai,
            }).then(response => {
                const itemCoSo = new TaiKhoan(response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai);
                return itemCoSo
            })
            .catch(error => {
            console.error(error);
        })
    }

    UpdatePassWord = (Email, Pass) =>{
        return axios.post("http://localhost:8081/updatePassWord",{
                Email : Email,
                Pass : Pass
            }).then(response => {
                if(response.data.length > 0){
                    return "done"
                }
            })
            .catch(error => {
            console.error(error);
        })
    }

    CheckEmailSdt = (Email, Sdt) =>{
        return axios.post("http://localhost:8081/checkEmailSdt",{
                Email : Email,
                Sdt : Sdt
            }).then(response => {
                return response.data
            })
            .catch(error => {
            console.error(error);
        })
    }

    DangKy = (Name, Email, Pass, SDT) =>{
        return axios.post("http://localhost:8081/signUpAccount",{
                Name : Name,
                Email : Email,
                Pass : Pass,
                SDT : SDT,
            }).then(response => {
                return response.data
            })
            .catch(error => {
            console.error(error);
        })
    }

    
    getTKByID = (idTK) =>{
        return axios.post("http://localhost:8081/getTKByID",{idTK}).then(response => {
            const phanQuyen = new PhanQuyen(response.data[0].IDPhanQuyen, response.data[0].TenPhanQuyen)
            const itemCoSo = new TaiKhoan(response.data[0].IDTaiKhoan, phanQuyen, response.data[0].Ten, 
                response.data[0].Email, response.data[0].SoDienThoai, response.data[0].NganHang, 
                response.data[0].STK, response.data[0].MatKhau, response.data[0].XacThuc);
            return itemCoSo
        })
        .catch(error => {console.error(error);}
        )}

    NameUser = (idlogin) =>{
        return axios.post("http://localhost:8081/searchtentk",{idlogin}
        ).then(response => {
                return response.data[0]
            })
            .catch(error => {
            console.error(error);
        })  
    }

    checkemailsdt = (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs) =>{
        return axios.post("http://localhost:8081/checkemailsdt",{email, sdt}
        ).then(response => {
            if(response.data =="Ok"){
                    this.addcoso(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs)
            }
            else{
                return response.data
            }
            })
            .catch(error => {
            console.error(error);
        })  
    }

    addcoso = (idphanquyen, tencs, emailcs, sdtcs, diachics, nganhangcs, stkcs, matkhaucs) =>{
        return axios.post("http://localhost:8081/addcoso",{idphanquyen, tencs, emailcs, sdtcs, diachics, nganhangcs, stkcs, matkhaucs}
        ).then(response => {
                return response.data
            })
            .catch(error => {
            console.error(error);
        })  
    }

}
export default TaiKhoan

   
