import { useState } from 'react';
import './Ajustes.css';

export default function Ajustes() {
  const [nombre, setNombre] = useState('Juan');
  const [apellido, setApellido] = useState('Pérez');
  const [username, setUsername] = useState('jperez');
  const [email, setEmail] = useState('juan@email.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGuardar = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('Cambios guardados correctamente.');
    // Aquí iría la lógica real para enviar los cambios al backend
  };

  return (
    <div className="patient-card">
      <h1>Ajustes del Usuario</h1>
      <hr />

      <form onSubmit={handleGuardar}>
        <div className="bloque">
          <p><strong>Nombre:</strong></p>
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>

        <div className="bloque">
          <p><strong>Apellido:</strong></p>
          <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
        </div>

        <div className="bloque">
          <p><strong>Usuario:</strong></p>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className="bloque">
          <p><strong>Email:</strong></p>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="bloque">
          <p><strong>Nueva contraseña:</strong></p>
          <input
            type="password"
            placeholder="Dejar en blanco si no cambia"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="bloque">
          <p><strong>Confirmar nueva contraseña:</strong></p>
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="guardar-btn">Guardar Cambios</button>
      </form>
    </div>
  );
}
