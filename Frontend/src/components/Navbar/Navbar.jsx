import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );

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

  const menuToggler = () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <>
      {/* ========= Background Blur ============= */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ${
          menuOpened ? "visible opacity-100 blur-sm" : "invisible opacity-0"
        }`}
        onClick={menuToggler}
      ></div>

      <nav className="flex items-center justify-between px-8 py-6 text-xl border-b-2 border-b-primary md:px-32">
        <Link to="/">
          <h1 className="text-3xl font-semibold text-secondary">
            Care<span className=" text-primary">Connect</span>
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
          <Link
            to="/user-profile"
            className="transition-all duration-500 hover:scale-110 hover:text-primary"
          >
            <li>Profile</li>
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
              <li>Logout</li>
            </Link>
          )}
        </menu>

        <i
          onClick={() => setMenuOpened(!menuOpened)}
          className="text-3xl ri-menu-4-fill xl:hidden"
        ></i>
      </nav>

      {menuOpened ? (
        <menu
          className={`fixed top-0 left-0 flex flex-col px-10 py-16 space-y-2 text-2xl h-screen max-sm:w-[75%] md:w-[40%] gap-5 lg:hidden bg-white text-primary transition-transform duration-500 ease-in-out ${
            menuOpened ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Link
            to={"/"}
            className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Home</li>
          </Link>
          <Link
            to={"/movie"}
            className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Movies</li>
          </Link>
          <Link
            to={"/event"}
            className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Events</li>
          </Link>
          <Link
            to={"/contact"}
            className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>Contact Us</li>
          </Link>
          <Link
            to={"/about"}
            className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
          >
            <li>About Us</li>
          </Link>
          {!user.email ? (
            <Link
              to="/signup"
              className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
            >
              <li>Join Now</li>
            </Link>
          ) : (
            <Link
              onClick={logout}
              className="transition-all duration-700 decoration-primary hover:text-primary hover:underline underline-offset-4"
            >
              <li>Logout</li>
            </Link>
          )}
        </menu>
      ) : null}
    </>
  );
}

export default Navbar;
