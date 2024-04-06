import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useGetRequest from "../Hooks/useGetRequest";
import usePutRequest from "./../Hooks/usePutRequest";

const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex">
        {pageNumbers.map((number) => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-700`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const { successMessage } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  const {
    data: inventoryData,
    loading,
    error,
  } = useGetRequest("/api/inventario");
  const { putData: putItem } = usePutRequest();

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [successMessage]);

  if (error) {
    toast.error("Error al cargar inventario, inténtelo de nuevo", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/api/inventario/${itemId}`);
      toast.success("Item eliminado con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error al eliminar el item", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const handleEdit = (itemId) => {
    navigate(`/admin-dashboard/inventario/editarproducto`, {
      state: { itemId },
    });
  };

  const handleUpItem = async (itemId) => {
    try {
      const itemUpdated = {
        ...inventoryData.find((item) => item.id === itemId),
      };
      itemUpdated.cantidad += 1;
      await putItem(`/api/inventario/${itemId}`, itemUpdated);
      toast.success("Item actualizado con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error al actualizar el item", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const handleDownItem = async (itemId) => {
    try {
      const itemUpdated = {
        ...inventoryData.find((item) => item.id === itemId),
      };
      itemUpdated.cantidad -= 1;
      await putItem(`/api/inventario/${itemId}`, itemUpdated);
      toast.success("Item actualizado con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error al actualizar el item", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventoryData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ToastContainer />
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex justify-between">
          <h1 className="text-3xl">Inventario</h1>
          <button
            onClick={() =>
              navigate("/admin-dashboard/inventario/create-product")
            }
            className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Agregar Nuevo Item
          </button>
        </div>
        <div className="px-3 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-6">Nombre del Producto</th>
                <th className="text-left p-3 px-5">Cantidad</th>
                <th className="text-left p-3 px-5">Area de Uso</th>
                <th className="text-left p-3 px-5"></th>
              </tr>
              {loading && (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
              {!loading &&
                !error &&
                currentItems.map((item) => (
                  <tr
                    className="border-b hover:bg-orange-100 bg-gray-100"
                    key={item.id}
                  >
                    <td className="p-3 px-6">
                      <input
                        type="text"
                        name="product_name"
                        value={item.product_name}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        name="cantidad"
                        value={item.cantidad}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        name="product_area"
                        value={item.product_area}
                        className="bg-transparent"
                        disabled
                      />
                    </td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        onClick={() => handleDownItem(item.id)}
                        className="rounded focus:outline-none focus:shadow-outline mr-5"
                        title="Disminuir -1 en el inventario"
                        disabled={item.cantidad === 0}
                      >
                        <ArrowDownCircleIcon className="w-6 h-6 text-green-700" />
                      </button>
                      <button
                        onClick={() => handleUpItem(item.id)}
                        className="rounded focus:outline-none focus:shadow-outline mr-8"
                        title="Aumentar +1 en el inventario"
                      >
                        <ArrowUpCircleIcon className="w-6 h-6 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-sm text-black rounded focus:outline-none focus:shadow-outliine mr-5"
                        title="Editar el item seleccionado"
                      >
                        <PencilSquareIcon className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-sm text-red-500 rounded focus:outline-none focus:shadow-outline mr-5"
                        title="Eliminar el item seleccionado"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={inventoryData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
}
