import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Selectible from "../components/Selectible";

const SavedRecipes = () => {
  const [selectibles, setSelectibles] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

   // Fetch user data from the API based on the authenticated user's email
   const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/${user.email}`, // API endpoint to get user data
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` }, // Include user's token for authentication
        }
      );
      const data = await response.json();
      setUserData(data); // Set the fetched user data in the state
    } catch (error) {
      console.error("Failed to fetch user data:", error); // Log any error if fetching fails
    }
  };

  // Fetch user data when the component mounts or when the user's token changes
  useEffect(() => {
    fetchUserData();
  }, [user.token]);

  // Fetch children (for individual users) or menus (for professional users) when user data is available
  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`, // API endpoint to get family members (children)
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include user's token for authentication
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        // If user has an age attribute, include the user in the selectable items
        if (userData && userData.age) {
          setSelectibles([...json, userData]);
        } else {
          setSelectibles(json); // Otherwise, just set the family members (children) as selectable
        }
      }
    };

    // Fetch menus for professional users
    const fetchMenus = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menu`, // API endpoint to get menus
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include user's token for authentication
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setSelectibles(json); // Set the menus as selectable items
      }
    };

    // Conditionally fetch data based on the user role (Individual or Professional)
    if (userData) {
      if (userData?.role === "Individual") fetchChildren(); // Fetch children if user is an individual
      if (userData?.role === "Professional") fetchMenus(); // Fetch menus if user is a professional
    }
  }, [userData]);

  // Navigate to the selected family member's or menu's saved recipes page
  const viewEntityRecipes = (memberId) => {
    navigate(`/entity/${memberId}`, { state: { userData: userData } }); // Pass user data as state when navigating
  };

  return (
    <div className="px-5 xl:px-8">
      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-96">
        <div>
          <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Saved Recipes
          </h3>
          <div className="text-center text-lg mb-5 text-gray-700">
            {/* Display personalized messages based on user role */}
            {userData && userData.role === "Individual" && (
              <>
                Browse through a collection of recipes personalized for your
                family.
                <br />
                Each recipe is crafted to suit the unique tastes and dietary
                preferences of your loved ones,
                <br />
                ensuring mealtime is both enjoyable and easy.
                <br />
                Select a name to explore their saved recipes.
              </>
            )}
            {userData && userData.role === "Professional" && (
              <>
                Welcome to your saved menus!<br />
                This is a collection of recipes crafted to meet specific dietary
                restrictions for your restaurant.<br />
                Browse through the menu categories you’ve created, and revisit your tailored menus that cater to your guests' needs.
              </>
            )}
          </div>

          {/* Display the list of selectable family members or menus */}
          <div className={`grid grid-cols-1 lg:grid-cols-${selectibles.length / 2} gap-2`}>
            {selectibles.map((member) => (
              <Selectible
                key={member._id} // Use member's ID as the key
                label={member.name || member.firstName} // Display member's name or first name
                onClick={() => viewEntityRecipes(member._id)} // Call viewEntityRecipes on click
                isSelected={false} // Placeholder for selection status
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;