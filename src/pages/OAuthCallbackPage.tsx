import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTokens } from '../utils/authUtils';
import axios from 'axios';

const OAuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [emails, setEmails] = useState<any[]>([]);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const tokens = query.get('tokens');
        const provider = query.get('provider');

        console.log("oauth",tokens);

        if (tokens && provider) {

            let parsedTokens: any;

            if (provider === 'gmail') {
                try {
                    parsedTokens = JSON.parse(tokens);
                } catch (e) {
                    setError('Failed to parse Gmail tokens');
                    setIsLoading(false);
                    return;
                }
            } else {
                parsedTokens = tokens;
            }

            storeTokens(provider as 'gmail' | 'outlook', parsedTokens);

            fetchEmails(provider, parsedTokens);
        } else {
            setError('Invalid OAuth callback data');
            setIsLoading(false);
        }
    }, [navigate]);

    const fetchEmails = async (provider: string, tokens: any) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/fetch${provider.charAt(0).toUpperCase() + provider.slice(1)}Emails`, {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                },
                withCredentials: true
            });
            setEmails(response.data);

            navigate(`/${provider}`, { state: { emails: response.data } });
        } catch (error) {
            setError('Failed to fetch emails');
        } finally {
            setIsLoading(false); 
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
                <span className="ml-4">Loading...</span>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return null;
};

export default OAuthCallback;
