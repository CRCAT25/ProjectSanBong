import { useEffect, useState } from "react"
import axios from 'axios'
import FootballField from "../models/FootballField";

const GetInfoCoSo = (idCoSo) =>{
    const[coSo, setCoSo] = useState('');
    useEffect(() =>{
        axios.post('',{
            idCoSo: idCoSo
        }).then(res => {
            setCoSo(res.data)
            return coSo
        })
    })
}

const GetAllSanFromCoSo = (idCoSo) =>{
    const[sanBongs, setSanBongs] = useState([]);
    useEffect(() =>{
        axios.post('',{
            idCoSo: idCoSo
        }).then(res => {
            setSanBongs(res.data.map(sanbong => new FootballField(sanbong.idSan, sanbong.idTaiKhoan, sanbong.idLoaiSan, sanbong.tenSan, sanbong.giaTien, sanbong.trangThai)))
            return sanBongs
        })
    })
}

export{
    GetInfoCoSo, 
    GetAllSanFromCoSo
} 
