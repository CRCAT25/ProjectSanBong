
import SanBong from '../models/SanBong'
import CoSoSan from '../models/CoSoSan'
import HoaDon from '../models/HoaDon'
import Account from '../models/TaiKhoan'

const getAllCoSo = async () =>{
    const cosoSan = new CoSoSan()
    let listCoso
    listCoso = await cosoSan.GetAllCoSo()
    console.log(listCoso)
    return listCoso
 }

 const getNameLogin = async (idlogin) =>{
   
    let account = new Account()
    let result = account.NameUser(idlogin)
    console.log(result)
    return result;
 }

 export {
    getAllCoSo,
    getNameLogin,
}