import { departments, subjectsMap } from "./courseOptions";

/**
 * @param {"notes" | "assignmentHub"} mode
 */
export default function SearchFilter({
  mode = "notes",
  search,
  setSearch,
  department,
  setDepartment,
  subject,
  setSubject,
  category,
  setCategory,
}) {
  const subjects = department ? subjectsMap[department] || [] : [];

  const title =
    mode === "assignmentHub"
      ? "Search assignments"
      : "Search notes & materials";

  const noteTypes = ["Notes", "Question Paper"];

  return (
    <div className="bg-gray-100 flex items-start justify-center p-6">
      <div className="bg-white w-full rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {mode === "assignmentHub"
              ? "Filter both teacher assignment files and student submissions."
              : "Notes, question papers, and other materials (not assignment submissions)."}
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, file, or uploader…"
          className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setSubject("");
              }}
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
            >
              <option value="">All departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!department}
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm disabled:opacity-50"
            >
              <option value="">All subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {mode === "notes" && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm"
              >
                <option value="">All types</option>
                {noteTypes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
