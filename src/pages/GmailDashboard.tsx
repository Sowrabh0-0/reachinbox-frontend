import React, { useState, useEffect } from 'react';
import EmailList from '../components/Email/EmailList';
import axios from 'axios';

const GmailDashboard: React.FC = () => {
    const [emails, setEmails] = useState([]);

    const fetchEmails = () => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/fetchGmailEmails`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('gmailTokens')}`,
                },
                withCredentials: true,
            })
            .then((response) => {
                setEmails(response.data);
            })
            .catch((error) => {
                console.error('Error fetching Gmail emails:', error);
            });
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    const handleRefresh = () => {
        fetchEmails();
    };

    return (
        <div className="container mx-auto py-6">
            <EmailList emails={emails} category="All Mails" onRefresh={handleRefresh} />
        </div>
    );
};

export default GmailDashboard;
