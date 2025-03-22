import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const correctUsername = "mcs-ilya's-sponsor";
  const correctPassword = "ybanshka";

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ name: "Admin", email: "admin@example.com" }));
      onLogin(); // Обновляем стейт в `App.jsx`
      navigate("/"); // Перенаправляем в `Dashboard`
    } else {
      alert("❌ Wrong username or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-96" onSubmit={handleLogin}>
        <h2 className="text-white text-center text-2xl mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
