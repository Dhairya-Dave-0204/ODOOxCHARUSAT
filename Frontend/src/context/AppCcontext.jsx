import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedRole = sessionStorage.getItem("role");

    if (storedEmail && storedRole) {
      setUser({ email: storedEmail, role: storedRole });
      setIsAdmin(storedRole === "ADMIN"); // ✅ Move inside useEffect
    }
  }, []);

  const value = {
    user,
    setUser,
    isAdmin,
    setIsAdmin,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
