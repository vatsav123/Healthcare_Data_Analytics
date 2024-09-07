import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Create a Context for Authentication
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user info from local storage
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (userId && role) {
      setUser({ userId, role });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const login = (userId, role) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    setUser({ userId, role });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using authentication context
export const useAuth = () => useContext(AuthContext);
