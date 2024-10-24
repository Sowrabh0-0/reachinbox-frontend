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
    const [outlookEmails, setOutlookEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All Mails');

    const fetchEmails = () => {
        setLoading(true);
        const tokens = localStorage.getItem('outlookTokens') ? JSON.parse(localStorage.getItem('outlookTokens') as string) : null;

        if (!tokens) {
            setLoading(false);
            return;
        }

        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/fetchOutlookEmails`, {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`,
                },
                withCredentials: true,
            })
            .then((response) => {
                const newEmails = response.data;

                if (newEmails && newEmails.length > 0) {
                    setOutlookEmails((prevEmails) => [...prevEmails, ...newEmails]);
                    localStorage.setItem('outlookEmails', JSON.stringify([...outlookEmails, ...newEmails]));
                }

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        const cachedEmails = localStorage.getItem('outlookEmails');
        if (cachedEmails) {
            setOutlookEmails(JSON.parse(cachedEmails));
            setLoading(false);
        } else {
            fetchEmails();
        }
    }, []);

    const handleRefresh = () => {
        fetchEmails();
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
