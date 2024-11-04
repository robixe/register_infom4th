import React from 'react';
import NavBar from '../../components/6.DashboardAdmin/Navbar';
import EventManagement from '../../components/7.Event/EventManagement ';

const EventForm = () => {
   
    return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-gray-300 via-blue-200 to-gray-300 ">
      <NavBar />
      <EventManagement />
    </div>
    );
};

export default EventForm;
