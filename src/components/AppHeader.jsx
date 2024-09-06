import React from "react";

const AppHeader = () => {
  return (
    <header className="navbar navbar-light bg-white">
      <div className="container-fluid">
        {/* Título de la aplicación */}
        <span className="navbar-brand mb-0 h1 fw-bold text-primary bg-light rounded px-3 py-2 shadow-sm">
          MediLab
        </span>

        {/* Información del usuario (médico) */}
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Dr. Kawasaki"
            className="rounded-circle"
            loading="lazy" // Optimización de carga diferida
          />
          <span className="me-2">Dr. Kawasaki</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
