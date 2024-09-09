import React, { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Collapsible from "react-collapsible";
import FamilyMemberForm from "./FamilyMemberForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const FamilyForm = ({ onBack, option, onUserDataChange}) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [childrenCount, setChildrenCount] = useState(0);
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
    setChildrenCount(childrenCount + 1)
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
    setChildrenCount(childrenCount - 1)
  };

  const showError = (message) => {
    setError(message);
    setTimeout(function () {
      setError("");
    }, 5000);
  };

  const handleNavigation = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (option === "familyJoin") {
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
      if (onUserDataChange) {
        onUserDataChange();
      }

      handleNavigation()
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
        {option === "familyJoin" && (
          <div>
            <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
              Tell Us About Your Family’s Preferences
            </h3>
            <div className="text-center text-lg mb-5 text-gray-700">
              To help us generate the best recipes for you and your family,
              please provide details about each family member.
              <br />
              We’ll consider their age, dietary restrictions, favorite
              ingredients, and ingredients they’d prefer to avoid.
              <br />
              With this information, every recipe suggestion will be tailored to
              meet the unique needs and tastes of each person, making mealtime
              easier and more enjoyable!
            </div>

            <Collapsible
              trigger={user.firstName + " " + user.lastName}
              open={!ownerData.age || !ownerData.dietaryRestrictions || !ownerData.favoriteIngredients || !ownerData.unlikedIngredients || childrenCount === 0}
            >
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-lg">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={ownerData.age}
                      onChange={handleOwnerChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-lg">
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
                    <label className="block text-lg">
                      Preferred Ingredients
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
                    <label className="block text-lg">
                      Avoid These Ingredients
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

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      addFamilyMember();
                    }}
                    className={`${
                      ownerData.age &&
                      ownerData.dietaryRestrictions &&
                      ownerData.favoriteIngredients &&
                      ownerData.unlikedIngredients
                        ? ""
                        : "hidden"
                    } w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full mt-4`}
                  >
                    <FaPlus className="text-2xl" />
                  </button>
                </div>
              </div>
            </Collapsible>
            <hr className="my-2"></hr>
          </div>
        )}
        <div>
          {option === "justKids" && (
            <div>
              <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
                Tell Us About Your Kids' Preferences
              </h3>
              <div className="text-center text-lg mb-5 text-gray-700">
                To make mealtime easier and more enjoyable for your children,
                we’ll help you generate personalized recipes tailored just for
                them! Please provide us with some important details about each
                of your kids, such as their age, any dietary restrictions,
                favorite ingredients, and ingredients they don’t like. With this
                information, you’ll never have to re-enter their preferences
                again — every recipe will be automatically customized to fit
                their needs and tastes.
              </div>
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    addFamilyMember();
                  }}
                  className={`${childrenCount === 0 ? '' : 'hidden'} w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full`}
                >
                  <FaPlus className="text-2xl" />
                </button>
              </div>
            </div>
          )}
          {members.map((member, index) => (
            <div>
            <Collapsible
              key={member.id}
              trigger={member.name || "Family member " + (index + 1)}
              open={index === members.length - 1}
            >
              <FamilyMemberForm
                member={member}
                onChange={(data) => handleMemberChange(member.id, data)}
                onRemove={() => removeFamilyMember(member.id)}
                onAdd={addFamilyMember}
              />
            </Collapsible>
            <hr className="my-2"></hr>
            </div>
          ))}
        </div>
        <div className={`${childrenCount === 0 ? "hidden" : ""} flex flex-col justify-center items-center`}>
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className={`text-center rounded-md py-3 px-12 text-sm lg:text-lg text-white shadow-md bg-green-600 hover:bg-green-700`}
            >
              Let's get started!
            </button>
          </div>
          {error && <div className="mt-2"><p className="text-red-500">{error}</p></div>}
        </div>
        
      </div>
    </div>
  );
};

export default FamilyForm;
