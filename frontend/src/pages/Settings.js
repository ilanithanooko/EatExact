import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Collapsible from "react-collapsible";
import SettingsForm from "../components/SettingsForm";

const Settings = () => {
  const [selectibles, setSelectibles] = useState([]); 
  const { user } = useAuthContext(); 
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/${user.email}`, // Fetch user data based on their email
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` }, // Pass user's token for authorization
        }
      );
      const data = await response.json();
      setUserData(data); // Set user data in state
    } catch (error) {
      console.error("Failed to fetch user data:", error); // Log any errors
    }
  };

  // Fetch user data when the component is mounted or the token changes
  useEffect(() => {
    fetchUserData();
  }, [user.token]);

  // Fetch child, menu, or other data based on user role and set the user type
  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`, // Fetch family members (children)
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        // Determine userType based on user data and presence of children
        if (json.length > 0) {
          if (userData && userData.age) {
            setUserType("family"); // If user has children and age is present, set user type to "family"
          } else {
            setUserType("justKids"); // If no age is present, set user type to "justKids"
          }
        } else {
          setUserType("justMe"); // If no children, set user type to "justMe"
        }
        console.log("Individual's userType is:", userType);
        console.log("Individual's userData is:", userData);
      }
    };

    // Fetch menus for Professional users
    const fetchMenus = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/menu`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setSelectibles(json); // Set the fetched menus in state
      }
    };

    // Fetch children or menus based on user role
    if (userData) {
      if (userData?.role === "Individual") fetchChildren();
      if (userData?.role === "Professional") fetchMenus();
    }
  }, [userData]);

  return (
    <div className="px-5 xl:px-8">
      <div className="md:px-8 lg:px-24 xl:px-36">
        <div>
          <h3 className="text-center text-xl md:text-2xl mb-4 text-green-800 font-semibold">
            Settings
          </h3>
          <div className="text-lg mb-5 text-gray-700">
            {/* Render settings forms based on user type and role */}
            
            {userData && userData.role === "Individual" && userType === "justKids" && (
              <>
                <div>
                  <hr className="my-4"></hr>
                  <Collapsible
                    trigger={"Edit your Children's Details"} // Collapsible section for children details
                    transitionTime={1100}
                  >
                    <SettingsForm toEdit={"children"} userData={userData} />
                  </Collapsible>
                  <hr className="my-4"></hr>
                </div>
              </>
            )}

            {userData && userData.role === "Individual" && userType === "justMe" && (
              <>
                <div>
                  <Collapsible
                    trigger={"Edit your Personal Details"} // Collapsible section for personal details
                    transitionTime={1300}
                  >
                    <SettingsForm toEdit={"owner"} userData={userData} />
                  </Collapsible>
                  <hr className="my-4"></hr>
                </div>
              </>
            )}

            {userData && userData.role === "Individual" && userType === "family" && (
              <>
                <div>
                  <Collapsible
                    trigger={"Edit your Personal Details"} // Collapsible section for personal details
                    transitionTime={1300}
                  >
                    <SettingsForm toEdit={"owner"} userData={userData} />
                  </Collapsible>
                  <hr className="my-4"></hr>
                  <Collapsible
                    trigger={"Edit your Children Details"} // Collapsible section for children details
                    transitionTime={1100}
                  >
                    <SettingsForm toEdit={"children"} userData={userData} />
                  </Collapsible>
                </div>
              </>
            )}

            {userData && userData.role === "Professional" && (
              <>
                <div>
                  <Collapsible
                    trigger={"Edit your Personal Details"} // Collapsible section for professional user personal details
                    transitionTime={1300}
                  >
                    <SettingsForm toEdit={"pro"} userData={userData} />
                  </Collapsible>
                  <hr className="my-4"></hr>
                  <Collapsible
                    trigger={"Edit your Menus Details"} // Collapsible section for menus details
                    transitionTime={1100}
                  >
                    <SettingsForm toEdit={"menus"} userData={userData} />
                  </Collapsible>
                </div>
              </>
            )}

            {userData && userData.role === "Dietitian" && (
              <>
                <div>
                  <SettingsForm toEdit={"patients"} userData={userData} /> {/* Render settings form for dietitian's patients */}
                  <hr className="my-4"></hr>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;