import { useState } from 'react';
import './Ajustes.css';
import '../../App.css';

export default function Ajustes() {
  // Campos de solo lectura (deberían cargarse desde el contexto/API)
  const nombre = 'Juan';
  const apellido = 'Pérez';
  const username = 'jperez';
  const email = 'juan@email.com';

  // Solo los campos de contraseña son editables
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePasswords = (newPassword, confirmPass) => {
    if (confirmPass && newPassword !== confirmPass) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirm = e.target.value;
    setConfirmPassword(newConfirm);
    validatePasswords(password, newConfirm);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    // Validar que si se ingresó contraseña, ambas coincidan
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }
    }

    // Si no hay contraseña, no hay nada que actualizar
    if (!password.trim()) {
      alert('No hay cambios para guardar. Ingrese una nueva contraseña si desea cambiarla.');
      return;
    }

    setLoading(true);

    try {
      // Solo enviar la contraseña para actualización
      const updateData = {
        passwordUsuario: password
      };

      // TODO: Obtener el ID del usuario autenticado desde el contexto/localStorage
      const userId = 1; // Placeholder - esto debería venir del contexto de autenticación

      const response = await fetch(`http://localhost:3000/abm/usuario/modificar/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar contraseña');
      }

      const result = await response.json();
      console.log('Contraseña actualizada:', result);

      alert('Contraseña actualizada correctamente.');

      // Limpiar campos de contraseña
      setPassword('');
      setConfirmPassword('');
      setPasswordError('');

    } catch (error) {
      console.error('Error al guardar cambios:', error);
      alert('Error al actualizar la contraseña: ' + error.message);
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
            <legend>Información Personal (Solo lectura)</legend>
            <p className="info-readonly">
              <i className="fas fa-info-circle"></i>
              Los datos de identidad no pueden modificarse desde este formulario.
              Para cambios, contacte con el administrador del sistema.
            </p>

            <div className="ajustes-field-group">
              <div className="ajustes-campo">
                <label><strong>Nombre:</strong></label>
                <input
                  type="text"
                  value={nombre}
                  readOnly
                  title="Campo de solo lectura"
                />
              </div>

              <div className="ajustes-campo">
                <label><strong>Apellido:</strong></label>
                <input
                  type="text"
                  value={apellido}
                  readOnly
                  title="Campo de solo lectura"
                />
              </div>
            </div>

            <div className="ajustes-field-group">
              <div className="ajustes-campo">
                <label><strong>Usuario:</strong></label>
                <input
                  type="text"
                  value={username}
                  readOnly
                  title="Campo de solo lectura"
                />
              </div>

              <div className="ajustes-campo">
                <label><strong>Email:</strong></label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  title="Para cambiar su correo, contacte con administración"
                />
                <small className="email-note">
                  <i className="fas fa-lock"></i> Para modificar su email, contacte con administración
                </small>
              </div>
            </div>
          </fieldset>

          <fieldset className="ajustes-fieldset">
            <legend>Seguridad</legend>
            <p className="info-security">
              <i className="fas fa-shield-alt"></i>
              Solo puede modificar su contraseña desde esta sección.
            </p>

            <div className="ajustes-field-group">
              <div className="ajustes-campo password-field">
                <label><strong>Nueva contraseña:</strong></label>
                <div className="password-input-container">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Dejar en blanco si no desea cambiar"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <i className={mostrarPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
                <small className="password-hint">Mínimo 6 caracteres</small>
              </div>

              <div className="ajustes-campo password-field">
                <label><strong>Confirmar nueva contraseña:</strong></label>
                <div className="password-input-container">
                  <input
                    type={mostrarConfirmPassword ? "text" : "password"}
                    placeholder="Repetir contraseña"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    style={{
                      borderColor: passwordError ? '#dc3545' : (confirmPassword && !passwordError && password) ? '#28a745' : '#ccd2e0'
                    }}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                    aria-label={mostrarConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <i className={mostrarConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
                {passwordError && (
                  <div className="password-error">
                    <i className="fas fa-exclamation-triangle"></i>
                    {passwordError}
                  </div>
                )}
                {confirmPassword && !passwordError && password && (
                  <div className="password-success">
                    <i className="fas fa-check-circle"></i>
                    Las contraseñas coinciden
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          <div className="ajustes-actions">
            <button
              type="submit"
              className="ajustes-guardar-btn"
              disabled={loading || !password || passwordError}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Actualizando...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> Actualizar Contraseña
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}