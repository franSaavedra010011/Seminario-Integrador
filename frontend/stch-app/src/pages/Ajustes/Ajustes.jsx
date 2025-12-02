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
    <div className="ajustes-container">
      <div className="ajustes-card">
        <h1>Ajustes del Usuario</h1>
        <hr />

        <form onSubmit={handleGuardar} className='ajustes-form'>
          <fieldset className="ajustes-fieldset">
            <legend>Información Personal</legend>
            <div className="ajustes-field-group">
              <div className="ajustes-campo">
                <label><strong>Nombre:</strong></label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
              </div>

              <div className="ajustes-campo">
                <label><strong>Apellido:</strong></label>
                <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
              </div>
            </div>

            <div className="ajustes-field-group">
              <div className="ajustes-campo">
                <label><strong>Usuario:</strong></label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </div>

              <div className="ajustes-campo">
                <label><strong>Email:</strong></label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className="ajustes-fieldset">
            <legend>Seguridad</legend>
            <div className="ajustes-field-group">
              <div className="ajustes-campo password-field">
                <label><strong>Nueva contraseña:</strong></label>
                <input
                  type="password"
                  placeholder="Dejar en blanco si no cambia"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="ajustes-campo password-field">
                <label><strong>Confirmar nueva contraseña:</strong></label>
                <input
                  type="password"
                  placeholder="Repetir contraseña"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <button type="submit" className="ajustes-guardar-btn">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}
