import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="container mx-auto py-6">{children}</main>
        </div>
    );
};

export default Layout;
