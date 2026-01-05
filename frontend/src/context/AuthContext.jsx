import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  let role = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role || "user";
    } catch (err) {
      console.log(err);
      role = null;
    }
  }

  const signin = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const signout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
