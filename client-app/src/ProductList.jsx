// ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// Các bước trong luồng JWT
const FLOW = [
  { title: "Đăng nhập", desc: "POST /login → nhận token" },
  { title: "Lưu token", desc: "localStorage.setItem()" },
  { title: "Gửi request", desc: "Authorization: Bearer <token>" },
  { title: "Middleware", desc: "jwt.verify() kiểm tra token" },
  { title: "Trả dữ liệu", desc: "200 OK → JSON products" },
  { title: "Render UI", desc: "setState → hiển thị danh sách" },
];

export default function ProductList({ token, onDangXuat }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(2); // đang ở bước "Gửi request"

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    setLoading(true);
    setError(null);
    setActiveStep(2); // Gửi request

    // Simulate step progression
    const timer1 = setTimeout(() => setActiveStep(3), 400); // Middleware
    const timer2 = setTimeout(() => setActiveStep(4), 800); // Trả dữ liệu

    axios
      .get("http://localhost:3000/api/products", {
        headers: savedToken ? { Authorization: `Bearer ${savedToken}` } : {},
      })
      .then((res) => {
        setData(res.data);
        setActiveStep(5); // Render UI
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Không thể kết nối tới server"
        );
        setActiveStep(-1);
      })
      .finally(() => setLoading(false));

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Tính tổng giá trị
  const tongGia = data.reduce((sum, sp) => sum + sp.gia, 0);

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Xác thực thành công — dữ liệu được bảo vệ bởi JWT</p>
        </div>
      </div>

      {/* JWT FLOW VISUALIZER */}
      <div className="flow-section">
        <h3>Luồng JWT Authentication</h3>
        <div className="flow-steps">
          {FLOW.map((step, i) => (
            <div
              key={i}
              className={`flow-step ${
                i < activeStep
                  ? "completed"
                  : i === activeStep
                  ? "active"
                  : ""
              }`}
            >
              <div className="step-num">
                {i < activeStep ? "✓" : i + 1}
              </div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
              {i < FLOW.length - 1 && <span className="arrow">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* TOKEN BAR */}
      <div className="token-bar">
        <span className="token-label">JWT Token</span>
        <span className="token-value">{token}</span>
        <button
          className="token-action"
          onClick={() => navigator.clipboard.writeText(token)}
        >
          Copy
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang gọi API với Bearer token...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div className="error-container">
          <div className="error-icon">✕</div>
          <h3>Lỗi xác thực</h3>
          <p>{error}</p>
          <button className="btn-retry" onClick={onDangXuat}>
            Đăng nhập lại →
          </button>
        </div>
      )}

      {/* SUCCESS STATE */}
      {!loading && !error && (
        <>
          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Tổng sản phẩm</div>
              <div className="stat-value orange">{data.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tổng giá trị</div>
              <div className="stat-value">
                {tongGia.toLocaleString("vi-VN")} đ
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Trạng thái</div>
              <div className="stat-value green">● Authenticated</div>
            </div>
          </div>

          {/* PRODUCTS TABLE */}
          <div className="products-section">
            <h3>Danh sách sản phẩm (Protected API)</h3>
            <div className="products-table">
              <div className="table-header">
                <span>ID</span>
                <span>Tên sản phẩm</span>
                <span>Giá</span>
                <span>Status</span>
              </div>
              {data.map((sp) => (
                <div className="table-row" key={sp.id}>
                  <span className="row-id">#{sp.id}</span>
                  <span className="row-name">{sp.ten}</span>
                  <span className="row-price">
                    {sp.gia.toLocaleString("vi-VN")} đ
                  </span>
                  <span className="row-status">
                    <span className="dot-green"></span>
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
