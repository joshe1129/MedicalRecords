import React from "react";

const NewAppointmentModal = ({ historia, manejarInputs, manejarNewData, isOpen, onClose }) => {
  const { nombrePaciente, diagnosticoPrincipal, citaProxima, nota, tipohistoria } = historia;

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`} // Controla la visibilidad del modal con clases Bootstrap
      style={{ display: isOpen ? "block" : "none" }} // Controla la visibilidad en estilo inline
      role="dialog"
      aria-labelledby="newAppointmentModalLabel"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newAppointmentModalLabel">New Appointment</h5>
          </div>
          <div className="modal-body">
            {/* Formulario para crear una nueva cita */}
            <form onSubmit={manejarNewData}>
              
              {/* Campo para el nombre del paciente */}
              <div className="form-group">
                <label htmlFor="nombrePaciente" className="col-form-label">Patient Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombrePaciente"
                  name="nombrePaciente"
                  value={nombrePaciente}
                  onChange={manejarInputs}
                  required
                />
              </div>

              {/* Campo para el diagnóstico principal */}
              <div className="form-group">
                <label htmlFor="diagnosticoPrincipal" className="col-form-label">Diagnostico Principal:</label>
                <input
                  type="text"
                  className="form-control"
                  id="diagnosticoPrincipal"
                  name="diagnosticoPrincipal"
                  value={diagnosticoPrincipal}
                  onChange={manejarInputs}
                  required
                />
              </div>

              {/* Campo para la próxima cita */}
              <div className="form-group">
                <label htmlFor="citaProxima" className="col-form-label">Next Appointment (Date and Time):</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="citaProxima"
                  name="citaProxima"
                  value={citaProxima}
                  onChange={manejarInputs}
                  required
                />
              </div>

              {/* Campo para las notas adicionales */}
              <div className="form-group">
                <label htmlFor="nota" className="col-form-label">Notes:</label>
                <textarea
                  className="form-control"
                  id="nota"
                  name="nota"
                  value={nota}
                  onChange={manejarInputs}
                  required
                />
              </div>

              {/* Campo para seleccionar el tipo de historia/cita */}
              <div className="form-group">
                <label htmlFor="tipohistoria" className="col-form-label">Type:</label>
                <select
                  className="form-control"
                  id="tipohistoria"
                  name="tipohistoria"
                  value={tipohistoria}
                  onChange={manejarInputs}
                  required
                >
                  <option value="Procedimiento">Procedimiento</option>
                  <option value="Control">Control</option>
                  <option value="Consulta">Consulta</option>
                </select>
              </div>

              {/* Botones de acción: cerrar el modal y guardar la cita */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-primary">Save Appointment</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentModal;
