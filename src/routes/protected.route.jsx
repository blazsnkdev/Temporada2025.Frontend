import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Layout } from '../shared/layout';

export const ProtectedRoute = () => {
    const navigate = useNavigate();
    let isAuthenticated = false;

    try {
        const jugadorString = sessionStorage.getItem('jugador');
        if (jugadorString) {
            const jugador = JSON.parse(jugadorString);
            isAuthenticated = !!jugador?.token;
        }
    } catch (error) {
        console.error("Error parsing user token from sessionStorage:", error);
        isAuthenticated = false;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });   
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};