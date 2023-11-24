
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

 const getPersonalInfoByIdTK = async(idTk)=>{
   let account = new Account();
   let list = account.getTKByID(idTk)
   return list;
 }
 const QLCheckEmailSdt = async (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs) =>{
   // console.log(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs)
   let account = new Account()
   let result = await account.QLcheckemailsdt(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs);
   if(result == "Ok"){
      console.log("okkkk")
      AddCoSo(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs)
   }
   else{
      console.log(result)
   }
}

const AddCoSo = async (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs) =>{
   // console.log(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs)
   let account = new Account()
   let result = await account.addcoso(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs);
   if(result == "Thêm thành công"){
      console.log("Thêm thành công!")
   }
   else{
      console.log(result)
   }
}

 export {
   getAllCoSo,
   getNameLogin,
   getPersonalInfoByIdTK,
   QLCheckEmailSdt,
}