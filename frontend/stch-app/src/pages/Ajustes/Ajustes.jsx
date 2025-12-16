import { useState } from 'react';
import './Ajustes.css';
import '../../App.css';

export default function Ajustes() {
  const [nombre, setNombre] = useState('Juan');
  const [apellido, setApellido] = useState('Pérez');
  const [username, setUsername] = useState('jperez');
  const [email, setEmail] = useState('juan@email.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // Preparar los datos para enviar
      const updateData = {
        usernameUsuario: username,
        emailUsuario: email,
      };

      // Solo agregar la contraseña si se ha ingresado
      if (password.trim()) {
        updateData.passwordUsuario = password;
      }

      // TODO: Obtener el ID del usuario autenticado desde el contexto/localStorage
      const userId = 1; // Placeholder - esto debería venir del contexto de autenticación

      const response = await fetch(`http://localhost:3000/usuario/modificar/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // TODO: Agregar token de autenticación
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar usuario');
      }

      const result = await response.json();
      console.log('Usuario actualizado:', result);

      alert('Cambios guardados correctamente.');

      // Limpiar campos de contraseña
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al guardar los cambios: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="patient-card">
        <div className="header-principal-card">
          <h1>Ajustes del Usuario</h1>
          <p>Configure y personalice su información de usuario y preferencias de seguridad</p>
        </div>
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

          <button type="submit" className="ajustes-guardar-btn" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
