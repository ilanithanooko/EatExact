import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const SavedRecipes = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

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

  const viewFamilyMemberRecipes = (memberId) => {
    navigate(`/entity/${memberId}`); // Navigate to the family member's recipes page
  };

  return (
    <div className="bg-gray-100 h-screen px-4 sm:px-10 lg:px-32 pt-4">
      <div className="bg-white rounded-3xl mx-auto p-8 shadow-lg">
        <div className='text-center'>
          <div className='text-center font-montserrat text-3xl mb-3 text-green-900 font-bold'>Saved Recipes</div>
          <div className='text-center font-montserrat text-xl mb-5 text-green-900 font-bold'>who's recipe's you're about to view?</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member) => (
            <div 
              key={member._id} 
              className="bg-lightest-gray rounded-lg p-4 shadow-md flex items-center justify-center text-xl font-bold cursor-pointer"
              onClick={() => viewFamilyMemberRecipes(member._id)} // Navigate to the member's recipes on click
            >
              {member.name}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
