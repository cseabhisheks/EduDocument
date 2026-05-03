import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //   const isAuth =  true;
  const isAuth = localStorage.getItem("token");
  return (
    <div className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between rounded-xl">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 hover:cursor-pointer" onClick={() => { navigate("/") }}>

        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white text-xl font-bold">📘</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            EduDoc Portal
          </h1>
          <p className="text-sm text-gray-500">
            Document Management System
          </p>
        </div>
      </div>

      {/* RIGHT SIDE → show ONLY if authenticated */}
      {isAuth && (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
            JD
          </div>

          <div className="flex-col hidden md:flex">
            <span className="text-sm font-medium text-gray-800">
              John Doe
            </span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full w-fit">
              Student
            </span>
          </div>

          <MdOutlineArrowDropDownCircle className="text-gray-500 w-5 h-5 cursor-pointer" />
        </div>
      )}

    </div>
  );
};

export default Navbar;