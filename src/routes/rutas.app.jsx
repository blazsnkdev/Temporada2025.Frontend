import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { LoginPage } from '../pages/Login';
import { ProtectedRoute } from './protected.route';

import { Perfil } from '../pages/perfil';
import { Estadisticas } from '../pages/Estadisticas';




export const RutasApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/perfil' element={<Perfil />} />
                    <Route path='/estadisticas' element={< Estadisticas />} />
                </Route>
            </Routes>    
        </BrowserRouter>
    );
    }

export default RutasApp;