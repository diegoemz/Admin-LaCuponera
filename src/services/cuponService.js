import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";

const cuponesCollection = collection(db, "cupones");

export const getCuponesEnEspera = async () => {
  const q = query(cuponesCollection, where("estado", "==", "En espera de aprobación"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const aprobarCupon = async (id) => {
  const ref = doc(db, "cupones", id);
  return await updateDoc(ref, { estado: "Oferta aprobada" });
};

export const rechazarCupon = async (id, justificacion) => {
  const ref = doc(db, "cupones", id);
  return await updateDoc(ref, {
    estado: "Oferta rechazada",
    justificacion,
  });
};

