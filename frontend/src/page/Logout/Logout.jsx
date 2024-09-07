import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/api/logout")
      .then(() => {
        // Clear user data from local storage
        localStorage.removeItem("userId");
        localStorage.removeItem("role");

        // Redirect to login page or home page
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error during logout:", err);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
    >
      Logout
    </button>
  );
};

export default Logout;
