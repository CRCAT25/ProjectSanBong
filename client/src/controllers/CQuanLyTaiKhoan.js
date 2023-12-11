import CoSoSan from '../models/CoSoSan'
import HoaDon from '../models/HoaDon'
import Account from '../models/TaiKhoan'

const CGetAllCoSo = async () =>{
    const cosoSan = new CoSoSan()
    let listCoso
    listCoso = await cosoSan.GetAllCoSo()
    return listCoso
 }

 const getPersonalInfoByIdTK = async(idTk)=>{
   let account = new Account();
   let list = account.getTKByID(idTk)
   return list;
 }
 const CThemTaiKhoan = async (idphanquyen, ten, email, sdt, diachics, nganhangcs, stkcs, matkhau) =>{
   let account = new Account()
   let result = await account.ThemTaiKhoan(idphanquyen, ten, email, sdt, diachics, nganhangcs, stkcs, matkhau);
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

const CSearchEmailSdt = async (idphanquyen, stringsearch) =>{
   if(idphanquyen === 2){
      let coso = new CoSoSan();
      let list = []
      let result = await coso.SearchEmailSdt(idphanquyen, stringsearch)
      if(result){
         list.push(result)
      }
      return list

   } else {
      let account = new Account();
      let list = []
      let result = await account.SearchEmailSdt(idphanquyen, stringsearch)
   
      if(result){
         list.push(result)
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

const CGetAllPlayer = async () =>{
   let account = new Account();
   let result = await account.GetAllPlayer()
   return result
}

const CGetAllAdmin = async () =>{
   let account = new Account();
   let result = await account.GetAllAdmin()
   return result
}

const CGetAllBillComplete = async () =>{
   let hoadon = new HoaDon();
   let result = await hoadon.GetAllBillComplete()
   return result
}

const CSearchHoaDonByDateAdmin = async (search, date) =>{
   let hoadon = new HoaDon();
   let result = await hoadon.SearchHoaDonByDateAdmin(search, date)
   return result
}


 export {
   CGetAllCoSo,
   CGetAllPlayer,
   CGetAllAdmin,
   getPersonalInfoByIdTK,
   CThemTaiKhoan,
   ShowImgCoSo,
   CSearchEmailSdt,
   CDisableAcc,
   CEnableAcc,
   CGetAllBillComplete,
   CSearchHoaDonByDateAdmin,
}