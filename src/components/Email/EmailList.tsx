import React, { useState } from 'react';
import { FaSync } from 'react-icons/fa';

interface Email {
    id: string;
    subject: string;
    sender: string;
    date: string;
    body: string;
}

interface EmailListProps {
    emails: Email[];
    category: 'All Mails' | 'Interested' | 'Not Interested' | 'More Information';
    onRefresh: () => void; // Removed provider argument from here
}

const EmailList: React.FC<EmailListProps> = ({ emails, category, onRefresh }) => {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    const handleEmailClick = (email: Email) => {
        setSelectedEmail(email); // Set the selected email
    };

    return (
        <div className="flex h-screen">
            {/* Email List - Left Sidebar */}
            <div className="w-1/3 bg-white shadow-md overflow-y-scroll p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{category}</h2>
                    <button onClick={onRefresh} className="text-gray-500 hover:text-gray-700">
                        <FaSync size={20} /> {/* Refresh icon */}
                    </button>
                </div>
                <ul className="space-y-4">
                    {emails.map((email) => (
                        <li 
                            key={email.id} 
                            className={`p-4 border-b cursor-pointer ${selectedEmail?.id === email.id ? 'bg-gray-200' : ''}`}
                            onClick={() => handleEmailClick(email)} // On click, show email details
                        >
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{email.subject}</h3>
                                    <p className="text-sm text-gray-500">From: {email.sender}</p>
                                </div>
                                <p className="text-sm text-gray-500">{email.date}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Email Details - Right Side */}
            <div className="w-2/3 bg-gray-100 p-6">
                {selectedEmail ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">{selectedEmail.subject}</h2>
                        <p className="text-sm text-gray-500 mb-4">From: {selectedEmail.sender} - {selectedEmail.date}</p>
                        <p>{selectedEmail.body}</p>
                    </div>
                ) : (
                    <p className="text-gray-500">Select an email to view its content</p>
                )}
            </div>
        </div>
    );
};

export default EmailList;
