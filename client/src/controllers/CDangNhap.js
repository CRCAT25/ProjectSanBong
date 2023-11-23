import TaiKhoan from "../models/TaiKhoan"

const CheckInputSignIn = (userName, passWord) => {
    if(userName.length == 0 || userName == '' || passWord.length == 0 || passWord == '')
        return false
    else return true
}

const CheckInputResPass = (name, email, sdt) => {
    if(email == '' || name == '' || sdt == '' )
        return false
    else return true
}

const CheckInputNewPass = (email, pass, resPass) => {
    if(email == '' || pass == '' || resPass == '' )
        return false
    else if(pass !== resPass)
        return false
    else return true
}

const Login = async (userName, passWord) =>{
    const user = new TaiKhoan();
    if(CheckInputSignIn(userName, passWord) == true){
        const authUser = await user.LoginUser(userName, passWord);
        if(authUser == null || authUser == ''){
            return "khong"
        }
        else{
            return authUser
        }
    }
    else{
        return "chuaNhap"
    } 
}

const ResPass = async (name, email, sdt) =>{
    const user = new TaiKhoan();
    if(CheckInputResPass(name, email, sdt) == true){
        const authUser = await user.ResPassUser(name, email, sdt);
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