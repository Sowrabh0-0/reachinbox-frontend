import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTokens } from '../utils/authUtils';

const Header: React.FC = () => {
    const [gmailAuthenticated, setGmailAuthenticated] = useState(false);
    const [, setOutlookAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const gmailTokens = getTokens('gmail');
        const outlookTokens = getTokens('outlook');

        setGmailAuthenticated(!!gmailTokens);
        setOutlookAuthenticated(!!outlookTokens);
    }, []);

    const handleOutlookClick = () => {
        const outlookTokens = getTokens('outlook');
        if (!outlookTokens) {
            window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/outlook`;
        } else {
            navigate('/outlook');
        }
    };

    return (
        <header className="bg-white shadow-md py-4">
            <div className="container px-10 flex items-center justify-between">
                <div className="logo">
                    <img 
                        src="/logo-modified.png" 
                        alt="Logo" 
                        className="h-16 w-16" 
                    />
                </div>

                <nav className="space-x-6">
                    {gmailAuthenticated && (
                        <Link to="/gmail" className="text-gray-700 hover:text-gray-900">
                            Gmail
                        </Link>
                    )}
                    <button
                        onClick={handleOutlookClick}
                        className="text-gray-700 hover:text-gray-900"
                    >
                        Outlook
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
