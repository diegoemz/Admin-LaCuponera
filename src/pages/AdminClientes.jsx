import React from "react";
import ClienteList from "../components/Admin/ClienteList";

const AdminClientes = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">👤 Gestión de Clientes</h2>
        <p className="text-muted">
          Visualiza la información de los clientes registrados en La Cuponera
        </p>
      </div>

      <div className="mb-5">
        <div className="bg-light rounded shadow-sm p-4">
        <ClienteList />          
        </div>
      </div>
    </div>
  );
};

export default AdminClientes;
