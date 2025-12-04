// components/header.jsx
import './header.css';

export default function Header({ conSidebar = true }) {
  return (
    <header className={conSidebar ? 'header sidebar-layout' : 'header full-layout'}>
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
