const rutaBase = import.meta.env.VITE_AUTH_API;

export const HttpClient = () => {
    const defaultHttpOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', 
    };

    try {
        const usuarioString = sessionStorage.getItem('jugador');
        if (usuarioString) {
            const jugador = JSON.parse(usuarioString);
            if (jugador?.token) {
                defaultHttpOptions.headers.Authorization = `Bearer ${jugador.token}`;
            }
        }
    } catch (error) {
        console.error("Error parsing user token from sessionStorage:", error);
    }

    const parseTokenData = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text().catch(() => ({})); // Primero intenta como texto
        try {
        // Si puede parsear como JSON, usa eso
        const jsonData = JSON.parse(errorData);
        const error = new Error('HTTP error');
        error.status = response.status;
        error.data = jsonData;
        throw error;
        } catch {
        // Si no es JSON, usa el texto plano
        const error = new Error(errorData || 'HTTP error');
        error.status = response.status;
        error.data = { message: errorData };
        throw error;
        }
    }
    
    // Manejo de respuesta exitosa
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text(); // Si no es JSON, devuelve el texto plano
    };

    const handleError = (error) => {
        console.error("HTTP error:", error);
        throw error;
    };

    const get = (url, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'GET',
        };
        return fetch(`${rutaBase}${url}`, options)
            .then(handleResponse)
            .catch(handleError);
    };

    const post = (url, payload, httpOptions = {}) => {
        const options = {
            ...defaultHttpOptions,
            ...httpOptions,
            method: 'POST',
            body: JSON.stringify(payload),
        };
        return fetch(`${rutaBase}${url}`, options)
            .then(handleResponse)
            .catch(handleError);
    };
    const put = (url, payload, httpOptions = {}) => {
    const options = {
        ...defaultHttpOptions,
        ...httpOptions,
        method: 'PUT',
        body: JSON.stringify(payload),
    };
    return fetch(`${rutaBase}${url}`, options)
        .then(handleResponse)
        .catch(handleError);
    };
    const del = (url, httpOptions = {}) => {
    const options = {
        ...defaultHttpOptions,
        ...httpOptions,
        method: 'DELETE',
    };
    return fetch(`${rutaBase}${url}`, options)
        .then(handleResponse)
        .catch(handleError);
    };


    return {
        get,
        post,
        put, // <-- Agrega esta línea
        del,
        parseTokenData,
    };
};