import '../styles/Perfil.css';
import { useState, useEffect } from 'react';
import { HttpClient } from '../services/http.service';

export const Perfil = () => {
    const [jugadorData, setJugadorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener datos del jugador al cargar el componente
    useEffect(() => {
        const fetchJugadorData = async () => {
            try {
                const http = HttpClient();
                const response = await http.get('jugador');
                setJugadorData(response);
            } catch (err) {
                setError('Error al cargar los datos del jugador');
                console.error('Error fetching jugador data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJugadorData();
    }, []);

    if (loading) {
        return (
            <div className="profile-container">
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
            <div className="profile-container">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="row">
                <div className="col-12">
                    <h1 className="page-title">Perfil del Jugador</h1>
                </div>

                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="m-0">Información Básica</h5>
                        </div>
                        <div className="card-body">
                            <div className="player-info">
                                <div className="info-row">
                                    <span className="info-label">Nombre:</span>
                                    <span className="info-value">{jugadorData.nombre}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Apellido Paterno:</span>
                                    <span className="info-value">{jugadorData.apellidoPaterno}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Apellido Materno:</span>
                                    <span className="info-value">{jugadorData.apellidoMaterno}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Posición:</span>
                                    <span className="info-value">{jugadorData.posicion}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Pie Dominante:</span>
                                    <span className="info-value">{jugadorData.pie}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Dorsal:</span>
                                    <span className="info-value">{jugadorData.dorsal}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Fecha Nacimiento:</span>
                                    <span className="info-value">
                                        {new Date(jugadorData.fechaNacimiento).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="m-0">Datos Adicionales</h5>
                        </div>
                        <div className="card-body">
                            <div className="info-row">
                                <span className="info-label">ID del Jugador:</span>
                                <span className="info-value small">
                                    {JSON.parse(sessionStorage.getItem('jugador'))?.id}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Miembro desde:</span>
                                <span className="info-value small">
                                    {new Date().toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};