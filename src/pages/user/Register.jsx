import React from 'react';
import LogoSection from '../../components/1.Register/LogoSection';
import FormRegister from '../../components/1.Register/FormRegister';


export default function Register() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Section */}
      <LogoSection />
      {/* Right Section */}
      <FormRegister />
    </div>
  );
}