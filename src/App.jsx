import { useState, useEffect } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const translations = {
  en: {
    welcome: "Welcome to the Admin Dashboard",
    totalProducts: "Total Products",
    totalAdmins: "Total Admins",
    todaysDate: "Today's Date",
    currentTime: "Current Time",
    login: "Login",
    logout: "Logout",
    profile: "Profile",
    editProfile: "Edit Profile",
    save: "Save",
  },
  ru: {
    welcome: "Добро пожаловать в Админ Панель",
    totalProducts: "Всего продуктов",
    totalAdmins: "Всего администраторов",
    todaysDate: "Сегодняшняя дата",
    currentTime: "Текущее время",
    login: "Войти",
    logout: "Выйти",
    profile: "Профиль",
    editProfile: "Редактировать профиль",
    save: "Сохранить",
  },
};

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || { name: "Admin", email: "admin@example.com" };
  });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({ name: "John Doe", email: "john@example.com" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileMenuOpen(false);
    setUser({ name: "Admin", email: "admin@example.com" });
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex font-sans`}> 
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-gray-100 text-black"} shadow-2xl p-6 rounded-r-xl z-50`}
      >
        <button onClick={() => setSidebarOpen(false)} className="text-2xl mb-4">
          <FiX className="text-gray-400 hover:text-white transition" />
        </button>
        <h2 className="text-xl font-extrabold mb-4 tracking-wide">Your Company (by mcs-cv)</h2>
        <ul>
          <li className="p-3 hover:bg-gray-700 rounded cursor-pointer flex items-center transition">🏠 Home</li>
          <li className="p-3 hover:bg-gray-700 rounded cursor-pointer flex items-center transition">🛍️ Product</li>
          <li className="p-3 hover:bg-gray-700 rounded cursor-pointer flex items-center transition">👥 Admins</li>
        </ul>
      </motion.div>

      <div className="flex-1 p-6">
        <div className={`flex justify-between items-center p-6 rounded-xl shadow-2xl bg-opacity-90 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            <FiMenu />
          </button>
          <h1 className="text-2xl font-extrabold tracking-wide">{translations[language].welcome} (by mcs-cv)</h1>
          <div className="flex gap-4 items-center relative">
            <button onClick={() => setDarkMode(!darkMode)} className={`text-2xl p-2 rounded-full shadow-md ${darkMode ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"}`}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button onClick={() => setLanguage(language === "en" ? "ru" : "en")} className="text-xl p-2 rounded-full shadow-md bg-blue-500 text-white">
              {language === "en" ? "🇷🇺" : "🇺🇸"}
            </button>

            <div className="relative">
              <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="text-2xl bg-gray-700 text-white p-2 rounded-full shadow-md">
                <FiUser />
              </button>
              {profileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.3 }}
                  className={`absolute right-0 mt-2 w-48 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-xl rounded-lg p-4`}
                >
                  <p className="text-sm font-semibold">{translations[language].profile}: {user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                  <button onClick={handleLogout} className="mt-4 flex items-center gap-2 w-full p-2 bg-red-500 text-white rounded text-sm">
                    <FiLogOut /> {translations[language].logout}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="flex justify-center items-center h-96">
            <button onClick={handleLogin} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md text-lg">
              {translations[language].login}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <Card icon="📦" title={translations[language].totalProducts} value="124" color="bg-blue-600" />
            <Card icon="👥" title={translations[language].totalAdmins} value="8" color="bg-green-600" />
            <Card icon="📅" title={translations[language].todaysDate} value={time.toLocaleDateString()} color="bg-orange-600" />
            <Card icon="⏰" title={translations[language].currentTime} value={time.toLocaleTimeString()} color="bg-purple-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
