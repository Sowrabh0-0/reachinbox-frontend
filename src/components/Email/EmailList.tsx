import React, { useState } from 'react';
import { FaSync, FaSpinner } from 'react-icons/fa';
import DOMPurify from 'dompurify';

interface Email {
    id: string;
    subject: string;
    sender: string;
    date: string;
    body: string;
    category: string;
    from: string;
}

interface EmailListProps {
    emails: Email[];
    category: string;
    onRefresh: () => void;
    loading: boolean;
}

const EmailList: React.FC<EmailListProps> = ({ emails, category, onRefresh, loading }) => {
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    const handleEmailClick = (email: Email) => {
        setSelectedEmail(email);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-white shadow-md overflow-y-scroll p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{category}</h2>
                    <button 
                        onClick={onRefresh} 
                        className={`text-gray-500 hover:text-gray-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={loading}
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : <FaSync size={20} />}
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <FaSpinner className="animate-spin text-gray-500" size={40} />
                    </div>
                ) : emails.length > 0 ? (
                    <ul className="space-y-4">
                        {emails.map((email) => (
                            <li 
                                key={email.id} 
                                className={`p-4 border-b cursor-pointer ${selectedEmail?.id === email.id ? 'bg-gray-200' : ''}`}
                                onClick={() => handleEmailClick(email)} 
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{email.subject}</h3>
                                        <p className="text-sm text-gray-500">From: {email.from}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{email.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No emails found for the selected category.</p>
                )}
            </div>
            <div className="w-2/3 bg-gray-100 p-6 overflow-auto"> 
                {selectedEmail ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">{selectedEmail.subject}</h2>
                        <p className="text-sm text-gray-500 mb-4">From: {selectedEmail.from} - {selectedEmail.date}</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedEmail.body) }}
                            className="prose max-w-none"
                        ></div>
                    </div>
                ) : (
                    <p className="text-gray-500">Select an email to view its content</p>
                )}
            </div>
        </div>
    );
};

export default EmailList;
