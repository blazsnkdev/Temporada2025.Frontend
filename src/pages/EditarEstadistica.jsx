import '../styles/EditarEstadistica.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HttpClient } from '../services/http.service';

export const EditarEstadistica = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [estadistica, setEstadistica] = useState({
        partidosJugados: 0,
        goles: 0,
        asistencias: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Obtener datos de la estadística al cargar el componente
    useEffect(() => {
        const fetchEstadisticaData = async () => {
            try {
                const http = HttpClient();
                const response = await http.get(`estadistica/${id}`);
                setEstadistica(response);
            } catch (err) {
                setError('Error al cargar los datos de la estadística');
                console.error('Error fetching estadistica data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEstadisticaData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEstadistica(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const http = HttpClient();
            await http.put(`estadistica/${id}`, estadistica);
            
            // Redirigir a la vista de estadísticas en lugar de al detalle
            navigate('/estadisticas', { replace: true });
            
        } catch (err) {
            setError('Error al actualizar la estadística');
            console.error('Error updating estadistica:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="edit-stats-container">
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
            <div className="edit-stats-container">
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

    return (
        <div className="edit-stats-container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="page-title">Editar Estadística</h1>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="m-0">Modificar Rendimiento</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Partidos Jugados</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="partidosJugados"
                                        value={estadistica.partidosJugados}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label">Goles</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="goles"
                                        value={estadistica.goles}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <label className="form-label">Asistencias</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="asistencias"
                                        value={estadistica.asistencias}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Guardando...
                                            </>
                                        ) : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
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
                                <span className="info-label">ID de Estadística:</span>
                                <span className="info-value small">
                                    {id}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};