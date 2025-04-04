import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg, #4caf50, #81c784)", // Gradiente verde
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Sombra para un mejor efecto visual
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/admin/empresas">
          <img
            src="/img/cuponeralogo.svg" // Ruta de tu imagen
            alt="La Cuponera Logo"
            style={{
              width: "200px", // Aumentando el tamaño de la imagen
              height: "auto", // Manteniendo la proporción de la imagen
            }}
          />
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { path: "/admin/empresas", label: "Empresas" },
              { path: "/admin/rubros", label: "Rubros" },
              { path: "/admin/clientes", label: "Clientes" },
              { path: "/admin/cupones", label: "Gestionar Cupones" },
              { path: "/admin/cupones-activos", label: "Cupones Activos" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link text-white mx-2 ${
                    location.pathname === item.path ? "fw-bold text-warning" : ""
                  }`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={handleLogout}
            className="btn btn-outline-light ms-auto"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
