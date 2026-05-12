import { FiFileText, FiDownload } from "react-icons/fi";

export default function DocumentRow({ doc }) {

  const API = import.meta.env.VITE_BACKEND;

  const getCategoryStyle = (category) => {

    if (category === "notes")
      return "bg-blue-100 text-blue-600";

    if (category === "assignment")
      return "bg-purple-100 text-purple-600";

    if (category === "lab")
      return "bg-green-100 text-green-600";

    return "bg-gray-100 text-gray-600";
  };

  // DOWNLOAD / OPEN PDF
  const handleDownload = () => {

    if (!doc.fileUrl) return;

    const cleanPath = doc.fileUrl.replace(/\\/g, "/");

    const link = document.createElement("a");

    link.href = `${API}/${cleanPath}`;

    link.target = "_blank";

    link.click();
  };

  return (
    <>
      {/* MOBILE VIEW */}
      <tr className="md:hidden border-b">

        <td colSpan={4} className="py-4 px-4">

          <div className="space-y-3">

            {/* FILE INFO */}
            <div className="flex items-start gap-2">

              <FiFileText
                className="text-gray-500 mt-1"
                size={18}
              />

              <div>
                <p className="font-medium text-gray-800">
                  {doc.title}
                </p>

                <p className="text-xs text-gray-500">
                  {doc.file}
                </p>
              </div>

            </div>

            {/* DETAILS */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">

              <span>{doc.subject}</span>

              <span
                className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(
                  doc.category
                )}`}
              >
                {doc.category}
              </span>

              <span>{doc.uploadedBy}</span>

              <span>{doc.date}</span>

              <span>{doc.size}</span>

            </div>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm"
            >
              <FiDownload size={14} />

              Open PDF
            </button>

          </div>

        </td>
      </tr>

      {/* DESKTOP VIEW */}
      <tr className="hidden md:table-row border-b hover:bg-gray-50">

        {/* TITLE */}
        <td className="py-4 px-4">

          <div className="flex items-start gap-2">

            <FiFileText
              className="text-gray-500 mt-1"
              size={18}
            />

            <div>
              <p className="font-medium text-gray-800">
                {doc.title}
              </p>

              <p className="text-xs text-gray-500">
                {doc.file}
              </p>
            </div>

          </div>

        </td>

        {/* SUBJECT */}
        <td className="py-4 px-4 text-gray-700">
          {doc.subject}
        </td>

        {/* CATEGORY */}
        <td className="py-4 px-4">

          <span
            className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(
              doc.category
            )}`}
          >
            {doc.category}
          </span>

        </td>

        {/* DOWNLOAD */}
        <td className="py-4 px-4 text-center">

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 border px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
          >
            <FiDownload size={14} />

            Open PDF
          </button>

        </td>

      </tr>
    </>
  );
}