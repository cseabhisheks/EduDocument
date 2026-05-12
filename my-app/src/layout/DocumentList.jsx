import DocumentRow from "../component/DocumentRow";

export default function DocumentList({ documents }) {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Documents ({documents.length})
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">

            {/* Table Head */}
            <thead className="hidden md:table-header-group border-b bg-gray-50">
              <tr className="text-left text-sm text-gray-600">

                <th className="py-3 px-4 font-semibold">
                  Title
                </th>

                <th className="py-3 px-4 font-semibold">
                  Subject
                </th>

                <th className="py-3 px-4 font-semibold">
                  Category
                </th>

                <th className="py-3 px-4 font-semibold text-center">
                  Download
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {documents.map((doc, index) => (
                <DocumentRow
                  key={index}
                  doc={doc}
                />
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}