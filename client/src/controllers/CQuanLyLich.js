import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HoaDon from'../models/HoaDon';

const getAllLichGiaoHuu = async () =>{
    const lich= new HoaDon();
    let list = await lich.getAllLichGiaoHuu();
    return list;
}

const GetBillById = async (idBill) =>{
    const hoadon= new HoaDon();
    let list = await hoadon.getBillById(idBill);
    return list[0];
}

const updateBillDoiThuByIdBill = async (idDoiThu,idBill) =>{
    const bill = new HoaDon()
    console.log(idBill+""+idDoiThu)
    bill.UpdateBillDoiThuByIdBill(idDoiThu,idBill);
    getAllLichGiaoHuu()
}

const removeDoiThuByIdBill = async (idBill) =>{
    const bill = new HoaDon()
    console.log(idBill)
    bill.RemoveDoiThuByIdBill(idBill);
    getAllLichGiaoHuu()
}

const GetPersonalGiaoHuuFromBillByIdTK = async (idTk,giaoHuu) =>{
    const bill = new HoaDon()
    let list = await bill.getPersonalGiaoHuuFromBillByIdTK(idTk,giaoHuu)
    // console.log(list)
    return list
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
    const sanbong = new HoaDon()
    await sanbong.huySanByID(IDHoaDon)
}

const GetAllBillByIDTk = async(IdTK) =>{
    const hoaDon = new HoaDon()
    let list = await hoaDon.getAllBillByIdTk(IdTK)
    return list;
}

export {
    getAllLichGiaoHuu,
    GetPersonalLichFromBillByIdTK,
    GetPersonalGiaoHuuFromBillByIdTK,
    GetPersonalBillByIdAccount,
    GetAllBillByIDTk,
    GetBillById,
    updateBillDoiThuByIdBill,
    HuySanByIDHd,
    removeDoiThuByIdBill
}