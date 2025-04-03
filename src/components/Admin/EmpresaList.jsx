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
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {empresas.map((empresa) => (
          <div className="col" key={empresa.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body d-flex flex-column justify-content-between">
                {/* Header con inicial y nombre */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                    style={{ width: "50px", height: "50px", fontSize: "1.3rem" }}
                  >
                    {empresa.nombre?.charAt(0)}
                  </div>
                  <div>
                    <h5 className="mb-0">{empresa.nombre}</h5>
                    <small className="text-muted">{empresa.email}</small>
                  </div>
                </div>

                {/* Datos */}
                <ul className="list-unstyled mb-3">
                  <li><strong className="text-secondary">Código:</strong> {empresa.codigo}</li>
                  <li><strong className="text-secondary">Encargado:</strong> {empresa.contacto}</li>
                  <li><strong className="text-secondary">Correo empresa:</strong> {empresa.correo}</li>
                  <li><strong className="text-secondary">Teléfono:</strong> {empresa.telefono}</li>
                  <li><strong className="text-secondary">Dirección:</strong> {empresa.direccion}</li>
                  <li><strong className="text-secondary">Rubro:</strong> {empresa.rubro}</li>
                  <li><strong className="text-secondary">Comisión:</strong> {empresa.porcentajeComision}%</li>
                </ul>

                <button
                  className="btn btn-outline-danger btn-sm w-100 mt-auto"
                  onClick={() => handleDelete(empresa.id)}
                >
                  Eliminar empresa
                </button>
              </div>
            </div>
          </div>
        ))}

        {empresas.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No hay empresas registradas aún.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpresaList;
