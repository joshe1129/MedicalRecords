import estilos from "./styles/Widget.module.css";

const Widget = (props) => {
  const { color, icono, texto, numero } = props;

  return (
    <div
      className={`d-flex align-items-center justify-content-center border rounded p-1 gap-3 ${estilos["card-widget"]}`}
      style={{ flex: "1 1 auto", minWidth: "150px" }} // Ajusta el ancho mínimo según sea necesario
    >
      {/* Icono a la izquierda */}
      <i
        className={`${icono} ${estilos["icono-widget"]}`}
        style={{
          color: color,
        }}
      ></i>

      {/* Contenedor para número y texto */}
      <div className="d-flex flex-column">
        <span className={estilos["numero-widget"]}>{numero}</span>
        <span className={estilos["texto-widget"]}>{texto}</span>
      </div>
    </div>
  );
};

export default Widget;
