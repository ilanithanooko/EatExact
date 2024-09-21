import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

 // Fetch patients and user data when the component mounts
 useEffect(() => {
  const fetchPatients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/patient`, // Fetching patients data from API
        {
          headers: { Authorization: `Bearer ${user.token}` }, // Authorization header with user's token
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patients"); // Handle failure to fetch patients
      }
      const data = await response.json();
      setPatients(data); // Set the list of patients
      setFilteredPatients(data); // Set the filtered patients to the full list initially
      console.log("patients:", patients); // Log the patients for debugging
    } catch (err) {
      setError(err.message); // Set error message if fetching fails
    }
  };

  const fetchUserData = async () => {
    try {
      if (user?.token) {
        // Check if user and token exist
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/${user.email}`, // Fetching user data based on their email
          {
            method: "GET",
            headers: { Authorization: `Bearer ${user.token}` }, // Authorization header
          }
        );
        const data = await response.json();
        setUserData(data); // Set user data
        console.log("user data:", data); // Log user data for debugging
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error); // Handle failure to fetch user data
    }
  };

  fetchPatients(); // Fetch patients when the component mounts
  fetchUserData(); // Fetch user data when the component mounts
}, [user.token]); // Re-run the effect if user.token changes

// Handle changes in the search input and filter the patients list
const handleSearch = (e) => {
  const searchValue = e.target.value; // Get the input value
  setSearchTerm(searchValue); // Update the search term state

  if (searchValue) {
    const searchLower = searchValue.toLowerCase(); // Convert input to lowercase for case-insensitive search
    const filtered = patients.filter((patient) => {
      return (
        (patient.firstName &&
          patient.firstName.toLowerCase().includes(searchLower)) || // Search by first name
        (patient.lastName &&
          patient.lastName.toLowerCase().includes(searchLower)) || // Search by last name
        (patient.id &&
          patient.id.toString().toLowerCase().includes(searchLower)) || // Search by ID
        (patient.age && patient.age.toString().includes(searchLower)) || // Search by age
        (patient.dietaryRestrictions &&
          patient.dietaryRestrictions.toLowerCase().includes(searchLower)) || // Search by dietary restrictions
        (patient.favoriteIngredients &&
          patient.favoriteIngredients.toLowerCase().includes(searchLower)) || // Search by favorite ingredients
        (patient.unlikedIngredients &&
          patient.unlikedIngredients.toLowerCase().includes(searchLower)) // Search by unliked ingredients
      );
    });
    setFilteredPatients(filtered); // Update the filtered patients based on the search input
  } else {
    setFilteredPatients(patients); // Reset to the full patients list if the search input is cleared
  }
};

  return (
    <div className="px-5 xl:px-12">
      {patients.length === 0 && (
        <div className="text-center text-lg mb-5 text-gray-700">
          <div>
            It looks like you haven’t added any patients yet!
            <br />
            Start managing your clients' dietary needs and preferences by adding
            your first patient now.
            <br />
            Navigate to Settings to add patients and begin creating personalized
            meal plans today!
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/settings");
              }}
              className="rounded-md bg-green-600 mt-5 p-4 text-xl leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wood-green"
            >
              Add Patients in Settings
            </button>
          </div>
        </div>
      )}
      {patients.length > 0 && (
        <div>
          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-lg mb-1">Search Patients</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full md:w-1/3 p-2 border border-gray-300 rounded"
                placeholder={`Search by name, ID, or other attributess`}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Patients Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-2 px-4 border-b border-x">ID</th>
                  <th className="py-2 px-4 border-b border-x">First Name</th>
                  <th className="py-2 px-4 border-b border-x">Last Name</th>
                  <th className="py-2 px-4 border-b border-x">Age</th>
                  <th className="py-2 px-4 border-b border-x">
                    Dietary Restrictions
                  </th>
                  <th className="py-2 px-4 border-b border-x">
                    Preferred Ingredients
                  </th>
                  <th className="py-2 px-4 border-b border-x">
                    Avoid These Ingredients
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient._id || patient.id} className="cursor-pointer hover:bg-green-50" onClick={() => {navigate(`/entity/${patient._id}`, {
                    state: { userData: userData },
                  })}}>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.id}
                    </td>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.firstName}
                    </td>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.lastName}
                    </td>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.age}
                    </td>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.dietaryRestrictions}
                    </td>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.favoriteIngredients}
                    </td>
                    <td className="py-2 px-4 border-b border-x text-center">
                      {patient.unlikedIngredients}
                    </td>
                  </tr>
                ))}

                {/* Display message if no patients found */}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPatients;
