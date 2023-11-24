
import SanBong from '../models/SanBong'
import CoSoSan from '../models/CoSoSan'
import HoaDon from '../models/HoaDon'
import Account from '../models/TaiKhoan'

const getAllCoSo = async () =>{
    const cosoSan = new CoSoSan()
    let listCoso
    listCoso = await cosoSan.GetAllCoSo()
   //  console.log(listCoso)
    return listCoso
 }

 const getNameLogin = async (idlogin) =>{
   
    let account = new Account()
    let result = account.NameUser(idlogin)
   //  console.log(result)
    return result;
 }

 const CheckEmailSdt = async (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs) =>{
   let account = new Account()
   account.checkemailsdt(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs);
}

 export {
    getAllCoSo,
    getNameLogin,
    CheckEmailSdt,
}