import React from 'react';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';

interface OAuthButtonProps {
    provider: 'gmail' | 'outlook';
    onClick: () => void;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ provider, onClick }) => {
    const getProviderIcon = () => {
        if (provider === 'gmail') {
            return <FaGoogle className="mr-2" size={24} />;
        } else if (provider === 'outlook') {
            return <FaMicrosoft className="mr-2" size={24} />;
        }
    };

    const getProviderLabel = () => {
        if (provider === 'gmail') {
            return 'Sign in with Gmail';
        } else if (provider === 'outlook') {
            return 'Sign in with Outlook';
        }
    };

    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full shadow hover:bg-gray-100 focus:outline-none"
        >
            {getProviderIcon()}
            <span>{getProviderLabel()}</span>
        </button>
    );
};

export default OAuthButton;
