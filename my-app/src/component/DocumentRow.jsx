import { FiFileText, FiDownload } from "react-icons/fi";

export default function DocumentRow({ doc }) {
  const getCategoryStyle = (category) => {
    if (category === "notes") return "bg-blue-100 text-blue-600";
    if (category === "assignment") return "bg-purple-100 text-purple-600";
    if (category === "lab") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <tr className="border-b ">
      
      {/* Title */}
      <td className="py-3">
        <div className="flex items-start gap-2">
          <FiFileText className="text-gray-500 mt-1" size={18} />
          <div>
            <p className="font-medium text-gray-800">{doc.title}</p>
            <p className="text-xs text-gray-500">{doc.file}</p>
          </div>
        </div>
      </td>

      {/* Subject */}
      <td className="hidden md:table-cell">{doc.subject}</td>

      {/* Category */}
      <td className="hidden md:table-cell">
        <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(doc.category)}`}>
          {doc.category}
        </span>
      </td>

      {/* Uploaded By */}
      <td className="hidden md:table-cell">{doc.uploadedBy}</td>

      {/* Date */}
      <td className="hidden md:table-cell">{doc.date}</td>

      {/* Size */}
      <td className="hidden md:table-cell">{doc.size}</td>

      {/* Action */}
      <td>
        <button className="flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-gray-100">
          <FiDownload size={14} />
          <span className="hidden sm:inline">
            {doc.downloads || 0}
          </span>
        </button>
      </td>

    </tr>
  );
}