import '../styles/DetalleEstadistica.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HttpClient } from '../services/http.service';

export const DetalleEstadistica = () => {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const [estadistica, setEstadistica] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    // Obtener datos de la estadística al cargar el componente
    useEffect(() => {
        const fetchEstadisticaData = async () => {
            try {
                if (!id) {
                    throw new Error('ID de estadística no proporcionado');
                }

                const http = HttpClient();
                const response = await http.get(`estadistica/${id}`);
                setEstadistica(response);
            } catch (err) {
                setError(err.message || 'Error al cargar los datos de la estadística');
                console.error('Error fetching estadistica data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEstadisticaData();
    }, [id]);

    if (loading) {
        return (
            <div className="stats-detail-container">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="stats-detail-container">
                <div className="alert alert-danger">{error}</div>
                <button 
                    className="btn btn-secondary mt-3"
                    onClick={() => navigate(-1)}
                >
                    Volver atrás
                </button>
            </div>
        );
    }
    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro que deseas eliminar esta estadística? Esta acción no se puede deshacer.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const http = HttpClient();
            await http.del(`estadistica/${id}`);
            navigate('/estadisticas', { replace: true });
        } catch (err) {
            setError('Error al eliminar la estadística');
            console.error('Error deleting estadistica:', err);
        } finally {
            setIsDeleting(false);
        }
    };
    // Función para formatear fechas
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="stats-detail-container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="page-title">Detalle de Estadística</h1>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Volver
                        </button>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="m-0">Rendimiento en la Jornada</h5>
                        </div>
                        <div className="card-body">
                            <div className="stats-info">
                                <div className="info-row">
                                    <span className="info-label">Fecha de Jornada:</span>
                                    <span className="info-value">
                                        {formatDate(estadistica.fechaJornada)}
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Partidos Jugados:</span>
                                    <span className="info-value">{estadistica.partidosJugados}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Goles:</span>
                                    <span className="info-value">{estadistica.goles}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Asistencias:</span>
                                    <span className="info-value">{estadistica.asistencias}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Puntaje:</span>
                                    <span className={`info-value badge ${estadistica.puntaje >= 3 ? 'bg-success' : 'bg-warning'}`}>
                                        {estadistica.puntaje}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="m-0">Información de Registro</h5>
                        </div>
                        <div className="card-body">
                            <div className="info-row">
                                <span className="info-label">Fecha de Registro:</span>
                                <span className="info-value small">
                                    {formatDate(estadistica.fechaRegistro)}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">ID de Estadística:</span>
                                <span className="info-value small">
                                    {id}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 d-grid gap-2">
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate(`/editar/${id}`)}
                        >
                            Editar Estadística
                        </button>
                                            <button 
                        className="btn btn-danger"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Eliminando...
                            </>
                        ) : 'Eliminar Estadística'}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};