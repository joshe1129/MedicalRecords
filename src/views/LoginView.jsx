import React, { useState } from 'react';

const LoginView = ({ setIsAuthenticated }) => {
  // Estados locales para manejar los campos de entrada
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el envío del formulario
  const handleLogin = (e) => {
    e.preventDefault();

    // Lógica de autenticación simple (esto es solo un ejemplo)
    if (username === "user" && password === "pass") {
      setIsAuthenticated(true); // Cambia el estado de autenticación
    } else {
      alert("Invalid credentials"); // Mensaje de error en caso de credenciales incorrectas
    }
  };

  return (
    <div 
      className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center" 
      style={{ backgroundColor: '#f0f8ff' }} // Fondo claro para el inicio de sesión
    >
      <div className="row w-100">
        <div 
          className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 p-4 bg-light rounded shadow"
        >
          {/* Título y subtítulo centrados */}
          <h1 className="text-center mb-4" style={{ color: '#008080' }}>MediFiles</h1>
          <h4 className="text-center text-muted">Medical Data Manager</h4>
          <p className="text-center mb-4" style={{ color: '#006666' }}>
            Log in to manage patient files
          </p>
          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Botón de envío del formulario */}
            <button type="submit" className="btn btn-primary w-100">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
