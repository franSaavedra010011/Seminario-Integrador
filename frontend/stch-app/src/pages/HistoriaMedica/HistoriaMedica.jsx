import './HistoriaMedica.css';
export default function HistoriaMedica() {
  return (
    <div id="content">
      <div className="patient-card">
        <h1>Historia Clínica</h1>
        <hr />
        <section className="bloque-Register">
          <h4>Datos Personales</h4>
          <hr />
          <p>
            <strong>Nombre y Apellido:</strong>
          </p>
          <p>
            <strong>DNI/CUIT/CUIL:</strong>
          </p>
          <p>
            <strong>Familiares a cargo:</strong>
          </p>
          <p>
            <strong>Edad:</strong>
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>
          </p>
          <p>
            <strong>Celular/Mail:</strong>
          </p>
          <p>
            <strong>Grupo Sanguíneo:</strong>
          </p>
        </section>

        <section className="bloque">
          <h4>Últimos problemas en curso</h4>
          <hr />
        </section>

        <section className="bloque">
          <h4>Antecedentes Heredofamiliares</h4>
          <hr />
        </section>

        <section className="bloque">
          <h4>Hábitos</h4>
          <hr />
        </section>

        <section className="bloque">
          <h4>Alergias</h4>
          <hr />
        </section>

        <section className="bloque">
          <h4>Vacunas</h4>
          <hr />
        </section>
      </div>
    </div>
  );
}
