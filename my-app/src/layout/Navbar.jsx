import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const buildLinks = () => {
    if (!user) return [];
    const links = [
      {
        label: "Notes",
        path: "/notes",
        active: location.pathname.startsWith("/notes"),
      },
      {
        label: "Assignments",
        path: "/assignments",
        active: location.pathname.startsWith("/assignments"),
      },
    ];
    if (user.role === "Admin") {
      links.push(
        {
          label: "Admin",
          path: "/admin",
          active: location.pathname.startsWith("/admin"),
        },
        {
          label: "Students",
          path: "/faculty/students",
          active: location.pathname.startsWith("/faculty/students"),
        }
      );
    }
    if (user.role === "Faculty") {
      links.push({
        label: "Students",
        path: "/faculty/students",
        active: location.pathname.startsWith("/faculty/students"),
      });
    }
    return links;
  };

  const links = token && user ? buildLinks() : [];

  const linkClass = (active, isMobile) =>
    [
      "text-left rounded-lg font-medium transition-colors",
      isMobile ? "w-full px-4 py-3 text-base" : "px-3 py-2 text-sm",
      active
        ? "bg-indigo-50 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    ].join(" ");

  return (
    <header ref={menuRef} className="relative z-50 w-full">
      <div className="w-full bg-white shadow-sm px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2 md:gap-4 rounded-xl border border-gray-100/80">
        <div
          className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1 hover:cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg md:text-xl font-bold">📘</span>
          </div>

          <div className="min-w-0">
            <h1 className="text-xs  sm:text-base md:text-xl font-extrabold text-gray-800 truncate">
              EduDoc Portal
            </h1>
            <p className="hidden sm:block text-xs md:text-sm text-gray-500 truncate">
              Document Management System
            </p>
          </div>
        </div>

        {token && user && (
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
            <nav className="hidden md:flex items-center gap-1 text-sm text-gray-600 flex-wrap justify-end max-w-xl">
              {links.map(({ label, path, active }) => (
                <button
                  key={`${path}-${label}`}
                  type="button"
                  className={linkClass(active, false)}
                  onClick={() => go(path)}
                >
                  {label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs sm:text-sm font-semibold">
              {getInitials(user.name)}
            </div>

            <div className="hidden lg:flex flex-col max-w-[140px]">
              <span className="text-sm font-medium text-gray-800 truncate">
                {user.name || user.email}
              </span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full w-fit">
                {user.role || "User"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs sm:text-sm border-2 px-2.5 sm:px-3 md:px-4 rounded-xl bg-red-500 py-1.5 sm:py-2 text-white hover:bg-red-600 whitespace-nowrap"
            >
              Log out
            </button>
          </div>
        )}
      </div>

      {token && user && menuOpen && (
        <nav
          className="md:hidden absolute left-0 right-0 top-full mt-1 mx-3 sm:mx-4 rounded-xl border border-gray-200 bg-white shadow-lg py-2 z-50 max-h-[min(70vh,calc(100dvh-5rem))] overflow-y-auto"
          aria-label="Main navigation"
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{user.role}</p>
          </div>
          <div className="flex flex-col p-2">
            {links.map(({ label, path, active }) => (
              <button
                key={`m-${path}-${label}`}
                type="button"
                className={linkClass(active, true)}
                onClick={() => go(path)}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
