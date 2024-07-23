import { createContext, useReducer } from "react";

// Create familyMembers context
export const FamilyMemberContext = createContext();

// Reducer function to handle familyMember state changes
export const FamilyMemberReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAMILY_MEMBER":
      return {
        familyMembers: action.payload || state.familyMembers, // Handle initial state if payload is null
      };

    case "CREATE_FAMILY_MEMBER":
      return {
        familyMembers: [action.payload, ...state.familyMembers],
      };

    case "DELETE_FAMILY_MEMBER":
      return {
        familyMembers: state.familyMembers.filter(
          (w) => w._id !== action.payload._id
        ),
      };

    case "UPDATE_FAMILY_MEMBER":
      const updatedfamilyMembers = state.familyMembers.map((familyMember) =>
        familyMember._id === action.payload._id ? action.payload : familyMember
      );
      return {
        familyMembers: updatedfamilyMembers,
      };

    case "RESET_FAMILY_MEMBER":
      return {
        familyMembers: [],
      };

    default:
      return state;
  }
};

// FamilyMemberContextProvider component to manage familyMembers state
export const FamilyMemberContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FamilyMemberReducer, {
    familyMembers: [], // Set initial state with an empty array
  });

  return (
    <FamilyMemberContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FamilyMemberContext.Provider>
  );
};
