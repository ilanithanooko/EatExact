import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleButton from "../components/RoleButton";
import OptionSelection from "../components/OptionSelection";
import PersonalForm from "../components/PersonalForm";
import FamilyForm from "../components/FamilyForm";
import BusinessMenuForm from "../components/BusinessMenuForm";
import { useAuthContext } from "../hooks/useAuthContext";

// ProfileSetup Component
const ProfileSetup = ({onUserDataChange}) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [step, setStep] = useState("selectRole"); // 'selectRole', 'individualOptions', 'personalForm', 'familyForm'
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get the user from context
  const [error, setError] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === "Dietitian") {
      handleDietitian();
    } else if (role === "Individual Use") {
      setStep("individualOptions");
    } else if (role === "Professional Use") {
      setStep("businessMenu");
    }
  };

  const handleDietitian = async (event) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/updateRole`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            email: user.email,
            role: "Dietitian",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update owner information");
      }
      navigate("/my-patients");
      // Redirect or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    if (step === "individualOptions") {
      setStep("selectRole");
    } else {
      setStep("selectRole");
      setSelectedRole(null);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === "justMe") {
      setStep("personalForm");
    } else if (option === "familyJoin" || option === "justKids") {
      setStep("familyForm");
      setSelectedRole(option); // This helps to distinguish between familyJoin and justKids in FamilyForm
    }
  };

  return (
      <div className="px-5 xl:px-8">
        {step === "selectRole" && (
          <>
            <div className="text-center text-xl md:text-3xl mb-5 text-green-800 font-semibold">
              Welcome to EatExact,{" "}
              {user.firstName}
              !
            </div>
            <div className="text-center text-lg mb-5 text-gray-700">
              We're excited to have you on board! <br /> EatExact is designed to
              make your dietary journey enjoyable and effortless<br/> by generating
              personalized recipes using advanced AI technology.
            </div>
            <div className="text-center font-bold text-lg mb-3 text-gray-700">
              To tailor your experience, please select the account type that
              best describes you:
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 xl:px-28 gap-6">
              <div>
                <RoleButton
                  role="Individual Use"
                  description="Ideal for individuals who want to manage their own and their family's dietary restrictions, discovering delicious, AI-generated recipes tailored to their unique needs."
                  onClick={() => handleRoleSelect("Individual Use")}
                />
              </div>

              <div>
              <RoleButton
                role="Professional Use"
                description="Perfect for culinary professionals seeking to create innovative recipes and manage diverse menus, such as vegan or gluten-free, to cater to clients with specific dietary requirements."
                onClick={() => handleRoleSelect("Professional Use")}
              />
              </div>

              <div>
                <RoleButton
                  role="Dietitian"
                  description="Tailored for dietitians focused on creating personalized meal plans that accommodate diverse dietary restrictions and effectively manage  their patients' unique dietary needs."
                  onClick={() => handleRoleSelect("Dietitian")}
                />
              </div>
              {/* <div>{error && <p className="text-red-500 mt-4">{error}</p>}</div> */}
            </div>
          </>
        )}
        {step === "individualOptions" && (
          <OptionSelection onSelect={handleOptionSelect} onBack={handleBack} />
        )}
        {step === "personalForm" && (
          <PersonalForm
            onBack={() => setStep("individualOptions")}
            user={user}
            onUserDataChange={onUserDataChange}
          />
        )}
        {step === "familyForm" && (
          <FamilyForm
            onBack={() => setStep("individualOptions")}
            option={selectedRole}
            onUserDataChange={onUserDataChange}
          />
        )}
        {step === "businessMenu" && <BusinessMenuForm onBack={handleBack} onUserDataChange={onUserDataChange} />}
      </div>

  );
};

export default ProfileSetup;