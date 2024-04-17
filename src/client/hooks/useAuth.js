import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const login = async (userData) => {
    setCurrentUser(userData);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      currentUser,
      login,
      logout,
    }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
