import React from 'react';

const NotAvailable = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <h2 className="text-xl font-bold">This page is not accessible on small screens.</h2>
            <p>Please use a larger device to access this feature.</p>
        </div>
    );
};

export default NotAvailable;
