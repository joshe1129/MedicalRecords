import React, { useState, useEffect } from "react";

const UpcomingAppointments = ({ citas }) => {
  const [citasProximas, setCitasProximas] = useState([]);

  useEffect(() => {
    // Ordenar las citas por fecha sin mutar el prop original
    const citasOrdenadas = [...citas].sort((a, b) => {
      const fechaA = new Date(a.citaProxima);
      const fechaB = new Date(b.citaProxima);
      return fechaA - fechaB;
    });

    // Obtener la fecha actual
    const hoy = new Date();

    // Filtrar citas posteriores a hoy
    const citasPosteriores = citasOrdenadas.filter(
      (cita) => new Date(cita.citaProxima) > hoy
    );

    // Tomar las primeras 5 citas
    const primerasCinco = citasPosteriores.slice(0, 5);
    setCitasProximas(primerasCinco); // Actualizar el estado con las citas próximas
  }, [citas]);

  return (
    <div className="container">
      <table className="table table-responsive table-sm table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Diagnóstico</th>
            <th>Próxima Cita (Fecha)</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {citasProximas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.nombrePaciente}</td>
              <td>{cita.diagnosticoPrincipal}</td>
              <td>
                {/* Formatear la fecha con toLocaleDateString para mostrar día y hora */}
                {new Date(cita.citaProxima).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </td>
              <td>{cita.nota || "Sin notas"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingAppointments;
