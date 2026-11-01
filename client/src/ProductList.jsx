// ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList({ onDangXuat }) {
  const [data, setData] = useState([]); // danh sách sản phẩm
  const [loading, setLoading] = useState(true); // trạng thái đang tải
  const [error, setError] = useState(null); // thông báo lỗi

  useEffect(() => {
    const token = localStorage.getItem("token");

    setLoading(true);
    setError(null);

    axios
      .get("http://localhost:3000/api/products", {
        // Gắn token vào header: Authorization: Bearer <token>
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => setData(res.data)) // thành công -> cập nhật data
      .catch((err) =>
        setError(err.response?.data?.message || "Không thể kết nối tới server")
      ) // thất bại -> cập nhật error
      .finally(() => setLoading(false)); // dù thành công hay thất bại đều tắt loading
  }, []);

  return (
    <div>
      <div className="thanh-tren">
        <h2>Danh sách sản phẩm</h2>
        <button className="phu" onClick={onDangXuat}>
          Đăng xuất
        </button>
      </div>

      {loading && <p>Đang tải...</p>}

      {!loading && error && <p className="loi">Lỗi: {error}</p>}

      {!loading && !error && (
        <ul>
          {data.map((sp) => (
            <li key={sp.id}>
              <span>{sp.ten}</span>
              <span>{sp.gia.toLocaleString("vi-VN")} đ</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

