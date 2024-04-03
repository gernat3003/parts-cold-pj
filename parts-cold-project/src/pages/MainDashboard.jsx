import React from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MainDashboard() {
  return (
    <div className="p-5 h-90 mb-16 w-3/6 bg-slate-900 text-green-200 rounded-md opacity-60 w-3/8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de control</h1>
      <div className="grid grid-cols-2 gap-4 relative w-90">
        <Link
          to={"/admin-dashboard/usuarios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <UsersIcon className="h-10 w-10 mb-2" />
          Usuarios
        </Link>
        <Link
          to={"/admin-dashboard/inventario"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
          onClick={(event) => {
            if (
              localStorage.getItem("rol") !== "admin" &&
              localStorage.getItem("rol") !== "Supervisor de Inventario"
            ) {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <BuildingStorefrontIcon className="h-10 w-10 mb-2" />
          Inventario
        </Link>
        <Link
          to={"/admin-dashboard/facturacion"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
          onClick={(event) => {
            if (
              localStorage.getItem("rol") !== "admin" &&
              localStorage.getItem("rol") !== "Operador de Caja" &&
              localStorage.getItem("rol") !== "Operador de Producción"
            ) {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <DocumentTextIcon className="h-10 w-10 mb-2" />
          Facturación
        </Link>

        <Link
          to={"/admin-dashboard/clientes"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <BriefcaseIcon className="h-10 w-10 mb-2" />
          Clientes
        </Link>
        <Link
          to={"/admin-dashboard/precios"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <CurrencyDollarIcon className="h-10 w-10 mb-2" />
          Precios
        </Link>
        <Link
          to={"/admin-dashboard/registro-ventas"}
          className="bg-indigo-300 flex flex-col items-center justify-center p-8 border-4 rounded-lg bg-transparent hover:bg-slate-400 hover:text-white"
          onClick={(event) => {
            if (localStorage.getItem("rol") !== "admin") {
              event.preventDefault();
              toast.error("No tienes los permisos suficientes");
            }
          }}
        >
          <ClipboardDocumentListIcon className="h-10 w-10 mb-2" />
          <div className="flex justify-center items-center">
            Registro Ventas
          </div>
        </Link>
      </div>
    </div>
  );
}
