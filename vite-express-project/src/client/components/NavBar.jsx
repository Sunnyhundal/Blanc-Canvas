import { useCallback } from "react";
import { useAuth } from "../hooks/AuthContext";
import LoginModal from "./LoginModal";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeController from "./ThemeController";
import DropDownUser from "./DropDownUser/DropDownUser";

export default function NavBar({ openModal }) {
  const { isLoggedIn, logout, user } = useAuth();

  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const path = splitLocation[splitLocation.length - 1];
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const menu = [
    { name: "Find Artists", href: "/artists" },
    { name: "Find Gigs", href: "/gigs" },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-around ">
      <span
        className="font-heading text-4xl whitespace-nowrap cursor-pointer"
        onClick={handleClickLogo}
      >
        LOGO
      </span>
      <div>
        <ul className="flex space-x-6">
          <li className="group inline-block relative">
            <button className="inline-flex items-center">
              <span
                className={
                  "font-subHeading text-lg font-semibold tracking-wider leading-6 hover:text-primary-content" +
                  " uppercase mx-9 px-1 transition-all duration-500 before:content-[none] after:content-[none]" + (path.includes("artists") ? " border-b-2" : "")
                }
              >
                <a href="/artists">
                  Find Artists
                </a>
              </span>
            </button>
            <ul className="dropdown-menu absolute hidden text-primary pt-1 mx-5 group-hover:block z-50 pl-2">
              <li className="z-100">
                <a
                  className="bg-base-100 font-subHeading font-semibold tracking-wider hover:text-primary-content py-4 px-4 block whitespace-no-wrap transition-all duration-500 before:content-[none] after:content-[none]"
                  href="/artists"
                >
                  Browse Talents
                </a>
              </li>
              <li className="z-100">
                <a
                  className="bg-base-100 font-subHeading font-semibold tracking-wider hover:text-primary-content py-4 px-4 block whitespace-no-wrap transition-all duration-500 before:content-[none] after:content-[none]"
                  href="/projects/new"
                >
                  Create Posts
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="/gigs"
              className={
                "font-subHeading text-lg font-semibold tracking-wider leading-6 hover:text-primary-content" +
                " uppercase mx-10 transition-all duration-500 before:content-[none] after:content-[none]" + (path.includes("gigs") ? " border-b-2" : "")
              }
            >
              Find Gigs
            </a>
          </li>
        </ul>
      </div>
      <div className="flex space-x-4 items-center">
        <ThemeController />
        {/* Conditionally render different buttons based on the isLoggedIn state */}
        {isLoggedIn ? (
          <>
            <DropDownUser />

            <button
              onClick={() => handleLogout()}
              className="btn btn-outline btn-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* When the user is NOT logged in */}
            <button
              onClick={() => document.getElementById("login_modal").showModal()}
              className="btn btn-outline btn-primary hover:text-white"
            >
              Log in
            </button>

            <LoginModal />

            <button className="btn btn-primary text-white" onClick={openModal}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
