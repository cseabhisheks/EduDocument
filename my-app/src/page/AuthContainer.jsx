import React, { useState } from "react";
import Login from "../component/Login";
import Register from "../component/Register";
import { useNavigate } from "react-router-dom";

export default function AuthContainer() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔐 LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ store token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful");

        navigate("/dashboard");
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Server error");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert("Dummy register");
    setIsLogin(true);
  };

  return isLogin ? (
    <Login
      formData={loginData}
      handleChange={handleLoginChange}
      handleSubmit={handleLoginSubmit}
      switchToRegister={() => setIsLogin(false)}
    />
  ) : (
    <Register
      formData={registerData}
      handleChange={handleRegisterChange}
      handleSubmit={handleRegisterSubmit}
      switchToLogin={() => setIsLogin(true)}
    />
  );
}