import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaPlus } from 'react-icons/fa';

const SavedRecipes = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/familyMember`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setFamilyMembers(json);
      }
    };

    if (user) {
      fetchFamilyMembers();
    }
  }, [user]);

  const addFamilyMember = () => {
    // Handle adding a new family member (e.g., navigate to a form)
  };

  return (
    <div className="bg-gray-100 h-screen px-4 sm:px-10 lg:px-32 pt-4">
      <div className="bg-white rounded-3xl mx-auto p-8 shadow-lg">
        <div className="text-center font-montserrat text-3xl mb-5 text-green-900 font-bold">
          Saved Recipes
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <div key={member._id} className="bg-lightest-gray rounded-lg p-4 shadow-md flex items-center justify-center text-xl font-bold">
              {member.name}
            </div>
          ))}
          <div
            className="bg-wood-green rounded-lg p-4 shadow-md flex items-center justify-center text-white text-2xl font-bold cursor-pointer"
            onClick={addFamilyMember}
          >
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
