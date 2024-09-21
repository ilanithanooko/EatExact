import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout"; 
import { useAuthContext } from "../hooks/useAuthContext";

// Navbar component responsible for rendering the navigation bar
const Navbar = ({ userData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to toggle mobile menu visibility
  const [userType, setUserType] = useState("");
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  // Handle logout and navigate to the home page
  const handleClick = () => {
    toggleMobileMenu(); // Close the mobile menu after clicking logout
    logout(); // Execute the logout function
    navigate("/"); // Redirect to the home page
  };

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the mobile menu's open/close state
  };

  useEffect(() => {
    // Fetch children data if the user is an "Individual", allows redirecting to the correct saved recipes page
    if (userData) {
      if (userData.role === "Individual") {
        fetchChildren(); 
      }
    }
  }, [userData]);

  // Fetch children data for users with the "Individual" role
  const fetchChildren = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`,
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Send the user token for authorization
        }
      );
      const data = await response.json();
      
      // Set userType based on whether they have children or not
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
      console.error("Failed to fetch children data:", error); // Log any errors during the fetch
    }
  };

  return (
    user && ( // Only render the navbar if the user is authenticated
      <header className="py-4 bg-gradient-to-bl from-emerald-950 to-green-600 px-5">
        <nav>
          <div className="container mx-auto flex flex-wrap items-center justify-between relative">
            <Link to="/" className="flex">
              <span className="text-white self-center text-2xl whitespace-nowrap">
                EatExact
              </span>
            </Link>

            {/* Mobile menu toggle button */}
            <button
              onClick={toggleMobileMenu} // Toggle mobile menu when button is clicked
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:hidden ml-3 inline-flex"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"} // Change aria-expanded based on the mobile menu state
            >
              <i className="fa-solid fa-bars" style={{ color: "#ffffff" }}></i>
            </button>

            {/* Mobile and desktop navigation links */}
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } md:block w-full md:w-auto`}
              id="mobile-menu"
            >
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm">
                
                {/* Link to generate recipes */}
                <li>
                  <Link
                    onClick={isMobileMenuOpen ? toggleMobileMenu : () => {}} // Close mobile menu after clicking
                    to="/"
                    className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0"
                  >
                    Generate Recipe
                  </Link>
                </li>

                {/* Conditionally render "Saved Recipes" or "My Patients" based on user role */}
                <li>
                  {userData && userData.role !== "Dietitian" ? (
                    <button
                      onClick={() => {
                        if (isMobileMenuOpen) {
                          toggleMobileMenu();
                        }

                        // For Individual users, navigate based on their userType
                        if (
                          userData.role === "Individual" &&
                          userType === "justMe"
                        ) {
                          navigate(`/entity/${userData._id}`, {
                            state: { userData: userData }, // Pass user data to the route
                          });
                        } else {
                          navigate("/saved-recipes");
                        }
                      }}
                      className="w-full text-left text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0"
                    >
                      Saved Recipes
                    </button>
                  ) : (
                    <Link
                      onClick={isMobileMenuOpen ? toggleMobileMenu : () => {}} // Close mobile menu after clicking
                      to="/my-patients"
                      className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0"
                    >
                      My Patients
                    </Link>
                  )}
                </li>

                {/* Link to settings */}
                <li>
                  <Link
                    onClick={isMobileMenuOpen ? toggleMobileMenu : () => {}} // Close mobile menu after clicking
                    to="/settings"
                    className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0"
                  >
                    Settings
                  </Link>
                </li>

                {/* Logout link */}
                <li>
                  <Link
                    onClick={handleClick} // Call handleClick to logout and navigate to home
                    className="text-lg hover:bg-pastel-green focus:outline-none text-white border-b border-gray-100 block pl-3 pr-4 py-2 md:hover:text-pastel-green md:hover:bg-transparent md:p-0 md:bg-transparent md:border-0"
                  >
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  );
};

export default Navbar;