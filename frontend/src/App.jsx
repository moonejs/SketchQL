import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; 
import AuthCallback from './pages/Auth/AuthCallback';
import DbDesigner from './pages/Designer/DbDesigner';
import Dashboard from './pages/Dashboard/Dashboard';
import { useAuthStore } from './Store/authStore';
import SharedDiagram from './pages/Designer/SharedDiagram';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shared/:id" element={<SharedDiagram />} />
                <Route path="/" element={<AuthCallback />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/design" 
                    element={
                        <ProtectedRoute>
                            <DbDesigner />
                        </ProtectedRoute>
                    } 
                />
                
            </Routes>
        </BrowserRouter>
    );
}