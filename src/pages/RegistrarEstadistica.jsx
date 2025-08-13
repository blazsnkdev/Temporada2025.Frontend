import { useState } from 'react';
import { HttpClient } from '../services/http.service';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import '../styles/RegistrarEstadistica.css';

export const RegistrarEstadistica = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fechaJornada: '',
        partidosJugados: 0,
        goles: 0,
        asistencias: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'fechaJornada' ? value : parseInt(value) || 0
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            fechaJornada: date ? date.toISOString().split('T')[0] : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const http = HttpClient();
            await http.post('estadistica', formData);
            navigate('/estadisticas'); // Redirige a la vista de estadísticas
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar la estadística');
            console.error('Error al registrar:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="registro-container">
            <h2>Registrar Nueva Estadística</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="estadistica-form">
                <div className="form-group">
                    <label>Fecha de Jornada</label>
                    <DatePicker
                        selected={formData.fechaJornada ? new Date(formData.fechaJornada) : null}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Partidos Jugados</label>
                    <input
                        type="number"
                        name="partidosJugados"
                        value={formData.partidosJugados}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Goles</label>
                    <input
                        type="number"
                        name="goles"
                        value={formData.goles}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Asistencias</label>
                    <input
                        type="number"
                        name="asistencias"
                        value={formData.asistencias}
                        onChange={handleInputChange}
                        className="form-control"
                        min="0"
                        required
                    />
                </div>

                <div className="form-actions">
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Guardar Estadística'}
                    </Button>
                </div>
            </form>
        </div>
    );
};