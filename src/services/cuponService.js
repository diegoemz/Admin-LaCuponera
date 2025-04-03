import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, query, where, getDoc } from "firebase/firestore";

const cuponesCollection = collection(db, "cupones");

export const getCuponesEnEspera = async () => {
  const q = query(cuponesCollection, where("estado", "==", "En espera de aprobación"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const aprobarCupon = async (id) => {
  const ref = doc(db, "cupones", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("Cupón no encontrado");
  }

  const cupon = snap.data();

  const fechaInicio = cupon.fechaInicio?.toDate?.() || new Date(cupon.fechaInicio);
  const fechaFin = cupon.fechaFin?.toDate?.() || new Date(cupon.fechaFin);
  const hoy = new Date();

  let nuevoEstado = "Activas"; // default
  if (hoy < fechaInicio) {
    nuevoEstado = "Aprobadas futuras";
  } else if (hoy > fechaFin) {
    nuevoEstado = "Pasadas";
  }

  return await updateDoc(ref, { estado: "Oferta aprobada", estadoInterno: nuevoEstado });
};

export const rechazarCupon = async (id, justificacion) => {
  const ref = doc(db, "cupones", id);
  return await updateDoc(ref, {
    estado: "Oferta rechazada",
    justificacion,
  });
};

