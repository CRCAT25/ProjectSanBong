import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoSoSan from '../models/CoSoSan'

const TimKiemSanBong = async (tenCoSo, diaDiem) =>{
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

const checkInput = (tenCoSo, diaDiem) =>{
    if(tenCoSo == "" && diaDiem == "") return false
    else return true
}
export {
    TimKiemSanBong,
    getAllCoSo
}
