class CoSoSan extends Account{
    constructor(idAccount, idPhanQuyen, ten, email, soDienThoai, tenCoSo, diaChiCoSo, nganHang, sTK, matKhau, xacThuc){
        super(idAccount, idPhanQuyen, ten, email, soDienThoai, nganHang, sTK, matKhau, xacThuc)
        this.TenCoSo = tenCoSo;
        this.DiaChiCoSo = diaChiCoSo;
    }
        
}