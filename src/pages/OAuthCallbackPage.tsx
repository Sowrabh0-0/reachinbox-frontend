import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokens } from '../utils/authUtils';
import axios from 'axios';

const OAuthCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const tokens = query.get('tokens');
        const provider = query.get('provider');


        if (tokens && provider) {
            console.log("Tokens:", tokens);
            console.log("Provider:", provider);
            storeTokens(provider as 'gmail' | 'outlook', JSON.parse(tokens));
            fetchEmails(provider);
            console.log("Navigating to", `/${provider}`);
            navigate(`/${provider}`);
        }
    }, [navigate]);

    const fetchEmails = async (provider: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fetch${provider.charAt(0).toUpperCase() + provider.slice(1)}Emails`, {
                withCredentials: true
            });
            console.log('Emails fetched:', response.data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    return <div>Loading...</div>;
};

export default OAuthCallback;
