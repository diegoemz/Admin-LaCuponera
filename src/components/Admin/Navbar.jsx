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
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold fs-4" to="/admin/empresas">
          La Cuponera 🎟️
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
          <ul className="navbar-nav me-auto">
            {[
              { path: "/admin/empresas", label: "Empresas" },
              { path: "/admin/rubros", label: "Rubros" },
              { path: "/admin/clientes", label: "Clientes" },
              { path: "/admin/cupones", label: "Gestionar Cupones" },
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
