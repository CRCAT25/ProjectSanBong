import axios from "axios"
import PhanQuyen from "./PhanQuyen"
class TaiKhoan {
    constructor (idAccount, phanQuyen, ten, email, soDienThoai, nganHang, sTK, matKhau, trangThai) {
        this.IdAccount = idAccount;
        this.PhanQuyen = phanQuyen;
        this.Ten = ten;
        this.Email = email;
        this.SoDienThoai = soDienThoai;
        this.NganHang = nganHang;
        this.STK = sTK;
        this.MatKhau = matKhau;
        this.TrangThai = trangThai;
    }

    // Đăng nhập cho user
    LoginUser = (userName, passWord) =>{
        return axios.post("http://localhost:8081/loginUser",{
                userName : userName,
                passWord : passWord
            }).then(response => {
                const itemCoSo = new TaiKhoan(response.data[0].IDTaiKhoan, response.data[0].IDPhanQuyen, response.data[0].Ten, response.data[0].Email, response.data[0].SoDienThoai, response.data[0].NganHang, response.data[0].STK, response.data[0].MatKhau, response.data[0].TrangThai);
                console.log(itemCoSo)
                return itemCoSo
            })
            .catch(error => {
            console.error(error);
        })
    }

    // Kiểm tra user để khôi phục mật khẩu
    CheckAccountUser = (Ten, Email, SoDienThoai) =>{
        return axios.post("http://localhost:8081/checkAccountUser",{
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

    // Cập nhật mật khẩu mới
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

    // Kiểm tra tài khoản với email và sdt
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

    // Đăng ký cho user
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
                response.data[0].STK, response.data[0].MatKhau, response.data[0].TrangThai);
            return itemCoSo
        })
        .catch(error => {console.error(error);}
        )}


    ThemTaiKhoan = async (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs) => {
        console.log(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs);

        try {
            const ResultCheck = await this.QLCheckEmailSdt(email, sdt);
            if (ResultCheck === "Ok" && idphanquyen === 2) {
                const response = await axios.post("http://localhost:8081/addcoso", {idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs
                });

                return response.data;
            } else if (ResultCheck === "Ok" && idphanquyen === 1) {
            } else if (ResultCheck !== "Ok") {
                return ResultCheck;
            }
        } catch (error) {
            console.error(error);
        }
    };

    QLCheckEmailSdt = (email, sdt) =>{
        return axios.post("http://localhost:8081/QLcheckemailsdt",{email, sdt}
        ).then(response => {
                return response.data
            })
            .catch(error => {
            console.error(error);
        })  
    }

    ShowImgCoSo = (idtaikhoan) =>{
        return axios.post("http://localhost:8081/showimgcoso",{idtaikhoan}
        ).then(response => {
                return response.data[0]
            })
            .catch(error => {
            console.error(error);
        })  
    }

    SearchEmailSdta = (phanquyen, search) =>{
        return axios.post("http://localhost:8081/searchemailsdt",{phanquyen, search}
        ).then(response => {
            let list = []
            list.push(response.data)
            if(list.length >= 1 && list[0][0]){
            const phanQuyen = new PhanQuyen(response.data[0].IDPhanQuyen, response.data[0].TenPhanQuyen)
            const itemTK = new TaiKhoan(response.data[0].IDTaiKhoan, phanQuyen, response.data[0].Ten, 
                response.data[0].Email, response.data[0].SoDienThoai, response.data[0].NganHang, 
                response.data[0].STK, response.data[0].MatKhau, response.data[0].TrangThai);
                return itemTK
            } else{
                return null
            }
        })
    }
        
    UpdateUserInfo = (Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK) =>{
        return axios.post("http://localhost:8081/updatePersonalInfoByIdTK",{Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK
        }
        ).then(response => {
                return response.data[0]
            })
            .catch(error => {
            console.error(error);
        })  
    }
    

    

}
export default TaiKhoan

   
