import React from "react";
import CuponList from "../components/Admin/CuponList";

const AdminCupones = () => {
  return (
    <div className="container mt-4">
      <h2>Gestión de Cupones</h2>
      <CuponList />
    </div>
  );
};

export default AdminCupones;