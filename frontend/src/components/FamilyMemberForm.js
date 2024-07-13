import React from 'react';

const FamilyMemberForm = ({ member }) => {
  return (
    <div>
      <form className="space-y-4">
        <div>
          <label className="block font-montserrat text-lg mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={member.name}
            onChange={(e) => (member.name = e.target.value)}
          />
        </div>
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
      </form>
    </div>
  );
};

export default FamilyMemberForm;