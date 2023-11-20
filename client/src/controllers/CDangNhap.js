import { useEffect, useState } from "react"
import axios from 'axios'
import TaiKhoan from "../models/TaiKhoan"

const Login = async (userName, passWord) =>{
    const user = new TaiKhoan();
    let MSGno = "khong"
    let MSGco = "co"
    const authUser = await user.LoginUser(userName, passWord);
    console.log(authUser)
    if(authUser == null || authUser == ''){
        return MSGno
    }
    else{
        return MSGco
    }
    // console.log(authUser)
}

export{
    Login
} 