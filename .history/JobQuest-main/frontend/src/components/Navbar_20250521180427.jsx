 /* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <h1
        className="text-white text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        CareerVista
      </h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white font-medium capitalize">
              Welcome, {user.name}!
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/signin")}
            className="bg-green-500 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
