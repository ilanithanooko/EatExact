import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

// Custom hook to access authentication context
export const useAuthContext = () => {
  // Access the AuthContext using useContext hook
  const context = useContext(AuthContext)

  // Ensure the hook is used within a valid AuthContext provider
  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  // Return the context for use in the component
  return context
}
