import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoSoSan from '../models/CoSoSan'

const TimKiemSanBongC = async (tenCoSo, diaDiem) =>{
    const noCoSoMSG = "Có 0 cơ sở sân theo tiêu chí trên !"
    const check = checkInput(tenCoSo, diaDiem);
    const cosoSan = new CoSoSan()
    let listCoSo
    listCoSo = await cosoSan.TimKiemSanBong(tenCoSo, diaDiem)
    if(check == false){
        return getAllCoSo()
    }else if(check == true && listCoSo.length == 0){
        return noCoSoMSG
    }else if(check == true && listCoSo.length > 0){
        return listCoSo
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
  return await cosoSan.GetInfoCoSoSan(idCoSo)
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
