import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import GmailDashboard from './pages/GmailDashboard';
import OutlookDashboard from './pages/OutlookDashboard';
import Layout from './layouts/Layout';
import OAuthCallback from './pages/OAuthCallbackPage';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/oauth-callback" element={<OAuthCallback />} />

                    <Route
                        path="/gmail"
                        element={
                            <ProtectedRoute provider="gmail">
                                <GmailDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/outlook"
                        element={
                            <ProtectedRoute provider="outlook">
                                <OutlookDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
