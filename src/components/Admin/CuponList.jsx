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
  

  return (
    <div className="container mt-4">
      <h3>Cupones en espera de aprobación</h3>
      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      {cupones.length === 0 ? (
        <p className="text-muted">No hay cupones pendientes.</p>
      ) : (
        <div className="list-group">
          {cupones.map((cupon) => (
            <div key={cupon.id} className="list-group-item mb-3">
              <h5>{cupon.titulo}</h5>
              <p><strong>Precio Regular:</strong> ${cupon.precioRegular}</p>
              <p><strong>Precio Oferta:</strong> ${cupon.precioOferta}</p>
              <p><strong>Fecha de inicio:</strong> {cupon.fechaInicio.toDate().toLocaleDateString()}</p>
              <p><strong>Fecha de fin:</strong> {cupon.fechaFin.toDate().toLocaleDateString()}</p>
              <p><strong>Descripción:</strong> {cupon.descripcion}</p>
              <button onClick={() => handleAprobar(cupon.id)} className="btn btn-success btn-sm me-2">
                Aprobar
              </button>
              <button onClick={() => handleRechazar(cupon.id)} className="btn btn-danger btn-sm">
                Rechazar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CuponList;