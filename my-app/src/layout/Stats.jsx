import StatCard from "../component/StatCard"

import { FaFileAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function Stats(){
    return(<>
       <div className="p-6">
      
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, John Doe!
        </h1>
        <p className="text-gray-500 mt-1">
          Access your study materials and upload your notes.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <StatCard
          title="Total Documents"
          value="9"
          subtitle="Available for download"
          icon={FaFileAlt}
        />

        <StatCard
          title="My Uploads"
          value="1"
          subtitle="Documents uploaded"
          icon={FaUpload}
        />

        <StatCard
          title="Total Downloads"
          value="522"
          subtitle="Across all documents"
          icon={FaArrowTrendUp}
        />

      </div>
    </div>
    </>)
}