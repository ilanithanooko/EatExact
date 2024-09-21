import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Recipe from '../components/Recipe'; 
import { FaTelegram, FaRegHeart, FaHeart, FaWhatsapp } from "react-icons/fa";

const Response = () => {
  const { user } = useAuthContext(); 
  const location = useLocation(); 
  const navigate = useNavigate();

  // Destructure the passed state from location
  const { userFirstName, selectedCategory, apiResponse, selectionData } = location.state || {};

  // Redirect to home if no API response is available
  useEffect(() => {
    if (!apiResponse) {
      navigate("/");
    }
  }, [apiResponse, navigate]);

  const [isLiked, setIsLiked] = useState(false); // Track whether the recipe is liked
  const [recipeData, setRecipeData] = useState(null); // Store the recipe data for saving/deleting

  // Parse the HTML response (from AI API) into structured data
  const parser = new DOMParser();
  const doc = parser.parseFromString(apiResponse, 'text/html');
  const title = doc.querySelector('h1')?.textContent || 'No Title'; // Extract recipe title
  const ingredients = Array.from(doc.querySelectorAll('ul:nth-of-type(1) li')).map(li => li.textContent); // Extract ingredients
  const instructions = Array.from(doc.querySelectorAll('ol li')).map(li => li.textContent); // Extract instructions
  const tips = Array.from(doc.querySelectorAll('ul:nth-of-type(2) li')).map(li => li.textContent); // Extract tips/variations

  // Format the recipe for sharing on WhatsApp and Telegram
  const shareContent = `
    ${title}\n\n
    Ingredients:\n${ingredients.join('\n')}\n\n
    Instructions:\n${instructions.join('\n')}\n\n
    Variations and Tips:\n${tips.join('\n')}
  `;
  const encodedShareContent = encodeURIComponent(shareContent); // Encode for URL sharing

  // WhatsApp and Telegram share URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedShareContent}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedShareContent}`;

  // Handle the "like" button click to either save or delete the recipe
  const handleLikeClick = async () => {
    setIsLiked(!isLiked); // Toggle the like state

    if (!isLiked) { // If liking the recipe
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes`, {
          method: 'POST', // POST to save the recipe
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`, // Authorization header with user's token
          },
          body: JSON.stringify({
            title: title.trim(), // Recipe title
            category: selectedCategory, // Recipe category
            description: apiResponse, // Send the raw HTML response
            user_id: selectionData._id, // ID of the associated user (e.g., child or patient)
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRecipeData(data); // Set the recipe data after saving
        console.log("Like saved:", data);
      } catch (error) {
        console.error("Error saving like:", error); // Handle any error during the save
      }
    } else { // If unliking the recipe (deleting)
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeData._id}`, {
          method: 'DELETE', // DELETE the recipe
          headers: {
            Authorization: `Bearer ${user.token}`, // Authorization header with user's token
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Recipe deleted:", data); // Log the response after deletion
        setRecipeData(null); // Reset the recipe data after deletion
      } catch (error) {
        console.error("Error deleting recipe:", error); // Handle any error during deletion
      }
    }
  };

  return (
    <div className="md:px-10 xl:px-64">
      <div className="px-2">
        {/* Personalized message displaying the generated recipe */}
        <div className="flex justify-end ">
          <div className="bg-green-600 text-white md:text-lg rounded-3xl p-4 mb-6 w-9/12">
            <>{userFirstName}, Here's the {selectedCategory} recipe you've asked for, considering all of your dietary restrictions and personal taste:</>
          </div>
        </div>

        {/* Display the generated recipe */}
        <div className="flex justify-start ">
          <div className="bg-white text-black rounded-3xl p-4 mb-6 w-11/12 lg:w-8/12">
            <Recipe title={title} ingredients={ingredients} instructions={instructions} tips={tips} />
            <div className="flex justify-end mt-4">
              <div className='justify-center gap-2 flex'>
                {/* Like button, toggles between filled and outlined heart */}
                <div>
                  {isLiked
                  ? <FaHeart className='text-2xl text-red-500 hover:text-red-600 drop-shadow-sm' onClick={handleLikeClick} style={{ cursor: 'pointer' }}/>
                  : <FaRegHeart className='text-2xl text-red-500 hover:text-red-600 drop-shadow-sm' onClick={handleLikeClick} style={{ cursor: 'pointer' }}/>
                  }
                </div>

                {/* WhatsApp and Telegram share buttons */}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-2xl text-green-500 hover:text-green-600 drop-shadow-sm" style={{ cursor: 'pointer' }}></FaWhatsapp>
                </a>
                <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
                  <FaTelegram className="text-2xl text-cyan-600 hover:text-cyan-700 drop-shadow-sm" style={{ cursor: 'pointer' }}></FaTelegram>
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