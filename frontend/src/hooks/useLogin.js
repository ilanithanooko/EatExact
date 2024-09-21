import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Custom hook for handling login functionality
export const useLogin = () => {
  const [error, setError] = useState(null) // State to handle any login errors
  const [isLoading, setIsLoading] = useState(null) // State to handle loading state
  const { dispatch } = useAuthContext() // Access the dispatch method from AuthContext to update state

  // Function to log in a user using email and password
  const login = async (email, password) => {
    setIsLoading(true) // Set loading state when the request starts
    setError(null) // Reset error state before starting a new login attempt

    // Send POST request to login the user
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }) // Send email and password as JSON
    })
    const json = await response.json() // Parse the JSON response

    // If login fails, update the error state and stop loading
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    // If login is successful, save user data to localStorage, update auth context, and stop loading
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json)) // Save the logged-in user's data

      // Dispatch the LOGIN action to update the global auth state
      dispatch({type: 'LOGIN', payload: json})

      // Stop the loading indicator
      setIsLoading(false)
    }
  }

  // Return the login function along with loading and error states
  return { login, isLoading, error }
}
