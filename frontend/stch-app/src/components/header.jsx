import './header.css';

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <i className="fas fa-hospital"></i> STCH
      </div>
      <div className="header-right">
        <a href="#">¿Quiénes Somos?</a>
        <a href="#">Testimonios</a>
        <a href="#">Contacto</a>
      </div>
    </header>
  );
}
