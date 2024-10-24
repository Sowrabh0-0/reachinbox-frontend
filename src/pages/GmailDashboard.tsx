import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EmailList from '../components/Email/EmailList';
import axios from 'axios';

interface Email {
    id: string;
    subject: string;
    sender: string;
    date: string;
    body: string;
    category: string;
    from: string;
}

const GmailDashboard: React.FC = () => {
    const location = useLocation(); 
    const [gmailEmails, setGmailEmails] = useState<Email[]>(location.state?.emails || []);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Mails');

    const fetchEmails = () => {
        setLoading(true);
        const tokens = localStorage.getItem('gmailTokens') ? JSON.parse(localStorage.getItem('gmailTokens') as string) : null;

        if (!tokens) {
            setLoading(false);
            return;
        }

        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/fetchGmailEmails`, {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                },
                withCredentials: true,
            })
            .then((response) => {
                const newEmails = response.data;

                if (newEmails && newEmails.length > 0) {
                    setGmailEmails((prevEmails) => [...prevEmails, ...newEmails]);
                    localStorage.setItem('gmailEmails', JSON.stringify([...gmailEmails, ...newEmails]));
                }

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (gmailEmails.length === 0) {
            const cachedEmails = localStorage.getItem('gmailEmails');
            if (cachedEmails) {
                setGmailEmails(JSON.parse(cachedEmails));
            } else {
                fetchEmails();
            }
        }
    }, [gmailEmails]);

    const handleRefresh = () => {
        fetchEmails();
    };

    const filteredEmails =
        selectedCategory === 'All Mails'
            ? gmailEmails
            : gmailEmails.filter((email) => email.category === selectedCategory);

    return (
        <div className="container mx-auto py-6">
            <div className="mb-4">
                <label className="mr-4">Category: </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2"
                >
                    <option value="All Mails">All Mails</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="More Information">More Information</option>
                </select>
            </div>

            {filteredEmails.length === 0 && !loading ? (
                <p className="text-gray-500">No emails found for the selected category.</p>
            ) : (
                <EmailList
                    emails={filteredEmails}
                    category={selectedCategory}
                    onRefresh={handleRefresh}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default GmailDashboard;
