export default function SearchFilter({
  search,
  setSearch,
  department,
  setDepartment,
  subject,
  setSubject,
  category,
  setCategory,
}) {
  return (
    <div className="bg-gray-100 flex items-start justify-center p-6">
      <div className="bg-white w-full rounded-xl shadow-md p-6 space-y-6">

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Search & Filter
          </h2>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-3 rounded-lg bg-gray-100"
        />

        {/* Filters */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <select onChange={(e) => setDepartment(e.target.value)}>
            <option value="">All Courses</option>
            <option value="B.Tech">B.Tech</option>
          </select>

          <select onChange={(e) => setSubject(e.target.value)}>
            <option value="">All Subjects</option>
            <option value="CS301">Data Structures</option>
          </select>

          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Types</option>
            <option value="notes">Notes</option>
            <option value="assignment">Assignments</option>
          </select>

        </div> */}
      </div>
    </div>
  );
}