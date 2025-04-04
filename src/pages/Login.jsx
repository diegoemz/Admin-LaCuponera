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

      const usuarioDoc = await getDoc(doc(db, "usuarios", uid));

      if (usuarioDoc.exists()) {
        const userData = usuarioDoc.data();
        if (userData.rol === "admin") {
          navigate("/admin/empresas");
        } else {
          setError("No tienes permisos para acceder a esta plataforma.");
        }
      } else {
        setError("No tienes permisos para acceder a esta plataforma.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 flex-column">
      <h1 className="text-center text-primary fw-bold mb-4">
        La Cuponera Administrador 🎟️
      </h1>

      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@cuponera.com"
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
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted mt-4" style={{ fontSize: "0.9rem" }}>
        © 2025 La Cuponera. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Login;
