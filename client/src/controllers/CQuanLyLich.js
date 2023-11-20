import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LichGiaoHuu from'../models/LichGiaoHuu';
import HoaDon from'../models/HoaDon';

const getAllLichGiaoHuu = async () =>{
    const lich= new LichGiaoHuu();
    let list = await lich.getAllLichGiaoHuu();
    return list;
}

const updateBillDoiThuByIdBill = async (idBill,idDoiThu) =>{
    const bill = new HoaDon()
    bill.UpdateBillDoiThuByIdBill(idBill,idDoiThu);
    getAllLichGiaoHuu()
}



export {
    getAllLichGiaoHuu,
    updateBillDoiThuByIdBill
}