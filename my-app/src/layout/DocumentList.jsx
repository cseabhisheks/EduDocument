import DocumentRow from "../component/DocumentRow";

export default function DocumentList({
  title = "Documents",
  documents,
  viewer,
  onDeleteDocument,
  embedded = false,
}) {
  const card = (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="hidden md:table-header-group border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="py-3 px-4 font-semibold">Title</th>
              <th className="py-3 px-4 font-semibold">Subject</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold text-center">Open</th>
              {onDeleteDocument && (
                <th className="py-3 px-4 font-semibold text-center w-24">
                  Delete
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <DocumentRow
                key={doc._id || doc.id}
                doc={doc}
                viewer={viewer}
                onDelete={onDeleteDocument}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (embedded) {
    return <div className="mb-8">{card}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {card}
    </div>
  );
}
