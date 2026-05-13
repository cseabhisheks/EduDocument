import React, { useState, useMemo } from "react";
import Login from "../component/Login";
import Register from "../component/Register";
import { useNavigate } from "react-router-dom";
import { departments, subjectsMap } from "../utilities/courseOptions";

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
    subjects: [],
  });

  const allSubjects = useMemo(
    () => [...new Set(Object.values(subjectsMap).flat())],
    []
  );

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value !== "Faculty" ? { subjects: [] } : {}),
    }));
  };

  const toggleFacultySubject = (subject) => {
    setRegisterData((prev) => {
      const set = new Set(prev.subjects || []);
      if (set.has(subject)) set.delete(subject);
      else set.add(subject);
      return { ...prev, subjects: [...set] };
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      role: registerData.role,
      department: registerData.department,
      enrollment: registerData.enrollment,
    };
    if (registerData.role === "Faculty") {
      payload.subjects = registerData.subjects || [];
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
      allSubjects={allSubjects}
      toggleFacultySubject={toggleFacultySubject}
      switchToLogin={() => setIsLogin(true)}
    />
  );
}
