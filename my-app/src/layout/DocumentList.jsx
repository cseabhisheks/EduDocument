import DocumentRow from "../component/DocumentRow";
export default function DocumentList({ documents }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold text-gray-800">
          Documents ({documents.length})
        </h2>

        {/* ✅ TABLE WRAPPER MUST EXIST */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead className="border-b text-gray-600 text-sm">
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Category</th>
              </tr>
            </thead>

            {/* ✅ tbody must be INSIDE table */}
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