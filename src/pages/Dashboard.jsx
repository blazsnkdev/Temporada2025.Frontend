import '../styles/Dashboard.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const jugador = JSON.parse(sessionStorage.getItem('jugador'));
    const [showFullToken, setShowFullToken] = useState(false);

    const toggleTokenVisibility = () => {
        setShowFullToken(!showFullToken);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No disponible';
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <h1 className="page-title">Panel de Control</h1>
                <p className="page-subtitle">Bienvenido, {jugador?.nombreJugador || 'Usuario'}</p>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* User Card */}
                <div className="dashboard-card user-profile">
                    <div className="card-header">
                        <h2><i className="fas fa-user"></i> Perfil del Jugador</h2>
                    </div>
                    <div className="card-body">
                        <div className="info-row">
                            <span className="info-label">Nombre:</span>
                            <span className="info-value">{jugador?.nombreJugador || 'No disponible'}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">ID:</span>
                            <span className="info-value">{jugador?.id || 'No disponible'}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Último acceso:</span>
                            <span className="info-value">{formatDate(jugador?.lastLogin)}</span>
                        </div>
                        
                        <div className="token-section">
                            <h4>Token de acceso</h4>
                            <div className="token-display" onClick={toggleTokenVisibility}>
                                {showFullToken ? jugador?.token : `${jugador?.token.substring(0, 30)}...`}
                                <span className="toggle-token">
                                    {showFullToken ? 'Ocultar' : 'Mostrar completo'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions - Versión Corregida */}
                <div className="dashboard-card quick-actions">
                <div className="card-header">
                    <h2><i className="fas fa-bolt"></i> Acciones Rápidas</h2>
                </div>
                <div className="card-body">
                    <button 
                        className="quick-action-btn"
                        onClick={() => navigate('/registrar')}
                    >
                        <i className="fas fa-plus"></i>
                        Nueva Estadística
                    </button>
                    <button 
                        className="quick-action-btn"
                        onClick={() => navigate('/perfil')}
                    >
                        <i className="fas fa-user-edit"></i>
                        Editar Perfil
                    </button>
                    <button 
                        className="quick-action-btn"
                        onClick={() => navigate('/estadisticas')}
                    >
                        <i className="fas fa-chart-line"></i>
                        Ver Estadísticas
                    </button>
                </div>
            </div>

                {/* Recent Activity */}
                <div className="dashboard-card recent-activity">
                    <div className="card-header">
                        <h2><i className="fas fa-history"></i> Actividad Reciente</h2>
                    </div>
                    <div className="card-body">
                        <div className="activity-item">
                            <div className="activity-icon">
                                <i className="fas fa-sign-in-alt"></i>
                            </div>
                            <div className="activity-content">
                                <p>Sesión iniciada</p>
                                <small>{formatDate(new Date())}</small>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">
                                <i className="fas fa-chart-bar"></i>
                            </div>
                            <div className="activity-content">
                                <p>Estadísticas actualizadas</p>
                                <small>Hoy</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="dashboard-card stats-summary">
                    <div className="card-header">
                        <h2><i className="fas fa-trophy"></i> Resumen</h2>
                    </div>
                    <div className="card-body">
                        <div className="stat-item">
                            <div className="stat-value">15</div>
                            <div className="stat-label">Partidos jugados</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">8</div>
                            <div className="stat-label">Goles</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">5</div>
                            <div className="stat-label">Asistencias</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};