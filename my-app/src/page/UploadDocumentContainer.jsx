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


//handle submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const finalData = new FormData();

  finalData.append("title", formData.title);
  finalData.append("department", formData.department);
  finalData.append("subject", formData.subject);
  finalData.append("category",
    role === "Admin" || role === "Faculty"
      ? formData.category
      : "Assignment"
  );

  finalData.append("file", formData.file);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND}/api/documents/upload`,
      {
        method: "POST",
        body: finalData,
      }
    );

    const data = await res.json();

    console.log("✅ Upload success:", data);
    alert("Document uploaded successfully!");

    // optional reset form
    setFormData({
      title: "",
      department: "",
      subject: "",
      category: role === "Admin" || role === "Faculty" ? "" : "Assignment",
      file: null,
    });

  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("Upload failed!");
  }
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