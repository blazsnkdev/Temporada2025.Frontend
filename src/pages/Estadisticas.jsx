import '../styles/Estadisticas.css';
import { useState, useEffect, useMemo } from 'react';
import { HttpClient } from '../services/http.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Estadisticas = () => {
    const [allEstadisticas, setAllEstadisticas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tempFilters, setTempFilters] = useState({
        fechaInicio: null,
        fechaFin: null,
    });
    const [appliedFilters, setAppliedFilters] = useState({
        fechaInicio: null,
        fechaFin: null,
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 5,
    });

    // Obtener todos los datos
    useEffect(() => {
        const fetchAllEstadisticas = async () => {
            try {
                setLoading(true);
                const http = HttpClient();
                const response = await http.get('estadistica');
                setAllEstadisticas(response.data || response);
            } catch (err) {
                setError('Error al cargar las estadísticas');
                console.error('Error fetching estadisticas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllEstadisticas();
    }, []);

    // Procesar datos: filtrar, calcular totales y paginar
    const { estadisticas, totalItems, totalGoles, totalAsistencias } = useMemo(() => {
        let filtered = [...allEstadisticas];
        
        // Filtrar por fechas
        if (appliedFilters.fechaInicio) {
            const fechaInicio = new Date(appliedFilters.fechaInicio);
            fechaInicio.setHours(0, 0, 0, 0);
            filtered = filtered.filter(est => new Date(est.fechaJornada) >= fechaInicio);
        }
        if (appliedFilters.fechaFin) {
            const fechaFin = new Date(appliedFilters.fechaFin);
            fechaFin.setHours(23, 59, 59, 999);
            filtered = filtered.filter(est => new Date(est.fechaJornada) <= fechaFin);
        }

        // Ordenar por fecha (más reciente primero)
        filtered.sort((a, b) => new Date(b.fechaJornada) - new Date(a.fechaJornada));

        // Calcular totales
        const totalGoles = filtered.reduce((sum, est) => sum + (est.goles || 0), 0);
        const totalAsistencias = filtered.reduce((sum, est) => sum + (est.asistencias || 0), 0);

        // Paginar
        const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
        const paginatedData = filtered.slice(startIndex, startIndex + pagination.itemsPerPage);

        return {
            estadisticas: paginatedData,
            totalItems: filtered.length,
            totalGoles,
            totalAsistencias
        };
    }, [allEstadisticas, appliedFilters, pagination]);

    // Manejadores
    const handleStartDateChange = (date) => setTempFilters(prev => ({ ...prev, fechaInicio: date }));
    const handleEndDateChange = (date) => setTempFilters(prev => ({ ...prev, fechaFin: date }));

    const applyFilters = () => {
        setAppliedFilters(tempFilters);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const resetFilters = () => {
        setTempFilters({ fechaInicio: null, fechaFin: null });
        setAppliedFilters({ fechaInicio: null, fechaFin: null });
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
        }
    };

    const handleNextPage = () => {
        if (pagination.currentPage < Math.ceil(totalItems / pagination.itemsPerPage)) {
            setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
        }
    };

    const handleItemsPerPageChange = (e) => {
        setPagination({
            currentPage: 1,
            itemsPerPage: Number(e.target.value)
        });
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES');

    if (loading && allEstadisticas.length === 0) {
        return <div className="spinner-container"><div className="spinner"></div></div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="stats-container">
            {/* Header */}
            <div className="header-section">
                <h1>Estadísticas</h1>
                <p>Rendimiento por jornada</p>
                <button className="btn-primary">
                    <i className="fas fa-plus"></i> Nueva Estadística
                </button>
            </div>

            {/* Filtros y Totales */}
            <div className="filters-section">
                <div className="filters-header">
                    <h3>Filtros por Jornada</h3>
                    
                </div>

                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Fecha Inicio Jornada</label>
                        <DatePicker
                            selected={tempFilters.fechaInicio}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={tempFilters.fechaInicio}
                            endDate={tempFilters.fechaFin}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Desde"
                        />
                    </div>
                    
                    <div className="filter-group">
                        <label>Fecha Fin Jornada</label>
                        <DatePicker
                            selected={tempFilters.fechaFin}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={tempFilters.fechaInicio}
                            endDate={tempFilters.fechaFin}
                            minDate={tempFilters.fechaInicio}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Hasta"
                        />
                    </div>
                    
                    <div className="filter-group">
                        <label>Items por página</label>
                        <select
                            className="form-control"
                            value={pagination.itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            {[5, 10, 20, 50].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-actions">
                        <button 
                            className="btn-apply"
                            onClick={applyFilters}
                            disabled={!tempFilters.fechaInicio && !tempFilters.fechaFin}
                        >
                            Aplicar Filtros
                        </button>
                        <button 
                            className="btn-secondary" 
                            onClick={resetFilters}
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="table-section">
                <div className="table-header">
                    <h3>Registros de Jornadas</h3>
                    
                    <span className="total-badge">Goles: {totalGoles}</span>
                    <span className="total-badge">Asistencias: {totalAsistencias}</span>
                    <span className="total-badge">Total: {totalItems}</span>
                </div>
                
                <div className="table-responsive">
                    <table className="stats-table">
                        <thead>
                            <tr>
                                <th>Jornada</th>
                                <th>Partidos</th>
                                <th>Goles</th>
                                <th>Asistencias</th>
                                <th>Puntaje</th>
                                <th>Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estadisticas.length > 0 ? (
                                estadisticas.map((est, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(est.fechaJornada)}</td>
                                        <td>{est.partidosJugados}</td>
                                        <td>{est.goles}</td>
                                        <td>{est.asistencias}</td>
                                        <td>
                                            <span className={`puntaje-badge ${est.puntaje >= 3 ? 'high-score' : 'medium-score'}`}>
                                                {est.puntaje}
                                            </span>
                                        </td>
                                        <td>{formatDate(est.fechaRegistro)}</td>
                                        <td className="actions-cell">
                                            <button className="action-btn view-btn">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="action-btn edit-btn">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="no-data">
                                        No se encontraron registros
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                {totalItems > 0 && (
                    <div className="pagination-container">
                        <button 
                            className="page-btn"
                            disabled={pagination.currentPage === 1}
                            onClick={handlePrevPage}
                        >
                            &laquo; Anterior
                        </button>
                        
                        <span className="page-info">
                            Página {pagination.currentPage} de {Math.ceil(totalItems / pagination.itemsPerPage)}
                        </span>
                        
                        <button 
                            className="page-btn"
                            disabled={pagination.currentPage === Math.ceil(totalItems / pagination.itemsPerPage)}
                            onClick={handleNextPage}
                        >
                            Siguiente &raquo;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};