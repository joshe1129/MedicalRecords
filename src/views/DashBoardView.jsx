import { useState, useEffect } from "react";
import { obtenerHistorias } from "../services/RecordsService";
import Widget from "../components/Widget";
import WeeklySchedule from "../components/WeeklySchedule";
import UpcomingAppointments from "../components/UpcomingAppointsments";

const DashBoardView = () => {
  const [historiasClinicas, setHistoriasClinicas] = useState([]); // Estado para almacenar las historias clínicas
  const [infoWidgets, setInfoWidgets] = useState([]); // Estado para almacenar la información mostrada en los widgets

  // Función para obtener la fecha de hoy 
  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  };

  // useEffect para obtener las historias clínicas al montar el componente
  useEffect(() => {
    const getHistoriasClinicas = async () => {
      try {
        const historiasClinicasObtenidas = await obtenerHistorias(); // Llamada a la API para obtener las historias clínicas
        setHistoriasClinicas(historiasClinicasObtenidas);
      } catch (error) {
        alert("Ocurrió un error al obtener las historias clínicas");
        console.error("Error al obtener historias clínicas:", error);
      }
    };

    getHistoriasClinicas();
  }, []); // Se ejecuta una sola vez al montar el componente

  // useEffect para actualizar los widgets en función de las historias clínicas obtenidas
  useEffect(() => {
    const todayDate = getTodayDate();

    let citasDelDiaCount = 0;
    let procedimientosDelDiaCount = 0;

    // Filtrar citas que ocurren hoy y contar citas y procedimientos
    historiasClinicas.forEach((cita) => {
      const citaDate = new Date(cita.citaProxima);
      const isToday = citaDate.toISOString().slice(0, 10) === todayDate.slice(0, 10);
      
      if (isToday) {
        citasDelDiaCount++; // Contador de citas del día
        if (cita.tipoCita === "Procedimiento") {
          procedimientosDelDiaCount++; // Contador de procedimientos del día
        }
      }
    });

    // Actualizar el estado de los widgets con la información calculada
    setInfoWidgets([
      {
        icono: "fa-solid fa-people-group",
        texto: "Pacientes",
        numero: historiasClinicas.length, // Total de historias clínicas
        color: "#C1DEFE",
      },
      {
        icono: "fa-solid fa-calendar-check",
        texto: "Citas",
        numero: citasDelDiaCount, // Total de citas del día
        color: "#FCF4D7",
      },
      {
        icono: "fa-solid fa-bed-pulse",
        texto: "Procedimientos",
        numero: procedimientosDelDiaCount, // Total de procedimientos del día
        color: "#EFE0FD",
      },
    ]);
  }, [historiasClinicas]); // Se ejecuta cuando cambian las historias clínicas

  return (
    <div className="container-fluid bg-light rounded-1">
      <h5 className="py-1 fw-bold">Resumen diario</h5>
      <div className="row">
        {infoWidgets.map((caja, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <Widget
              color={caja.color}
              texto={caja.texto}
              numero={caja.numero}
              icono={caja.icono}
            />
          </div>
        ))}
      </div>

      <h5 className="py-1 fw-bold">Programación semanal</h5>
      <div className="card shadow-sm">
        {/* Componente de programación semanal */}
        <WeeklySchedule citas={historiasClinicas} />
      </div>

      <h5 className="py-1 fw-bold">Citas próximas</h5>
      <div className="card shadow-sm">
        {/* Componente de citas próximas */}
        <UpcomingAppointments citas={historiasClinicas} />
      </div>
    </div>
  );
};

export default DashBoardView;
