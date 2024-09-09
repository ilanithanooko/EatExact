import React from 'react';
import Selectible from './Selectible';

const ChildSelectionPopup = ({ children, userType, userData, onSelect }) => {

  return (
    // <div className="fixed inset-0 flex items-start justify-center pt-20 bg-white bg-opacity-50">
    //   <div className="bg-white p-5 rounded-lg drop-shadow-md">
    //     <h2 className="text-xl mb-4">We're generating a recipe for:</h2>
    //     <div className="grid grid-cols-2 md:grid-3 gap-4">
    //       {children.map((child) => (
    //         // <div onClick={() => onSelect(child.name)} key={child._id} className="p-4 bg-gray-200 rounded text-center cursor-pointer">
    //         //   {child.name}
    //         // </div>
    //         <div  className=" text-center cursor-pointer">
    //           <Selectible label={child.name} onClick={() => onSelect(child.name)} key={child._id} />
    //         </div>
    //       ))
    //       }
    //       {userType === 'family' &&
    //                   <div  className="text-center cursor-pointer">
    //                   <Selectible label={userData.firstName} onClick={() => onSelect(userData.firstName)} key={userData._id} />
    //                 </div>}
    //       {/* <div onClick={() => onSelect(userData.firstName)} key={userData._id} className="p-4 bg-gray-200 rounded text-center cursor-pointer">{userData.firstName}</div>} */}
    //     </div>
    //   </div>
    // </div>


      <div className="fixed inset-0 flex items-start justify-center pt-20 bg-white bg-opacity-50">
        <div className='bg-white drop-shadow-md p-5  rounded-xl'>
        <div className="text-center text-lg pb-4 text-green-950 ">
        Who's Hungry?
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-3">
        {children.map((child) => (
            <div  className=" text-center cursor-pointer">
              <Selectible label={child.name} onClick={() => onSelect(child.name)} key={child._id} />
            </div>
          ))
          }
          {userType === 'family' &&
                      <div  className="text-center cursor-pointer">
                      <Selectible label={userData.firstName} onClick={() => onSelect(userData.firstName)} key={userData._id} />
                    </div>}
        </div>
        </div>
      </div>
  );
};

export default ChildSelectionPopup;
