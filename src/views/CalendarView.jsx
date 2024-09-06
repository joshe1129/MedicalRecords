import { useState, useEffect } from "react";
import { obtenerHistorias, crearHistoria } from "../services/RecordsService";
import NewAppointmentModal from "../components/NewAppointmentModal";

// FormatDate fuera del componente para evitar su recreación en cada render
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
};

const CalendarView = () => {
  const [historiasClinicas, setHistoriasClinicas] = useState([]); // Estado para almacenar las historias clínicas
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
  const [nuevaHistoria, setNuevaHistoria] = useState({
    nombrePaciente: "",
    fechaNacimiento: "",
    diagnosticoPrincipal: "",
    tratamiento: "",
    Sexo: "",
    Edad: "",
    DNI: "",
    direccion: "",
    celular: "",
    prescripciones: "",
    tipoSangre: "",
    peso: "",
    altura: "",
    diagnosticos: "",
    citaProxima: "",
    ultimaCita: "",
    tipoCita: "",
    nota: "",
  });

  // Carga las historias clínicas al montar el componente
  useEffect(() => {
    const getHistoriasClinicas = async () => {
      try {
        const historiasClinicasObtenidas = await obtenerHistorias();
        // Ordenar las historias por la fecha de la próxima cita
        const historiasOrdenadas = [...historiasClinicasObtenidas].sort(
          (a, b) => new Date(a.citaProxima) - new Date(b.citaProxima)
        );
        setHistoriasClinicas(historiasOrdenadas);
      } catch (error) {
        alert("Ocurrió un error al obtener las historias clínicas");
        console.error("Error al obtener historias clínicas:", error);
      }
    };
    getHistoriasClinicas();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Maneja la actualización de los inputs del formulario
  const manejarInputs = (e) => {
    const { name, value } = e.target;
    setNuevaHistoria((prevHistoria) => ({
      ...prevHistoria,
      [name]: value,
    }));
  };

  // Envía los datos de la nueva historia clínica
  const manejarNewData = async (e) => {
    e.preventDefault();
    try {
      const nuevaHistoriaCreada = await crearHistoria(nuevaHistoria);
      alert("Cita creada!");

      // Agrega la nueva historia y actualiza la lista
      const citasActualizadas = [...historiasClinicas, nuevaHistoriaCreada].sort(
        (a, b) => new Date(a.citaProxima) - new Date(b.citaProxima)
      );
      setHistoriasClinicas(citasActualizadas);
    } catch (error) {
      alert("Error al crear la cita. Verifica los datos ingresados.");
      console.error("Error creando la cita:", error);
    } finally {
      setIsModalOpen(false); // Cierra el modal tras la creación
    }
  };

  return (
    <div className="container-fluid bg-light rounded-1">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Appointments</h2>
        <button
          type="button"
          className="btn btn-primary btn-sm ms-auto"
          onClick={() => setIsModalOpen(true)}
        >
          + New appointment
        </button>
      </div>

      {/* Contenedor con desplazamiento para listas largas */}
      <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Code</th>
              <th>Nombre</th>
              <th>Fecha/Hora</th>
              <th>Notas</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {historiasClinicas.map(({ id, nombrePaciente, citaProxima, nota }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{nombrePaciente}</td>
                <td>{formatDate(citaProxima)}</td>
                <td>{nota}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button className="btn btn-warning btn-sm me-2">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para crear nueva cita */}
      <NewAppointmentModal
        historia={nuevaHistoria}
        manejarInputs={manejarInputs}
        manejarNewData={manejarNewData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CalendarView;
