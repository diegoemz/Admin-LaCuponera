import React from "react";
import ClienteList from "../components/Admin/ClienteList";

const AdminClientes = () => {
  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Gestión de Clientes</h2>
        <ClienteList />
      </div>
    </>
  );
};

export default AdminClientes;
