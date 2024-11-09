import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full fixed z-10 bg-gradient-to-r from-indigo-500 to-blue-500 p-4 text-white flex justify-between items-center px-4 shadow-lg">
      <div className="lg:text-2xl text-[20px] font-bold">Dashboard</div>
      <div className="hidden lg:flex gap-10 items-center text-[17px] font-[500]">
        <Link to="/root/dashboard" className="hover:text-blue-200 transition duration-300">Students</Link>
        <Link to="/root/event" className="hover:text-blue-200 transition duration-300">Events</Link>
        <Link to="/root/verification" className="hover:text-blue-200 transition duration-300">Verification</Link>
        <a
          href="https://www.instagram.com/robixe.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-blue-200 transition duration-300"
        >
          <img src="/Robixe.png" alt="Robixe Logo" className="w-5 h-5 mr-1" />
          <span className="text-[12px] font-bold">Dev by Robixe</span>
        </a>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4">
          <Link to="/root/dashboard" className="block text-indigo-600 hover:text-blue-500 transition duration-300">Students</Link>
          <Link to="/root/event" className="block text-indigo-600 hover:text-blue-500 transition duration-300">Events</Link>
          <Link to="/root/verification" className="block text-indigo-600 hover:text-blue-500 transition duration-300">Verification</Link>
        </div>
      )}

      {/* For small screens */}
      <div className="lg:hidden flex items-center space-x-2 text-white hover:text-blue-200">
        <img src="/Robixe.png" alt="Robixe Logo" className="w-5 h-5" />
        <span className="text-[12px] font-bold">Dev by Robixe</span>
      </div>
    </nav>
  );
};

export default NavBar;
