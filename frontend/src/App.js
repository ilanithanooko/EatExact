import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";

// Pages & Components
import Navbar from "./components/Navbar";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage";
import ProfileSetup from "./pages/profileSetup";
import SavedRecipes from "./pages/savedRecipes";
import EntityRecipes from "./pages/EntityRecipes";
import Response from "./pages/response";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import MyPatients from "./pages/myPatients";

function App() {
  const { user } = useAuthContext(); // Access user authentication context
  const [userData, setUserData] = useState(null); // State to store user data

  // Function to fetch user data from the backend API
  const fetchUserData = async () => {
    try {
      if (user?.token) {
        // Check if user and token exist before fetching data
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/${user.email}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        setUserData(data);
        console.log("user data:", data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  // Fetch user data when the component mounts or when the user's token changes
  useEffect(() => {
    if (user?.token) {
      fetchUserData();
    }
  }, [user?.token]);

  // Re-fetch user data when the user's role changes
  useEffect(() => {
    if (userData?.role) {
      fetchUserData();
    }
  }, [userData?.role]);

//   useEffect(() => {
//     if (userData?.role) {
//       fetchUserData();
//     }
//     // This will cause useEffect to run after every render
// });

return (
  <div className="font-montserrat"> {/* Main container for the app */}
    <BrowserRouter> {/* Setup routing using React Router */}
      <Navbar userData={userData} /> {/* Navbar component, passing userData as props */}
      <div className={`${user ? 'bg-lightest-gray min-h-screen py-5' : 'bg-gradient-to-bl from-emerald-950 to-green-600 min-h-screen'}`}>
        {/* Main content area */}
        <Routes>
          {/* Define the routes and their components */}
          <Route
            path="/"
            element={ 
              !user ? ( // If user is not logged in, show the landing page
                <div >
                  <LandingPage />
                </div>
              ) : ( // If user is logged in, check if their role is set, otherwise redirect to profile setup
              userData && !userData.role ? 
              <Navigate to="/profile-setup"/> :
                <div >
                  <Dashboard />
                </div>
              )
            }
          />
          <Route
            path="/signup"
            element={
              !user ? ( // If user is not logged in, show the signup page
                <div >
                  <Signup />
                </div>
              ) : (
                <Navigate to="/" /> // If user is logged in, redirect to the dashboard
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? ( // If user is not logged in, show the login page
                <div >
                  <Login />
                </div>
              ) : (
                <Navigate to="/" /> // If user is logged in, redirect to the dashboard
              )
            }
          />
          {/* Route for profile setup */}
          <Route
            path="/profile-setup"
            element={user && userData && !userData.role ? <ProfileSetup onUserDataChange={fetchUserData} /> : <Navigate to="/" />}
            // Show ProfileSetup if the user is logged in but doesn't have a role; otherwise, redirect to the dashboard
          />
          <Route
            path="/saved-recipes"
            element={user ? <SavedRecipes /> : <Navigate to="/login" />} // Show saved recipes if the user is logged in, otherwise redirect to login
          />
          <Route
            path="/my-patients"
            element={user ? <MyPatients /> : <Navigate to="/login" />} // Show MyPatients page if the user is logged in
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/login" />} // Show settings if the user is logged in
          />
          <Route
            path="/entity/:entityId"
            element={user ? <EntityRecipes /> : <Navigate to="/login" />} // Show entity recipes for the selected entity if the user is logged in
          />
          <Route
            path="/api-response"
            element={user ? <Response /> : <Navigate to="/login" />} // Show response page if the user is logged in
          />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
);
}

export default App; // Export the App component as default