const express = require("express");
const mysql = require("mysql");
const app = express();
const multer = require('multer');
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
  const sql = `SELECT * FROM taikhoan, loaiphanquyen where 
  taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and 
  taikhoan.IDPhanQuyen = 2`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

app.post("/getCoSoBySearch", (req, res) => {
  let tenCoSo = req.body.tenCoSo;
  let diaDiem = req.body.diaDiem;
  let sql = " ";
  if (tenCoSo == "") { tenCoSo = null; }
  if (diaDiem == "") { tenCoSo = null; }
  if (tenCoSo != null && diaDiem != null) {
    sql = `select * from taikhoan, loaiphanquyen where 
      taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and
      taikhoan.IDPhanQuyen = 2 AND 
      (Ten LIKE "%${tenCoSo}%" AND 
      DiaChiCoSo LIKE "%${diaDiem}%")`
  } else if (tenCoSo != null && diaDiem == null) {
    sql = `select * from taikhoan,loaiphanquyen where taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and taikhoan.IDPhanQuyen = 2 AND Ten LIKE "%${tenCoSo}%"`
  } else if (tenCoSo == null && diaDiem != null) {
    sql = `select * from taikhoan,loaiphanquyen where taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and taikhoan.IDPhanQuyen = 2 AND DiaChiCoSo LIKE "%${diaDiem}%"`
  }

  db.query(sql, (err, data) => {
    res.json(data)
  });
});

app.post("/getInfoCoSo", (req, res) => {
  const idCoSo = req.body.idCoSo;
  const sql = `select * from taikhoan, loaiphanquyen where taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and taikhoan.IDTaiKhoan = ${idCoSo}`;
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

app.post("/getSanByID", (req, res) => {
  const sql = `SELECT * FROM sanbong, loaisan, taikhoan,loaiphanquyen WHERE 
        sanbong.IDTaiKhoan = taikhoan.IDTaiKhoan and 
        sanbong.IDLoaiSan = loaisan.IDLoaiSan and 
        taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and
        sanbong.IDSan = ?`;
  db.query(sql, [req.body.IdSan], (err, data) => {
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
app.post("/getTKByID", (req, res) => {
  const sql = `SELECT * FROM taikhoan,loaiphanquyen Where 
  taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and 
  taikhoan.IDTaiKhoan = ?`;
  db.query(sql, [req.body.idTK], (err, data) => {
    res.json(data);
  });
});

app.post("/getNotEmptyKhungGioByIDnDate", (req, res) => {
  const idSan = req.body.IdSan;
  const date = req.body.Date;
  const sql = `SELECT * FROM hoadon WHERE IDSan = ${idSan} AND Ngay = '${date}' AND (TrangThai = "Completed" OR TrangThai = "Pending")`;
  db.query(sql, (err, data) => {

    res.json(data);
  });
});

app.post("/getSanByIDnCate", (req, res) => {
  const IDTaiKhoan = req.body.IDCoSo
  const IDLoaiSan = req.body.IDLoaiSan
  const sql = `SELECT * FROM sanbong, loaisan, taikhoan, loaiphanquyen WHERE 
  taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and
  sanbong.IDTaiKhoan = taikhoan.IDTaiKhoan and 
  sanbong.IDLoaiSan = loaisan.IDLoaiSan and 
  sanbong.IDTaiKhoan = ${IDTaiKhoan} and
  sanbong.IDLoaiSan  LIKE '%${IDLoaiSan}%'`;
  db.query(sql, (err, data) => {
    res.json(data);

  });
});

app.post("/datSan", async (req, res) => {
  const IDTaiKhoan = req.body.IDTaiKhoan;
  const IDSan = req.body.IDSan;
  const IDKhungGio = req.body.IDKhungGio;
  const Ngay = req.body.Ngay;
  const GiaoHuu = req.body.GiaoHuu;
  const TongTien = req.body.TongTien;
  const sql = `CALL InsertAndReturnHoaDon(${IDTaiKhoan}, ${IDSan}, ${IDKhungGio}, '${Ngay}', ${GiaoHuu}, '${TongTien}')`;
  
  db.query(sql, (err, data) => {
    console.log(data[0])
    const sql2 = `CREATE EVENT delete_hoadon_event_${data[0][0].IDHoaDon}
    ON SCHEDULE AT 
    CURRENT_TIMESTAMP + INTERVAL 5 MINUTE
    DO CALL delete_passedhoadon_proc(${data[0][0].IDHoaDon});`;
      db.query(sql2, (err2, data2) => {    
        res.json(data[0])
      });
  });
});

app.post("/huyDatSan", async (req, res) => {
  const IDHoaDon = req.body.IDHoaDon;
  const sql = `DELETE FROM HOADON WHERE IDHoaDon = ${IDHoaDon}`;
  db.query(sql, (err, data) => {
    res.json(data[0])
  });
});

app.post("/huyLichDaDat", async (req, res) => {
  const IDHoaDon = req.body.IDHoaDon;
  const sql = `Update HOADON SET TrangThai = "Cancelled" WHERE IDHoaDon = ${IDHoaDon}`;
  db.query(sql, (err, data) => {
    res.json(data[0])
  });
});

app.post("/DatCoc", async (req, res) => {
  const IDHoaDon = req.body.IDHoaDon;
  const sql = `UPDATE HOADON SET TrangThai = 'Completed' WHERE IDHoaDon = ${IDHoaDon}`;
  db.query(sql, (err, data) => {
  });
});


app.post("/getBillByIDBill", async (req, res) => {
  const IDHoaDon = req.body.IDHoaDon;
  const sql = `SELECT * FROM HOADON WHERE IDHoaDon = ?`;
  db.query(sql, [IDHoaDon], (err, data) => {
    res.json(data);
  });
});


// Lấy lịch giao hữu // 
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
  const sql = `SELECT * 
              FROM sanbong, loaisan, taikhoan, loaiphanquyen 
              WHERE 
                taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and
                sanbong.IDTaiKhoan = taikhoan.IDTaiKhoan and 
                sanbong.IDLoaiSan = loaisan.IDLoaiSan and  
                sanbong.TrangThai = 0 and
                sanbong.IDTaiKhoan = ?
              ORDER BY sanbong.IDSan DESC`;
  db.query(sql, [req.body.IDTaiKhoan], (err, data) => {
    res.json(data);
  });
});
app.post("/getAnhsByIDSan", (req, res) => {
  const sql = `SELECT * FROM anh WHERE IDSan = ?`; 
  db.query(sql, [req.body.IDSan], (err, data) => {
      res.json(data);
  });
});
app.post("/getFieldByIDField", (req, res) => {
  const sql = `SELECT * FROM sanbong, loaisan, taikhoan, loaiphanquyen WHERE 
  taikhoan.IDPhanQuyen = loaiphanquyen.IDPhanQuyen and
  sanbong.IDTaiKhoan = taikhoan.IDTaiKhoan and 
  sanbong.IDLoaiSan = loaisan.IDLoaiSan and 
  sanbong.IDSan = ?`;
  db.query(sql, [req.body.IdSan], (err, data) => {
    res.json(data);
  });
});
app.post("/getShiftByID", (req, res) => {
  const sql = `select * from khunggio where IDKhungGio = ?`;
  db.query(sql, [req.body.id], (err, data) => {
    res.json(data);
  });
});
app.post("/getLoaiSanByID", (req, res) => {
  const sql = `select * from loaisan where IDLoaiSan = ?`;
  db.query(sql, [req.body.id], (err, data) => {
    res.json(data);
  });
});
app.post("/getAllKhungGio", (req, res) => {
  const sql = "SELECT * FROM khunggio";
  db.query(sql, (err, data) => {
    res.json(data);
  });
});

app.post("/getKhungGioByID", (req, res) => {
  const sql = "SELECT * FROM khunggio where IDKhungGio = ? ";
  db.query(sql, [req.body.ID], (err, data) => {
    res.json(data);
  });
});

app.post("/getHoaDonsCompleteByNgayKGTK", (req, res) => {
  const sql = "SELECT * FROM hoadon, sanbong where hoadon.Ngay = ? and hoadon.IDKhungGio = ? and hoadon.TrangThai = 'Completed' and hoadon.IDSan = sanbong.IDSan and sanbong.IDTaiKhoan = ?";
  db.query(sql, [req.body.Ngay, req.body.IDKhungGio, req.body.IDTaiKhoan], (err, data) => {
    res.json(data);
  });
});
app.post("/InsertSan", (req, res) => {
  const sql = `CALL InsertAndReturnSan(?, ?, ?)`;
  db.query(sql, [req.body.IDTaiKhoan,req.body.IDLoaiSan,req.body.TenSan],(err, data) => {
    res.json(data)
    
  });
});
app.post("/insertAnh", (req, res) => {
  let sql  = `INSERT INTO anh(IDSan, Anh) VALUES ( ?, ? )`;
  db.query(sql, [req.body.IDSan, req.body.Anh],(err, data) => {});
});
app.post("/deleteSanByID", (req, res) => {
  const sql = `UPDATE sanbong SET TrangThai = 1 WHERE IDSan = ?`;
  db.query(sql, [req.body.IDSan],(err, data) => {
  });
});
app.post("/deleteAnh", (req, res) => {
  const sql = `DELETE FROM anh WHERE IDAnh = ?`;
  db.query(sql, [req.body.IDAnh],(err, data) => {
  });
});
app.post("/updateSanByID", (req, res) => {
  const sql = `UPDATE sanbong SET IDLoaiSan = ? ,IDTaiKhoan = ? ,TenSan= ? ,TrangThai= ? WHERE IDSan= ?`;
  db.query(sql, [req.body.IDLoaiSan, req.body.IDTaiKhoan, req.body.TenSan, req.body.TrangThai, req.body.IDSan],(err, data) => {
  });
});
// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../client/public/assets');
  }, // Specify the directory where files will be stored
  filename: function (req, file, callback) {
    callback(null,file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files'), (req, res) => {
  // If you reach this point, the file has been successfully uploaded
  res.json({ message: 'File uploaded successfully!' });
});

/*************************/
app.post("/getAllHoaDonCompletedByCoSo", (req, res) => {
  const sql = `SELECT * FROM hoadon, sanbong 
              where hoadon.TrangThai = 'Completed' and hoadon.IDSan = sanbong.IDSan and sanbong.IDTaiKhoan = ?`
  db.query(sql, [req.body.IDTaiKhoan], (err, data) => {
    res.json(data);
  })
})

app.post("/getAllBillForRefund", (req, res) => {
  const sql = `SELECT * FROM hoadon WHERE hoadon.TrangThai='Completed' and DATEDIFF(CURRENT_DATE, hoadon.Ngay) <= 0`;
  db.query(sql, (err, data) => {
    res.json(data);
  })
})

app.post("/updateDoiThuInBill",(req,res)=>{
  const sql=`UPDATE hoadon SET IDDoiThu = ? WHERE hoadon.IDHoaDon = ?`;
  db.query(sql,[req.body.IDDoiThu,req.body.IDHoaDon],(err,data) =>{
    res.json(data);

  })
})

app.post("/getPersonalLichFromBillByIdTK",(req,res)=>{
  const sql=`SELECT * FROM hoadon WHERE IDTaiKhoan= ? and GiaoHuu = ?`;
  // console.log(req.body.IDTaiKhoan+"   "+ req.body.GiaoHuu)
  db.query(sql,[req.body.IDTaiKhoan, req.body.GiaoHuu],(err,data) =>{
    // console.log(data);
    res.json(data);
   
  })
})

app.post("/getPersonalBillByIdTK",(req,res)=>{
  const sql=`SELECT * FROM hoadon WHERE IDTaiKhoan= ?`;
  // console.log(req.body.IDTaiKhoan)
  db.query(sql,[req.body.IDTaiKhoan],(err,data) =>{
    // console.log(data);
    res.json(data);
   
  })
})

app.post("/updatePersonalInfoByIdTK",(req,res)=>{
  const sql=`UPDATE taikhoan 
          SET Ten = ?, 
          Email = ?,
          SoDienThoai = ?,
          DiaChiCoSo = ?, 
          NganHang = ?, 
          STK = ?,
          Anh =?
          WHERE taikhoan.IDTaiKhoan = ?;`;

  db.query(sql,[req.body.Ten,
    req.body.Email,
    req.body.SoDienThoai,
    req.body.DiaChiCoSo,
    req.body.NganHang,
    req.body.STK,
    req.body.Anh,
    req.body.idTK],(err,data) =>{
    console.log(req.body.Ten,req.body.Email,req.body.SoDienThoai,
            req.body.DiaChiCoSo,req.body.NganHang,req.body.STK,req.body.Anh,req.body.idTK)
    
    res.json(data);
   
  })
})


/************* Đỗ Quốc Thành *************/


// User đăng nhập
app.post("/loginUser", (req, res) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;

  const sql = `SELECT * FROM taikhoan where (SoDienThoai = "${userName}" or Email = "${userName}") and MatKhau = "${passWord}"`; 
  db.query(sql, (err, data) => {
    res.json(data)
  });
});

// Check tài khoản có tồn tại
app.post("/checkAccountUser", (req, res) => {
  const name = req.body.Ten;
  const email = req.body.Email;
  const sdt = req.body.SoDienThoai;

  const sql = `SELECT * FROM taikhoan where (SoDienThoai = "${sdt}" or Email = "${email}") and Ten = "${name}" and IDPhanQuyen = 1`;
  db.query(sql, (err, data) => {
    res.json(data)
  });
});

// Change mật khẩu
app.post("/updatePassWord", (req, res) => {
  const Email = req.body.Email;
  const Pass = req.body.Pass;

  const sql = `UPDATE taikhoan set MatKhau = "${Pass}" where Email = "${Email}"`;
  db.query(sql, (err, data) => {
    res.json("done")
  });
});

// Check email và sdt tồn tại
app.post("/checkEmailSdt", (req, res) => {
  const Email = req.body.Email;
  const Sdt = req.body.Sdt;

  const sql = `select * from taikhoan where Email = "${Email}" or SoDienThoai = "${Sdt}"`; 
  db.query(sql, (err, data) => {
    if(data[0] == null){
      res.json("chua co")
    }
    else res.json("da co")
  });
});

// Đăng ký tài khoản cho user
app.post("/signUpAccount", (req, res) => {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Pass = req.body.Pass;
  const Sdt = req.body.SDT;
  const sql = `insert into taikhoan(Ten, Email, MatKhau, SoDienThoai, IDPhanQuyen) values("${Name}","${Email}","${Pass}","${Sdt}", 1)`; 
  db.query(sql, (err, data) => {
    res.json(data)
  });
});

// Lấy 5 hóa đơn cuối của user
app.post("/selectTop5InHoaDon", (req, res) => {
  const IdAccount = req.body.IDTaiKhoan;  

  const sql = `select * from hoadon where IDTaiKhoan = ${IdAccount} order by IDHoaDon DESC Limit 5`; 
  db.query(sql, (err, data) => {
    res.json(data)
  });
});




/*************************/


/*************************/
//Lee Huyn Min  
// Trang quản lý tài khoản, thống kê báo cáo

app.post("/QLcheckemailsdt", (req, res) => {
  const checkEmail = "SELECT COUNT(*) AS count FROM taikhoan WHERE Email = ?";
  const checkSdt = "SELECT COUNT(*) AS count FROM taikhoan WHERE SoDienThoai = ?";
  db.query(checkEmail, [req.body.email], (checkErrEmail, checkResultEmail) => {
      if (checkErrEmail){
        return res.json("Error");
      }
      db.query(checkSdt, [req.body.sdt], (checkErrSdt, checkResultSdt) => {
        if (checkErrSdt) {
          return res.json("Error2");
        }
        const existemail = checkResultEmail[0].count;
        const existsdt = checkResultSdt[0].count;
        if ((existemail > 0) && (existsdt == 0)) {
          console.log("Email đã tồn tại");
          return res.json("Email đã tồn tại");
        } else if ((existsdt > 0) && (existemail == 0)) {
          console.log("Số điện thoại đã tồn tại");
          return res.json("Số điện thoại đã tồn tại");
        } else if ((existsdt > 0) && (existemail > 0)) {
          console.log("Email và số điện thoại đã tồn tại");
          return res.json("Email và số điện thoại đã tồn tại");
        } else {
          return res.json("Ok")
        }
      });
      
    }

  );
});


app.post("/showallplayer", (req, res) => {
  const sql = "SELECT * FROM taikhoan WHERE IDPhanQuyen = 1";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    }
  });
});

app.post("/showalladmin", (req, res) => {
  const sql = "SELECT * FROM taikhoan WHERE IDPhanQuyen = 3";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      console.log(data)
      return res.json(data);
    }
  });
});


app.post("/showimgcoso", (req, res) => {
  const sql = "SELECT * FROM taikhoan WHERE IDTaiKhoan = ?";
  db.query(sql, [req.body.idtaikhoan], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      return res.json(data);
    }
  });
});



app.post("/addtk", (req, res) => {
  const insertSql =
"INSERT INTO taikhoan (IDPhanQuyen, Ten, Email, SoDienThoai, DiaChiCoSo, NganHang, STK, MatKhau) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
db.query(
  insertSql,
  [
    req.body.idphanquyen,
    req.body.ten,
    req.body.email,
    req.body.sdt,
    req.body.diachics,
    req.body.nganhangcs,
    req.body.stkcs,
    req.body.matkhau,
  ],
  (insertErr, insertResult) => {
    if (insertErr) {
      console.log(insertErr);
    } else {
      console.log("Thêm thành công")
      return res.json("Thêm thành công");
    }
  }
);
});

app.post("/searchemailsdt", (req, res) => {
  const sql = "SELECT * FROM taikhoan WHERE IDPhanQuyen = ? AND (SoDienThoai = ? OR Email = ?)";
  db.query(sql, [req.body.phanquyen ,req.body.search, req.body.search], (err, data) => {
    if (err) return res.json("Error");
    if (data.length > 0) {
      // console.log(data)
      res.json(data);
    }else {
      res.json(data)
    }
  });
});

app.post("/disableacc", async (req, res) => {
  const sql = `UPDATE  taikhoan SET TrangThai = 1 WHERE IDTaiKhoan = ?`;
  db.query(sql,[req.body.idtaikhoan], (err, data) => {
    if(err) return res.json("Err")
    else{
      res.json("Thành công")
  }
  });
});
app.post("/enableacc", async (req, res) => {
  const sql = `UPDATE  taikhoan SET TrangThai = 0 WHERE IDTaiKhoan = ?`;
  db.query(sql,[req.body.idtaikhoan], (err, data) => {
    if(err) return res.json("Err")
    else{
      res.json("Thành công")
  }
  });
});





/*************************/


app.listen(8081, () => {
  console.log("Connected!");
});

