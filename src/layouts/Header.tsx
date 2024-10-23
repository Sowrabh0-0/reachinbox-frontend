import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md py-4">
            <div className="container px-10 flex items-center">
                <div className="logo">
                    <img 
                        src="/logo-modified.png" 
                        alt="Logo" 
                        className="h-16 w-16" 
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
