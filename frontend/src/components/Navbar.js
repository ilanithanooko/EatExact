import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = ({ userData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userType, setUserType] = useState("");
  const { user } = useAuthContext();

  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    toggleMobileMenu();
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // fetch appropriate data according to role
    if (userData) {
      if (userData.role === "Individual") {
        fetchChildren();
      }
    }
  }, [userData]);

  const fetchChildren = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        if (userData && userData.age) {
          setUserType("family");
        } else {
          setUserType("justKids");
        }
      } else {
        setUserType("justMe");
      }
    } catch (error) {
      console.error("Failed to fetch children data:", error);
    }
  };

  return (
    user && (
      <header className="py-4 bg-gradient-to-bl from-emerald-950 to-green-600 px-5">
        <nav className="">
          <div className="container mx-auto flex flex-wrap items-center justify-between relative">
            <Link to="/" className="flex">
              <span className="text-white self-center text-2xl whitespace-nowrap">
                EatExact
              </span>
            </Link>
            <button
              onClick={toggleMobileMenu} // Toggle mobile menu when button is clicked
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:hidden ml-3 inline-flex"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <i class="fa-solid fa-bars" style={{ color: "#ffffff" }}></i>
            </button>
            {/* Conditionally render mobile menu based on state */}
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block w-full md:w-auto`}
              id="mobile-menu"
            >
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm">
                <li>
                  <Link
                    onClick={isMobileMenuOpen ? toggleMobileMenu : () => {}}
                    to="/"
                    className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0 "
                  >
                    Generate Recipe
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      if (isMobileMenuOpen) {
                        toggleMobileMenu();
                      }

                      if (userData.role === "Individual" && userType === "justMe") {
                        navigate(`/entity/${userData._id}`, {
                          state: { userData: userData },
                        });
                      } else {
                        navigate("/saved-recipes");
                      }
                    }}
                    className="w-full text-left text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0"
                  >
                    Saved Recipes
                  </button>
                </li>
                <li>
                  <Link
                    onClick={isMobileMenuOpen ? toggleMobileMenu : () => {}}
                    to="/settings"
                    className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0 "
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleClick}
                    className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0 "
                  >
                    Log out
                  </Link>
                </li>
                {/* <li>
                    <button
                      className="hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0 "
                      onClick={handleClick}
                    >
                      Log out
                    </button>
                  </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  );
};

export default Navbar;
