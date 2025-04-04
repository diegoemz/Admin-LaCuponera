import React, { useEffect, useState } from "react";
import { getUsuarios } from "../../services/usuarioService";
import { getCuponesCompradosPorCliente } from "../../services/cuponCompradoService"; // Importamos el servicio

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getUsuarios();

      // Para cada cliente, obtenemos los cupones comprados
      const clientesConCupones = await Promise.all(
        data.map(async (cliente) => {
          const cupones = await getCuponesCompradosPorCliente(cliente.email); // Usamos el email del cliente
          return { ...cliente, cuponesComprados: cupones };
        })
      );
      setClientes(clientesConCupones); // Actualizamos el estado con los usuarios y sus cupones
      setLoading(false);
    };

    fetchClientes();
  }, []);

  if (loading) return <p>Cargando clientes...</p>;

  return (
    <div className="container mt-5">
      <h4 className="fw-bold text-primary mb-4 text-center">Clientes Registrados</h4>

      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 g-4">
        {clientes.map((cliente) => (
          <div className="col" key={cliente.id}>
            <div className="card h-100 shadow-lg border-0 rounded-4">
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

                {/* Cupones Comprados */}
                <h6 className="mb-3 text-success">Cupones Comprados:</h6>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">

                  {cliente.cuponesComprados?.length > 0 ? (
                    cliente.cuponesComprados.map((cupon) => (
                      <div
                        key={cupon.id}
                        className="card mb-4"
                        style={{
                          borderLeft: "5px solid #4caf50",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="card-body">
                          <h5 className="card-title text-primary">{cupon.titulo}</h5>
                          <p className="card-text">
                            <strong>Código:</strong> {cupon.codigo}
                          </p>
                          <p className="card-text">
                            <strong>Cantidad:</strong> {cupon.quantity}
                          </p>
                          <p className="card-text">
                            <strong>Precio Oferta:</strong> ${cupon.precioOferta}
                          </p>


                          <p className="card-text">
                            <strong>Fecha de Caducidad:</strong> 
                            {cupon.fechaLimiteUso 
                              ? new Date(cupon.fechaLimiteUso.seconds * 1000).toLocaleDateString() 
                              : "No disponible"}
                          </p>
                
                
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No tiene cupones comprados.</p>
                  )}
                </div>

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
