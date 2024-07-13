import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleButton from '../components/RoleButton';
import OptionSelection from '../components/OptionSelection';
import PersonalForm from '../components/PersonalForm';
import FamilyForm from '../components/FamilyForm';
import BusinessMenuForm from '../components/BusinessMenuForm';
import { useAuthContext } from '../hooks/useAuthContext';

// ProfileSetup Component
const ProfileSetup = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [step, setStep] = useState('selectRole'); // 'selectRole', 'individualOptions', 'personalForm', 'familyForm'
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get the user from context

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'Dietitian') {
      navigate('/my-patients');
    } else if (role === 'Individual Use') {
      setStep('individualOptions');
    } else if (role === 'Professional Use') {
      setStep('businessMenu');
    }
  };

  const handleBack = () => {
    if (step === 'individualOptions') {
      setStep('selectRole');
    } else {
      setStep('selectRole');
      setSelectedRole(null);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === 'justMe') {
      setStep('personalForm');
    } else if (option === 'familyJoin' || option === 'justKids') {
      setStep('familyForm');
      setSelectedRole(option); // This helps to distinguish between familyJoin and justKids in FamilyForm
    }
  };

  const handleAccountOwnerSubmit = (event) => {
    event.preventDefault();
    setStep('familyForm');
  };

  return (
    <div className="bg-gray-100 h-screen px-4 sm:px-10 lg:px-32 pt-4">
      <div className="bg-white rounded-3xl mx-auto p-8 shadow-lg">
        {step === 'selectRole' && (
          <>
            <div className="text-center font-montserrat text-3xl mb-5 text-green-900 font-bold">
              Welcome to EatExact!
            </div>
            <div className="text-center font-montserrat text-lg mb-7 text-gray-700">
              We're excited to have you on board! <br /> EatExact is designed to make your dietary journey enjoyable and effortless by generating personalized recipes using advanced AI technology.
            </div>
            <div className="text-center font-montserrat text-xl text-gray-900">
              Let's Get Started!
            </div>
            <div className="text-center font-bold font-montserrat text-lg mb-7 text-gray-700">
              To tailor your experience, please select the account type that best describes you:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:px-10">
              <RoleButton
                role="Individual Use"
                description="Ideal for individuals who want to manage their own and their family's dietary restrictions, discovering delicious, AI-generated recipes tailored to their unique needs."
                onClick={() => handleRoleSelect('Individual Use')}
              />
              <RoleButton
                role="Professional Use"
                description="Perfect for culinary professionals seeking to create innovative recipes and manage diverse menus, such as vegan or gluten-free, to cater to clients with specific dietary requirements."
                onClick={() => handleRoleSelect('Professional Use')}
              />
              <RoleButton
                role="Dietitian"
                description="Tailored for dietitians focused on creating personalized, healthy meal plans that accommodate diverse dietary restrictions and effectively manage the unique dietary needs of their patients."
                onClick={() => handleRoleSelect('Dietitian')}
              />
            </div>
          </>
        )}
        {step === 'individualOptions' && <OptionSelection onSelect={handleOptionSelect} onBack={handleBack} />}
        {step === 'personalForm' && <PersonalForm onBack={() => setStep('individualOptions')} user={user} />}
        {step === 'familyForm' && (
          <FamilyForm onBack={handleBack} option={selectedRole} />
        )}
        {step === 'businessMenu' && <BusinessMenuForm onBack={handleBack} />}
      </div>
    </div>
  );
};

export default ProfileSetup;
