import axios from 'axios';
import React, { useEffect, useState } from 'react'
import KhungGio from '../models/KhungGio'
import SanBong from '../models/SanBong'
import LoaiSan from '../models/LoaiSan'
import HoaDon from '../models/HoaDon'
import Anh from '../models/AnhSan'


const getAllLoaiSan = async () =>{
    const loaisan = new LoaiSan()
    let list = await loaisan.GetAllLoaiSan()
    return list
     
 }
 const deleteSanByID = async (id) =>{
   const san = new SanBong()
   san.DeleteSanByID(id)
    
} 
const getHoaDonsByNgayKGTKTTSanIDSan = async (day,idKhungGio, idTK, idSan) =>{
   const hoadon = new HoaDon()
   var hoadons = await hoadon.GetHoaDonsByNgayKGTTSanIDSan(day,idKhungGio, idTK, idSan)
   return hoadons;
}
const updateSanByID = async (IDLoaiSan, IDTaiKhoan, TenSan,IDSan, newImgs) =>{
   const san = new SanBong()
   const anh = new Anh()
   san.UpdateSanByID(IDLoaiSan, IDTaiKhoan, TenSan,0,IDSan)
   let oldImgs = await anh.GetAnhsByIDSan(IDSan)
   let isAdded = false
   if(newImgs.length > 0){
      for (let index = 0; index < oldImgs.length; index++){
         anh.DeletetAnh(oldImgs[index].IdAnh)
         if(oldImgs.length - 1 == index){
            isAdded = true;
            newImgs.forEach(tenAnh => {
               anh.InsertAnh(IDSan, tenAnh)
            });
         }
      }
      if(!isAdded){
         newImgs.forEach(tenAnh => {
            anh.InsertAnh(IDSan, tenAnh)
         });
      }
   }
   
}
 const getAnhsByIDSan = async (id) =>{
   const anh = new Anh()
   let list = await anh.GetAnhsByIDSan(id)
   return list
    
}
const getSanByID = async (id) =>{
   const san = new SanBong()
   return await san.getSanByID(id)
    
}
const getLoaiSanByID = async (id) =>{
   const loaiSan = new LoaiSan()
   return loaiSan.GetLoaiSanByID(id)
    
}
 const insertSan = async (idTK, idLS, tenSan, anhs) =>{
   const san = new SanBong()
   const anh = new Anh()
   let IDSan = await san.InsertSan(idTK,idLS,tenSan)
   anhs.forEach(tenAnh => {
      anh.InsertAnh(IDSan, tenAnh)
   });
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
const getHoaDonByNgayKHIDSan = async (date, shift, idSan) =>{
   const hoadon = new HoaDon()
   let list = await hoadon.GetHoaDonsByNgayKGIDSan(date, shift, idSan);
   return list;
}
const getAllHoaDonCompletedByCoSo = async(idCoSo)=>{
   const hoadon = new HoaDon();
   let listNeeded = await hoadon.getBillByIdCoSo(idCoSo);
   return listNeeded;
}

const getBillForRefund = async(idCoSo)=>{
   const hoadon = new HoaDon();
   let listNeeded = await hoadon.getBillForRefund(idCoSo);
   return listNeeded;
}
const getEmptyFieldByDayShift = async (iDTaiKhoan, day, iDShift) =>{
   const hoadon = new HoaDon()
   const san = new SanBong()
   let listSan = await san.GetAllSanByTaiKhoan(iDTaiKhoan)
   let listHD = await hoadon.GetBusyHoaDonsByNgayKGTTSan(day, iDShift,iDTaiKhoan)
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
   let san = await sanbong.GetFieldByIDField(idField)
   return san.LoaiSan
   
}
const insertHoaDon = async (IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien) =>{
   const hoadon = new HoaDon()
   await hoadon.InsertHoaDon(IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien)
   
}
const updateHoaDon = async (IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien, IDHoaDon) =>{
   const hoadon = new HoaDon()
   await hoadon.UpdateHoaDon(IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien, IDHoaDon)
}
const onRefundHD = async (IDSan,IDHoaDon, TrangThaiSan, TrangThaiHD) =>{
   console.log(IDSan,IDHoaDon, TrangThaiSan, TrangThaiHD)
   const hoadon = new HoaDon()
   const san = new SanBong()
   hoadon.UpdateTTHoaDon(TrangThaiHD, IDHoaDon)
   san.UpdateTTSan(TrangThaiSan, IDSan)
}
const getCostByShiftnTypeField = async (idShift, idTField) =>{
   
   const khungGio = new KhungGio()
   const loaiSan = new LoaiSan()
   let shift = await khungGio.GetShiftByID(idShift)
   let typeField = await loaiSan.GetLoaiSanByID(idTField)
   return shift.GiaTien + typeField.GiaTien
}

const getAllBillCompleteByCoso = async (IDTaiKhoan) =>{
   let hoadon = new HoaDon();
   let result = await hoadon.GetAllBillCompleteByCoso(IDTaiKhoan)
   return result
}

const searchHoaDonByDateCoso = async (idtaikhoan, search, date) =>{
   let hoadon = new HoaDon();
   let result = await hoadon.SearchHoaDonByDateCoso(idtaikhoan, search, date)
   return result
}

 export {
    getAllLoaiSan,
    onRefundHD,
    insertHoaDon,
    getAllSanByTaiKhoan,
    getAllKhungGio,
    getEmptyFieldByDayShift,
    getLoaiSanByIdField,
    getAllHoaDonCompletedByCoSo,
    getBillForRefund,
    getCostByShiftnTypeField,
    insertSan,
    updateHoaDon,
    getAnhsByIDSan,
    getLoaiSanByID,
    deleteSanByID,
    getSanByID,
    updateSanByID,
    getHoaDonsByNgayKGTKTTSanIDSan,
    getHoaDonByNgayKHIDSan,
    getAllBillCompleteByCoso,
    searchHoaDonByDateCoso
 }