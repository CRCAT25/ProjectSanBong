import { useEffect, useState } from "react"
import axios from 'axios'
import FootballField from "../models/SanBong";
import SanBong from "../models/SanBong";
import LoaiSan from "../models/LoaiSan";
import KhungGio from "../models/KhungGio";


const GetAllSanFromCoSo = async (idCoSo) =>{
    const sanBong = new SanBong();
    let lstSanBong = await sanBong.GetAllSanByTaiKhoan(idCoSo)
    return lstSanBong
}
const GetInfoSanBong = async (idSan) =>{
    const sanBong = new SanBong();
    let result = await sanBong.FindSanByID(idSan)
    return result
}

const GetTenLoaiSan = async (idLoaiSan) => {
    const loaiSan = new LoaiSan()
    let result
    result = await loaiSan.GetLoaiSan(idLoaiSan)
    return result.TenLoaiSan
} 

const getAllKhungGio = async () =>{
    const khungGio = new KhungGio()
    let list = await khungGio.GetAllKhungGio()
    return list
    
 }
export{ 
    GetAllSanFromCoSo,
    GetInfoSanBong,
    GetTenLoaiSan,
    getAllKhungGio
} 
