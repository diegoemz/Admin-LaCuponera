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
      <h3 className="mb-4">Rubros Registrados</h3>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        {rubros.map((rubro) => (
          <div className="col" key={rubro.id}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{rubro.nombre}</h5>
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
          <div className="col">
            <div className="alert alert-secondary">No hay rubros registrados aún.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RubroList;
