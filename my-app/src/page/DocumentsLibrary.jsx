import { useEffect, useState } from "react";
import SearchFilter from "../utilities/SearchFilter";
import DocumentList from "../layout/DocumentList";

export default function DocumentsLibrary() {

  const [documents, setDocuments] = useState([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);

  // 🔥 Fetch documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/documents`
      );

      const data = await res.json();

      setDocuments(data);

    } catch (err) {

      console.error(
        "❌ Failed to fetch documents:",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  // 🔥 Filter documents
  const filteredDocs = documents

    .filter((doc) => {

      return (
        doc.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        doc.file
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        doc.uploadedBy
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    })

    .filter((doc) => {

      return (
        (!department ||
          doc.department === department) &&

        (!subject ||
          doc.subject === subject) &&

        (!category ||
          doc.category === category)
      );
    });

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Search Section */}
      <div className="px-6 pt-6">
        <SearchFilter
          search={search}
          setSearch={setSearch}

          department={department}
          setDepartment={setDepartment}

          subject={subject}
          setSubject={setSubject}

          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Documents Section */}
      <div className="px-6 pb-6">

        {loading ? (

          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">
              Loading documents...
            </p>
          </div>

        ) : filteredDocs.length > 0 ? (

          <DocumentList
            documents={filteredDocs}
          />

        ) : (

          <div className="flex justify-center items-center py-20">
            <p className="text-gray-400">
              No documents found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}