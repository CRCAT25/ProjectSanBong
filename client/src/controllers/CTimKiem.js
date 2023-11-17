import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoSoSan from '../models/CoSoSan'

const TimKiemSanBongC = async (tenCoSo, diaDiem) =>{
    const noCoSoMSG = "Có 0 cơ sở sân theo tiêu chí trên !"
    checkInput = checkInput(tenCoSo, diaDiem);
    const cosoSan = new CoSoSan()
    let listCoso
    listCoso = await cosoSan.TimKiemSanBong(tenCoSo, diaDiem)
    if(checkInput == false){
        return getAllCoSo()
    }else if(checkInput == true && listCoso.length == 0){
        return noCoSoMSG
    }else if(checkInput == true && listCoso.length > 0){
        return listCoso
    }
}

const getAllCoSo = async () =>{
   const cosoSan = new CoSoSan()
   let listCoso
   listCoso = await cosoSan.GetAllCoSo()
   return listCoso
   
}

const GetInfoCoSoSan = async (idCoSo) =>{
  const cosoSan = new CoSoSan()
  cosoSan = await cosoSan.GetInfoCoSoSan(idCoSo)
  return cosoSan
}

const checkInput = (tenCoSo, diaDiem) =>{
    if(tenCoSo == "" && diaDiem == "") return false
    else return true
}
export {
    TimKiemSanBongC,
    getAllCoSo,
    GetInfoCoSoSan
}
