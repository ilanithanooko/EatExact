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
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      if (user?.token) {
        // Check if user and token exist
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

  useEffect(() => {
    if (user?.token) {
      fetchUserData();
    }
  }, [user?.token]);

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
    <div className="font-montserrat">
      <BrowserRouter>
        <Navbar userData={userData} />
        <div className={`${user ? 'bg-lightest-gray min-h-screen py-5' : 'bg-gradient-to-bl from-emerald-950 to-green-600 min-h-screen'}`}>
          <Routes>
            <Route
              path="/"
              element={ 
                !user ? (
                  <div >
                    <LandingPage />
                  </div>
                ) : (
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
                !user ? (
                  <div >
                    <Signup />
                  </div>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <div >
                    <Login />
                  </div>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            {/* <Route path="/profile-setup" element={user ? <ProfileSetup /> : <Navigate to="/login"/> } /> */}
            <Route
              path="/profile-setup"
              element={user && userData && !userData.role ? <ProfileSetup onUserDataChange={fetchUserData} /> : <Navigate to="/" />}
            />
            <Route
              path="/saved-recipes"
              element={user ? <SavedRecipes /> : <Navigate to="/login" />}
            />
                        <Route
              path="/my-patients"
              element={user ? <MyPatients /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/entity/:entityId"
              element={user ? <EntityRecipes /> : <Navigate to="/login" />}
            />
            <Route
              path="/api-response"
              element={user ? <Response /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
