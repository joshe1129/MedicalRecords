import { Link, useLocation } from "react-router-dom";

const Navigation = ({ setIsAuthenticated }) => {
  const location = useLocation(); // Hook para obtener la ubicación actual

  const handleLogout = (e) => {
    e.preventDefault();
    if (setIsAuthenticated) setIsAuthenticated(false);
  };

  return (
    <nav className="d-flex flex-column gap-2 pe-3 fw-bold">
      {/* Enlace al Dashboard */}
      <Link
        to="/"
        className={`d-flex align-items-center p-2 text-decoration-none rounded ${
          location.pathname === "/DashBoardView"
            ? "bg-primary text-white"
            : "text-muted"
        }`}
      >
        <i className="fa-solid fa-house fa-lg me-2"></i>
        Dashboard
      </Link>

      {/* Enlace al Calendario */}
      <Link
        to="/CalendarView"
        className={`d-flex align-items-center p-2 text-decoration-none rounded ${
          location.pathname === "/CalendarView"
            ? "bg-primary text-white"
            : "text-muted"
        }`}
      >
        <i className="fa-solid fa-calendar-alt fa-lg me-2"></i>
        Calendar
      </Link>

      {/* Enlace a los Pacientes */}
      <Link
        to="/PatientsView"
        className={`d-flex align-items-center p-2 text-decoration-none rounded ${
          location.pathname === "/PatientsView"
            ? "bg-primary text-white"
            : "text-muted"
        }`}
      >
        <i className="fa-solid fa-users fa-lg me-2"></i>
        Patients
      </Link>

      {/* Opciones futuras */}
      <div className="mt-auto">
        <Link
          to="/settings"
          className="d-flex align-items-center p-2 text-decoration-none text-muted"
        >
          <i className="fa-solid fa-cog fa-lg me-2"></i>
          Settings
        </Link>
        <Link
          to="/help"
          className="d-flex align-items-center p-2 text-decoration-none text-muted"
        >
          <i className="fa-solid fa-circle-question fa-lg me-2"></i>
          Help Center
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="d-flex align-items-center p-2 text-decoration-none text-muted bg-transparent border-0"
        >
          <i className="fa-solid fa-sign-out-alt fa-lg me-2"></i>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
