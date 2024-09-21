import { createContext, useReducer } from "react";

// Create familyMembers context
export const FamilyMemberContext = createContext();

// Reducer function to handle familyMember state changes
export const FamilyMemberReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAMILY_MEMBER":
      // Set the familyMembers state with payload data or retain the current state if payload is null
      return {
        familyMembers: action.payload || state.familyMembers, // Handle initial state if payload is null
      };

    case "CREATE_FAMILY_MEMBER":
      // Add a new family member to the state
      return {
        familyMembers: [action.payload, ...state.familyMembers],
      };

    case "DELETE_FAMILY_MEMBER":
      // Remove a family member by filtering out based on the ID
      return {
        familyMembers: state.familyMembers.filter(
          (w) => w._id !== action.payload._id
        ),
      };

    case "UPDATE_FAMILY_MEMBER":
      // Update a family member by matching the ID and replacing it with the updated data
      const updatedfamilyMembers = state.familyMembers.map((familyMember) =>
        familyMember._id === action.payload._id ? action.payload : familyMember
      );
      return {
        familyMembers: updatedfamilyMembers,
      };

    case "RESET_FAMILY_MEMBER":
      // Reset the familyMembers state to an empty array
      return {
        familyMembers: [],
      };

    default:
      // Return the current state for any unknown action type
      return state;
  }
};

// FamilyMemberContextProvider component to manage familyMembers state
export const FamilyMemberContextProvider = ({ children }) => {
  // Use the useReducer hook with the FamilyMemberReducer function and initial state
  const [state, dispatch] = useReducer(FamilyMemberReducer, {
    familyMembers: [], // Set initial state with an empty array
  });

  return (
    // Provide the familyMembers state and dispatch function to all children components
    <FamilyMemberContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FamilyMemberContext.Provider>
  );
};