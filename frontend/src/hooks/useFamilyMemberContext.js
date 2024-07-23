import { FamilyMemberContext } from "../context/FamilyMemberContext";
import { useContext } from "react";

// Custom hook to access the tasks context
export const useFamilyMemberContext = () => {
    const context = useContext(FamilyMemberContext)

    if (!context) {
        throw Error("useFamilyMemberContext must be used inside and FamilyMemberContextProvider")
    }

    return context
}