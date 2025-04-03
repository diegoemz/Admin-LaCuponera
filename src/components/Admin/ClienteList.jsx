import React, { useEffect, useState } from "react";
import { getUsuarios } from "../../services/usuarioService";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getUsuarios();
      setClientes(data);
    };
    fetchClientes();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="fw-bold text-primary mb-4 text-center">Clientes Registrados</h4>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {clientes.map((cliente) => (
          <div className="col" key={cliente.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body d-flex flex-column justify-content-between">
                {/* Cabecera con avatar y nombre */}
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3"
                    style={{ width: "50px", height: "50px", fontSize: "1.3rem" }}
                  >
                    {cliente.nombres?.charAt(0)}
                  </div>
                  <div>
                    <h5 className="mb-0">
                      {cliente.nombres} {cliente.apellidos}
                    </h5>
                    <small className="text-muted">{cliente.email}</small>
                  </div>
                </div>

                {/* Datos personales */}
                <ul className="list-unstyled mb-3">
                  <li><strong className="text-secondary">DUI:</strong> {cliente.dui}</li>
                  <li><strong className="text-secondary">Teléfono:</strong> {cliente.telefono}</li>
                  <li><strong className="text-secondary">Dirección:</strong> {cliente.direccion}</li>
                </ul>

                <span className="badge bg-success align-self-start">Cliente activo</span>
              </div>
            </div>
          </div>
        ))}

        {clientes.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No hay clientes registrados aún.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClienteList;
