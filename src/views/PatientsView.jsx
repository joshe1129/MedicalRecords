import React, { useState, useEffect } from "react";
import { obtenerHistorias } from "../services/RecordsService";
import PatientCard from "../components/PatientCard";

const PatientsView = () => {
  // Estado para almacenar las historias clínicas de los pacientes
  const [historias, setHistorias] = useState([]);

  // Efecto para obtener las historias clínicas al montar el componente
  useEffect(() => {
    const getHistorias = async () => {
      try {
        const historiasObtenidas = await obtenerHistorias();
        setHistorias(historiasObtenidas);
      } catch (error) {
        // Manejo de errores en caso de falla en la obtención de datos
        alert("Ocurrió un error al obtener las historias clínicas");
        console.error(error);
      }
    };
    getHistorias();
  }, []); // Dependencia vacía para ejecutar solo al montar el componente

  return (
    <div className="container-fluid bg-light rounded-3 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Patients Directory</h2>
        <button
          type="button"
          className="btn btn-primary btn-sm"
        >
          + Add new Patient
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Mapeo de las historias clínicas para renderizar tarjetas de pacientes */}
        {historias.map((historia) => (
          <div key={historia.id} className="col">
            <PatientCard datos={historia} />            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsView;
