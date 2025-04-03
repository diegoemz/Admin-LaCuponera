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
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {clientes.map((cliente) => (
          <div className="col" key={cliente.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body d-flex flex-column justify-content-between h-100">
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                      style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}
                    >
                      {cliente.nombres?.charAt(0)}
                    </div>
                    <div>
                      <h5 className="mb-0">{cliente.nombres} {cliente.apellidos}</h5>
                      <small className="text-muted">{cliente.email}</small>
                    </div>
                  </div>

                  <p className="mb-1"><strong>DUI:</strong> <span className="text-muted">{cliente.dui}</span></p>
                  <p className="mb-1"><strong>Teléfono:</strong> <span className="text-muted">{cliente.telefono}</span></p>
                  <p className="mb-0"><strong>Dirección:</strong> <span className="text-muted">{cliente.direccion}</span></p>
                </div>
                <span className="badge bg-success align-self-start">Cliente activo</span>
              </div>
            </div>
          </div>
        ))}

        {clientes.length === 0 && (
          <div className="col">
            <div className="alert alert-secondary text-center">No hay clientes registrados.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClienteList;
