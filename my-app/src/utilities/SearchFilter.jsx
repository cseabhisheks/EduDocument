import { FiSearch, FiChevronDown } from "react-icons/fi";

export default function SearchFilter() {
  return (
    <div className="bg-gray-100  flex items-start justify-center p-6">
      <div className="bg-white w-full  rounded-xl shadow-md p-6 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Search & Filter
          </h2>
          <p className="text-gray-500 text-sm">
            Find the documents you need
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, file name, or author..."
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Department */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Department
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Courses</option>
                <option>B.Tech</option>
                <option>BCA</option>
                <option>B.Sc</option>
                <option>MCA</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Subject
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Subjects</option>
                <option>Data Structures</option>
                <option>Operating Systems</option>
                <option>Database Management</option>
                <option>Computer Networks</option>
                <option>Mathematics</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Category
            </label>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-100 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Notes</option>
                <option>Assignments</option>
                <option>Question Papers</option>
                <option>Study Material</option>
                <option>Projects</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}