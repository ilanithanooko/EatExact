import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import SettingsForm from "../components/SettingsForm";

const Settings = () => {
  const [selectibles, setSelectibles] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/${user.email}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.token]);

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/familyMember`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        if (json.length > 0) {
          if (userData && userData.age) {
            setUserType("family");
          } else {
            setUserType("justKids");
          }
        } else {
          setUserType("justMe");
        }
        console.log("Individual's userType is:", userType);
        console.log("Individual's userData is:", userData);
      }
    };

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
        setSelectibles(json);
      }
    };

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
            {userData &&
              userData.role === "Individual" &&
              userType === "justKids" && (
                <>
                  <div>
                    <hr className="my-4"></hr>
                    <Collapsible
                      trigger={"Edit your Children's Details"}
                      transitionTime={1100}
                    >
                      <SettingsForm toEdit={"children"} userData={userData} />
                    </Collapsible>
                    <hr className="my-4"></hr>
                  </div>
                </>
              )}
            {userData &&
              userData.role === "Individual" &&
              userType === "justMe" && (
                <>
                  <div>
                    <Collapsible
                      trigger={"Edit your Personal Details"}
                      transitionTime={1300}
                    >
                      <SettingsForm toEdit={"owner"} userData={userData} />
                    </Collapsible>
                    <hr className="my-4"></hr>
                  </div>
                </>
              )}
            {userData &&
              userData.role === "Individual" &&
              userType === "family" && (
                <>
                  <div>
                    <Collapsible
                      trigger={"Edit your Personal Details"}
                      transitionTime={1300}
                    >
                      <SettingsForm toEdit={"owner"} userData={userData} />
                    </Collapsible>
                    <hr className="my-4"></hr>
                    <Collapsible
                      trigger={"Edit your Children Details"}
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
                    trigger={"Edit your Personal Details"}
                    transitionTime={1300}
                  >
                    <SettingsForm toEdit={"pro"} userData={userData} />
                  </Collapsible>
                  <hr className="my-4"></hr>
                  <Collapsible
                    trigger={"Edit your Menus Details"}
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
                  <SettingsForm toEdit={"patients"} userData={userData} />
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
