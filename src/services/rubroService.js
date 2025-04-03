import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const rubrosCollection = collection(db, "rubros");

export const getRubros = async () => {
  const snapshot = await getDocs(rubrosCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addRubro = async (rubro) => {
  return await addDoc(rubrosCollection, rubro);
};

export const deleteRubro = async (id) => {
  const rubroRef = doc(db, "rubros", id);
  return await deleteDoc(rubroRef);
};
