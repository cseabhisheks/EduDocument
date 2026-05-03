import React, { useState } from "react";
import Login from "../component/Login";
import Register from "../component/Register";
export default function AuthContainer() {
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

  // 🔹 Handlers
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("🔐 Login Data:", loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("📝 Register Data:", registerData);
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