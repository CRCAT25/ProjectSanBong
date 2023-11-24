import TaiKhoan from "../models/TaiKhoan"

const CheckInput = (name, email, resEmail, pass, resPass, sdt) => {
    if(name == '' || email == '' || resEmail == '' || pass == '' || resPass == '' || sdt == '')
        return false
    else return true
}

const CheckAccount = async (name, email, resEmail, pass, resPass, sdt) => {
    const user = new TaiKhoan();
    if(CheckInput(name, email, resEmail, pass, resPass, sdt) == true){
        const authUser = await user.CheckEmailSdt(email, sdt);
        if(authUser === "da co")
            return "Tai khoan da ton tai"
        else return "Tai khoan chua ton tai"
    }
    else{
        return "chuaNhap"
    } 
}

const SignUp = async (name, email, resEmail, pass, resPass, sdt) =>{
    const user = new TaiKhoan();
    if(CheckAccount(name, email, resEmail, pass, resPass, sdt) == "Tai khoan chua ton tai"){
        const authUser = await user.SignUp(name, email, pass, sdt);
        // if(authUser == null || authUser == ''){
        //     return "khong"
        // }
        // else{
        //     return authUser
        // }
        console.log(authUser)
    }
    else{
        return "chuaNhap"
    } 
}

export {
    CheckAccount,
    SignUp
}