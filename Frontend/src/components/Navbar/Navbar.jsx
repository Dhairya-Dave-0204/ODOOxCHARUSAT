import React, { useContext, useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppCcontext";
import axios from "axios";

function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);

  const [user, setUser] = useState({ email: "", role: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedRole = sessionStorage.getItem("role");

    if (storedEmail) {
      setUser({ email: storedEmail, role: storedRole });
    }
  }, []);
  console.log(user.email + " from navbar");


  const logout = async () => {
    console.log("Logout called");
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });

      // Clear session storage
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("role");
      console.log("Logout called1");

      // Redirect to login page
      window.location.href = "/signup";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 text-xl md:px-32">
      <Link to="/">
        <h1 className="text-3xl font-semibold text-secondary">
          Doc<span className=" text-primary">Appoint</span>
        </h1>
      </Link>

      <menu className="hidden gap-10 xl:flex">
        <Link
          to="/"
          className="transition-all duration-500 hover:scale-110 hover:text-primary"
        >
          <li>Home</li>
        </Link>
        <Link
          to="/doc-general"
          className="transition-all duration-500 hover:scale-110 hover:text-primary"
        >
          <li>Doctor</li>
        </Link>
        <Link
          to="/survey"
          className="transition-all duration-500 hover:scale-110 hover:text-primary"
        >
          <li>Survey</li>
        </Link>
        <Link
          to="/about"
          className="transition-all duration-500 hover:scale-110 hover:text-primary"
        >
          <li>About Us</li>
        </Link>
        <Link
          to="/contact"
          className="transition-all duration-500 hover:scale-110 hover:text-primary"
        >
          <li>Contact Us</li>
        </Link>
        {!user.email ? (
          <Link
            to="/signup"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Join Now</li>
          </Link>
        ) : (
          <Link
          onClick={logout}
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Profile</li>
          </Link>
        )}
      </menu>

      <i
        onClick={() => setMenuOpened(!menuOpened)}
        className="text-3xl ri-menu-4-fill xl:hidden"
      ></i>

      {menuOpened ? (
        <menu
          className={`xl:hidden pb-8 absolute flex flex-col items-center justify-center gap-10 top-20 bg-[#fefffe] left-0 w-full transform transition-transform ${
            menuOpened ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "transfrom 0.3s ease, opacity 0.3s ease" }}
        >
          <Link
            to="/"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Home</li>
          </Link>
          <Link
            to="/doctor"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Doctor</li>
          </Link>
          <Link
            to="/survey"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Survey</li>
          </Link>
          <Link
            to="/about"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>About Us</li>
          </Link>
          <Link
            to="/contact"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Contact Us</li>
          </Link>
          {!user.email ? (
            <Link
              to="/signup"
              className="transition-all duration-500 hover:scale-110 hover:text-primary"
            >
              <li>Join Now</li>
            </Link>
          ) : (
            <Link
            onClick={logout}
              className="transition-all duration-500 hover:scale-110 hover:text-primary"
            >
              <li>Profile</li>
            </Link>
          )}
        </menu>
      ) : null}
    </nav>
  );
}

export default Navbar;
