import TaiKhoan from "../models/TaiKhoan"
import Swal from 'sweetalert2'

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
const CheckAccount = async (email, sdt) => {
    const user = new TaiKhoan();
    const authUser = await user.CheckEmailSdt(email, sdt);
    return authUser
}

// Đăng ký
const SignUp = async (name, email, resEmail, pass, resPass, sdt) => {
    const user = new TaiKhoan();
    if (CheckInput(name, email, resEmail, pass, resPass, sdt) == true) {
        if (await CheckAccount(email, sdt) === "chua co") {
            if (!CheckEmail(email, resEmail)) {
                Swal.fire({
                    title: "Email nhập không trùng khớp",
                        icon: "error"
                    });
                document.getElementsByClassName("inputEmail")[0].value = ""
                document.getElementsByClassName("inputResEmail")[0].value = ""
                setTimeout(() => {
                    Swal.close();
                }, 600);
            }
            else if (!CheckPass(pass, resPass))
            {
                Swal.fire({
                    title: "Mật khẩu nhập không trùng khớp",
                    icon: "error"
                });
                setTimeout(() => {
                    Swal.close();
                }, 600);
            }
            else if (!validateEmail(email)){
                Swal.fire({
                    title: "Email không hợp lệ",
                    icon: "error"
                });
                document.getElementsByClassName("inputEmail")[0].value = ""
                document.getElementsByClassName("inputResEmail")[0].value = ""
                setTimeout(() => {
                    Swal.close();
                }, 600);
            }
            else if (!validatePhone(sdt)){
                Swal.fire({
                    title: "Số điện thoại không hợp lệ",
                    icon: "error"
                });
                document.getElementsByClassName("inputSdt")[0].value = ""
                setTimeout(() => {
                    Swal.close();
                }, 600);
            }
            else {
                await user.DangKy(name, email, pass, sdt);
                Swal.fire({
                    title: "Đăng ký thành công",
                    icon: "success"
                });
                setTimeout(() => {
                    Swal.close();
                    window.location.reload();
                }, 600);
            }
        }
        else if (await CheckAccount(email, sdt) === "da co") {
            Swal.fire({
                title: "Tài khoản đã tồn tại",
                icon: "error"
            });
            document.getElementsByClassName("inputEmail")[0].value = ""
            document.getElementsByClassName("inputResEmail")[0].value = ""
            document.getElementsByClassName("inputSdt")[0].value = ""
            setTimeout(() => {
                Swal.close();
            }, 600);
        }
    }
    else {
        Swal.fire({
            title: "Vui lòng nhập đầy đủ thông tin",
            icon: "error"
        });
        setTimeout(() => {
            Swal.close();
        }, 600);
        return;
    }

}

export {
    CheckAccount,
    SignUp
}