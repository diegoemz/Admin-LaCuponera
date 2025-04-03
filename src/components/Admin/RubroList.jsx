import React, { useEffect, useState } from "react";
import { getRubros, deleteRubro } from "../../services/rubroService";

const RubroList = ({ refreshTrigger }) => {
  const [rubros, setRubros] = useState([]);

  useEffect(() => {
    const fetchRubros = async () => {
      const data = await getRubros();
      setRubros(data);
    };
    fetchRubros();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este rubro?");
    if (!confirm) return;
    await deleteRubro(id);
    setRubros(rubros.filter((r) => r.id !== id));
  };

  return (
    <div className="container mt-4">
      <h4 className="fw-bold text-primary mb-4 text-center">📂 Rubros Registrados</h4>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {rubros.map((rubro) => (
          <div className="col" key={rubro.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center me-3"
                    style={{ width: "45px", height: "45px", fontSize: "1.2rem" }}
                  >
                    {rubro.nombre?.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="mb-0">{rubro.nombre}</h5>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(rubro.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {rubros.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No hay rubros registrados aún.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RubroList;
