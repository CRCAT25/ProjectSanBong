import SanBong from '../models/SanBong'
import CoSoSan from '../models/CoSoSan'
import HoaDon from '../models/HoaDon'
import Account from '../models/TaiKhoan'
import TaiKhoan from '../models/TaiKhoan'

const getAllCoSo = async () =>{
    const cosoSan = new CoSoSan()
    let listCoso
    listCoso = await cosoSan.GetAllCoSo()
   //  console.log(listCoso)
    return listCoso
 }

 const getPersonalInfoByIdTK = async(idTk)=>{
   let account = new Account();
   let list = account.getTKByID(idTk)
   return list;
 }
 const CThemTaiKhoan = async (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhau) =>{
   let account = new Account()
   let result = await account.ThemTaiKhoan(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhau);
   return ShowResultCheck(result)
}

const ShowResultCheck = async (ResultOfThem) =>{
   return ResultOfThem;
}

const ShowImgCoSo = async (idtaikhoan) =>{
   let account = new Account();
   let result = await account.ShowImgCoSo(idtaikhoan)
   return result
}

const CSearchEmailSdt = async (phanquyen, search) =>{
   if(phanquyen === 2){
      let coso = new CoSoSan();
      let list = []
      let result = await coso.SearchEmailSdt(phanquyen, search)
      if(result){
         list.push(result)
         console.log(list.length + " a")
      }
      return list

   } else {
      let account = new Account();
      let list = []
      let result = await account.SearchEmailSdta(phanquyen, search)
   
      if(result){
         list.push(result)
         console.log(list.length + " b")
      }
      return list
   }
}

const CDisableAcc = async (idtaikhoan) =>{
   let account = new Account()
   let result = await account.DisableAcc(idtaikhoan);
   return result
}

const CEnableAcc = async (idtaikhoan) =>{
   let account = new Account()
   let result = await account.EnableAcc(idtaikhoan);
   return result
}

 export {
   getAllCoSo,
   getPersonalInfoByIdTK,
   CThemTaiKhoan,
   ShowImgCoSo,
   CSearchEmailSdt,
   CDisableAcc,
   CEnableAcc,
}