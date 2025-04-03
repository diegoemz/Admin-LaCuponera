import React, { useEffect, useState } from "react";
import { getCuponesEnEspera, aprobarCupon, rechazarCupon } from "../../services/cuponService";

const CuponList = () => {
  const [cupones, setCupones] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchCupones = async () => {
      const data = await getCuponesEnEspera();
      setCupones(data);
    };
    fetchCupones();
  }, []);

  const handleAprobar = async (id) => {
    await aprobarCupon(id);
    setCupones(cupones.filter((c) => c.id !== id));
    setMensaje("✅ Cupón aprobado correctamente.");
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleRechazar = async (id) => {
    const justificacion = prompt("Escribe el motivo del rechazo del cupón:");
    if (!justificacion?.trim()) return;

    try {
      await rechazarCupon(id, justificacion.trim());
      setCupones(cupones.filter((c) => c.id !== id));
      setMensaje("❌ Cupón rechazado correctamente.");
    } catch (error) {
      console.error("Error al rechazar cupón:", error);
      setMensaje("⚠️ No se pudo rechazar el cupón.");
    }

    setTimeout(() => setMensaje(""), 3000);
  };

  const cuponesPorEmpresa = cupones.reduce((acc, cupon) => {
    const empresa = cupon.nombreEmpresa || "Sin nombre de empresa";
    if (!acc[empresa]) acc[empresa] = [];
    acc[empresa].push(cupon);
    return acc;
  }, {});

  return (
    <div className="container my-5">
      <div className="mb-4">
        <h3 className="fw-bold text-primary">Cupones en Espera de Aprobación</h3>
        <p className="text-muted">Revisa, aprueba o rechaza los cupones enviados por empresas ofertantes</p>
      </div>

      {mensaje && (
        <div className="alert alert-info text-center fw-semibold">{mensaje}</div>
      )}

      {cupones.length === 0 ? (
        <div className="alert alert-secondary text-center">
          No hay cupones pendientes.
        </div>
      ) : (
        Object.entries(cuponesPorEmpresa).map(([empresa, cuponesEmpresa]) => (
          <div key={empresa} className="mb-5">
            <h5 className="fw-bold text-secondary border-bottom pb-2 mb-3">{empresa}</h5>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {cuponesEmpresa.map((cupon) => (
                <div className="col" key={cupon.id}>
                  <div className="card shadow-sm border-0 rounded-4 h-100">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="fw-bold mb-2">{cupon.titulo}</h5>
                      <ul className="list-unstyled small text-muted mb-3">
                        <li><strong className="text-dark">Precio regular:</strong> ${cupon.precioRegular}</li>
                        <li><strong className="text-dark">Precio oferta:</strong> ${cupon.precioOferta}</li>
                        <li><strong className="text-dark">Fecha de inicio:</strong> {cupon.fechaInicio.toDate().toLocaleDateString()}</li>
                        <li><strong className="text-dark">Fecha de fin:</strong> {cupon.fechaFin.toDate().toLocaleDateString()}</li>
                        <li><strong className="text-dark">Descripción:</strong> {cupon.descripcion}</li>
                      </ul>
                      <div className="d-flex justify-content-end gap-2 mt-auto">
                        <button
                          onClick={() => handleAprobar(cupon.id)}
                          className="btn btn-success btn-sm"
                        >
                          ✅ Aprobar
                        </button>
                        <button
                          onClick={() => handleRechazar(cupon.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          ❌ Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CuponList;
