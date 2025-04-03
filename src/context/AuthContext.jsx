import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // tu archivo ya tiene la instancia
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "usuarios", user.uid); // Asegúrate de tener este doc en Firestore
        const docSnap = await getDoc(ref);
        setUsuario({ uid: user.uid, email: user.email, ...docSnap.data() });
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
