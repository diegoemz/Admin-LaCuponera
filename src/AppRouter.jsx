import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminEmpresas from "./pages/AdminEmpresas";
import AdminRubros from "./pages/AdminRubros";
import AdminClientes from "./pages/AdminClientes";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Admin/Navbar";
import AdminCupones from "./pages/AdminCupones";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Redirección por defecto */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas por rol "admin" */}
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

        {/* Ruta 404 */}
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
    </BrowserRouter>
  );
};

export default AppRouter;
