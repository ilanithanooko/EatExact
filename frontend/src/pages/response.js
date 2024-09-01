import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Recipe from '../components/Recipe';

const Response = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { userFirstName, selectedCategory, apiResponse, selectionData } = location.state || {};

  useEffect(() => {
    if (!apiResponse) {
      navigate("/");
    }
  }, [apiResponse, navigate]);

  const [isLiked, setIsLiked] = useState(false);
  const [recipeData, setRecipeData] = useState(null);

  // Parse the HTML response into structured data
  const parser = new DOMParser();
  const doc = parser.parseFromString(apiResponse, 'text/html');
  const title = doc.querySelector('h1')?.textContent || 'No Title';
  const ingredients = Array.from(doc.querySelectorAll('ul li')).map(li => li.textContent);
  const instructions = Array.from(doc.querySelectorAll('ol li')).map(li => li.textContent);
  const tips = Array.from(doc.querySelectorAll('ul:nth-of-type(2) li')).map(li => li.textContent);

  // Format the recipe for sharing
  const shareContent = `
    ${title}\n\n
    Ingredients:\n${ingredients.join('\n')}\n\n
    Instructions:\n${instructions.join('\n')}\n\n
    Variations and Tips:\n${tips.join('\n')}
  `;
  const encodedShareContent = encodeURIComponent(shareContent);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedShareContent}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedShareContent}`;

  const handleLikeClick = async () => {
    setIsLiked(!isLiked);
    console.log(isLiked);

    if (!isLiked) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            category: selectedCategory,
            description: apiResponse, // Send the raw HTML
            user_id: selectionData._id,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRecipeData(data);
        console.log("Like saved:", data);
      } catch (error) {
        console.error("Error saving like:", error);
      }
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeData._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Recipe deleted:", data);
        setRecipeData(null);
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  return (
    <div className="bg-gray-bg h-screen justify-center items-center pt-4">
      <div className="bg-white rounded-3xl w-7/12 mx-auto p-5">
        <div className="flex justify-end ">
          <div className="bg-wood-green text-white rounded-3xl p-4 mb-6 w-8/12">
            <>{userFirstName}, Here's the {selectedCategory} recipe you've asked for, considering all of your dietary restrictions and personal taste:</>
          </div>
        </div>
        <div className="flex justify-start ">
          <div className="bg-lightest-gray text-black rounded-3xl p-4 mb-6 font-semibold w-8/12">
            <Recipe title={title} ingredients={ingredients} instructions={instructions} tips={tips} />
            <div className="flex justify-end ">
              <div>
                <br />
                <i
                  className={`fa-${isLiked ? "solid" : "regular"} fa-heart fa-lg`}
                  onClick={handleLikeClick}
                  style={{ cursor: 'pointer' }}
                ></i>{" "}
                {/* <i className="fa-regular fa-pen-to-square fa-lg"></i>{" "} */}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-whatsapp fa-lg" style={{ cursor: 'pointer' }}></i>
                </a>{" "}
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-telegram fa-lg" style={{ cursor: 'pointer' }}></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Response;