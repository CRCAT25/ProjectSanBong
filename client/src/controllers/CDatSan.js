import { useEffect, useState } from "react"
import axios from 'axios'
import SanBong from "../models/SanBong";
import LoaiSan from "../models/LoaiSan";
import KhungGio from "../models/KhungGio";
import HoaDon from "../models/HoaDon";


const GetAllSanFromCoSo = async (idCoSo) =>{
    const sanBong = new SanBong();
    let lstSanBong = await sanBong.GetAllSanByTaiKhoan(idCoSo)
    return lstSanBong
}
const GetAllSanFromCoSoBySearch = async (idCoSo, loaiSan) =>{
    const sanBong = new SanBong();
    let lstSanBong = await sanBong.FindSanByIDnCate(idCoSo, loaiSan)
    return lstSanBong
}
const GetInfoSanBong = async (idSan) =>{
    const sanBong = new SanBong();
    let result = await sanBong.getSanByID(idSan)
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

const getAllOccuredKhungGio = async(idSan, date) =>{
    const khungGioNotEmpty = new HoaDon()
    let notEmptykhunggios = await khungGioNotEmpty.GetNotEmptyKhungGioByIDSanANDDate(idSan, date)

    return notEmptykhunggios
}

const DatSan = async (IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien) =>{
    const sanbong = new SanBong()
    sanbong.DatSan(IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien)
}
export{ 
    GetAllSanFromCoSo,
    GetInfoSanBong,
    GetTenLoaiSan,
    getAllKhungGio,
    getAllOccuredKhungGio,
    GetAllSanFromCoSoBySearch,
    DatSan
} 
