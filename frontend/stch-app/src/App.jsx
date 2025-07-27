import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home_Page/Home';
import HistoriaMedica from './pages/HistoriaMedica/HistoriaMedica';
import Turnos from './pages/Turno/Turnos';
import NuevoTurno from './pages/Turno/NuevoTurno_Pasos';
import Reportes from './pages/Reportes/Reportes';
import Asistencia from './pages/AsistenciaPaciente/RegistrarAsistencia';
import AltaUsuario from './pages/AltaUsuario/AltaUsuario';
import HospitalTabla from './pages/ABM_Hospital/HospitalTabla';

import Login from './pages/Seguridad/Login';
import Register from './pages/Seguridad/Register';
import Welcome from './pages/Seguridad/Welcome';
import { ToastContainer } from 'react-toastify';
import SessionManager from './components/SessionManager'; // 👈 nuevo componente
import Ajustes from './pages/Ajustes/Ajustes';

import PrivateRoute from './components/PrivateRoute';
import CrearHospital from './pages/ABM_Hospital/CrearHospital';
import ModificarHospital from './pages/ABM_Hospital/ModificarHospital';
import RecomendacionPaciente from './pages/RecomendacionPaciente/GeneralRecomendacionPaciente';
import ConsultarCongestion from './pages/RecomendacionPaciente/ConsultarCongestion';

import ScrollToTop from './components/ScrollToTop';
import CompararHospitales from './pages/RecomendacionPaciente/CompararHospitales';
import ABMRoles from './pages/Rol/ABMRoles';
import Alta_Modificar from './pages/Rol/Alta_Modificar';
import Notificaciones from './pages/Notificaciones/Notificaciones';
import RecomendacionPorFiltro from './pages/RecomendacionPaciente/RecomendacionPorFiltro';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SessionManager /> {/* 👈 se monta dentro del Router */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Rutas con AuthLayout (sin sidebar/header) */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas con MainLayout (con sidebar/header) */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/home" element={<Home />} />
          <Route path="/historia" element={<HistoriaMedica />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/nuevo-turno" element={<NuevoTurno />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/asistencia" element={<Asistencia />} />
          <Route path="/altaUsuario" element={<AltaUsuario />} />
          <Route path="/hospitalTabla" element={<HospitalTabla />} />
          <Route path="/crearHospital" element={<CrearHospital />} />
          <Route path="/modificarHospital" element={<ModificarHospital />} />
          <Route path="/recomendacionPaciente" element={<RecomendacionPaciente />} />
          <Route path="/consultarCongestion" element={< ConsultarCongestion/>} />
          <Route path="/compararHospitales" element={< CompararHospitales/>} />
          <Route path="/abmRoles" element={< ABMRoles/>} />
          <Route path="/alta_Modificar" element={< Alta_Modificar/>} />
          <Route path="/notificaciones" element={< Notificaciones/>} />
          <Route path="/recomendacionPorFiltro" element={< RecomendacionPorFiltro/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
