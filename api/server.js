const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectsanbong",
});

/* TRUONG THIEN - Lấy All Cơ sở*/
app.post("/getAllCoSo", (req, res) => {
  const sql = "SELECT * FROM taikhoan where IDPhanQuyen = 2";
  db.query(sql, (err, data) => {
      res.json(data);
  });
});

app.post("/getCoSoBySearch", (req, res) => {
    const tenCoSo = req.body.tenCoSo;
    const diaDiem = req.body.diaDiem;
    const sql = `select * from taikhoan where IDPhanQuyen = 2 AND TenCoSo = ${tenCoSo} OR DiaDiem = ${diaDiem}`;
    db.query(sql, (err, data) => {
        // console.log(data)
    });
});

app.post("/getInfoCoSo", (req, res) => {
  const idCoSo = req.body.idCoSo;
  const sql = `select * from taikhoan where IDTaiKhoan = ${idCoSo}`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

// Lấy lịch giao hữu cho Home
app.post("/getAllLichGiaoHuu",(req,res) => {
  const sql = `SELECT
                    tk1.IDTaiKhoan as IDNgDat, tk1.Ten as NguoiDat,tk1.SoDienThoai, tk2.Ten as TenCoSo, tk2.DiaChiCoSo, sanbong.TenSan, DATE_FORMAT(hoadon.Ngay, '%d-%m-%Y') AS ngay, khunggio.ThoiGian
                  FROM
                    taikhoan as tk1, taikhoan as tk2, hoadon, sanbong, khunggio
                  WHERE
                    hoadon.IDKhungGio = khunggio.IDKhungGio
                    AND hoadon.idDoiThu IS NULL
                    AND hoadon.TrangThai = 'Completed'
                    AND hoadon.GiaoHuu = 1
                    AND DAY(ngay) > DAY(CURRENT_DATE)
                    and tk1.IDTaiKhoan = hoadon.IDTaiKhoan
                    and sanbong.IDSan = hoadon.IDSan
                    and tk2.IDTaiKhoan = sanbong.IDTaiKhoan`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
})

app.post("/getAllBill", (req, res) => {
  const sql = "SELECT * FROM hoadon"; 
  db.query(sql, (err, data) => {
      res.json(data);
  });
});


//Huỳnh Công Tấn  
// Trang quản lý sân, quản lý lịch sân
app.post("/getAllLoaiSan", (req, res) => {
  const sql = "SELECT * FROM loaisan"; 
  db.query(sql, (err, data) => {
      res.json(data);
  });
});
app.post("/getAllSanByTaiKhoan", (req, res) => {
  const sql = "SELECT * FROM sanbong WHERE IDTaiKhoan = ?"; 
  db.query(sql, [req.body.IDTaiKhoan], (err, data) => {
      res.json(data);
  });
});
app.post("/getAllKhungGio", (req, res) => {
  const sql = "SELECT * FROM khunggio"; 
  db.query(sql, (err, data) => {
      res.json(data);
  });
});




/*************************/
app.listen(8081, () => {
  console.log("Connected!");
});

