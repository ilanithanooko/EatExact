import React from 'react';

const ChildSelectionPopup = ({ children, userType, userData, onSelect }) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-[0_0_65px] shadow-wood-green/40">
        <h2 className="text-xl font-bold mb-4">We're generating a recipe for:</h2>
        <div className="grid grid-cols-2 gap-4">
          {children.map((child) => (
            <div onClick={() => onSelect(child.name)} key={child._id} className="p-4 bg-gray-200 rounded text-center cursor-pointer">
              {child.name}
            </div>
          ))
          }
          {userType === 'family' && <div onClick={() => onSelect(userData.firstName)} key={userData._id} className="p-4 bg-gray-200 rounded text-center cursor-pointer">{userData.firstName}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChildSelectionPopup;
