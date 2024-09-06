import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginView from "./views/LoginView";
import Navigation from "./components/Navigation";
import DashBoardView from "./views/DashBoardView";
import CalendarView from "./views/CalendarView";
import PatientsView from "./views/PatientsView";
import AppHeader from "./components/AppHeader";

const App = () => {
  // Estado para controlar si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Renderizar vista de inicio de sesión si no está autenticado
  if (!isAuthenticated) {
    return <LoginView setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <BrowserRouter>
      {/* Contenedor principal que se expande para llenar la pantalla */}
      <div className="container-fluid vh-100 d-flex flex-column">
        <AppHeader />
        <div className="d-flex flex-grow-1">
          {/* Barra lateral de navegación */}
          <aside className="col-md-3 col-lg-2 bg-white p-0">
            <Navigation setIsAuthenticated={setIsAuthenticated} />
          </aside>
          {/* Contenido principal de la aplicación */}
          <main className="col-md-9 col-lg-10">
            <Routes>
              {/* Redirige a la vista del panel de control por defecto */}
              <Route path="/" element={<Navigate to="/DashBoardView" />} />
              <Route path="/DashBoardView" element={<DashBoardView />} />
              <Route path="/CalendarView" element={<CalendarView />} />
              <Route path="/PatientsView" element={<PatientsView />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
