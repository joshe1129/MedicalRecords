import React, { useState } from "react";

const PatientCard = (props) => {
  // Desestructuramos los datos que vienen desde los props
  const { datos } = props;

  // Estado que controla si el modal está visible o no
  const [show, setShow] = useState(false);

  // Función para mostrar el modal
  const handleShow = () => setShow(true);

  // Función para ocultar el modal
  const handleClose = () => setShow(false);

  return (
    <>
      {/* Componente de tarjeta del paciente */}
      <div className="card text-center">
        {/* Imagen del paciente */}
        <img
          src={datos.imagenPaciente} // URL de la imagen del paciente
          className="card-img-top"
          alt="Imagen del paciente" // Texto alternativo para accesibilidad
          style={{ width: "100%", height: "200px", objectFit: "cover" }} // Ajusta la imagen para que cubra toda la tarjeta
        />
        <div className="card-body">
          {/* Nombre del paciente */}
          <h5 className="card-title">{datos.nombrePaciente}</h5>

          {/* DNI del paciente */}
          <p className="card-text">DNI: {datos.DNI}</p>

          {/* Botones de acción debajo del nombre y DNI */}
          <div className="d-flex justify-content-center">
            {/* Botón para ver detalles (abre el modal) */}
            <button className="btn btn-info btn-sm me-2" onClick={handleShow}>
              <i className="fa-solid fa-eye"></i> {/* Icono del ojo */}
            </button>

            {/* Botón para editar (aquí puedes agregar la funcionalidad de edición en el futuro) */}
            <button className="btn btn-warning btn-sm me-2">
              <i className="fa-solid fa-pen-to-square"></i>{" "}
              {/* Icono del lápiz */}
            </button>

            {/* Botón para eliminar (aquí puedes agregar la funcionalidad de eliminación en el futuro) */}
            <button className="btn btn-danger btn-sm">
              <i className="fa-solid fa-trash"></i> {/* Icono de la papelera */}
            </button>
          </div>
        </div>
      </div>

      {/* Modal que aparece al hacer clic en el botón de "ver detalles" */}
      {show && (
        <div
          className="modal fade show" // Clases de Bootstrap para el modal
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Mostrar el modal y oscurecer el fondo
          role="dialog" // Define el rol como diálogo modal
          aria-labelledby="patientModalLabel" // Relaciona el modal con el título accesible
          aria-hidden="true" // Indica si el modal está oculto
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {/* Header del modal con título y botón para cerrar */}
              <div className="modal-header">
                <h5 className="modal-title" id="patientModalLabel">
                  Detalles de {datos.nombrePaciente}{" "}
                  {/* Nombre dinámico del paciente */}
                </h5>
              </div>

              {/* Cuerpo del modal donde mostramos los detalles del paciente */}
              <div className="modal-body">
                {/* Imagen del paciente centrada */}
                <div className="text-center mb-4">
                  <img
                    src={datos.imagenPaciente} // Imagen del paciente
                    alt={`Foto de ${datos.nombrePaciente}`} // Texto alternativo accesible
                    className="img-fluid rounded" // Imagen fluida y redondeada
                    style={{ maxWidth: "200px", height: "auto" }} // Limita el tamaño máximo de la imagen
                  />
                </div>

                {/* Detalles adicionales del paciente */}
                <p>
                  <strong>Sexo:</strong> {datos.Sexo}
                </p>
                <p>
                  <strong>Celular:</strong> {datos.celular}
                </p>
                <p>
                  <strong>Fecha de Nacimiento:</strong>{" "}
                  {new Intl.DateTimeFormat("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(datos.fechaNacimiento))}
                </p>
                <p>
                  <strong>Diagnósticos:</strong> {datos.diagnosticos}
                </p>
                <p>
                  <strong>Tratamiento:</strong> {datos.tratamiento}
                </p>
              </div>

              {/* Footer del modal con botón para cerrar */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose} // Cierra el modal al hacer clic
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientCard;
