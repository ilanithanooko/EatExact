import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages & Components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/signUp";
import Login from "./pages/login";
import LandingPage from "./pages/landingPage"


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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
