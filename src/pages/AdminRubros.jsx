import React, { useState } from "react";
import RubroForm from "../components/Admin/RubroForm";
import RubroList from "../components/Admin/RubroList";

const AdminRubros = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Gestión de Rubros</h2>
        <RubroForm onAdd={() => setRefresh((r) => r + 1)} />
        <hr className="my-4" />
        <RubroList refreshTrigger={refresh} />
      </div>
    </>
  );
};

export default AdminRubros;
