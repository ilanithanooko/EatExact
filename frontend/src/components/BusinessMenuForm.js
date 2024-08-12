import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import MenuForm from "./MenuForm";

const BusinessMenuForm = ({ onBack }) => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [isOwnerCollapsed, setIsOwnerCollapsed] = useState(false);
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  const addMenu = () => {
    setIsOwnerCollapsed(true);
    setMenus([
      ...menus,
      {
        id: menus.length + 1,
        name: "",
      },
    ]);
  };

  const handleMenuChange = (id, data) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => (menu.id === id ? { ...menu, ...data } : menu))
    );
  };

  const removeMenu = (id) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
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
      navigate("/");
      // Redirect or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-green-900"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <h3 className="text-center font-montserrat text-2xl mb-4 text-green-900 font-bold">
        Add Business Menus
      </h3>
      <p className="text-center font-montserrat text-lg mb-4 text-gray-700">
        You can add menus later as well.
      </p>
      {/* <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">Menu Name</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-wood-green p-3 text-white font-bold rounded">
          Add Menu
        </button>
      </form> */}

      
      <div>
        {menus.map((menu, index) => (
          <Collapsible
            key={menu.id}
            trigger={menu.name || `Menu ${index + 1}`}
            open={index === menus.length - 1}
          >
            <MenuForm
              menu={menu}
              onChange={(data) => handleMenuChange(menu.id, data)}
              onRemove={() => removeMenu(menu.id)}
            />
          </Collapsible>
        ))}
        <button
          type="button"
          onClick={addMenu}
          className="flex items-center justify-center w-full mt-4 bg-wood-green p-3 text-white font-bold rounded-full"
        >
          <FaPlus className="mr-2" />Add Another Menu
        </button>
      </div>
      <button
        type="button"
        className="w-full mt-4 bg-wood-green p-3 text-white font-bold rounded"
        onClick={handleSubmit}
      >
        Let's get started!
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BusinessMenuForm;