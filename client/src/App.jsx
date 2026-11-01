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
    <div className="khung">
      {token ? (
        <ProductList onDangXuat={dangXuat} />
      ) : (
        <Login onDangNhap={setToken} />
      )}
    </div>
  );
}

