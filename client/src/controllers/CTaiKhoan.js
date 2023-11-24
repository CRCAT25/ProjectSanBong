
import React from 'react'
import axios from 'axios'
import TaiKhoan from "../models/TaiKhoan";
import CoSoSan from "../models/CoSoSan";

const getTKCoSoByIdTK = async (idTK) =>{
    const coSo = new CoSoSan()
    let list = coSo.GetInfoCoSoSan(idTK)
    return list
}


const getTKUserByIdTK = async (idTK) =>{
    const user = new TaiKhoan()
    let list = user.getTKByID(idTK)
    return list
}

export{
    getTKCoSoByIdTK,
    getTKUserByIdTK,
}
