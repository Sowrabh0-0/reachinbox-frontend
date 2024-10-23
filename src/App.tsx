import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Root route */}
                <Route path="/" element={<LoginPage />} />


                {/* Public route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected route */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Default redirect to login */}
                <Route path="*" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
