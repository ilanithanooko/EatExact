import React from 'react';

const ChildSelectionPopup = ({ children, onClose, onSelectChild }) => {

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">We're generating a recipe for:</h2>
        <div className="grid grid-cols-2 gap-4">
          {children.map((child) => (
            <div onClick={() => onSelectChild(child.name)} key={child._id} className="p-4 bg-gray-200 rounded text-center cursor-pointer">
              {child.name}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default ChildSelectionPopup;
