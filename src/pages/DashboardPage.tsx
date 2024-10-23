import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1>Welcome to your Dashboard!</h1>
            <p>This page is protected and can only be accessed after login.</p>
        </div>
    );
};

export default DashboardPage;
