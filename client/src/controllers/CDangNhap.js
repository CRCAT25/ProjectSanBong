import { useEffect, useState } from "react"
import axios from 'axios'
import Account from "../models/Account"

const Login = async (userName, passWord) =>{
    const user = new Account();
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