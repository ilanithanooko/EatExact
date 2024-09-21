import { createContext, useReducer, useEffect } from 'react'

// Create an authentication context
export const AuthContext = createContext()

// Reducer function to handle login/logout actions
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Set the user when login action is dispatched
      return { user: action.payload }
    case 'LOGOUT':
      // Remove the user when logout action is dispatched
      return { user: null }
    default:
      // Return the current state for any other action types
      return state
  }
}

// AuthContextProvider component to wrap around the app and provide auth state
export const AuthContextProvider = ({ children }) => {
  // Use the useReducer hook with the authReducer function and initial state
  const [state, dispatch] = useReducer(authReducer, { 
    user: null // Initial state: user is null
  })

  // Effect hook to load user data from local storage if available when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) // Get the user from localStorage

    if (user) {
      // Dispatch login action if user exists in localStorage
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, []) // Empty dependency array ensures this effect runs only once on mount

  console.log('AuthContext state:', state) // Log the current state of the AuthContext
  
  return (
    // Provide the auth state and dispatch function to all children components
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}