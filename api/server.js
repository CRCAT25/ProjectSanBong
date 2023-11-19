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
        res.json(data)
    });
});

app.post("/getInfoCoSo", (req, res) => {
  const idCoSo = req.body.idCoSo;
  const sql = `select * from taikhoan where IDTaiKhoan = ${idCoSo}`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

app.post("/getSanByID", (req, res) => {
  const idSan = req.body.IdSan;
  const sql = `select * from SanBong where IDSan = ${idSan}`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

app.post("/getLoaiSanByID", (req, res) => {
  const idLoaiSan = req.body.IdLoaiSan;
  const sql = `SELECT * FROM loaisan Where IDLoaiSan = ${idLoaiSan}`; 
  db.query(sql, (err, data) => {
      res.json(data);
  });
});

// Lấy lịch giao hữu
app.post("/getAllLichGiaoHuu",(req,res) => {
  const sql = `SELECT
                hoadon.IDHoaDon ,tk1.Ten,tk1.SoDienThoai, tk2.Ten as CoSo, tk2.DiaChiCoSo, sanbong.TenSan as MaSan, DATE_FORMAT(hoadon.Ngay, '%d/%m/%Y') AS Ngay, khunggio.ThoiGian
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
                and tk2.IDTaiKhoan = sanbong.IDTaiKhoan;`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
})

// Lấy all hóa đơn
app.post("/getAllBill", (req, res) => {
  const sql = "SELECT * FROM hoadon"; 
  db.query(sql, (err, data) => {
      res.json(data);
  });
});

/*************************/
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
// app.post("/getKhungGioByDay", (req, res) => {
//   const sql = "SELECT * FROM Khu WHERE IDTaiKhoan = ?"; 
//   db.query(sql, [req.body.Day], (err, data) => {
//       res.json(data);
//   });
// });
app.post("/getAllKhungGio", (req, res) => {
  const sql = "SELECT * FROM khunggio"; 
  db.query(sql, (err, data) => {
      res.json(data);
  });
});
app.post("/getHoaDonsCompleteByNgaySan", (req, res) => {
  const sql = "SELECT * FROM hoadon where Ngay = ? and IDSan = ? and TrangThai = 'Completed'"; 
  db.query(sql, [req.body.Ngay, req.body.IDSan], (err, data) => {
      res.json(data);
  });
});
app.post("/getHoaDonsCompleteByNgayKG", (req, res) => {
  const sql = "SELECT * FROM hoadon where Ngay = ? and IDKhungGio = ? and TrangThai = 'Completed'"; 
  db.query(sql, [req.body.Ngay, req.body.IDKhungGio], (err, data) => {
      res.json(data);
  });
});

/*************************/









app.post("/loginUser", (req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;

  const sql = `SELECT * FROM taikhoan where SoDienThoai = "${userName}" and MatKhau = "${passWord}" and IDPhanQuyen = 1`; 
  db.query(sql, (err, data) => {
    console.log(data)
    res.json(data)
  });
});



/*************************/
app.listen(8081, () => {
  console.log("Connected!");
});

