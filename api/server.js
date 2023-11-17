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
app.post("/getLichGiaoHuuByHD",(req,res) => {
  const idHD = req.body.idHD;
  const sql = `SELECT
                  tk1.Ten,tk1.SoDienThoai, tk2.Ten, tk2.DiaChiCoSo, sanbong.TenSan, hoadon.Ngay, khunggio.ThoiGian
                FROM
                  taikhoan as tk1, taikhoan as tk2, hoadon, sanbong, khunggio
                WHERE
                hoadon.GiaoHuu = 1
                  AND hoadon.IDKhungGio = khunggio.IDKhungGio
                  AND hoadon.idDoiThu IS NULL
                  AND hoadon.TrangThai = 'Completed'
                  AND DAY(hoadon.Ngay) > DAY(CURRENT_DATE)
                  AND tk1.IDTaiKhoan = hoadon.IDTaiKhoan 
                  AND sanbong.IDSan = hoadon.IDSan
                  AND tk2.IDTaiKhoan = sanbong.IDTaiKhoan;`
  db.query(sql, (err, data) => {
    res.json(data);
  });
})
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

