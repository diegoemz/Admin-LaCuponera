import React, { useState } from "react";
import EmpresaForm from "../components/Admin/EmpresaForm";
import EmpresaList from "../components/Admin/EmpresaList";

const AdminEmpresas = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Gestión de Empresas</h2>
        <EmpresaForm onAdd={() => setRefresh((r) => r + 1)} />
        <hr className="my-4" />
        <EmpresaList refreshTrigger={refresh} />
      </div>
    </>
  );
};

export default AdminEmpresas;
