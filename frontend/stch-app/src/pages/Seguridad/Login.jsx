import './login.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUsuario } from '../../components/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUsuario();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // ✅ Mostrar toast solo una vez si expiró la sesión
  useEffect(() => {
    const expired = localStorage.getItem('sessionExpired');
      console.log('SE MOSTRO');
    if (expired) {
      console.log('SE MOSTRO2');
      toast.error('Su sesión expiró', { autoClose: false });
      localStorage.removeItem('sessionExpired');
    }
    console.log(expired);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVolver = () => {
    navigate('/');
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token recibido:', data.token);
        login(data.token);
        navigate('/home', { state: { loginSuccess: true } });
      } else {
        console.error('Error al iniciar sesión:', data);
        toast.error('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error de red:', err);
      toast.error('No se pudo conectar con el servidor');
    }
  };

  return (
    <div id="contenido-login">
      <section id="formularioLogin">
        <div id="botonesLogin">
          <h1 id="inicioLogin">Iniciar Sesión</h1>
        </div>
        <p><strong>¡Bienvenido de nuevo!</strong></p>
        <form id="datosLogin" onSubmit={handleLogin}>
          <h5 className="textdata">Email</h5>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Ingrese su Email"
            value={form.email}
            onChange={handleChange}
          />

          <h5 className="textdata">Contraseña</h5>
          <input
            type="password"
            name="password"
            id="contraseña"
            placeholder="Ingrese su contraseña"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" id="ingresar">Ingresar</button>
        </form>
      </section>
      <button id='volver' onClick={handleVolver}>Volver</button>
    </div>
  );
}
