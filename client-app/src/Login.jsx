// Login.jsx
import { useState } from "react";
import axios from "axios";

export default function Login({ onDangNhap }) {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loi, setLoi] = useState("");
  const [dangTai, setDangTai] = useState(false);

  const xuLyDangNhap = async (e) => {
    e.preventDefault();
    setLoi("");
    setDangTai(true);

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        matKhau,
      });
      // Đăng nhập thành công -> lưu token vào localStorage
      localStorage.setItem("token", res.data.token);
      onDangNhap(res.data.token);
    } catch (err) {
      setLoi(err.response?.data?.message || "Không thể kết nối tới server");
    } finally {
      setDangTai(false);
    }
  };

  return (
    <div className="hero">
      <div className="login-container">
        {/* LEFT - Info */}
        <div className="login-info">
          <h1>
            Bảo mật API với{" "}
            <span className="highlight">JWT Token</span>
          </h1>
          <p>
            Demo hoàn chỉnh luồng xác thực: đăng nhập nhận token, lưu vào
            localStorage, gửi kèm mỗi request, server kiểm tra qua middleware,
            chỉ trả dữ liệu khi hợp lệ.
          </p>
          <div className="badges">
            <span className="badge">
              <span className="dot"></span> React + Vite
            </span>
            <span className="badge">
              <span className="dot"></span> Express.js
            </span>
            <span className="badge">
              <span className="dot"></span> JSON Web Token
            </span>
            <span className="badge">
              <span className="dot"></span> CORS
            </span>
          </div>
        </div>

        {/* RIGHT - Form */}
        <div className="login-form-wrapper">
          <h2>Đăng nhập</h2>
          <p className="subtitle">Nhập tài khoản để nhận JWT token</p>

          {loi && (
            <div className="error-msg">
              <span>⚠</span> {loi}
            </div>
          )}

          <form onSubmit={xuLyDangNhap}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="matKhau">Mật khẩu</label>
              <input
                id="matKhau"
                type="password"
                placeholder="••••••"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                required
              />
            </div>

            <button className="login-btn" type="submit" disabled={dangTai}>
              {dangTai ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                  Đang xác thực...
                </>
              ) : (
                "Đăng nhập →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
