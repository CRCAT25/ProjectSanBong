
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

const updateTkByIdTK = async( Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK)=>{
    const user = new TaiKhoan()
    user.UpdateUserInfo(Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK)
    getTKUserByIdTK(idTK)
}

export{
    getTKCoSoByIdTK,
    getTKUserByIdTK,
    updateTkByIdTK
}
