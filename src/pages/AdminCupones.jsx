import React from "react";
import CuponList from "../components/Admin/CuponList";

const AdminCupones = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">🎫 Gestión de Cupones</h2>
        <p className="text-muted">
          Visualiza y administra los cupones pendientes de aprobación de las empresas ofertantes
        </p>
      </div>

      <div className="mb-5">
        <div className="bg-light rounded shadow-sm p-4">
          <CuponList />        
          </div>
      </div>
    </div>
  );
};

export default AdminCupones;
