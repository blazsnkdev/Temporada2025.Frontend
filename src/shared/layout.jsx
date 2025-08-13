import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './Layout.css';

export const Layout = ({ children }) => {
    const [jugador, setJugador] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const jugadorString = sessionStorage.getItem('jugador');
        if (jugadorString) {
            setJugador(JSON.parse(jugadorString));
        }
    }, []);

    const handlerLogout = () => {
        sessionStorage.removeItem('jugador');
        navigate('/login', { replace: true });
    };

    return (
        <div className="dark-theme-app">
            {/* Sidebar Azul Oscuro */}
            <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="user-info">
                        <div className="user-avatar">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        {!sidebarCollapsed && (
                            <div className="user-details">
                                <h4>{jugador?.nombreJugador || 'Usuario'}</h4>
                                <small>ID: {jugador?.id?.substring(0, 8)}...</small>
                            </div>
                        )}
                    </div>
                    <button 
                        className="toggle-btn"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    >
                        <i className={`fas fa-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/" className="nav-link">
                        <i className="fas fa-tachometer-alt"></i>
                        {!sidebarCollapsed && <span>Dashboard</span>}
                    </NavLink>
                    
                    <NavLink to="/perfil" className="nav-link">
                        <i className="fas fa-user-cog"></i>
                        {!sidebarCollapsed && <span>Perfil</span>}
                    </NavLink>
                    
                    <NavLink to="/estadisticas" className="nav-link">
                        <i className="fas fa-chart-line"></i>
                        {!sidebarCollapsed && <span>Estadísticas</span>}
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handlerLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        {!sidebarCollapsed && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Negro con detalles azules */}
            <main className="main-content">
                <div className="content-container">
                    {children}
                </div>
            </main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};