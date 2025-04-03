import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const EmpresaForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    contacto: "",
    telefono: "",
    correo: "",
    rubro: "",
    porcentajeComision: "",
    email: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  const generarCodigoEmpresa = () => {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    let codigo = "";
    for (let i = 0; i < 3; i++) codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    for (let i = 0; i < 3; i++) codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    return codigo;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = cred.user.uid;
      const codigoGenerado = generarCodigoEmpresa();

      await setDoc(doc(db, "empresas", uid), {
        ...form,
        codigo: codigoGenerado,
        porcentajeComision: parseFloat(form.porcentajeComision),
        rol: "empresa",
        createdAt: serverTimestamp(),
      });

      await signInWithEmailAndPassword(auth, "admin@cuponera.com", "admin123");

      setMensaje(`✅ Empresa registrada correctamente. Código asignado: ${codigoGenerado}`);
      onAdd();
      setForm({
        nombre: "",
        direccion: "",
        contacto: "",
        telefono: "",
        correo: "",
        rubro: "",
        porcentajeComision: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error al registrar empresa:", error);
      setMensaje("❌ Hubo un error al registrar la empresa.");
    }

    setTimeout(() => setMensaje(""), 5000);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="card-title mb-4">Registrar nueva empresa</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            {[
              { label: "Nombre de Empresa", name: "nombre" },
              { label: "Dirección", name: "direccion" },
              { label: "Nombre de Encargado", name: "contacto" },
              { label: "Teléfono de Contacto", name: "telefono" },
              { label: "Correo de empresa", name: "correo", type: "email" },
              { label: "Rubro", name: "rubro" },
              { label: "% Comisión", name: "porcentajeComision", type: "number", step: "0.01" },
              { label: "Email para login", name: "email", type: "email" },
              { label: "Contraseña", name: "password", type: "password" },
            ].map(({ label, name, type = "text", step }) => (
              <div className="col-md-6" key={name}>
                <label className="form-label">{label}</label>
                <input
                  name={name}
                  type={type}
                  step={step}
                  className="form-control"
                  value={form[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">Registrar Empresa</button>
            </div>
          </form>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmpresaForm;
