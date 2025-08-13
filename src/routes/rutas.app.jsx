import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { LoginPage } from '../pages/Login';
import { ProtectedRoute } from './protected.route';

import { Perfil } from '../pages/perfil';
import { Estadisticas } from '../pages/Estadisticas';
import {RegistrarEstadistica} from '../pages/RegistrarEstadistica';
import {EditarEstadistica} from '../pages/EditarEstadistica';
import { DetalleEstadistica } from '../pages/DetalleEstadistica';



export const RutasApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/perfil' element={<Perfil />} />
                    <Route path='/estadisticas' element={< Estadisticas />} />
                    <Route path="/estadisticas/:id" element={<DetalleEstadistica />} />
                    <Route path='/registrar' element={< RegistrarEstadistica />} />
                    <Route path="/editar/:id" element={<EditarEstadistica />} />
                </Route>
            </Routes>    
        </BrowserRouter>
    );
    }

export default RutasApp;