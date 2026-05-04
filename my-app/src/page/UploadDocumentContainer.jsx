import React, { useState } from "react";
import UploadDocument from "../component/UploadDocument";

export default function UploadDocumentContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    subject: "",
    category: role === "Admin" || role === "Faculty" ? "" : "Assignment",
    file: null,
  });

  const departments = ["Computer Science", "Mechanical", "Electrical"];

  const subjectsMap = {
    "Computer Science": ["DSA", "OS", "DBMS"],
    Mechanical: ["Thermodynamics", "Fluid Mechanics"],
    Electrical: ["Circuits", "Signals"],
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "department" && { subject: "" }),

      // 🔐 force category for students
      ...(role !== "Admin" && role !== "Faculty" && {
        category: "Assignment",
      }),
    }));
  };

  // 🔹 File handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      category:
        role === "Admin" || role === "Faculty"
          ? formData.category
          : "Assignment",
    };

    console.log("🚀 Data to send API:", {
      ...finalData,
      fileName: finalData.file?.name,
    });

    alert("Form submitted (check console)");
  };

  return (
    <UploadDocument
      formData={formData}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      departments={departments}
      subjectsMap={subjectsMap}
      role={role}
    />
  );
}