import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const usuariosCollection = collection(db, "usuarios");

export const getUsuarios = async () => {
  const snapshot = await getDocs(usuariosCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getClienteById = async (id) => {
  const ref = doc(db, "usuarios", id);
  const docSnap = await getDoc(ref);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};
