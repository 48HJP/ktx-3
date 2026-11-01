// middleware.js
const jwt = require("jsonwebtoken");

// Khóa bí mật dùng để ký và kiểm tra token (thực tế nên đặt trong file .env)
const SECRET_KEY = "khoa_bi_mat_cua_toi";

function xacThuc(req, res, next) {
  // Header có dạng: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  // Không có header hoặc sai định dạng -> chưa đăng nhập
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      // Token sai chữ ký hoặc đã hết hạn
      return res
        .status(403)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
    req.user = payload; // lưu thông tin người dùng cho các route phía sau
    next(); // token hợp lệ -> chuyển sang route xử lý tiếp theo
  });
}

module.exports = { xacThuc, SECRET_KEY };

