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



/*************************/
app.listen(8081, () => {
  console.log("Connected!");
});

