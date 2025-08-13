    import '../styles/Dashboard.css'; // Crea este archivo

  export const Dashboard = () => {
    const jugador = JSON.parse(sessionStorage.getItem('jugador'));

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Panel de control principal</p>
            </div>

            <div className="user-card">
                <h2>Información del Miembro</h2>
                <p><strong>Nombre:</strong> {jugador?.nombreJugador || 'Usuario'}</p>
                <p><strong>ID:</strong> {jugador?.id}</p>
                
                <div className="mt-3">
                    <h5>Token de acceso:</h5>
                    <div className="token-display">
                        {jugador?.token.substring(0, 30)}...
                    </div>
                </div>
            </div>

            <div className="updates-section">
                <h3><i className="fas fa-bell"></i> Actualizaciones</h3>
                <div className="update-card">
                    <p><strong>Experiencia de Usuario</strong> [Perfil cercano]</p>
                    <small className="text-muted">Última actualización: hoy</small>
                </div>
            </div>
        </div>
    );
};