import { FiFileText, FiDownload } from "react-icons/fi";

export default function DocumentRow({ doc }) {
  const getCategoryStyle = (category) => {
    if (category === "notes") return "bg-blue-100 text-blue-600";
    if (category === "assignment") return "bg-purple-100 text-purple-600";
    if (category === "lab") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <tr className="border-b">
      <td colSpan={7} className="py-3">
        {/* MOBILE VIEW */}
        <div className="md:hidden space-y-2">
          <div className="flex items-start gap-2">
            <FiFileText className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium text-gray-800">{doc.title}</p>
              <p className="text-xs text-gray-500">{doc.file}</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
            <span> {doc.subject}</span>
            <span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(doc.category)}`}>
                {doc.category}
              </span>
            </span>
            <span> {doc.uploadedBy}</span>
            <span>{doc.date}</span>
            <span> {doc.size}</span>
          </div>

          <button className="flex items-center gap-2 border px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm">
            <FiDownload size={14} />
            Download ({doc.downloads || 0})
          </button>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:table-row">
          <div className="grid grid-cols-7 items-center gap-4">
            <div className="flex items-start gap-2">
              <FiFileText className="text-gray-500 mt-1" size={18} />
              <div>
                <p className="font-medium text-gray-800">{doc.title}</p>
                <p className="text-xs text-gray-500">{doc.file}</p>
              </div>
            </div>

            <div>{doc.subject}</div>

            <div>
              <span className={`px-2 py-0.5 text-xs rounded-full ${getCategoryStyle(doc.category)}`}>
                {doc.category}
              </span>
            </div>

            <div>{doc.uploadedBy}</div>
            <div>{doc.date}</div>
            <div>{doc.size}</div>

            <div>
              <button className="flex items-center gap-2 border px-2 py-1 rounded-md hover:bg-gray-100">
                <FiDownload size={14} />
                {doc.downloads || 0}
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}