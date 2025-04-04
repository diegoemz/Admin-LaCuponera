import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Asegúrate de que la configuración de Firebase esté bien

export const getCuponesActivos = async () => {
  const cuponesRef = collection(db, "cupones");
  // Filtramos por estadoInterno con valor "Active"
  const q = query(cuponesRef, where("estadoInterno", "==", "Activas"));

  try {
    const querySnapshot = await getDocs(q);
    const cupones = [];
    querySnapshot.forEach((doc) => {
      cupones.push({ id: doc.id, ...doc.data() });
    });
    return cupones;
  } catch (error) {
    console.error("Error al obtener los cupones activos:", error);
    return [];
  }
};
