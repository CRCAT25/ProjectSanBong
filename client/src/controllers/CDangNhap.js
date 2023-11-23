import TaiKhoan from "../models/TaiKhoan"

const CheckInput = (userName, passWord) => {
    if(userName.length == 0 || userName == '' || passWord.length == 0 || passWord == '')
        return false
    else return true
}

const Login = async (userName, passWord) =>{
    const user = new TaiKhoan();
    if(CheckInput(userName, passWord) == true){
        const authUser = await user.LoginUser(userName, passWord);
        if(authUser == null || authUser == ''){
            return "khong"
        }
        else{
            return authUser
        }
    }
    else{
        return "khong"
    } 
}

export{
    Login
} 