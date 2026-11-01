// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { xacThuc, SECRET_KEY } = require("./middleware");

const app = express();
const PORT = 3000;

// Cho phép React (Vite chạy ở port 5173) gọi API sang port 3000
app.use(cors({ origin: "http://localhost:5173" }));
// Đọc body dạng JSON -> req.body
app.use(express.json());

// ---------- POST /login ----------
app.post("/login", (req, res) => {
  const { email, matKhau } = req.body;

  // Đơn giản hóa: hardcode, chưa nối database
  if (email === "admin@gmail.com" && matKhau === "123456") {
    const token = jwt.sign({ email, vaiTro: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  }

  res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
});

// ---------- GET /api/products (được bảo vệ bởi middleware) ----------
app.get("/api/products", xacThuc, (req, res) => {
  const products = [
    { id: 1, ten: "Bút bi", gia: 5000 },
    { id: 2, ten: "Vở kẻ ngang", gia: 12000 },
    { id: 3, ten: "Thước kẻ", gia: 8000 },
    { id: 4, ten: "Tẩy", gia: 3000 },
  ];
  res.status(200).json(products);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

