import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HttpClient } from '../services/http.service';
    import '../styles/Login.css'; // Crea este archivo

export const LoginPage = () => {
    const [form, setForm] = useState({ 
        nombre: '', 
        password: '',
        // Campos para registro
        apellidoPaterno: '',
        apellidoMaterno: '',
        posicion: '',
        pie: '',
        dorsal: '',
        fechaNacimiento: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handlerControl = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const handlerLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const http = HttpClient();
            const response = await http.post('auth/login', {
                nombre: form.nombre,
                password: form.password
            });
            
            if (response?.token) {
                const tokenData = http.parseTokenData(response.token);
                
                sessionStorage.setItem('jugador', JSON.stringify({
                    token: response.token,
                    nombreJugador: tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
                    id: tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
                }));
                
                navigate('/');
            } else {
                setError('Credenciales inválidas.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.data?.message || 'Error al iniciar sesión.');
        } finally {
            setIsLoading(false);
        }
    }

    const handlerRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
        const http = HttpClient();
        const response = await http.post('jugador', {
        nombre: form.nombre,
        apellidoPaterno: form.apellidoPaterno,
        apellidoMaterno: form.apellidoMaterno,
        posicion: form.posicion,
        pie: form.pie,
        dorsal: parseInt(form.dorsal),
        fechaNacimiento: form.fechaNacimiento
        });
        
        // Maneja tanto texto como JSON
        if (typeof response === 'string') {
        setSuccess(response); // Usa el texto directamente
        } else if (response.password) {
        setSuccess(`Jugador registrado. Password: ${response.password}`);
        } else {
        setSuccess('Jugador registrado exitosamente');
        }
        
        setIsRegistering(false);
        setForm({
        ...form,
        apellidoPaterno: '',
        apellidoMaterno: '',
        posicion: '',
        pie: '',
        dorsal: '',
        fechaNacimiento: ''
        });
    } catch (error) {
        console.error('Register error:', error);
        setError(error.message || 'Error al registrar jugador.');
    } finally {
        setIsLoading(false);
    }
    };

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
        setError('');
        setSuccess('');
    }

    return (
        <div className="login-container">
            <div className={`login-card ${isRegistering ? 'register-mode' : ''}`}>
                <div className="login-header">
                    <div className="logo">
                        <i className="fas fa-gamepad"></i>
                    </div>
                    <h2>{isRegistering ? 'Registro de Jugador' : 'Acceso al Sistema'}</h2>
                    <p>{isRegistering ? 'Completa tus datos para registrarte' : 'Ingresa tus credenciales para continuar'}</p>
                </div>

                {success && (
                    <div className="success-message">
                        <i className="fas fa-check-circle"></i>
                        {success}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={isRegistering ? handlerRegister : handlerLogin} className="login-form">
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Tu nombre de usuario"
                            onChange={handlerControl}
                            value={form.nombre}
                            required
                        />
                        <i className="fas fa-user input-icon"></i>
                    </div>

                    {!isRegistering && (
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                onChange={handlerControl}
                                value={form.password}
                                required
                            />
                            <i className="fas fa-lock input-icon"></i>
                        </div>
                    )}

                    {isRegistering && (
                        <>
                            <div className="form-group">
                                <label>Apellido Paterno</label>
                                <input
                                    type="text"
                                    name="apellidoPaterno"
                                    placeholder="Ej. Pérez"
                                    onChange={handlerControl}
                                    value={form.apellidoPaterno}
                                    required
                                />
                                <i className="fas fa-id-card input-icon"></i>
                            </div>

                            <div className="form-group">
                                <label>Apellido Materno</label>
                                <input
                                    type="text"
                                    name="apellidoMaterno"
                                    placeholder="Ej. Gómez"
                                    onChange={handlerControl}
                                    value={form.apellidoMaterno}
                                    required
                                />
                                <i className="fas fa-id-card input-icon"></i>
                            </div>

                            <div className="form-group">
                                <label>Posición</label>
                                <select
                                    name="posicion"
                                    onChange={handlerControl}
                                    value={form.posicion}
                                    required
                                >
                                    <option value="">Seleccione posición</option>
                                    <option value="Arquero">Portero</option>
                                    <option value="Defensa">Defensa</option>
                                    <option value="Lateral">Lateral</option>
                                    <option value="Mediocampista">Mediocampista</option>
                                    <option value="Extremo">Extremo</option>
                                    <option value="Delantero">Delantero</option>
                                </select>
                                <i className="fas fa-tshirt input-icon"></i>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Pie Dominante</label>
                                    <select
                                        name="pie"
                                        onChange={handlerControl}
                                        value={form.pie}
                                        required
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="Diestro">Diestro</option>
                                        <option value="Zurdo">Zurdo</option>
                                        <option value="Ambidiestro">Ambidiestro</option>
                                    </select>
                                    <i className="fas fa-shoe-prints input-icon"></i>
                                </div>

                                <div className="form-group">
                                    <label>Dorsal</label>
                                    <input
                                        type="number"
                                        name="dorsal"
                                        placeholder="Número"
                                        min="1"
                                        max="99"
                                        onChange={handlerControl}
                                        value={form.dorsal}
                                        required
                                    />
                                    <i className="fas fa-hashtag input-icon"></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Fecha de Nacimiento</label>
                                <input
                                    type="date"
                                    name="fechaNacimiento"
                                    onChange={handlerControl}
                                    value={form.fechaNacimiento}
                                    required
                                />
                                <i className="fas fa-birthday-cake input-icon"></i>
                            </div>
                        </>
                    )}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Procesando...
                            </>
                        ) : isRegistering ? (
                            <>
                                <i className="fas fa-user-plus"></i> Registrar
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                            </>
                        )}
                    </button>

                    <div className="toggle-mode">
                        <button 
                            type="button" 
                            className="toggle-btn"
                            onClick={toggleRegister}
                        >
                            {isRegistering ? 
                                '¿Ya tienes cuenta? Inicia sesión' : 
                                '¿Nuevo jugador? Regístrate aquí'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};