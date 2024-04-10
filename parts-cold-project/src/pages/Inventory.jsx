import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useGetRequest from "../Hooks/useGetRequest";
import usePutRequest from "../Hooks/usePutRequest";
import Pagination from "./Pagination";
import InventoryTable from "./InventoryTable";
import axios from "axios";

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
        <InventoryTable
          loading={loading}
          error={error}
          currentItems={currentItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleUpItem={handleUpItem}
          handleDownItem={handleDownItem}
        />
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
