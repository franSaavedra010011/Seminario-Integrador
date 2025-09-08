import React from 'react';
import { useNavigate } from 'react-router-dom';
import icono from '../../assets/icono.png';
import './Welcome.css';
export default function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="app-container">
      <h1>
        ¡Te damos la bienvenida al Sistema Centralizado de Turnos de Hospitales!
      </h1>
      <div id="formulario">
        <form>
          <h2>
            Obtén tu turno de manera rápida. Para ello, debes registrarte o
            iniciar sesión.
          </h2>
          <button type="button" id="inicio" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <button type="button" id="registrar" onClick={handleRegister}>
            Registrarse
          </button>
        </form>
        <img src={icono} alt="Imagen de onda" id="turno" />
      </div>
    </div>
  );
}
