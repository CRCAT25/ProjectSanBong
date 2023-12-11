import TaiKhoan from "../models/TaiKhoan"

// Kiểm tra đầu vào đăng nhập
const CheckInputSignIn = (userName, passWord) => {
    if(userName.length == 0 || userName == '' || passWord.length == 0 || passWord == '')
        return false
    else return true
}

// Kiểm tra đầu vào thông tin tài khoản khôi phục
const CheckInputResPass = (name, email, sdt) => {
    if(email == '' || name == '' || sdt == '' )
        return false
    else return true
}

// Kiểm tra đầu vào mật khẩu khôi phục
const CheckInputNewPass = (email, pass, resPass) => {
    if(email == '' || pass == '' || resPass == '' )
        return false
    else if(pass !== resPass)
        return false
    else return true
}

// Đăng nhập
const Login = async (userName, passWord) =>{
    const user = new TaiKhoan();
    if(CheckInputSignIn(userName, passWord) == true){
        let authUser = await user.LoginUser(userName, passWord);
        if(authUser == null || authUser == ''){
            return "khong"
        }
        if(authUser == "vohieu") return "vohieu"
        else{
            return authUser
        }
    }
    else{
        return "chuaNhap"
    } 
}

// Check tính đúng sai của thông tin user muốn khôi phục
const ResPass = async (name, email, sdt) =>{
    const user = new TaiKhoan();
    if(CheckInputResPass(name, email, sdt) == true){
        const authUser = await user.CheckAccountUser(name, email, sdt);
        if(authUser == null || authUser == ''){
            return "khong"
        }
        else{
            return "co"
        }
    }
    else{
        return "khongNhap"
    } 
}

// Cập nhật mật khẩu
const UpdatePass = async (email, pass, resPass) =>{
    const user = new TaiKhoan();
    if(CheckInputNewPass(email, pass, resPass) == true){
        const authUser = await user.UpdatePassWord(email, pass);
        if(authUser == null || authUser == ''){
            return "khong"
        }
        else{
            return "co"
        }
    }
    else{
        return "khong"
    } 
}

export{
    Login,
    ResPass,
    UpdatePass
} 