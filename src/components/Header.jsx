import React from "react";
import logo from "../img/partsfrio.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();
  return (
    <div className="p-2 text-gray-900 bg-white rounded-lg shadow-lg font-medium capitalize">
      <button onClick={() => navigate('/maindashboard')}>
      <span className="px-2 mr-2 border-r border-gray-800">
        <img
          src={logo}
          alt="parts frio"
          className="w-15 h-11 -mt-1 inline mx-auto"
        />
      </span>
      </button>
    </div>
  );
}
