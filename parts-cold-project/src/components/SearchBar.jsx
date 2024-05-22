import React, { useState } from "react";
import useGetRequest from '../Hooks/useGetRequest'; // Asegúrate de importar tu hook personalizado

export default function SearchBar() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const { data, error, loading, execute } = useGetRequest(
    `http://localhost:8000/api/buscar?termino=${terminoBusqueda}`
  );

  const buscar = () => {
    execute();
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="flex border-2 border-gray-200 rounded">
        <input
          type="text"
          className="px-4 py-2 w-80"
          placeholder="Search..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button
          className="px-4 text-white bg-gray-600 border-l"
          onClick={buscar}
        >
          Search
        </button>
      </div>
    </div>
  );
}
