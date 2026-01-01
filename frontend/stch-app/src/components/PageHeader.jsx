import './PageHeader.css';

export default function PageHeader({ titulo, subtitulo, boton }) {
  return (
    <div className="page-header-card">
      <div className="page-header-content">
        <h1 className="page-header-titulo">{titulo}</h1>
        <p className="page-header-subtitulo">{subtitulo}</p>
      </div>
      {boton && (
        <button 
          className="page-header-btn"
          onClick={boton.onClick}
        >
          {boton.icono && <span className="btn-icono">{boton.icono}</span>}
          {boton.texto}
        </button>
      )}
    </div>
  );
}
