// src/components/Admin/AdminCouponsList.jsx
import { useEffect, useState } from "react";
import { getCuponesActivos } from "../../services/cuponActiveService"; // Nuevo nombre del servicio
import { Link } from "react-router-dom";

export default function AdminCouponsList() {
  const [cuponesActivos, setCuponesActivos] = useState([]);
  const porcentajeComision = 0.1; // Hardcodeado por ahora, pero puede venir de la empresa
  const hoy = new Date();

  // Total de comisiones de todas las empresas
  const [totalComisiones, setTotalComisiones] = useState(0);

  useEffect(() => {
    // Obtener cupones activos desde el servicio
    const fetchCuponesActivos = async () => {
      const cupones = await getCuponesActivos();
      setCuponesActivos(cupones);
    };

    fetchCuponesActivos();
  }, []);

  // Agrupar los cupones por empresa
  const cuponesPorEmpresa = cuponesActivos.reduce((acc, cupon) => {
    const empresaId = cupon.empresaId;
    if (!acc[empresaId]) {
      acc[empresaId] = {
        empresa: cupon.nombreEmpresa, // Asumiendo que cada cupón tiene el nombre de la empresa
        cupones: [],
        ingresosTotales: 0,
        comisionTotal: 0,
        vendidosTotal: 0,
        disponiblesTotal: 0,
      };
    }

    // Agregar el cupón al grupo de la empresa
    acc[empresaId].cupones.push(cupon);

    // Calcular los totales de la empresa
    const vendidos = cupon.cuponesVendidos || 0;
    const disponibles = cupon.cantidadLimite != null ? cupon.cantidadLimite - vendidos : "∞";
    const ingresos = vendidos * cupon.precioOferta;
    const comision = ingresos * porcentajeComision;

    acc[empresaId].ingresosTotales += ingresos;
    acc[empresaId].comisionTotal += comision;
    acc[empresaId].vendidosTotal += vendidos;
    acc[empresaId].disponiblesTotal += disponibles;

    return acc;
  }, {});

  // Calcular el total de comisiones
  useEffect(() => {
    const total = cuponesActivos.reduce((acc, cupon) => {
      const vendidos = cupon.cuponesVendidos || 0;
      const ingresos = vendidos * cupon.precioOferta;
      const comision = ingresos * porcentajeComision;
      return acc + comision;
    }, 0);

    setTotalComisiones(total);
  }, [cuponesActivos]);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-primary">🎫 Cupones Activos</h2>
      <p className="text-muted">
        Visualiza y administra los cupones activos de las empresas ofertantes
      </p>

      {/* Mostrar la suma de todas las comisiones */}
      <div className="mb-4">
        <h5 className="fw-bold text-success">
          <strong>Comisión Total de Todas las Empresas:</strong> ${totalComisiones.toFixed(2)}
        </h5>
      </div>

      {Object.entries(cuponesPorEmpresa).map(([empresaId, datosEmpresa]) => (
        <div key={empresaId} className="mb-5">
          {/* Sección con totales de la empresa */}
          <h3 className="fw-bold text-secondary">{datosEmpresa.empresa}</h3>

          <div className="bg-light rounded shadow-sm p-4">
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Cupones Vendidos:</strong> {datosEmpresa.vendidosTotal}
              </li>
              <li className="list-group-item">
                <strong>Cupones Disponibles:</strong> {datosEmpresa.disponiblesTotal}
              </li>
              <li className="list-group-item">
                <strong>Ingresos Totales:</strong> ${datosEmpresa.ingresosTotales.toFixed(2)}
              </li>
              <li className="list-group-item">
                <strong>Comisión Total:</strong> ${datosEmpresa.comisionTotal.toFixed(2)}
              </li>
            </ul>

            {/* Aquí seguimos mostrando cada cupón de esa empresa */}
            <div className="row mt-4">
              {datosEmpresa.cupones.map((cupon) => {
                const vendidos = cupon.cuponesVendidos || 0;
                const disponibles =
                  cupon.cantidadLimite != null ? cupon.cantidadLimite - vendidos : "∞";
                const ingresos = vendidos * cupon.precioOferta;
                const comision = ingresos * porcentajeComision;

                return (
                  <div className="col-md-4 mb-4" key={cupon.id}>
                    <div className="card h-100">
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="card-title">{cupon.titulo}</h5>
                          <p className="card-text text-muted">{cupon.descripcion}</p>
                          <p>
                            <strong>${cupon.precioOferta}</strong>{" "}
                            <span className="text-muted ms-2">
                              <del>${cupon.precioRegular}</del>
                            </span>
                          </p>
                        </div>
                        <ul className="list-group mt-3">
                          <li className="list-group-item">
                            <strong>Vendidos:</strong> {vendidos}
                          </li>
                          <li className="list-group-item">
                            <strong>Disponibles:</strong> {disponibles}
                          </li>
                          <li className="list-group-item">
                            <strong>Ingresos:</strong> ${ingresos.toFixed(2)}
                          </li>
                          <li className="list-group-item">
                            <strong>Comisión:</strong> ${comision.toFixed(2)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
