import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const empresasCollection = collection(db, "empresas");

export const getEmpresas = async () => {
  const snapshot = await getDocs(empresasCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addEmpresa = async (empresa) => {
  return await addDoc(empresasCollection, {
    ...empresa,
    createdAt: serverTimestamp(),
  });
};

export const updateEmpresa = async (id, empresa) => {
  const ref = doc(db, "empresas", id);
  return await updateDoc(ref, empresa);
};

export const deleteEmpresa = async (id) => {
  const ref = doc(db, "empresas", id);
  return await deleteDoc(ref);
};
