    import '../styles/Estadisticas.css'; // Crea este archivo
    export const Estadisticas = () => {
    const stats = {
        partidos: 24,
        victorias: 15,
        derrotas: 9,
        promedio: 18.7,
        mejorPuntaje: 32
    };

    return (
        <div className="stats-container">
        <div className="row">
            <div className="col-12">
            <h1 className="page-title">Estadísticas</h1>
            <p className="page-subtitle">Rendimiento general</p>
            </div>

            {/* Tarjetas de Resumen */}
            <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                <div className="stat-card">
                    <div className="stat-value">{stats.partidos}</div>
                    <div className="stat-label">Partidos</div>
                </div>
                </div>
            </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                <div className="stat-card">
                    <div className="stat-value">{stats.victorias}</div>
                    <div className="stat-label">Victorias</div>
                </div>
                </div>
            </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                <div className="stat-card">
                    <div className="stat-value">{stats.derrotas}</div>
                    <div className="stat-label">Derrotas</div>
                </div>
                </div>
            </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                <div className="stat-card">
                    <div className="stat-value">{stats.promedio}</div>
                    <div className="stat-label">Puntos/P.</div>
                </div>
                </div>
            </div>
            </div>

            {/* Gráfico */}
            <div className="col-12 mb-4">
            <div className="card shadow">
                <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                    Rendimiento Mensual
                </h6>
                </div>
                <div className="card-body">
                <div className="chart-placeholder">
                    <p className="text-center text-muted py-5">
                    <i className="fas fa-chart-bar fa-3x mb-3"></i><br />
                    Gráfico de rendimiento (simulado)
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };