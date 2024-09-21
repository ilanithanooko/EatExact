import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';

// Custom hook for handling user signup
export const useSignup = () => {
  const [error, setError] = useState(null) // State to store error messages
  const [isLoading, setIsLoading] = useState(null) // State to manage loading status
  const { dispatch } = useAuthContext() // Access the dispatch function from AuthContext
  const navigate = useNavigate(); // React Router hook to navigate after successful signup

  // Function to handle signup process
  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true) // Set loading state to true before API call
    setError(null) // Clear previous errors

    // Make the signup API request
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, email, password }) // Pass signup details in request body
    })
    
    const json = await response.json() // Parse the response JSON

    if (!response.ok) {
      // If response is not ok, stop loading and set error message
      setIsLoading(false)
      setError(json.error)
    }
    
    if (response.ok) {
      // Save the newly signed-up user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // Dispatch login action to update the auth context with the new user data
      dispatch({type: 'LOGIN', payload: json})

      // Set loading state to false after successful signup
      setIsLoading(false)

      // Redirect to the home page after successful signup
      navigate('/');
    }
  }

  // Return the signup function along with loading and error states
  return { signup, isLoading, error }
}