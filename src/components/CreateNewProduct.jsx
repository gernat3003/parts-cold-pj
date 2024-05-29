import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";

export default function CreateNewProduct() {
  const [product, setProduct] = useState({
    product_name: "",
    codigo_producto: "",
    descripcion: "",
    cantidad_stock: 0,
    img_product: null,
    precio_producto: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { fetchData, response, error, loading } = useAxios({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB size limit
      setProduct({ ...product, img_product: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("El archivo debe ser una imagen y no debe exceder 10MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("codigo_producto", product.codigo_producto);
    formData.append("descripcion", product.descripcion);
    formData.append("cantidad_stock", product.cantidad_stock);
    formData.append("precio_producto", product.precio_producto);
    if (product.img_product) {
      formData.append("img_product", product.img_product);
    }

    try {
      await fetchData({
        url: "inventario/create",
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/maindashboard/inventario", {
        state: { successMessage: "Producto creado con éxito" },
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  if (error) {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-5">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Crear producto nuevo
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="product_name"
              >
                Producto
              </label>
              <input
                id="product_name"
                name="product_name"
                type="text"
                value={product.product_name}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="codigo_producto"
              >
                Codigo de Producto
              </label>
              <input
                id="codigo_producto"
                name="codigo_producto"
                type="text"
                value={product.codigo_producto}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                required
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="precio_producto"
              >
                Precio
              </label>
              <input
                id="precio_producto"
                name="precio_producto"
                type="number"
                value={product.precio_producto}
                onChange={handleChange}
                className="block appearance-none w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                min={0}
                required
              />
            </div>
            <div>
              <label
                className="block text-white dark:text-gray-200"
                htmlFor="cantidad_stock"
              >
                Cantidad Stock
              </label>
              <input
                id="cantidad_stock"
                name="cantidad_stock"
                type="number"
                value={product.cantidad_stock}
                onChange={handleChange}
                className="block appearance-none w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                min={0}
                required
              />
            </div>
          </div>
          <div className="w-full mt-6">
            <label
              className="text-white dark:text-gray-200"
              htmlFor="descripcion"
            >
              Descripcion
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              required
            ></textarea>
          </div>
          <br />
          <div>
            <label className="block text-sm font-medium text-white">
              Imagen del producto
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {imagePreview ? (
                <div className="space-y-1 text-center">
                  <img
                    src={imagePreview}
                    alt="Imagen del producto"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <p className="text-xs text-white">
                    Imagen cargada exitosamente
                  </p>
                  <button
                    className="text-xs text-white"
                    type="button"
                    onClick={() => setImagePreview(null)}
                  >
                    Eliminar imagen
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="img_product"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="img_product"
                        name="img_product"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="justify-start">
              <button
                type="button"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-gray-600"
                onClick={() =>       navigate("/maindashboard/inventario", {
                  state: { successMessage: null },
                })}
              >
                Regresar
              </button>
            </div>
            <div className="justify-end">
              <button
                type="submit"
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
