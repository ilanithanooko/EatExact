import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import MenuForm from "./MenuForm";

const BusinessMenuForm = ({ onBack, onUserDataChange }) => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [menusCount, setMenusCount] = useState(0);
  const [isOwnerCollapsed, setIsOwnerCollapsed] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  const addMenu = () => {
    setMenus([
      ...menus,
      {
        id: menus.length + 1,
        name: "",
      },
    ]);
    setMenusCount(menusCount + 1);
  };

  const handleMenuChange = (id, data) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => (menu.id === id ? { ...menu, ...data } : menu))
    );
  };

  const removeMenu = (id) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
    setMenusCount(menusCount - 1);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(function () {
      setError("");
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/updateRole`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
            role: "Professional",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update owner information");
      }

      for (const menu of menus) {
        const menuResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/menu`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ ...menu }),
          }
        );
        if (!menuResponse.ok) {
          throw new Error("Failed to add menu");
        }
      }
      if (onUserDataChange) {
        onUserDataChange();
      }
      navigate("/");
      // Redirect or show success message
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div>
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

          <div>
            {menus.map((menu, index) => (
              <div>
              <Collapsible
                key={menu.id}
                trigger={menu.name || `Menu ${index + 1}`}
                open={index === menus.length - 1}
              >
                <MenuForm
                  menu={menu}
                  onChange={(data) => handleMenuChange(menu.id, data)}
                  onRemove={() => removeMenu(menu.id)}
                  onAdd={() => {
                    addMenu();
                  }}
                />
              </Collapsible>
              <hr className="my-2"></hr>
              </div>
            ))}
          </div>

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
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessMenuForm;
