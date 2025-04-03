import React, { useState } from "react";
import { addRubro } from "../../services/rubroService";

const RubroForm = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      await addRubro({ nombre });
      setMensaje("✅ Rubro agregado correctamente.");
      onAdd();
      setNombre("");
    } catch (error) {
      console.error("Error al agregar rubro:", error);
      setMensaje("❌ Hubo un error al agregar el rubro.");
    }

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="container mt-4 mb-3">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="card-title mb-3">Agregar nuevo rubro</h5>
          <form onSubmit={handleSubmit} className="row g-3 align-items-end">
            <div className="col-md-8">
              <label className="form-label">Nombre del rubro</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="form-control"
                placeholder="Ej. Restaurantes"
                required
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-success w-100">Agregar</button>
            </div>
          </form>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
};

export default RubroForm;
