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


 const getPersonalInfoByIdTK = async(idTk)=>{
   let account = new Account();
   let list = account.getTKByID(idTk)
   return list;
 }
 const CThemTaiKhoan = async (idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs) =>{
   let account = new Account()
   let result = await account.ThemTaiKhoan(idphanquyen, tencs, email, sdt, diachics, nganhangcs, stkcs, matkhaucs);
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

 export {
   getAllCoSo,
   getPersonalInfoByIdTK,
   CThemTaiKhoan,
   ShowImgCoSo,
}