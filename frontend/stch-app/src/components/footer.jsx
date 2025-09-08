import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className='parrafo'>&copy; {new Date().getFullYear()} Sistema de Turnos Hospitalarios. Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="#">Términos</a>
        <span>·</span>
        <a href="#">Privacidad</a>
        <span>·</span>
        <a href="#">Soporte</a>
      </div>
    </footer>
  );
}
