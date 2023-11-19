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
const getEmptyFieldByDayShift = async (iDTaiKhoan, day, iDShift) =>{
   const hoadon = new HoaDon()
   const san = new SanBong()
   let listSan = await san.GetAllSanByTaiKhoan(iDTaiKhoan)
   let listHD = await hoadon.GetHoaDonsCompleteByNgayKG(day, iDShift,iDTaiKhoan)
   let list = []
   for(var i = 0; i < listSan.length; i++){
      let have = true;
      for(var j = 0; j < listHD.length; j++){
         if(listHD[j].IDSan == listSan[i].IdSan){
            have = false
            break
         }
      }
      if(have){
         list.push(listSan[i])
      }
   }
   return list
}
const getLoaiSanByIdField = async (idField) =>{
   const sanbong = new SanBong()
   const loaiSan = new LoaiSan()
   let san = await sanbong.GetFieldByIDField(idField)
   let listLS = await loaiSan.GetAllLoaiSan()
   for(var i = 0; i < listLS.length; i++){
      if(listLS[i].IdLoaiSan == san.IdLoaiSan){
         return listLS[i]
      }
   }
   
}
const getCostByShiftnTypeField = async (idShift, idTField) =>{
   const khungGio = new KhungGio()
   const loaiSan = new LoaiSan()
   let shift = await khungGio.GetShiftByID(idShift)
   console.log(idTField)
   let typeField = await loaiSan.GetLoaiSanByID(idTField)
   return shift.GiaTien + typeField.GiaTien
}
 export {
    getAllLoaiSan,
    getAllSanByTaiKhoan,
    getAllKhungGio,
    getEmptyShiftByDay,
    getEmptyFieldByDayShift,
    getLoaiSanByIdField,
    getCostByShiftnTypeField
 }