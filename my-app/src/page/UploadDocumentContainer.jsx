import React, { useState } from "react";

import UploadDocument from "../component/UploadDocument";
import { authHeadersBearer } from "../utilities/api";
import { departments, subjectsMap } from "../utilities/courseOptions";

export default function UploadDocumentContainer() {

  // USER
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const role = user?.role;

  // INITIAL FORM DATA
  const initialFormData = {
    title: "",
    department: "",
    subject: "",
    category:
      role === "Admin" ||
      role === "Faculty"
        ? ""
        : "Assignment",
    file: null,
  };

  // STATE
  const [formData, setFormData] =
    useState(initialFormData);

  // RESET FILE INPUT
  const [fileInputKey, setFileInputKey] =
    useState(Date.now());

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,

      ...(name === "department" && {
        subject: "",
      }),

      ...(role !== "Admin" &&
        role !== "Faculty" && {
          category: "Assignment",
        }),
    }));
  };

  // HANDLE FILE CHANGE
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const finalData = new FormData();

    // TEXT FIELDS
    finalData.append(
      "title",
      formData.title
    );

    finalData.append(
      "department",
      formData.department
    );

    finalData.append(
      "subject",
      formData.subject
    );

    finalData.append(
      "category",
      role === "Admin" ||
      role === "Faculty"
        ? formData.category
        : "Assignment"
    );

    // FILE
    finalData.append(
      "file",
      formData.file
    );

    // 👇 UPLOADED BY
    finalData.append(
      "uploadedBy",
      user?.email || user?.name
    );

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/documents/upload`,
        {
          method: "POST",
          headers: authHeadersBearer(),
          body: finalData,
        }
      );

      const data = await res.json();

      console.log(
        "✅ Upload success:",
        data
      );

      alert(
        "Document uploaded successfully!"
      );

      // RESET FORM
      setFormData(initialFormData);

      // RESET FILE INPUT
      setFileInputKey(Date.now());

    } catch (err) {

      console.error(
        "❌ Upload failed:",
        err
      );

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
      fileInputKey={fileInputKey}
    />
  );
}