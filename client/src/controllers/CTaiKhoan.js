
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
    const user = new CoSoSan()
    let list = user.GetInfoCoSoSan(idTK)
    console.log(list)
    return list
}

const updateTkByIdTK = async(Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK)=>{
    const user = new TaiKhoan()
    // console.log(Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK+"CCCCC")
    user.UpdateUserInfo(Ten,Email,SoDienThoai,DiaChiCoSo,NganHang,STK,Anh,idTK)
}

export{
    getTKCoSoByIdTK,
    getTKUserByIdTK,
    updateTkByIdTK
}
