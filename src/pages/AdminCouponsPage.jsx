// src/pages/AdminCouponsPage.jsx
import React from "react";
import AdminCouponsList from "../components/Admin/AdminCouponsList";

export default function AdminCouponsPage() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">🎫 Cupones Activos</h2>
        <p className="text-muted">
          Visualiza y administra los cupones activos de las empresas ofertantes
        </p>
      </div>

      <div className="mb-5">
        <div className="bg-light rounded shadow-sm p-4">
          <AdminCouponsList />        
        </div>
      </div>
    </div>
  );
}
