import { FamilyMemberContext } from "../context/FamilyMemberContext";
import { useContext } from "react";

// Custom hook to access the family members context
export const useFamilyMemberContext = () => {
    // Access the FamilyMemberContext using useContext hook
    const context = useContext(FamilyMemberContext);

    // Ensure the hook is used within a valid FamilyMemberContext provider
    if (!context) {
        throw Error("useFamilyMemberContext must be used inside a FamilyMemberContextProvider");
    }

    // Return the context for use in the component
    return context;
}