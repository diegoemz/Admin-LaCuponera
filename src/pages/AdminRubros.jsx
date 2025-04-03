import React, { useState } from "react";
import RubroForm from "../components/Admin/RubroForm";
import RubroList from "../components/Admin/RubroList";

const AdminRubros = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">📂 Gestión de Rubros</h2>
        <p className="text-muted">Administra los rubros disponibles para clasificar las ofertas</p>
      </div>

      <div className="mb-5">
        <div className="bg-light rounded shadow-sm p-4">
          <h5 className="fw-semibold text-secondary mb-3">➕ Agregar Nuevo Rubro</h5>
          <RubroForm onAdd={() => setRefresh((r) => r + 1)} />
        </div>
      </div>

      <div>
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="fw-semibold text-secondary mb-3">📋 Lista de Rubros</h5>
          <RubroList refreshTrigger={refresh} />
        </div>
      </div>
    </div>
  );
};

export default AdminRubros;
