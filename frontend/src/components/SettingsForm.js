import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Collapsible from "react-collapsible";
import FamilyMemberForm from "./FamilyMemberForm";
import MenuForm from "./MenuForm";
import { useAuthContext } from "../hooks/useAuthContext";
import PatientForm from "./PatientForm";

// SettingsForm component renders accout type based components on the settings page
const SettingsForm = ({ toEdit, userData }) => {
  const [data, setData] = useState([]);
  const [children, setChildren] = useState([]);
  const [menus, setMenus] = useState([]);
  const [patients, setPatients] = useState([]);
  const [ownerData, setOwnerData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    age: userData.age,
    dietaryRestrictions: userData.dietaryRestrictions,
    favoriteIngredients: userData.favoriteIngredients,
    unlikedIngredients: userData.unlikedIngredients,
  });
  const [sucessMessage, setSucessMessage] = useState("");
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  // Handles changes in the owner data (personal details)
  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Updates the data array for family members, menus, or patients based on user input
  const handleEntityChange = (e, index) => {
    const { name, value } = e.target;

    // Update the specific member in the data array
    setData((prevData) =>
      prevData.map((member, i) =>
        i === index ? { ...member, [name]: value } : member
      )
    );
  };

  // Updates the member's details for family members or patients in the state
  const handleMemberChange = (id, data) => {
    setData((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, ...data } : member
      )
    );
  };
  // Utility function to show error messages
  const showError = (message) => {
    setError(message);
    setTimeout(function () {
      setError("");
    }, 5000);
  };

  // Utility function to show success messages
  const showSuccessMessage = (message) => {
    setSucessMessage(message);
    setTimeout(function () {
      setSucessMessage("");
    }, 5000);
  };

  // Updates the owner data
  const updateOwnerData = async (event) => {
    event.preventDefault();
    try {
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
            role: toEdit === "owner" ? "Individual" : "Professional",
            ...ownerData,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update owner information");
      } else {
        showSuccessMessage("Details Successfully Updated!");
      }
    } catch (error) {
      showError(error.message);
    }
  };

  // Updates a family member's data
  const updateChildData = async (event, id, index) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data[index]), // Update member data
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update family member");
      }
      showSuccessMessage("Family member details updated successfully!");
    } catch (error) {
      showError(error.message);
    }
  };

  // Updates a menu's data
  const updateMenuData = async (event, id, index) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menu/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data[index]), // Update member data
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update menu");
      }
      showSuccessMessage("Menu details updated successfully!");
    } catch (error) {
      showError(error.message);
    }
  };

  // Updates a patient's data
  const updatePatientData = async (event, id, index) => {
      event.preventDefault();
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/patient/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data[index]), // Update member data
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update patient");
        }
        showSuccessMessage("Patient details updated successfully!");
      } catch (error) {
        showError(error.message);
      }
    };

  // Deletes a family member and their saved recipes
  const deleteFamilyMember = async (event, id) => {
    event.preventDefault();
    try {
      // Fetch saved recipes for this family member
      const recipesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const savedRecipes = await recipesResponse.json();
      // Delete each saved recipe for the family member
      if (savedRecipes.length > 0) {
        for (const recipe of savedRecipes) {
          await fetch(
            `${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
        }
      }
      // delete family member
      await fetch(`${process.env.REACT_APP_API_URL}/api/familyMember/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Update the state by removing the deleted member
      setData((prevData) => prevData.filter((member) => member.id !== id));
      setChildren((prevData) => prevData.filter((member) => member.id !== id));
      showSuccessMessage(
        "Family member & their saved recipes removed successfully!"
      );
      setTimeout(async function () {
        await fetchChildren(); // Fetch the updated family data
      }, 5000);
    } catch (error) {
      showError("Failed to delete family member or their saved recipes.");
    }
  };

  // Deletes a menu and its saved recipes
  const deleteMenu = async (event, id) => {
    event.preventDefault();
    try {
      // Fetch saved recipes for this menu
      const recipesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const savedRecipes = await recipesResponse.json();
      // Delete each saved recipe for the menu
      if (savedRecipes.length > 0) {
        for (const recipe of savedRecipes) {
          await fetch(
            `${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
        }
      }
      // delete menu
      await fetch(`${process.env.REACT_APP_API_URL}/api/menu/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Update the state by removing the deleted member
      setData((prevData) => prevData.filter((member) => member.id !== id));
      setMenus((prevData) => prevData.filter((member) => member.id !== id));
      showSuccessMessage("Menu & Its saved recipes removed successfully!");
      setTimeout(async function () {
        await fetchMenus(); // Fetch the updated family data
      }, 5000);
    } catch (error) {
      showError("Failed to delete menu or its saved recipes");
    }
  };

  // Remove a patient and their saved recipes
  const deletePatient = async (event, id) => {
    event.preventDefault();
    try {
      // Fetch saved recipes for this patient
      const recipesResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/recipes/${id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const savedRecipes = await recipesResponse.json();
      // Delete each saved recipe for the patient
      if (savedRecipes.length > 0) {
        for (const recipe of savedRecipes) {
          await fetch(
            `${process.env.REACT_APP_API_URL}/api/recipes/${recipe._id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
        }
      }
      // delete patient
      await fetch(`${process.env.REACT_APP_API_URL}/api/patient/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // Update the state by removing the deleted member
      setData((prevData) => prevData.filter((member) => member.id !== id));
      setPatients((prevData) => prevData.filter((member) => member.id !== id));
      showSuccessMessage(
        "patient & their saved recipes removed successfully!"
      );
      setTimeout(async function () {
        await fetchPatients(); // Fetch the updated family data
      }, 5000);
    } catch (error) {
      showError("Failed to delete patient or their saved recipes.");
    }
  };

  // Adds a family member
  const addFamilyMember = async (event) => {
    event.preventDefault();
    try {
      // Filter the members in `data` that are not present in `children`
      const newMembers = data.filter(
        (member) => !children.some((child) => child.id === member.id)
      );
      for (const member of newMembers) {
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
        } else {
          showSuccessMessage("Family member added successfully!");
          // Re-fetch the data after successfully adding the family member
          setTimeout(async function () {
            await fetchChildren(); // Fetch the updated family data
          }, 3000);
        }
      }
    } catch (error) {
      showError(error.message);
    }
  };

  // Adds a menu
  const addMenu = async (event) => {
    event.preventDefault();
    try {
      // Filter the members in `data` that are not present in `menus`
      const newMembers = data.filter(
        (member) => !menus.some((menu) => menu.id === member.id)
      );
      for (const member of newMembers) {
        const familyResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/menu`,
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
          throw new Error("Failed to add menu");
        } else {
          showSuccessMessage("Menu added successfully!");
          // Re-fetch the data after successfully adding the family member
          setTimeout(async function () {
            await fetchMenus(); // Fetch the updated family data
          }, 3000);
        }
      }
    } catch (error) {
      showError(error.message);
    }
  };
  
  // Adds a patient
  const addPatient = async (event) => {
    event.preventDefault();
    try {
      // Filter the members in `data` that are not present in `patients`
      const newMembers = data.filter(
        (member) => !patients.some((patient) => patient.id === member.id)
      );
      for (const member of newMembers) {
        const familyResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/patient`,
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
          throw new Error("Failed to add patient");
        } else {
          showSuccessMessage("Patient added successfully!");
          // Re-fetch the data after successfully adding the Patient
          setTimeout(async function () {
            await fetchPatients(); // Fetch the updated patients
          }, 3000);
        }
      }
    } catch (error) {
      showError(error.message);
    }
  };

  // Fetches family members
  const fetchChildren = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setData(data);
      setChildren(data); // used to distinguish between children fron DB & Added children
    } catch (error) {
      console.error("Failed to fetch children data:", error);
    }
  };

  // Fetches menus
  const fetchMenus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menu`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setData(data);
      setMenus(data); // used to distinguish between menus fron DB & Added menus
    } catch (error) {
      console.error("Failed to fetch menus data:", error);
    }
  };

  // Fetches patients
  const fetchPatients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/patient`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setData(data);
      setPatients(data); // used to distinguish between patients fron DB & Added patients
    } catch (error) {
      console.error("Failed to fetch patients data:", error);
    }
  };

  // Fetches data based on the user's role
  useEffect(() => {
    if (userData.role === "Individual") {
      fetchChildren();
    }
    if (userData.role === "Professional") {
      fetchMenus();
    }
    if (userData.role === "Dietitian") {
      fetchPatients();
    }
  }, [userData]);

  // Adds a new blank entry (family member, menu, or patient)
  const addAnotherMember = () => {
    setData([
      ...data,
      {
        id: data.length + 1,
        name: "",
        age: "",
        dietaryRestrictions: "",
        favoriteIngredients: "",
        unlikedIngredients: "",
      },
    ]);
  };

  // Removes a member (family member, menu, or patient) from the list
  const removeMember = (id) => {
    setData((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };
  // Filters data for patients based on search term
  let filteredData = data;

if (toEdit === 'patients' && searchTerm) {
  const searchLower = searchTerm.toLowerCase();
  filteredData = data.filter((member) => {
    return (
      (member.firstName && member.firstName.toLowerCase().includes(searchLower)) ||
      (member.lastName && member.lastName.toLowerCase().includes(searchLower)) ||
      (member.id && member.id.toString().toLowerCase().includes(searchLower)) ||
      (member.age && member.age.toString().includes(searchLower)) ||
      (member.dietaryRestrictions && member.dietaryRestrictions.toLowerCase().includes(searchLower)) ||
      (member.favoriteIngredients && member.favoriteIngredients.toLowerCase().includes(searchLower)) ||
      (member.unlikedIngredients && member.unlikedIngredients.toLowerCase().includes(searchLower))
    );
  });
}


  return (
    <div>
      <div className="">
        {toEdit === "owner" && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <hr className="my-1"></hr>
              <form onSubmit={updateOwnerData} className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4 mt-2">
                  <div>
                    <label className="block text-lg">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={
                        ownerData.firstName.charAt(0).toUpperCase() +
                        ownerData.firstName.slice(1)
                      }
                      onChange={handleOwnerChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-lg">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={
                        ownerData.lastName.charAt(0).toUpperCase() +
                        ownerData.lastName.slice(1)
                      }
                      onChange={handleOwnerChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
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
                  <label className="block text-lg">Dietary Restrictions</label>
                  <input
                    type="text"
                    name="dietaryRestrictions"
                    value={ownerData.dietaryRestrictions}
                    onChange={handleOwnerChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-lg">Preferred Ingredients</label>
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
                <div className="flex flex-col justify-center">
                  <div>
                    <button
                      type="submit"
                      className={`bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2`}
                    >
                      Update Details
                    </button>
                  </div>
                  {error && (
                    <div className="mt-2">
                      <p className="text-red-500">{error}</p>
                    </div>
                  )}
                  {sucessMessage && (
                    <div className="mt-2">
                      <p className="text-green-500">{sucessMessage}</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {toEdit === "children" && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <hr className="my-1"></hr>
              {data.map((member, index) => (
                <div>
                  <Collapsible
                    key={member.id}
                    trigger={member.name || "Family member " + (index + 1)}
                    open={index + 1 > children.length}
                    transitionTime={1300}
                  >
                    {children.some((child) => child.id === member.id) ? (
                      <form
                        onSubmit={(e) => updateChildData(e, member._id, index)}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-lg">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={
                              member.name.charAt(0).toUpperCase() +
                              member.name.slice(1)
                            }
                            onChange={(e) => handleEntityChange(e, index)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-lg">Age</label>
                          <input
                            type="number"
                            name="age"
                            value={member.age}
                            onChange={(e) => handleEntityChange(e, index)}
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
                            value={member.dietaryRestrictions}
                            onChange={(e) => handleEntityChange(e, index)}
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
                            value={member.favoriteIngredients}
                            onChange={(e) => handleEntityChange(e, index)}
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
                            value={member.unlikedIngredients}
                            onChange={(e) => handleEntityChange(e, index)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className={`bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2`}
                            >
                              Update Details
                            </button>
                            <button
                              type="button"
                              onClick={(e) => deleteFamilyMember(e, member._id)}
                              className="bg-red-500 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
                            >
                              <FaTrash className="text-lg" />
                              <span className="ml-1">Delete Family Member</span>
                            </button>
                          </div>
                          {error && (
                            <div className="mt-2">
                              <p className="text-red-500">{error}</p>
                            </div>
                          )}
                          {sucessMessage && (
                            <div className="mt-2">
                              <p className="text-green-500">{sucessMessage}</p>
                            </div>
                          )}
                        </div>
                      </form>
                    ) : (
                      <div>
                        <FamilyMemberForm
                          member={member}
                          onChange={(data) =>
                            handleMemberChange(member.id, data)
                          }
                          onRemove={() => removeMember(member.id)}
                          onAdd={(e) => {
                            if (data[index].name && data[index].age) {
                              addFamilyMember(e);
                            } else {
                              showError("Please fill name and age");
                            }
                          }}
                        />
                        <div className="flex flex-col justify-center">
                          {error && (
                            <div className="mt-2 text-center">
                              <p className="text-red-500">{error}</p>
                            </div>
                          )}
                          {sucessMessage && (
                            <div className="mt-2 text-center">
                              <p className="text-green-500">{sucessMessage}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Collapsible>
                  <hr className="my-2"></hr>
                </div>
              ))}
              <div className="flex justify-center my-4 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    addAnotherMember();
                  }}
                  className="bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2 text-lg">
                    Add Another Family Member
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {toEdit === "pro" && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <hr className="my-1"></hr>
              <form onSubmit={updateOwnerData} className="space-y-4">
                <div>
                  <label className="block text-lg">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={
                      ownerData.firstName.charAt(0).toUpperCase() +
                      ownerData.firstName.slice(1)
                    }
                    onChange={handleOwnerChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-lg">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={
                      ownerData.lastName.charAt(0).toUpperCase() +
                      ownerData.lastName.slice(1)
                    }
                    onChange={handleOwnerChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div>
                    <button
                      type="submit"
                      className={`bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2`}
                    >
                      Update Details
                    </button>
                  </div>
                  {error && (
                    <div className="mt-2">
                      <p className="text-red-500">{error}</p>
                    </div>
                  )}
                  {sucessMessage && (
                    <div className="mt-2">
                      <p className="text-green-500">{sucessMessage}</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {toEdit === "menus" && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <hr className="my-1"></hr>
              {data.map((member, index) => (
                <div>
                  <Collapsible
                    key={member.id}
                    trigger={member.name || "Menu " + (index + 1)}
                    open={index + 1 > menus.length}
                    transitionTime={1300}
                  >
                    {menus.some((menu) => menu.id === member.id) ? (
                      <form
                        onSubmit={(e) => updateMenuData(e, member._id, index)}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-lg">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={
                              member.name.charAt(0).toUpperCase() +
                              member.name.slice(1)
                            }
                            onChange={(e) => handleEntityChange(e, index)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>

                        <div className="flex flex-col justify-center">
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className={`bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2`}
                            >
                              Rename Menu
                            </button>
                            <button
                              type="button"
                              onClick={(e) => deleteMenu(e, member._id)}
                              className="bg-red-500 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
                            >
                              <FaTrash className="text-lg" />
                              <span className="ml-1">Delete Menu</span>
                            </button>
                          </div>
                          {error && (
                            <div className="mt-2">
                              <p className="text-red-500">{error}</p>
                            </div>
                          )}
                          {sucessMessage && (
                            <div className="mt-2">
                              <p className="text-green-500">{sucessMessage}</p>
                            </div>
                          )}
                        </div>
                      </form>
                    ) : (
                      <div>
                        <MenuForm
                          menu={member}
                          onChange={(data) =>
                            handleMemberChange(member.id, data)
                          }
                          onRemove={() => removeMember(member.id)}
                          onAdd={(e) => {
                            if (data[index].name) {
                              addMenu(e);
                            } else {
                              showError("Please fill menu name");
                            }
                          }}
                        />
                        <div className="flex flex-col justify-center">
                          {error && (
                            <div className="mt-2 text-center">
                              <p className="text-red-500">{error}</p>
                            </div>
                          )}
                          {sucessMessage && (
                            <div className="mt-2 text-center">
                              <p className="text-green-500">{sucessMessage}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Collapsible>
                  <hr className="my-2"></hr>
                </div>
              ))}
              <div className="flex justify-center my-4 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    addAnotherMember();
                  }}
                  className="bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2 text-lg">Add Another Menu</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {toEdit === "patients" && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <hr className="my-1"></hr>
              <div className="my-4">
                <label className="block text-lg">Search Patients</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Search by name, ID, or other attributes"
                />
              </div>
              {filteredData.map((member, index) => (
                <div>
                  <Collapsible
                    key={index}
                    trigger={ member.id && member.firstName && member.lastName ? 
                      member.id +
                        " " +
                        member.firstName +
                        " " +
                        member.lastName : "Patient " + (index + 1)
                    }
                    open={index + 1 > patients.length}
                    transitionTime={1300}
                  >
                    {index < patients.length ? (
                      <form onSubmit={(e) => updatePatientData(e, member._id, index)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-x-4 mt-2">
                          <div>
                            <label className="block text-lg">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              value={member.firstName}
                              onChange={(e) => handleEntityChange(e, index)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-lg">Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              value={member.lastName}
                              onChange={(e) => handleEntityChange(e, index)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-lg">ID</label>
                          <input
                            type="text"
                            name="id"
                            value={member.id}
                            onChange={(e) => handleEntityChange(e, index)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-lg">Age</label>
                          <input
                            type="number"
                            name="age"
                            value={member.age}
                            onChange={(e) => handleEntityChange(e, index)}
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
                            value={member.dietaryRestrictions}
                            onChange={(e) => handleEntityChange(e, index)}
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
                            value={member.favoriteIngredients}
                            onChange={(e) => handleEntityChange(e, index)}
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
                            value={member.unlikedIngredients}
                            onChange={(e) => handleEntityChange(e, index)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className={`bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2`}
                            >
                              Update Details
                            </button>
                            <button
                              type="button"
                              onClick={(e) => deletePatient(e, member._id)}
                              className="bg-red-500 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
                            >
                              <FaTrash className="text-lg" />
                              <span className="ml-1">Delete Patient</span>
                            </button>
                          </div>
                          {error && (
                            <div className="mt-2">
                              <p className="text-red-500">{error}</p>
                            </div>
                          )}
                          {sucessMessage && (
                            <div className="mt-2">
                              <p className="text-green-500">{sucessMessage}</p>
                            </div>
                          )}
                        </div>
                      </form>
                    ) : (
                      <div>
                        <PatientForm
                          member={member}
                          onChange={(data) =>
                            handleMemberChange(member.id, data)
                          }
                          onRemove={() => removeMember(member.id)}
                          onAdd={(e) => {
                            if (
                              data[index].firstName &&
                              data[index].lastName &&
                              data[index].age
                            ) {
                              addPatient(e);
                            } else {
                              showError("Please fill full name and age");
                            }
                          }}
                        />
                        <div className="flex flex-col justify-center">
                          {error && (
                            <div className="mt-2 text-center">
                              <p className="text-red-500">{error}</p>
                            </div>
                          )}
                          {sucessMessage && (
                            <div className="mt-2 text-center">
                              <p className="text-green-500">{sucessMessage}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Collapsible>
                  <hr className="my-2"></hr>
                </div>
              ))}
              <div className="flex justify-center my-4 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    addAnotherMember();
                  }}
                  className="bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md mt-2"
                >
                  <FaPlus className="text-lg" />
                  <span className="ml-2 text-lg">Add Another Patient</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;