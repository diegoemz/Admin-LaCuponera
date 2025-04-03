import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminEmpresas from "./pages/AdminEmpresas";
import AdminRubros from "./pages/AdminRubros";
import AdminClientes from "./pages/AdminClientes";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Admin/Navbar";
import AdminCupones from "./pages/AdminCupones";

import { useEffect } from "react";

const AppContent = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/empresas"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminEmpresas />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/cupones"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminCupones />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/rubros"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminRubros />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/clientes"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminClientes />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h2 className="text-danger">404 - Página no encontrada</h2>
              <p>Verifica que la URL sea correcta.</p>
            </div>
          }
        />
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default AppRouter;
