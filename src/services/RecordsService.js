import axios from "axios";

// URL base de la API MockAPI
const URL = "https://66cde23c8ca9aa6c8ccc0d6c.mockapi.io";

// Función para obtener las historias clínicas
const obtenerHistorias = async () => {
  try {
    // Hacemos la solicitud GET a MockAPI para obtener las historias clínicas
    const respuesta = await axios.get(`${URL}/historias_clinicas`);
    //console.log("get axios", respuesta);

    // Verificamos si la respuesta es exitosa
    if (respuesta.status === 200) {
      return respuesta.data; // Devolvemos los datos obtenidos
    }
    // Si la respuesta no es exitosa, lanzamos un error
    throw new Error("Error al obtener historias");
  } catch (error) {
    // Capturamos cualquier error ocurrido durante la solicitud
    throw error;
  }
};

const crearHistoria= async (historia) => {
  try {
    const respuesta = await axios.post(`${URL}/historias_clinicas`, historia);
    //console.log("post axios", respuesta);
    return respuesta.data;
  } catch (error) {
    throw error;
  }
};

export { obtenerHistorias, crearHistoria }; // Exportamos la función para usarla en otros componentes
