import axios from 'axios';
import React, { useEffect, useState } from 'react'
import KhungGio from '../models/KhungGio'
import SanBong from '../models/SanBong'
import LoaiSan from '../models/LoaiSan'

const getAllLoaiSan = async () =>{
    const loaisan = new LoaiSan()
    let list = await loaisan.GetAllLoaiSan()
    return list
    
 }
 const getAllSanByTaiKhoan = async (IDTaiKhoan) =>{
    const san = new SanBong()
    let list = await san.GetAllSanByTaiKhoan(IDTaiKhoan)
    return list
    
 }
 const getAllKhungGio = async () =>{
   const khungGio = new KhungGio()
   let list = await khungGio.GetAllKhungGio()
   return list
   
}
 export {
    getAllLoaiSan,
    getAllSanByTaiKhoan,
    getAllKhungGio
 }