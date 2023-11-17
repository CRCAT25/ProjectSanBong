import axios from 'axios';
import React, { useEffect, useState } from 'react'
import KhungGio from '../models/KhungGio'
import SanBong from '../models/SanBong'
import Account from '../models/Account';
import Bill from'../models/Bill';

const getAllLichGiaoHuu = async () =>{
    const hoadon = new Bill()
    const thoiGian = new KhungGio();
    const tkDat = new Account();
    const tkCoSo = new Account();
    const sanBong = new SanBong();

    let listHoaDon = await hoadon.GetAllBill()
    listHoaDon.forEach(hoadon=>{
        if(hoadon.TrangThai == 'Completed' && hoadon.GiaoHuu == '1' && hoadon.IDDoiThu =='' ){
            
        }
    })

}
export {getAllLichGiaoHuu}