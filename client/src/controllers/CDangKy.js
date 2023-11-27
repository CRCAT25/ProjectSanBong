import TaiKhoan from "../models/TaiKhoan"

// Kiểm tra đầu vào đăng ký user
const CheckInput = (name, email, resEmail, pass, resPass, sdt) => {
    if (name == '' || email == '' || resEmail == '' || pass == '' || resPass == '' || sdt == '')
        return false
    else return true
}

// Kiểm tra email và resEmail
const CheckEmail = (email, resEmail) => email === resEmail;

// Kiểm tra password và resPassword
const CheckPass = (pass, resPass) => pass === resPass;

// Kiểm tra format của email
const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (emailPattern.test(email));
};

// Kiểm tra format của sdt
const validatePhone = (phone) => {
    const phonePattern = /^\d{10,11}$/;
    return (phonePattern.test(phone));
};

// Kiểm tra tài khoản đã tồn tại hay chưa
const CheckAccount = async (name, email, resEmail, pass, resPass, sdt) => {
    const user = new TaiKhoan();
    if (CheckInput(name, email, resEmail, pass, resPass, sdt) == true) {
        const authUser = await user.CheckEmailSdt(email, sdt);
        console.log(authUser)
        if (authUser == "da co")
            return "Tai khoan da ton tai"
        else return "Tai khoan chua ton tai"
    }
    else {
        return "chuaNhap"
    }
}

// Đăng ký
const SignUp = async (name, email, resEmail, pass, resPass, sdt) => {
    const user = new TaiKhoan();
    if (await CheckAccount(name, email, resEmail, pass, resPass, sdt) === "Tai khoan chua ton tai") {
        if (!CheckEmail) return "email khong khop"
        else if (!CheckPass) return "matkhau khong khop"
        else if (!validateEmail(email)) return "email khong dung format"
        else if (!validatePhone(sdt)) return "sdt khong dung format"
        else {
            const authUser = await user.DangKy(name, email, pass, sdt);
            return authUser
        }
    }
    else if (await CheckAccount(name, email, resEmail, pass, resPass, sdt) === "Tai khoan da ton tai") {
        return "ton tai"
    }
    else {
        return "nhap thieu"
    }
}

export {
    CheckAccount,
    SignUp
}