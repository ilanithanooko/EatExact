import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages & Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage"
import ProfileSetup from "./pages/profileSetup";
import SavedRecipes from "./pages/savedRecipes";
import EntityRecipes from "./pages/EntityRecipes"
import Response from "./pages/response"

function App() {
  const { user } = useAuthContext()

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            {user && (<Route path="/" element={<Home />} />)}
            {!user && (<Route path="/" element={<LandingPage />} />)}
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
            <Route path="/profile-setup" element={user ? <ProfileSetup /> : <Navigate to="/login" />} />
            <Route path="/saved-recipes" element={user ? <SavedRecipes /> : <Navigate to="/login" />} />
            <Route path="/entity/:entityId" element={user ? <EntityRecipes /> : <Navigate to="/login" />} />
            <Route path="/api-response" element={user ? <Response /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;