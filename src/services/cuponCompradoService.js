// src/services/cuponCompradoService.js
import { db } from "../firebase"; // Asegúrate de que esta ruta sea correcta
import { collection, query, where, getDocs } from "firebase/firestore";

// Servicio para obtener los cupones comprados por un cliente
export const getCuponesCompradosPorCliente = async (clienteEmail) => {
  // Referencia a la colección "cupones-comprados"
  const cuponesCompradosRef = collection(db, "cupones-comprados");

  // Consulta para obtener los cupones filtrados por el email del usuario
  const q = query(cuponesCompradosRef, where("usuario.email", "==", clienteEmail));

  try {
    // Ejecuta la consulta
    const querySnapshot = await getDocs(q);
    const cuponesComprados = [];

    // Recorre los documentos obtenidos y agrega los datos de los cupones a la lista
    querySnapshot.forEach((doc) => {
      // Aquí se obtiene el documento con los cupones
      const data = doc.data();

      // Verifica que cada cupon tenga los campos necesarios
      data.cupones?.forEach((cupon) => {
        cuponesComprados.push({
          id: doc.id,           // ID del documento
          codigo: cupon.codigo, // Código del cupón
          titulo: cupon.titulo, // Título del cupón
          quantity: cupon.quantity, // Cantidad de cupones
          precioOferta: cupon.precioOferta, // Precio de la oferta
          descripcion: cupon.descripcion, // Descripción del cupón
          estado: cupon.estado, // Estado del cupón (si está activo, canjeado, etc.)
          fechaLimiteUso: cupon.fechaLimiteUso, // Fecha límite de uso
        });
      });
    });

    return cuponesComprados; // Devuelve la lista de cupones comprados

  } catch (error) {
    console.error("Error al obtener los cupones comprados:", error);
    return []; // En caso de error, retorna un array vacío
  }
};
