// Login.jsx
import { useState } from "react";
import axios from "axios";

export default function Login({ onDangNhap }) {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loi, setLoi] = useState("");

  const xuLyDangNhap = async (e) => {
    e.preventDefault();
    setLoi("");
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
    }
  };

  return (
    <form onSubmit={xuLyDangNhap}>
      <h2>Đăng nhập</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="matKhau">Mật khẩu</label>
      <input
        id="matKhau"
        type="password"
        value={matKhau}
        onChange={(e) => setMatKhau(e.target.value)}
        required
      />

      {loi && <p className="loi">{loi}</p>}

      <button type="submit">Đăng nhập</button>
    </form>
  );
}

