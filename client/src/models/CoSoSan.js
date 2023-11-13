class CoSoSan extends Account{
    constructor(idAccount, idPhanQuyen, hoTen, email, soDienThoai, tenCoSo, diaChiCoSo, nganHang, sTK, matKhau, xacThuc){
        super(idAccount, idPhanQuyen, hoTen, email, soDienThoai, nganHang, sTK, matKhau, xacThuc)
        this.TenCoSo = tenCoSo;
        this.DiaChiCoSo = diaChiCoSo;
    }
     
}