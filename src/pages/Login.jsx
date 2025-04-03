import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
      const uid = cred.user.uid;

      // Buscar en colección usuarios
      const usuarioDoc = await getDoc(doc(db, "usuarios", uid));
      const empleadoDoc = await getDoc(doc(db, "empleados", uid));

      if (usuarioDoc.exists()) {
        const userData = usuarioDoc.data();
        if (userData.rol === "admin") {
          navigate("/admin/empresas");
        } else {
          navigate("/tienda"); // o cualquier ruta de cliente
        }
      } else if (empleadoDoc.exists()) {
        navigate("/canje"); // ruta de canje para empleados
      } else {
        setError("No tienes permisos para acceder a esta plataforma.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
