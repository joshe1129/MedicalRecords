import React, { useState, useEffect } from "react";

const WeeklySchedule = ({ citas }) => {
  const [citasSemana, setCitasSemana] = useState([]);

  // Función para obtener la fecha de un día específico de la semana
  const getDayOfWeek = (offset) => {
    const hoy = new Date();
    const dia = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + offset));
    dia.setHours(0, 0, 0, 0); // Restablecer la hora
    return dia;
  };

  // Filtrar y ordenar citas dentro del rango de lunes a viernes
  const filterAndSortCitasByWeek = () => {
    const startOfWeek = getDayOfWeek(1); // Lunes
    const endOfWeek = getDayOfWeek(6); // Viernes

    // Filtrar citas que caen entre el lunes y el viernes
    const citasFiltradas = citas.filter((cita) => {
      const citaFecha = new Date(cita.citaProxima);
      return citaFecha >= startOfWeek && citaFecha <= endOfWeek;
    });

    // Ordenar las citas por fecha
    const citasOrdenadas = citasFiltradas.sort(
      (a, b) => new Date(a.citaProxima) - new Date(b.citaProxima)
    );

    setCitasSemana(citasOrdenadas); // Actualizar el estado
  };

  // Ejecutar el filtrado al montar el componente o cuando cambien las citas
  useEffect(() => {
    filterAndSortCitasByWeek();
  }, [citas]);

  // Días de la semana y horas
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const hoursOfDay = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

  // Agrupar citas por día y hora
  const citasPorHoraYDia = {};

  citasSemana.forEach((cita) => {
    const citaFecha = new Date(cita.citaProxima);
    const diaSemana = citaFecha.getDay(); // Obtener el día 
    const hora = citaFecha.getHours();

    if (hora >= 8 && hora <= 18) { // Solo horas laborales
      const key = `${daysOfWeek[diaSemana - 1]} ${hora}:00`;

      if (!citasPorHoraYDia[key]) {
        citasPorHoraYDia[key] = [];
      }
      citasPorHoraYDia[key].push(cita.nombrePaciente); // Agregar la cita
    }
  });

  return (
    <div className="container mt-3">
      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Day/Hour</th>
              {hoursOfDay.map((hour, index) => (
                <th key={index}>{hour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, rowIndex) => (
              <tr key={rowIndex}>
                <td className="fw-bold">{day}</td>
                {hoursOfDay.map((hour) => (
                  <td key={`${day}-${hour}`}>
                    {citasPorHoraYDia[`${day} ${hour}`]?.map(
                      (nombre, index) => (
                        <div key={index}>{nombre}</div>
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySchedule;
