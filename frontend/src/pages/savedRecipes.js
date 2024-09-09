import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Selectible from "../components/Selectible";

const SavedRecipes = () => {
  const [selectibles, setSelectibles] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/${user.email}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.token]);

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        if (userData && userData.age) {
          setSelectibles([...json, userData]);
        } else {
          setSelectibles(json);
        }
      }
    };

    const fetchMenus = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menu`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setSelectibles(json);
      }
    };

    if (userData) {
      if (userData?.role === "Individual") fetchChildren();
      if (userData?.role === "Professional") fetchMenus();
    }
  }, [userData]);

  const viewEntityRecipes = (memberId) => {
    navigate(`/entity/${memberId}`,{state: {userData: userData}}); // Navigate to the family member's recipes page
  };

  return (
    <div className="px-5 xl:px-8">
      <div className="md:px-8 lg:px-24 xl:px-36 2xl:px-96">
        <div>
          <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Saved Recipes
          </h3>
          <div className="text-center text-lg mb-5 text-gray-700">
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
                Welcome to your saved menus!<br/>
                This is a collection of recipes crafted to meet specific dietary restrictions for your restaurant.<br/>
                Browse through the menu categories you’ve created, and revisit your tailored menus that cater to your guests' needs.
              </>
            )}
          </div>
          <div
            className={`grid grid-cols-1 lg:grid-cols-${
              selectibles.length / 2
            } gap-2`}
          >
            {selectibles.map((member) => (
              <Selectible
                label={member.name || member.firstName}
                onClick={() => viewEntityRecipes(member._id)}
                isSelected={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;