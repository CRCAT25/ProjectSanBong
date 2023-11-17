import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoSoSan from '../models/CoSoSan'

const TimKiemSanBong = (tenCoSo, diaChiCoSo) =>{
    checkInput = checkInput(tenCoSo, diaChiCoSo);

    axios.post("http://localhost:8081/getCoSoBySearch", {
        tenCoSo : tenCoSo,
        diaChiCoSo : diaChiCoSo
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

const getAllCoSo = async () =>{
   const cosoSan = new CoSoSan()
   let listCoso
   listCoso = await cosoSan.GetAllCoSo()
   return listCoso
   
}

const checkInput = (tenCoSo, DiaChiCoSo) =>{
    if(tenCoSo == "" && DiaChiCoSo == "") return false
    else return true
}
export {
    TimKiemSanBong,
    getAllCoSo
}
