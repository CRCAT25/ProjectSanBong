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
  database: "projectdatsanbong",
});

/* TRUONG THIEN MEO MEO*/
app.post("/getAllCoSo", (req, res) => {
  const sql = "SELECT * FROM taikhoan where IDPhanQuyen = 2";
  db.query(sql, (err, data) => {
    console.log(data)
      res.json(data);
  });
});

app.post("/getCoSoBySearch", (req, res) => {
    let tenCoSo = req.body.tenCoSo;
    let diaDiem = req.body.diaDiem;
    let sql = " ";
    if(tenCoSo == ""){tenCoSo = null;}
    if(diaDiem == ""){tenCoSo = null;}
    if(tenCoSo != null && diaDiem != null){
      sql = `select * from taikhoan where IDPhanQuyen = 2 AND (Ten LIKE "%${tenCoSo}%" AND DiaChiCoSo LIKE "%${diaDiem}%")`
    }else if(tenCoSo != null && diaDiem == null){
      sql = `select * from taikhoan where IDPhanQuyen = 2 AND Ten LIKE "%${tenCoSo}%"`
    }else if(tenCoSo == null && diaDiem != null){
      sql = `select * from taikhoan where IDPhanQuyen = 2 AND DiaChiCoSo LIKE "%${diaDiem}%"`
    }
    
    db.query(sql, (err, data) => {
      res.json(data);
    });
});

app.post("/getInfoCoSo", (req, res) => {
  const idCoSo = req.body.idCoSo;
  const sql = `select * from taikhoan where IDTaiKhoan = ${idCoSo}`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

/*************************/
app.listen(8081, () => {
  console.log("Connected!");
});

