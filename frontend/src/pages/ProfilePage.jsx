import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, FileEdit, FileSearch, Loader } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalResumes: 0, analyzedResumes: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStats(res.data))
        .catch(() => console.error("Failed to load stats"));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch((err) => console.error("Failed to fetch profile", err))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center text-gray-500">
        <Loader className="animate-spin mr-2" /> Loading profile...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-6">
        👤 Your Profile
      </h1>

      {user ? (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-6">
          {/* User Info */}
          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex flex-wrap items-center gap-2 text-gray-700">
              <User size={20} className="text-emerald-600" />
              <span className="font-semibold">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-gray-700">
              <Mail size={20} className="text-blue-600" />
              <span className="font-semibold">Email:</span>
              <span className="break-all">{user.email}</span>
            </div>
          </div>

          {/* Resume Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 shadow-sm">
              <FileEdit className="text-emerald-500" size={28} />
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-medium">Total Resumes Built:</span>{" "}
                {stats.totalResumes}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 shadow-sm">
              <FileSearch className="text-purple-500" size={28} />
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-medium">Resumes Analyzed:</span>{" "}
                {stats.analyzedResumes}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">User not found.</p>
      )}
    </div>
  );
}
