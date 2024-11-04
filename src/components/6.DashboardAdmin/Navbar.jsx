import React from 'react';

const NavBar = () => {
  return (
    <nav className="w-full bg-white/30 backdrop-blur-md p-4 text-indigo-800 shadow-lg flex ">
       <div className="lg:text-2xl text-[20px] font-bold lg:ml-16">Dashboard</div>
      <div className="flex lg:space-x-14 space-x-4 lg:ml-[25%] ml-[13%] mt-1 lg:text-[16px]  text-[14px] font-[500]">
        <a href="/root/dashboard" className="hover:text-blue-500 transition duration-300">Students</a>
        <a href="/root/event" className="hover:text-blue-500 transition duration-300">Events</a>
        <a href="/root/verification" className="hover:text-blue-500 transition duration-300">Verification</a>
      </div>
      <a
        href="https://www.instagram.com/robixe.online/"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex space-x-2 text-black hover:text-blue-800 lg:ml-[22%] lg:mt-2"
      >
        <img src="/Robixe.png" alt="Robixe Logo" className="w-5 h-5" />
        <span className="text-[12px] font-bold  ">Dev by Robixe</span>
      </a>
    {/* for small screens */}
      <a
     href="https://www.instagram.com/robixe.online/"
    target="_blank"
    rel="noopener noreferrer"
    className="lg:hidden flex space-x-2 text-black hover:text-blue-800 absolute mt-[17%]  left-1/2 transform -translate-x-1/2"
     >
    <img src="/Robixe.png" alt="Robixe Logo" className="w-5 h-5" />
    <span className="text-[12px] font-bold">Dev by Robixe</span>
     </a>
    </nav>
  );
};

export default NavBar;
