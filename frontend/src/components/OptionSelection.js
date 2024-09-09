import React from "react";
import { FaUser, FaUsers, FaChild, FaArrowLeft } from "react-icons/fa";
import RoleButton from "./RoleButton";

const OptionSelection = ({ onSelect, onBack }) => {
  return (
    <div>

      <button
        onClick={onBack}
        className="mb-4 flex items-center text-green-800"
      >
        <FaArrowLeft className="mr-2" />
      </button>


      <div className="grid grid-cols-1 lg:grid-cols-3 px-5 xl:px-36 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 cursor-pointer" onClick={() => onSelect("justMe")}>
          <FaUser className="text-4xl text-green-800 mx-auto mb-4 drop-shadow-sm" />
          <h3 className="text-xl text-center font-semibold text-green-800 mb-2">Tailored Just for You</h3>
          <p className="text-gray-700 text-lg md:text-xl mb-4">Manage your own dietary preferences and needs with ease. Create personalized recipes that cater to your taste and dietary restrictions, ensuring every meal is just the way you like it.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-4 cursor-pointer" onClick={() => onSelect("familyJoin")}>
          <FaUsers className="text-5xl text-green-800 mx-auto mb-4 drop-shadow-sm" />
          <h3 className="text-xl text-center font-semibold text-green-800 mb-2">Care for Yourself and Your Family</h3>
          <p className="text-gray-700 text-lg md:text-xl mb-4">Balance your own tastes while managing your children’s dietary needs. Add their favorite ingredients and avoid allergens to create recipes the whole family will enjoy.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-4 cursor-pointer" onClick={() => onSelect("justKids")}>
          <FaChild className="text-5xl text-green-800 mx-auto mb-4 drop-shadow-sm" />
          <h3 className="text-xl text-center font-semibold text-green-800 mb-2">Focused on Your Kids</h3>
          <p className="text-gray-700 text-lg md:text-xl mb-4">Create healthy, fun, and allergen-free meals tailored specifically to your children's preferences. Focus only on what matters most: keeping your kids happy and healthy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OptionSelection;
