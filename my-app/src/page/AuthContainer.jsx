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
    role: "Student",
    department: "",
    enrollment: "",
  });

  const departments = ["Computer Science", "Mechanical", "Electrical"];

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  // REGISTER
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered Successfully");
      setIsLogin(true);
    } else {
      alert(data.message);
    }
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
      departments={departments}
      switchToLogin={() => setIsLogin(true)}
    />
  );
}