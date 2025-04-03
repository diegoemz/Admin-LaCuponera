import React, { useEffect, useState } from "react";
import { getEmpresas, deleteEmpresa } from "../../services/empresaService";

const EmpresaList = ({ refreshTrigger }) => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const data = await getEmpresas();
      setEmpresas(data);
    };
    fetchEmpresas();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta empresa?");
    if (!confirm) return;
    await deleteEmpresa(id);
    setEmpresas(empresas.filter((e) => e.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Empresas Registradas</h3>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {empresas.map((empresa) => (
          <div className="col" key={empresa.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex flex-column justify-content-between h-100">
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3"
                      style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}
                    >
                      {empresa.nombre?.charAt(0)}
                    </div>
                    <div>
                      <h5 className="mb-0">{empresa.nombre}</h5>
                      <small className="text-muted">{empresa.correo}</small>
                    </div>
                  </div>

                  <p className="mb-1">
                    <strong className="text-secondary">Código:</strong>{" "}
                    <span className="text-muted">{empresa.codigo}</span>
                  </p>
                  <p className="mb-1">
                    <strong className="text-secondary">Teléfono:</strong>{" "}
                    <span className="text-muted">{empresa.telefono}</span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-secondary">Dirección:</strong>{" "}
                    <span className="text-muted">{empresa.direccion}</span>
                  </p>
                  <span className="badge bg-info text-dark">{empresa.rubro}</span>
                </div>

                <button
                  className="btn btn-outline-danger btn-sm mt-3"
                  onClick={() => handleDelete(empresa.id)}
                >
                  Eliminar empresa
                </button>
              </div>
            </div>
          </div>
        ))}

        {empresas.length === 0 && (
          <div className="col">
            <div className="alert alert-secondary text-center">
              No hay empresas registradas.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpresaList;
