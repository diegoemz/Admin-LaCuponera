import React, { useState } from "react";
import EmpresaForm from "../components/Admin/EmpresaForm";
import EmpresaList from "../components/Admin/EmpresaList";

const AdminEmpresas = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">
          🏢 Gestión de Empresas
        </h2>
        <p className="text-muted">Administra las empresas ofertantes registradas en La Cuponera</p>
      </div>

      <div className="mb-5">
        <div className="bg-light rounded shadow-sm p-4">
          <h5 className="fw-semibold text-secondary mb-3">➕ Registrar Nueva Empresa</h5>
          <EmpresaForm onAdd={() => setRefresh((r) => r + 1)} />
        </div>
      </div>

      <div>
        <div className="bg-light rounded shadow-sm p-4">
          <h5 className="fw-semibold text-secondary mb-3">🏬 Lista de Empresas</h5>
          <EmpresaList refreshTrigger={refresh} />
        </div>
      </div>
    </div>
  );
};

export default AdminEmpresas;
