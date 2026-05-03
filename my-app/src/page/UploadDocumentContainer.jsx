import React, { useState } from "react";
import UploadDocument from "../component/UploadDocument";

export default function UploadDocumentContainer() {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    subject: "",
    category: "",
    file: null,
  });

  const departments = ["Computer Science", "Mechanical", "Electrical"];

  const subjectsMap = {
    "Computer Science": ["DSA", "OS", "DBMS"],
    Mechanical: ["Thermodynamics", "Fluid Mechanics"],
    Electrical: ["Circuits", "Signals"],
  };

  // Handle text/select
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // reset subject if department changes
      ...(name === "department" && { subject: "" }),
    }));
  };

  // Handle file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🚀 Data to send API:");
    console.log({
      ...formData,
      fileName: formData.file?.name,
      fileSize: formData.file?.size,
      fileType: formData.file?.type,
    });
  };

  return (
    <UploadDocument
      formData={formData}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      departments={departments}
      subjectsMap={subjectsMap}
    />
  );
}