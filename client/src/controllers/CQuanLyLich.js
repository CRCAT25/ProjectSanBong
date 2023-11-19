import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LichGiaoHuu from'../models/LichGiaoHuu';
import Bill from'../models/Bill';

const getAllLichGiaoHuu = async () =>{
    const lich= new LichGiaoHuu();
    let list = await lich.getAllLichGiaoHuu();
    return list;
}

const updateBillDoiThuByIdBill = async (idBill,idDoiThu) =>{
    const bill = new Bill()
    bill.UpdateBillDoiThuByIdBill(idBill,idDoiThu);
    getAllLichGiaoHuu()
}



export {
    getAllLichGiaoHuu,
    updateBillDoiThuByIdBill
}