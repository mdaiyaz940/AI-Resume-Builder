// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import ResumeHistoryPage from "./pages/ResumeHistoryPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import LandingPage from "./components/LandingPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(false);
  // const [showLanding, setShowLanding] = useState(true);
 const token = localStorage.getItem("token");
  useEffect(() => {
   
    if (token) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
            setUser(res.data.user);
            setAuthMode(true);
        })
        .catch(() => {
            localStorage.removeItem("token");
            setUser(null);
            setAuthMode(true);
        });
    } else {
        setAuthMode(true);
    }
  }, []);

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
if (!authMode) return <div className="text-center mt-10">Checking authentication...</div>;
//   if (showLanding) {
//     return <LandingPage onStart={() => { setShowLanding(false); setAuthMode("signup"); }} onLogin={() => { setShowLanding(false); setAuthMode("login"); }} />;
//   }

//   if (!user) {
//     return authMode === "signup" ? (
//       <>
//         <SignupForm onSignupSuccess={handleAuthSuccess} />
//         <p className="text-center mt-5 text-sm text-gray-600">
//           Already have an account?
//           <button onClick={() => setAuthMode("login")} className="text-green-600 underline ml-2">Log in</button>
//         </p>
//       </>
//     ) : (
//       <>
//         <LoginForm onLoginSuccess={handleAuthSuccess} />
//         <p className="text-center mt-5 text-sm text-gray-600">
//           Don’t have an account?
//           <button onClick={() => setAuthMode("signup")} className="text-green-600 underline ml-2">Sign up</button>
//         </p>
//       </>
//     );
//   }

  return (
    
      <Routes>
         <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? (
            <>
              <SignupForm onSignupSuccess={handleAuthSuccess} />
              <p className="text-center mt-5 text-sm text-gray-600">
                Already have an account?
                <a href="/login" className="text-green-600 underline ml-2">Log in</a>
              </p>
            </>
          ) : (
            <Navigate to="/dashboard" />
          )}
        />
         <Route
          path="/login"
          element={!user ? (
            <>
              <LoginForm onLoginSuccess={handleAuthSuccess} />
              <p className="text-center mt-5 text-sm text-gray-600">
                Don’t have an account?
                <a href="/signup" className="text-green-600 underline ml-2">Sign up</a>
              </p>
            </>
          ) : (
            <Navigate to="/dashboard" />
          )}
        />
          {/* Protected routes */}
        {user && (
          <Route path="/" element={<Layout handleLogout={handleLogout} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="resume-builder" element={<ResumeBuilderPage />} />
            <Route path="resume-analyzer" element={<ResumeAnalyzerPage />} />
            <Route path="resume-history" element={<ResumeHistoryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
        )}
    <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    
  );
}