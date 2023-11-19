import axios from 'axios';
import React, { useEffect, useState } from 'react'
import KhungGio from '../models/KhungGio'
import SanBong from '../models/SanBong'
import LoaiSan from '../models/LoaiSan'
import HoaDon from '../models/Bill'

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
const getEmptyShiftByDay = async (IDTaiKhoan, ngay) =>{
   const hoadon = new HoaDon()
   const khungGio = new KhungGio()
   const san = new SanBong()
   let listSan = await san.GetAllSanByTaiKhoan(IDTaiKhoan)
   let listAllKG = await khungGio.GetAllKhungGio()
   let listKG = []
   for(var i = 0; i < listAllKG.length; i++){
      let listHD = await hoadon.GetHoaDonsCompleteByNgayKG(ngay, listAllKG[i].IdKhungGio,IDTaiKhoan)
      if(listSan.length != listHD.length){
         listKG.push(listAllKG[i])
      }
   }
   return listKG
   
}
 export {
    getAllLoaiSan,
    getAllSanByTaiKhoan,
    getAllKhungGio,
    getEmptyShiftByDay,
 }