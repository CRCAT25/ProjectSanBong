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

app.post("/getAllCoSo", (req, res) => {
  const sql = "SELECT * FROM taikhoan"; // Assuming 'coso' is the correct table name
  db.query(sql, (err, data) => {
      res.json(data);
  });
});

app.post("/getCoSoBySearch", (req, res) => {
    const tenCoSo = req.body.tenCoSo;
    const diaDiem = req.body.diaDiem;
    const sql = `select * from taikhoan where DiaChiCoSo != null AND TenCoSo = ${tenCoSo} OR DiaDiem = ${diaDiem}`;
    db.query(sql, (err, data) => {
        console.log(data)
    });
});


app.listen(8081, () => {
  console.log("Connected!");
});