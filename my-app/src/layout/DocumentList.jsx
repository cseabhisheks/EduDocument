import DocumentRow from "../component/DocumentRow";

const documents = [
  {
    title: "Introduction to Data Structures",
    file: "ds_intro.pdf",
    subject: "CS301",
    category: "notes",
    uploadedBy: "Dr. Smith",
    date: "20/2/2026",
    size: "2.0 MB",
    downloads: 45,
  },
  {
    title: "Arrays and Linked Lists",
    file: "arrays_linkedlists.pdf",
    subject: "CS301",
    category: "notes",
    uploadedBy: "Dr. Smith",
    date: "18/2/2026",
    size: "1.5 MB",
    downloads: 38,
  },
  {
    title: "Assignment 1 - Sorting Algorithms",
    file: "assignment1.pdf",
    subject: "CS301",
    category: "assignment",
    uploadedBy: "Dr. Smith",
    date: "15/2/2026",
    size: "500 KB",
    downloads: 52,
  },
  {
    title: "Lab Manual - Data Structures",
    file: "ds_lab_manual.pdf",
    subject: "CS301",
    category: "lab",
    uploadedBy: "Dr. Smith",
    date: "10/2/2026",
    size: "2.9 MB",
    downloads: 67,
  },
];

export default function DocumentList() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Documents ({documents.length})
        </h2>
        <p className="text-gray-500 mb-4">
          Showing {documents.length} documents
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Header */}
            <thead className="border-b text-gray-600 text-sm">
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2 hidden md:table-cell">Subject</th>
                <th className="py-2 hidden md:table-cell">Category</th>
                <th className="py-2 hidden md:table-cell">Uploaded By</th>
                <th className="py-2 hidden md:table-cell">Date</th>
                <th className="py-2 hidden md:table-cell">Size</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {documents.map((doc, index) => (
                <DocumentRow key={index} doc={doc} />
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}