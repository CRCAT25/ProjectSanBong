import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LichGiaoHuu from'../models/LichGiaoHuu';

const getAllLichGiaoHuu = async () =>{
    const lich= new LichGiaoHuu();
    let list = await lich.getAllLichGiaoHuu();
    return list;
}


export {getAllLichGiaoHuu}