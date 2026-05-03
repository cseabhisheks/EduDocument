import React from "react";
import { FaBook } from "react-icons/fa";

export default function Register({
  formData,
  handleChange,
  handleSubmit,
  departments,
  switchToLogin,
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
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Register for EduDoc Portal
        </p>

        {/* Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Abhishek"
          className="w-full mb-3 px-4 py-2 bg-gray-100 rounded-lg"
        />

        {/* Email */}
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="abhishek@gmail.com"
          className="w-full mb-3 px-4 py-2 bg-gray-100 rounded-lg"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          className="w-full mb-3 px-4 py-2 bg-gray-100 rounded-lg"
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <option>Student</option>
          <option>Faculty</option>
          <option>Admin</option>
        </select>

        {/* Department */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <option value="">Select department</option>
          {departments.map((dep) => (
            <option key={dep}>{dep}</option>
          ))}
        </select>

        {/* Enrollment */}
        <input
          name="enrollment"
          value={formData.enrollment}
          onChange={handleChange}
          placeholder="MUIT23535636"
          className="w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg"
        />

        {/* Button */}
        <button className="w-full bg-black text-white py-2 rounded-lg">
          Register
        </button>

        {/* Switch */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-600 cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}