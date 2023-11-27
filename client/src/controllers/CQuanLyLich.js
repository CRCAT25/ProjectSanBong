import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LichGiaoHuu from'../models/LichGiaoHuu';
import HoaDon from'../models/HoaDon';
import SanBong from'../models/SanBong';

const getAllLichGiaoHuu = async () =>{
    const lich= new LichGiaoHuu();
    let list = await lich.getAllLichGiaoHuu();
    return list;
}

const GetBillById = async (idBill) =>{
    const hoadon= new HoaDon();
    let list = await hoadon.getBillById(idBill);
    return list;
}

const updateBillDoiThuByIdBill = async (idBill,idDoiThu) =>{
    const bill = new HoaDon()
    bill.UpdateBillDoiThuByIdBill(idBill,idDoiThu);
    getAllLichGiaoHuu()
}

const GetPersonalLichFromBillByIdTK = async (idTk,giaoHuu) =>{
    const bill = new HoaDon()
    let list = await bill.getPersonalLichFromBillByIdTK(idTk,giaoHuu)
    // console.log(list)
    return list
}

const GetPersonalBillByIdAccount = async (idTk) =>{
    const bill = new HoaDon()
    let list = await bill.selectTop5InHoaDon(idTk)
    return list
}

const HuySanByIDHd = async (IDHoaDon) =>{
    const sanbong = new SanBong()
    await sanbong.HuyDatSan(IDHoaDon)
}

const GetAllBillByIDTk = async(IdTK) =>{
    const hoaDon = new HoaDon()
    let list = await hoaDon.getAllBillByIdTk(IdTK)
    return list;
}

export {
    getAllLichGiaoHuu,
    updateBillDoiThuByIdBill,
    GetPersonalLichFromBillByIdTK,
    GetPersonalBillByIdAccount,
    HuySanByIDHd,
    GetAllBillByIDTk,
    GetBillById
}