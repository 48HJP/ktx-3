// App.jsx
import { useState } from "react";
import Login from "./Login";
import ProductList from "./ProductList";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const dangXuat = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <a className="logo" href="/">
          <div className="logo-icon">⚡</div>
          JWT Demo
        </a>
        <ul className="nav-links">
          <li className="active">DASHBOARD</li>
          <li>PRODUCTS</li>
          <li>API</li>
          <li>DOCS</li>
        </ul>
        <div className="nav-right">
          {token ? (
            <>
              <div className="user-pill">
                <div className="user-avatar">A</div>
                <span>admin</span>
              </div>
              <button className="btn-danger" onClick={dangXuat}>
                Đăng xuất
              </button>
            </>
          ) : (
            <button className="btn-primary">
              GET IN TOUCH →
            </button>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      {token ? (
        <ProductList token={token} onDangXuat={dangXuat} />
      ) : (
        <Login onDangNhap={setToken} />
      )}
    </div>
  );
}
