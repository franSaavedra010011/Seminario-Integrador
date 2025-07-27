// SessionManager.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem('sessionExpired', 'true');
        localStorage.removeItem('token');
        navigate('/login');
      }, 15 * 60 * 1000); // 15 minutos
    };

    ['click', 'mousemove', 'keydown'].forEach((evt) =>
      window.addEventListener(evt, resetTimer)
    );

    resetTimer();

    return () => {
      ['click', 'mousemove', 'keydown'].forEach((evt) =>
        window.removeEventListener(evt, resetTimer)
      );
      clearTimeout(timer);
    };
  }, []);

  return null; // este componente no renderiza nada
};

export default SessionManager;
