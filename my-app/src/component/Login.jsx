import React from "react";
import { FaBook } from "react-icons/fa";

export default function Login({
  formData,
  handleChange,
  handleSubmit,
  switchToRegister,
}) {
  return (
    <div className="p-5 h-[calc(100vh-100px)] flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-600 p-4 rounded-full text-white text-xl">
            <FaBook />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold">
          EduDoc Portal
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Educational Document Management System
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="abhisheks@gmail.com"
            className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-lg"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-black text-white py-2 rounded-lg">
          Sign In
        </button>

        {/* Switch */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={switchToRegister}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}