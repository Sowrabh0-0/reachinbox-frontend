import React, { useState, useEffect } from 'react';
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

const OutlookDashboard: React.FC = () => {
    const [outlookEmails, setOutlookEmails] = useState<Email[]>([]); // Store only Outlook emails
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All Mails');

    const fetchEmails = () => {
        setLoading(true);
        const tokens = localStorage.getItem('outlookTokens') ? JSON.parse(localStorage.getItem('outlookTokens') as string) : null;

        if (!tokens) {
            console.error('No Outlook tokens found');
            setLoading(false);
            return;
        }

        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/fetchOutlookEmails`, {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`, // Use the parsed token
                },
                withCredentials: true,
            })
            .then((response) => {
                const newEmails = response.data;

                // If newEmails are non-empty, append them to the existing emails
                if (newEmails && newEmails.length > 0) {
                    setOutlookEmails((prevEmails) => [...prevEmails, ...newEmails]); // Append emails
                    localStorage.setItem('outlookEmails', JSON.stringify([...outlookEmails, ...newEmails])); // Update localStorage
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Outlook emails:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Check if we already have cached Outlook emails in localStorage
        const cachedEmails = localStorage.getItem('outlookEmails');
        if (cachedEmails) {
            setOutlookEmails(JSON.parse(cachedEmails)); // Use cached emails if available
            setLoading(false);
        } else {
            fetchEmails(); // Fetch if no cache available
        }
    }, []);

    const handleRefresh = () => {
        fetchEmails(); // Refresh emails on demand
    };

    const filteredEmails =
        selectedCategory === 'All Mails'
            ? outlookEmails
            : outlookEmails.filter((email) => email.category === selectedCategory);

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

export default OutlookDashboard;
