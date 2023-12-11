import { useEffect, useState } from "react"
import axios from 'axios'
import SanBong from "../models/SanBong";
import LoaiSan from "../models/LoaiSan";
import KhungGio from "../models/KhungGio";
import HoaDon from "../models/HoaDon";
import CoSoSan from "../models/CoSoSan";
import AnhSan from "../models/AnhSan";

const sanBong = new SanBong();
const loaiSan = new LoaiSan();
const khungGio = new KhungGio();
const khungGioNotEmpty = new HoaDon();
const anh = new AnhSan();

const GetAllSanFromCoSo = async (idCoSo) =>{
    let lstSanBong = await sanBong.GetAllSanByTaiKhoan(idCoSo)
    return lstSanBong
}
const GetAllSanFromCoSoBySearch = async (idCoSo, loaiSan) =>{
    let lstSanBong = await sanBong.FindSanByIDnCate(idCoSo, loaiSan)
    return lstSanBong
}
const GetInfoSanBong = async (idSan) =>{
    let result = await sanBong.getSanByID(idSan)
    return result
}

const GetTenLoaiSan = async (idLoaiSan) => {
    let result
    result = await loaiSan.GetLoaiSanByID(idLoaiSan)
    return result.TenLoaiSan
} 

const getAllKhungGio = async () =>{
    let list = await khungGio.GetAllKhungGio()
    return list 
}

const getAllOccuredKhungGio = async(idSan, date) =>{
    let notEmptykhunggios = await khungGioNotEmpty.GetNotEmptyKhungGioByIDSanANDDate(idSan, date)
    return notEmptykhunggios
}

const DatSanC = async (IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien) =>{
    let newestHoaDon = await sanBong.DatSan(IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien)
    return newestHoaDon
}

const getAnhSanByID = async(idSan) =>{
    let listAnh = await anh.GetAnhsByIDSan(idSan)
    return listAnh
}

const HuyDatSan = async (IDHoaDon) =>{
    await sanBong.HuyDatSan(IDHoaDon)
}

const DatCoc = async (IDHoaDon) =>{
    await sanBong.DatCoc(IDHoaDon)
}

export{ 
    GetAllSanFromCoSo,
    GetInfoSanBong,
    GetTenLoaiSan,
    getAllKhungGio,
    getAnhSanByID,
    getAllOccuredKhungGio,
    GetAllSanFromCoSoBySearch,
    DatSanC,
    HuyDatSan,
    DatCoc
} 
