import React from 'react';
import LogoSection from '../../components/1.Register/LogoSection';
import FormLogin from '../../components/2.Login/FormLogin';


export default function Login() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role == "user" )
  {
    window.location.href = "/dashboard"
  }
  return (
    <div className="flex flex-col md:flex-row h-screen">
       {/* Left Section */}
       <LogoSection />
       {/* Right Section */}
       <FormLogin />
    </div>
  );
}
