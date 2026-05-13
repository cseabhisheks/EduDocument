import React from "react";
import { FaUpload } from "react-icons/fa";

export default function UploadDocument({
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  departments,
  subjectsMap,
  role,
  fileInputKey,
}) {
  const isPrivileged =
    role === "Admin" || role === "Faculty";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
      >
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900">
          {isPrivileged
            ? "Upload Document"
            : "Submit Assignment"}
        </h1>

        <p className="text-gray-500 mt-1 text-sm">
          {isPrivileged
            ? "Notes & question papers for students. Use category Assignment for teacher assignment files (handouts). Students use Submit Assignment for their own submissions."
            : "Submit your assignment for review"}
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Document Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Introduction to Data Structures"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Department *
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200"
              required
            >
              <option value="">
                Select department
              </option>

              {departments.map((dep) => (
                <option
                  key={dep}
                  value={dep}
                >
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Subject *
            </label>

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={!formData.department}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 disabled:opacity-50"
              required
            >
              <option value="">
                Select subject
              </option>

              {formData.department &&
                subjectsMap[
                  formData.department
                ]?.map((sub) => (
                  <option
                    key={sub}
                    value={sub}
                  >
                    {sub}
                  </option>
                ))}
            </select>

            {!formData.department && (
              <p className="text-xs text-gray-400 mt-1">
                Select a department first
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category *
            </label>

            {isPrivileged ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-200"
                required
              >
                <option value="">
                  Select category
                </option>

                <option value="Notes">
                  Notes
                </option>

                <option value="Assignment">
                  Assignment
                </option>

                <option value="Question Paper">
                  Question Paper
                </option>
              </select>
            ) : (
              <input
                type="text"
                value="Assignment"
                disabled
                className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-200 border border-gray-200"
              />
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Upload File *
            </label>

            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />

              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>

              <p className="text-xs text-gray-400 mt-1">
                PDF, DOC, DOCX, PPT, PPTX,
                TXT (max 10MB)
              </p>

              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2"
                key={fileInputKey}
                required
              />
            </div>

            {formData.file && (
              <p className="text-sm text-green-600 mt-2">
                Selected File:{" "}
                {formData.file.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              <FaUpload />

              {isPrivileged
                ? "Upload Document"
                : "Submit Assignment"}
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400">
            Note: Your upload will be
            reviewed by faculty before
            becoming visible.
          </p>
        </div>
      </form>
    </div>
  );
}