import { useAuthContext } from './useAuthContext'

// Custom hook to handle the logout functionality
export const useLogout = () => {
  const { dispatch } = useAuthContext() // Access the dispatch function from AuthContext to update the state

  // Function to log out the user
  const logout = () => {
    // Remove the user data from local storage
    localStorage.removeItem('user')

    // Dispatch the LOGOUT action to update the global auth state to null (logged out)
    dispatch({ type: 'LOGOUT' })
  }

  // Return the logout function to be used in other components
  return { logout }
}
