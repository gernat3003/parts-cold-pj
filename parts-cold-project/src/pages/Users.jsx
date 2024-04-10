import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useGetRequest from "../Hooks/useGetRequest";
import useDeleteRequest from "../Hooks/useDeleteRequest";
import Pagination from "./Pagination";
import UserTable from "./UserTable";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("userIdLogged");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const location = useLocation();
  const { successMessage } = location.state || {};

  const {
    data,
    loading: loadingUsers,
    error: errorUsers,
  } = useGetRequest(`users`);
  const {
    deleteData,
    loading: loadingDelete,
    error: errorDelete,
  } = useDeleteRequest();

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

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleEdit = (userId) => {
    navigate(`/admin-dashboard/usuarios/editarusuario`, { state: { userId } });
  };

  const handleDelete = async (userId) => {
    if (parseInt(idUser) === parseInt(userId)) {
      toast.error("No puedes eliminar el usuario actual", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        await deleteData(`api/users/${userId}`, token);
        toast.success("Usuario eliminado con éxito", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        toast.error(
          { error },
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  if (!loadingUsers && errorUsers) {
    toast.error("Error al cargar usuarios, intentelo de nuevo", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (!loadingDelete && errorDelete) {
    toast.error("Error al Eliminar el usuario, intentelo de nuevo", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ToastContainer />
      <div className="text-gray-900 bg-gray-200 ">
        <div className="p-4 flex justify-between">
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <button
            className="text-md mr-3 bg-green-500 hover:bg-green-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/admin-dashboard/usuarios/createuser")}
          >
            Agregar Usuario
          </button>
        </div>
        <UserTable
          loadingUsers={loadingUsers}
          errorUsers={errorUsers}
          currentItems={currentItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <Pagination
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Users;
