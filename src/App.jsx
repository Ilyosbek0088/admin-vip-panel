import { useState, useEffect } from "react";
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiHome, FiBox, FiUsers } from "react-icons/fi";
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
    home: "Home",
    products: "Products",
    admins: "Admins",
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
    home: "Главная",
    products: "Продукты",
    admins: "Администраторы",
  },
};

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [profileOpen, setProfileOpen] = useState(false);

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

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen flex font-sans relative`}>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-gray-100 text-black"} shadow-2xl p-6 rounded-r-xl z-50`}
      >
        <button onClick={() => setSidebarOpen(false)} className="text-2xl mb-4">
          <FiX className="text-gray-400 hover:text-white transition" />
        </button>
        <h2 className="text-xl font-extrabold mb-4 tracking-wide">Your Company</h2>
        <nav className="flex flex-col gap-4">
          <SidebarItem icon={<FiHome />} label={translations[language].home} />
          <SidebarItem icon={<FiBox />} label={translations[language].products} />
          <SidebarItem icon={<FiUsers />} label={translations[language].admins} />
        </nav>
      </motion.div>
      
      <div className="flex-1 p-6">
        <div className={`flex justify-between items-center p-6 rounded-xl shadow-2xl bg-opacity-90 ${darkMode ? "bg-gray-800" : "bg-white"}`}>          
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            <FiMenu />
          </button>
          <h1 className="text-2xl font-extrabold tracking-wide">{translations[language].welcome}</h1>
          <div className="flex gap-4 items-center relative z-20">
            <button onClick={() => setDarkMode(!darkMode)} className={`text-2xl p-2 rounded-full shadow-md ${darkMode ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"}`}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <button onClick={() => setLanguage(language === "en" ? "ru" : "en")} className="text-xl p-2 rounded-full shadow-md bg-blue-500 text-white">
              {language === "en" ? "🇷🇺" : "🇺🇸"}
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="text-2xl p-2 rounded-full shadow-md bg-gray-700 text-white"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <FiUser />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md p-2">
                    <button className="w-full text-left p-2 hover:bg-gray-200" onClick={() => alert("Edit Profile")}>{translations[language].profile}</button>
                    <button className="w-full text-left p-2 hover:bg-gray-200" onClick={() => { setIsLoggedIn(false); setProfileOpen(false); }}>{translations[language].logout}</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setIsLoggedIn(true)} className="text-xl p-2 rounded-full shadow-md bg-green-500 text-white relative z-20">
                {translations[language].login}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <Card icon="📦" title={translations[language].totalProducts} value="124" color="bg-blue-600" />
          <Card icon="👥" title={translations[language].totalAdmins} value="8" color="bg-green-600" />
          <Card icon="📅" title={translations[language].todaysDate} value={time.toLocaleDateString()} color="bg-orange-600" />
          <Card icon="⏰" title={translations[language].currentTime} value={time.toLocaleTimeString()} color="bg-purple-600" />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 p-3 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-all">
    {icon}
    {label}
  </div>
);

const Card = ({ icon, title, value, color }) => (
  <motion.div className={`p-6 ${color} text-white rounded-xl shadow-2xl flex items-center transform hover:scale-105 transition-all duration-300`}>
    <span className="text-4xl bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</span>
    <div>
      <p className="text-sm opacity-80 font-semibold">{title}</p>
      <p className="text-xl font-extrabold tracking-wide">{value}</p>
    </div>
  </motion.div>
);

export default Dashboard;