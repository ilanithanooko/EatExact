import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import MenuForm from "./MenuForm";

// BusinessMenuForm component sets professional users on profile setup process
const BusinessMenuForm = ({ onBack, onUserDataChange }) => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [menusCount, setMenusCount] = useState(0);
  const { user } = useAuthContext(); 
  const [error, setError] = useState("");

  // Add a new menu to the list
  const addMenu = () => {
    setMenus([
      ...menus,
      {
        id: menus.length + 1,
        name: "",
      },
    ]);
    setMenusCount(menusCount + 1); // Increment the count of menus
  };

  // Handle changes in individual menu data
  const handleMenuChange = (id, data) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => (menu.id === id ? { ...menu, ...data } : menu)) // Update the corresponding menu by ID
    );
  };

  // Remove a specific menu from the list by its ID
  const removeMenu = (id) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id)); // Remove menu with the specified ID
    setMenusCount(menusCount - 1); // Decrement the count of menus
  };

  // Display an error message for 5 seconds
  const showError = (message) => {
    setError(message);
    setTimeout(function () {
      setError("");
    }, 5000);
  };

  // Handle form submission (updates user role and creates menus)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // update the user's role to "Professional"
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/updateRole`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Attach the user's token for authentication
          },
          body: JSON.stringify({
            email: user.email,
            role: "Professional",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update owner information"); // Show error if role update fails
      }

      // Create a menu for each menu in the menus list
      for (const menu of menus) {
        const menuResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/menu`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Attach the user's token for authentication
            },
            body: JSON.stringify({ ...menu }), // Send the menu data
          }
        );
        if (!menuResponse.ok) {
          throw new Error("Failed to add menu"); // Show error if menu creation fails
        }
      }

      // Notify parent component of user data change
      if (onUserDataChange) {
        onUserDataChange();
      }
      navigate("/"); // Navigate to the home page after successful submission
    } catch (error) {
      showError(error.message); // Show error if any step in the process fails
    }
  };

  return (
    <div>
      {/* Back button to return to previous screen */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-green-900"
      >
        <FaArrowLeft className="mr-2" />
      </button>

      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-96">
        <div>
          <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Create Personalized Menus for Your Customers
          </h3>
          <div className="text-center text-lg mb-5 text-gray-700">
            As a professional chef, you know that one size doesn’t fit all when
            it comes to dining. By simply selecting the types of menus you want
            to offer—whether it's gluten-free, dairy-free, or other dietary
            options—we’ll help you craft personalized dishes that meet your
            guests' specific needs.
            <br />
            This streamlined approach ensures that your restaurant provides
            delicious and inclusive options, giving every guest a memorable
            dining experience, no matter their dietary requirements.
          </div>

          {/* Button to add a new menu (visible only when there are no menus yet) */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => {
                addMenu();
              }}
              className={`${
                menusCount === 0 ? "" : "hidden"
              } w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full`}
            >
              <FaPlus className="text-2xl" />
            </button>
          </div>

          {/* Render collapsible sections for each menu */}
          <div>
            {menus.map((menu, index) => (
              <div>
                <Collapsible
                  key={menu.id}
                  trigger={menu.name || `Menu ${index + 1}`} // Trigger text for the collapsible menu form
                  open={index === menus.length - 1} // Automatically open the last added menu
                >
                  {/* MenuForm component for handling individual menu creation */}
                  <MenuForm
                    menu={menu}
                    onChange={(data) => handleMenuChange(menu.id, data)} // Update the menu data
                    onRemove={() => removeMenu(menu.id)} // Remove the menu
                    onAdd={() => {
                      addMenu();
                    }} // Add a new menu
                  />
                </Collapsible>
                <hr className="my-2"></hr>
              </div>
            ))}
          </div>

          {/* Submit button and error message */}
          <div
            className={`${
              menusCount === 0 ? "hidden" : ""
            } flex flex-col justify-center items-center`}
          >
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className={`text-center rounded-md py-3 px-12 text-sm lg:text-lg text-white shadow-md bg-green-600 hover:bg-green-700`}
              >
                Let's get started!
              </button>
            </div>
            {error && (
              <div className="mt-2">
                <p className="text-red-500">{error}</p> {/* Display error message */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMenuForm;