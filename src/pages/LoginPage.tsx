import React from 'react';
import OAuthButton from '../components/Auth/OAuthButton';
import Header from '../layouts/Header';

const LoginPage: React.FC = () => {
    const handleGmailAuth = () => {
        window.location.href = `${process.env.REACT_APP_API_BASE_URL}/gmail-oauth`;
    };

    const handleOutlookAuth = () => {
        window.location.href = `${process.env.REACT_APP_API_BASE_URL}/outlook-oauth`;
    };

    return (
        <div className="min-h-screen overflow-hidden">
            <Header />
            <div className="flex flex-col items-center justify-center h-full mt-44">
                <div className="text-center space-y-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Sign In</h1>
                    <div className="flex justify-center space-x-6">
                        <OAuthButton provider="gmail" onClick={handleGmailAuth} />
                        <OAuthButton provider="outlook" onClick={handleOutlookAuth} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
