import React, { useState } from 'react';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import Collapsible from 'react-collapsible';
import FamilyMemberForm from './FamilyMemberForm';

const FamilyForm = ({ onBack, option }) => {
  const [members, setMembers] = useState([{ id: 1, name: '' }]);
  const [isOwnerCollapsed, setIsOwnerCollapsed] = useState(false);

  const addFamilyMember = () => {
    setMembers([...members, { id: members.length + 1, name: '' }]);
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 flex items-center text-green-900">
        <FaArrowLeft className="mr-2" /> Back
      </button>
      {option === 'familyJoin' && (
        <Collapsible
          trigger="Owner Information"
          open={!isOwnerCollapsed}
          onOpen={() => setIsOwnerCollapsed(false)}
          onClose={() => setIsOwnerCollapsed(true)}
        >
          <div>
            <form className="space-y-4">
              <div>
                <label className="block font-montserrat text-lg mb-2">Age</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block font-montserrat text-lg mb-2">Dietary Restrictions</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block font-montserrat text-lg mb-2">Favorite Ingredients</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block font-montserrat text-lg mb-2">Un-liked Ingredients</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <button type="button" className="w-full bg-wood-green p-3 text-white font-bold rounded">
                Let's add my family members!
              </button>
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
            <FamilyMemberForm member={member} />
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
      <button type="button" className="w-full mt-4 bg-wood-green p-3 text-white font-bold rounded">
        Let's get started!
      </button>
    </div>
  );
};

export default FamilyForm;
