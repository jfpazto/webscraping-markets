import axios from "axios";

// Cuando tengas el backend disponible, cambia esta URL
const API_URL = "http://<tu-ip-o-alb-aws>:8000";

export const obtenerProductos = async (tienda) => {
  // Por ahora no hacemos llamada real
  console.log(`Preparado para consultar productos de: ${tienda}`);
  
  // Retorna vacío hasta conectar
  return [];
};
