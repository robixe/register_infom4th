import React from 'react';
import LogoSection from '../../components/5.AdminLogin/LogoSection';
import FormLoginAdmin from '../../components/5.AdminLogin/FormLoginAdmin';


export default function AdminLogin() {
   

    return (
     <div className="flex flex-col md:flex-row bg-white h-screen">
        {/* Left Section */}
        <LogoSection />
        {/* Right Section */}
        <FormLoginAdmin />
     </div>
    );
}
