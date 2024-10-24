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
}

const GmailDashboard: React.FC = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All Mails');

    const fetchEmails = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/fetchGmailEmails`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('gmailTokens')}`,
                },
                withCredentials: true,
            })
            .then((response) => {
                setEmails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Gmail emails:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    const handleRefresh = () => {
        fetchEmails();
    };

    const filteredEmails =
        selectedCategory === 'All Mails'
            ? emails
            : emails.filter((email) => email.category === selectedCategory);

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

            <EmailList
                emails={filteredEmails}
                category={selectedCategory}
                onRefresh={handleRefresh}
                loading={loading}
            />
        </div>
    );
};

export default GmailDashboard;
