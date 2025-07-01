import React, { useState, useEffect,useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu, X, LayoutDashboard, NotebookPen, Bot,
  BookOpenText, Info, User, LogOut, Smile, Sparkles, UserCircle, ChevronDown
} from "lucide-react";

export default function Layout({ handleLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Auto-close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "user");
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { to: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "resume-builder", label: "Build Resume", icon: <NotebookPen size={18} /> },
    { to: "resume-analyzer", label: "Analyze Resume", icon: <Bot size={18} /> },
    { to: "resume-history", label: "Resume History", icon: <BookOpenText size={18} /> },
    { to: "about", label: "About", icon: <Info size={18} /> },
    { to: "profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 md:z-auto transition-all duration-300 w-3/4 md:w-64 bg-white shadow-md p-5 space-y-6
        ${isSidebarOpen ? "left-0" : "-left-full"} md:left-0 top-0 h-screen`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-emerald-600 flex items-center gap-2">
            <Sparkles className="text-yellow-500" size={22} />  ResuMate
          </h2>
          <button onClick={toggleSidebar} className="md:hidden">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col space-y-3 mt-6">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
  key={to}
  to={to}
  className={({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
      isActive
        ? "bg-emerald-100 text-emerald-600 font-medium"
        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
    }`
  }
  onClick={() => setIsSidebarOpen(false)}
>
  {icon}
  <span className="font-medium">{label}</span>
</NavLink>
          ))}
        </nav>

        <div className="pt-6 border-t text-xs text-gray-400">
          Powered by AI • Smart Resume Solutions
        </div>
      </aside>

      {/* Right Section: Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={toggleSidebar}>
          <Menu size={24} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <Smile className="text-emerald-500" size={20} />
          <h1 className="text-md font-semibold text-gray-700">
            Hello, <span className="text-emerald-600 font-bold">{userName}</span> 👋
          </h1>
        </div>
      </div>

      {/* Right Side Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          <User size={18} />
          <span className="hidden md:inline">Account</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <NavLink
              to="profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              View Profile
            </NavLink>
            <button
              onClick={() => {
                handleLogout();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Sticky Footer (Optional) */}
       <footer className="bg-white text-center text-gray-500 text-sm py-4 shadow-inner sticky bottom-0 z-30">
  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
    <span>
      &copy; {new Date().getFullYear()} <strong className="text-emerald-600">ResuMate</strong>. All rights reserved.
    </span>
    <span className="hidden sm:inline-block">|</span>
    <span>
      Made with <span className="text-red-500">❤️</span> by{" "}
      <a
        href="https://github.com/mdaiyaz940"
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-600 hover:underline"
      >
        Md Aiyaz Ansari
      </a>
    </span>
  </div>
</footer>

      </div>
    </div>
  );
}
