import React, { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Collapsible from "react-collapsible";
import FamilyMemberForm from "./FamilyMemberForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const FamilyForm = ({ onBack, option }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [isOwnerCollapsed, setIsOwnerCollapsed] = useState(false);
  const [ownerData, setOwnerData] = useState({
    age: "",
    dietaryRestrictions: "",
    favoriteIngredients: "",
    unlikedIngredients: "",
  });
  const { user } = useAuthContext();
  const [error, setError] = useState("");

  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addFamilyMember = () => {
    setIsOwnerCollapsed(true);
    setMembers([
      ...members,
      {
        id: members.length + 1,
        name: "",
        age: "",
        dietaryRestrictions: "",
        favoriteIngredients: "",
        unlikedIngredients: "",
      },
    ]);
  };

  const handleMemberChange = (id, data) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, ...data } : member
      )
    );
  };

  const removeFamilyMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (option == "familyJoin") {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/updateInfo`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              email: user.email,
              role: "Individual",
              ...ownerData,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update owner information");
        }
      } else {
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
              role: "Individual",
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update owner information");
        }
      }

      for (const member of members) {
        const familyResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/familyMember`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ ...member }),
          }
        );
        if (!familyResponse.ok) {
          throw new Error("Failed to add family member");
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
      {option === "familyJoin" && (
        <Collapsible
          trigger="Owner Information"
          open={!isOwnerCollapsed}
          onOpen={() => setIsOwnerCollapsed(false)}
          onClose={() => setIsOwnerCollapsed(true)}
        >
          <div>
            <form className="space-y-4">
              <div>
                <label className="block font-montserrat text-lg mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={ownerData.age}
                  onChange={handleOwnerChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-montserrat text-lg mb-2">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  name="dietaryRestrictions"
                  value={ownerData.dietaryRestrictions}
                  onChange={handleOwnerChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-montserrat text-lg mb-2">
                  Favorite Ingredients
                </label>
                <input
                  type="text"
                  name="favoriteIngredients"
                  value={ownerData.favoriteIngredients}
                  onChange={handleOwnerChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-montserrat text-lg mb-2">
                  Un-liked Ingredients
                </label>
                <input
                  type="text"
                  name="unlikedIngredients"
                  value={ownerData.unlikedIngredients}
                  onChange={handleOwnerChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </form>
          </div>
        </Collapsible>
      )}
      <div>
        {members.map((member, index) => (
          <Collapsible
            key={member.id}
            trigger={member.name || `Family Member ${index + 1}`}
            open={index === members.length - 1}
          >
            <FamilyMemberForm
              member={member}
              onChange={(data) => handleMemberChange(member.id, data)}
              onRemove={() => removeFamilyMember(member.id)}
            />
          </Collapsible>
        ))}
        <button
          type="button"
          onClick={addFamilyMember}
          className="flex items-center justify-center w-full mt-4 bg-wood-green p-3 text-white font-bold rounded-full"
        >
          <FaPlus className="mr-2" /> Add Another Family Member
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

export default FamilyForm;
