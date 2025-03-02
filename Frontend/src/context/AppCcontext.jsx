import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false)

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedRole = sessionStorage.getItem("role");

    if (storedEmail && storedRole) {
      setUser({ email: storedEmail, role: storedRole });
      setIsAdmin(storedRole === "ADMIN");
      setIsDoctor(storedRole === "DOCTOR")
    }
  }, []);

  const value = {
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    isDoctor,
    setIsDoctor
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
