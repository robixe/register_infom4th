import React from 'react';
import LogoSection from '../../components/5.AdminLogin/LogoSection';
import FormLoginAdmin from '../../components/5.AdminLogin/FormLoginAdmin';

export default function AdminLogin() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role == "root" )
    {
      window.location.href = "/root/dashboard"
    }
  return (
    <div className="flex flex-col md:flex-row bg-white h-screen">
      {/* Left Section */}
      <LogoSection />
      {/* Right Section */}
      <FormLoginAdmin />
    </div>
  );
}
