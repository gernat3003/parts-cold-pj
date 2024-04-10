import React from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";

const InventoryTable = ({
  loading,
  error,
  currentItems,
  handleEdit,
  handleDelete,
  handleUpItem,
  handleDownItem,
}) => {
  return (
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
  );
};

export default InventoryTable;
