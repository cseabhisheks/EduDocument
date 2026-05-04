import { useState } from "react";
import SearchFilter from "../utilities/SearchFilter";
import DocumentList from "../layout/DocumentList";

const documentsData = [
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
];

export default function DocumentsLibrary() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");

  // 🔥 Filtering logic
  const filteredDocs = documentsData.filter((doc) => {
    return (
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.file.toLowerCase().includes(search.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(search.toLowerCase())
    );
  }).filter((doc) => {
    return (
      (!subject || doc.subject === subject) &&
      (!category || doc.category === category)
    );
  });

  return (
    <>
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

      <DocumentList documents={filteredDocs} />
    </>
  );
}