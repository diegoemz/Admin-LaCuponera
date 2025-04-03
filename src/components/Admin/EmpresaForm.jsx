import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";

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

  const [rubros, setRubros] = useState([]);

  useEffect(() => {
    const fetchRubros = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rubros"));
        const rubrosObtenidos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRubros(rubrosObtenidos);
      } catch (error) {
        console.error("Error al obtener rubros:", error);
      }
    };

    fetchRubros();
  }, []);


  return (
    <div className="container mt-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="card-title text-center fw-bold mb-4 text-primary">
            🏢 Registro de Nueva Empresa
          </h4>

          <form onSubmit={handleSubmit} className="row g-4">
            <h6 className="fw-semibold text-secondary">Información de la Empresa</h6>
            <div className="col-md-6">
              <label className="form-label">Nombre de Empresa</label>
              <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Dirección</label>
              <input type="text" name="direccion" className="form-control" value={form.direccion} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nombre del Encargado</label>
              <input type="text" name="contacto" className="form-control" value={form.contacto} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input type="text" name="telefono" className="form-control" value={form.telefono} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Correo de empresa</label>
              <input type="email" name="correo" className="form-control" value={form.correo} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Rubro</label>
              <select name="rubro" className="form-select" value={form.rubro} onChange={handleChange} required>
                <option value="">Selecciona un rubro</option>
                {rubros.map((rubro) => (
                  <option key={rubro.id} value={rubro.nombre}>
                    {rubro.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">% Comisión</label>
              <input type="number" name="porcentajeComision" step="0.01" className="form-control" value={form.porcentajeComision} onChange={handleChange} required />
            </div>

            <hr className="my-4" />

            <h6 className="fw-semibold text-secondary">Credenciales de Acceso</h6>
            <div className="col-md-6">
              <label className="form-label">Email para login</label>
              <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-success w-100">
                Registrar Empresa
              </button>
            </div>
          </form>

          {mensaje && (
            <div className="alert alert-info mt-4 text-center fw-semibold">{mensaje}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpresaForm;
