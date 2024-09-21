import React, { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Collapsible from "react-collapsible";
import FamilyMemberForm from "./FamilyMemberForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const FamilyForm = ({ onBack, option, onUserDataChange }) => {
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

  // handles changes in the owner input fields
  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({ ...prevData, [name]: value })); // Update the corresponding field in ownerData
  };

  // Function to add a new family member form
  const addFamilyMember = () => {
    setMembers([
      ...members,
      {
        id: members.length + 1, // Assign a unique ID to each member
        name: "",
        age: "",
        dietaryRestrictions: "",
        favoriteIngredients: "",
        unlikedIngredients: "",
      },
    ]);
    setChildrenCount(childrenCount + 1); // Increase the count of children added
  };

  // handles changes in the family member form data
  const handleMemberChange = (id, data) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, ...data } : member // Update the correct family member data based on ID
      )
    );
  };

  // remove a family member from the list
  const removeFamilyMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id) // Remove the member by filtering out their ID
    );
    setChildrenCount(childrenCount - 1); // Decrease the count of children
  };

  // display an error message for 5 seconds
  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000); 
  };

  // navigate to the home page
  const handleNavigation = () => {
    navigate("/");
  };

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (option === "familyJoin") {
        // If the account type is "family", update the user role and information
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
              role: "Individual", // Set role to "Individual"
              ...ownerData, // Include the owner details
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update owner information");
        }
      } else {
        // If the account type is "just Kids", only update the user role (personal info is not needed)
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
              role: "Individual", // Set role to "Individual"
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update owner information");
        }
      }

      // For each family member, send a POST request to add them to the database
      for (const member of members) {
        const familyResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/familyMember`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ ...member }), // Send the family member's data
          }
        );
        if (!familyResponse.ok) {
          throw new Error("Failed to add family member");
        }
      }
      if (onUserDataChange) {
        onUserDataChange(); // onUserDataChange is passed from App.js to refresh user data after the role update, enabling correct navigation with React Router.
      }
      handleNavigation(); // Navigate to the Dashboard page after successful submission
    } catch (error) {
      showError(error.message); // Display the error message if something goes wrong
    }
  };

  return (
    <div>
      {/* Back button */}
      <button onClick={onBack} className="mb-4 flex items-center text-green-900">
        <FaArrowLeft className="mr-2" />
      </button>

      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-96">
        {/* Display owner form if "familyJoin" option is selected */}
        {option === "familyJoin" && (
          <div>
            <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
              Tell Us About Your Family’s Preferences
            </h3>
            <div className="text-center text-lg mb-5 text-gray-700">
              To help us generate the best recipes for you and your family, please provide details about each family member.
              We’ll consider their age, dietary restrictions, favorite ingredients, and ingredients they’d prefer to avoid.
              Every recipe suggestion will be tailored to meet the unique needs and tastes of each person.
            </div>

            {/* Collapsible section for owner (user) details */}
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
                      onChange={handleOwnerChange} // Handle changes to age
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-lg">Dietary Restrictions</label>
                    <input
                      type="text"
                      name="dietaryRestrictions"
                      value={ownerData.dietaryRestrictions}
                      onChange={handleOwnerChange} // Handle changes to dietary restrictions
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-lg">Preferred Ingredients</label>
                    <input
                      type="text"
                      name="favoriteIngredients"
                      value={ownerData.favoriteIngredients}
                      onChange={handleOwnerChange} // Handle changes to preferred ingredients
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-lg">Avoid These Ingredients</label>
                    <input
                      type="text"
                      name="unlikedIngredients"
                      value={ownerData.unlikedIngredients}
                      onChange={handleOwnerChange} // Handle changes to ingredients to avoid
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </form>
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => { addFamilyMember(); }}
                    className={`${ownerData.age && ownerData.dietaryRestrictions && ownerData.favoriteIngredients && ownerData.unlikedIngredients ? "" : "hidden"} w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full mt-4`}
                  >
                    <FaPlus className="text-2xl" />
                  </button>
                </div>
              </div>
            </Collapsible>
            <hr className="my-2"></hr>
          </div>
        )}
        {/* Family member forms */}
        <div>
          {option === "justKids" && (
            <div>
              <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
                Tell Us About Your Kids' Preferences
              </h3>
              <div className="text-center text-lg mb-5 text-gray-700">
                Please provide important details about each of your kids, such as their age, dietary restrictions, and favorite or unliked ingredients. Every recipe will be automatically customized to fit their needs and tastes.
              </div>
              {/* Add family member button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => { addFamilyMember(); }}
                  className={`${childrenCount === 0 ? '' : 'hidden'} w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full`}
                >
                  <FaPlus className="text-2xl" />
                </button>
              </div>
            </div>
          )}
          {/* Map through each family member and render a form for them */}
          {members.map((member, index) => (
            <div>
              <Collapsible
                key={member.id}
                trigger={member.name || "Family member " + (index + 1)} // Trigger text for the collapsible family member form
                open={index === members.length - 1} // Automatically open the last added family member form
              >
                {/* Render FamilyMemberForm for each family member */}
                <FamilyMemberForm
                  member={member}
                  onChange={(data) => handleMemberChange(member.id, data)} // Handle family member data change
                  onRemove={() => removeFamilyMember(member.id)} // Remove family member
                  onAdd={addFamilyMember}
                />
              </Collapsible>
              <hr className="my-2"></hr>
            </div>
          ))}
        </div>

        {/* Submit button and error message display */}
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
          {error && <div className="mt-2"><p className="text-red-500">{error}</p></div>} {/* Display error message */}
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;