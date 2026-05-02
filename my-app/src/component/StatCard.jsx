import { FaFileAlt } from "react-icons/fa";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon = FaFileAlt, // default icon
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 w-full shadow-sm hover:shadow-md transition">
      
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-600">
          {title}
        </h3>

        <div className="text-gray-400 text-lg">
          <Icon />
        </div>
      </div>

      {/* Value */}
      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-gray-900">
          {value}
        </h2>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
};

export default StatCard;