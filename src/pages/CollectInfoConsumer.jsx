import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import PdfPreview from "./PdfPreview";
import "react-toastify/dist/ReactToastify.css";

const CollectInfoConsumer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { cart } = state || {};
  const { totalAmount } = state || {};

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    municipio: "",
    departamento: "",
    registro_num: "",
    giro: "",
    documento: "",
    email: "",
  });
  const [clientData, setClientData] = useState({
    nombre_cliente: "",
    direccion: "",
    numero_telefono: "",
    email: "",
    giro: "",
    documento: "",
    registro_num: "",
  });
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (shouldSendRequest) {
      setClientData({
        nombre_cliente: `${formData.nombre} ${formData.apellido}`,
        direccion: `${formData.direccion}, ${formData.municipio}, ${formData.departamento}`,
        numero_telefono: formData.telefono,
        email: formData.email,
        giro: formData.giro,
        documento: formData.documento,
        registro_num: formData.registro_num,
        cart: cart,
        total: totalAmount,
      });
    }
  }, [shouldSendRequest, formData]);

  const { response, error, loading } = useAxios({
    url: "generate-invoice",
    method: "post",
    body: clientData,
    responseType: "blob",
  });

  const handleConfirmClient = async (e) => {
    e.preventDefault();
    setShouldSendRequest(true);
  };

  useEffect(() => {
    if (response) {
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );
      setPdfUrl(url);
      toast.success("Factura generada con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return () => {
        window.URL.revokeObjectURL(url);
      };
    }
  }, [response, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate("/admin-dashboard/clientes");
  };

  if (pdfUrl) {
    return <PdfPreview pdfUrl={pdfUrl} />;
  }

  return (
    <div className="bg-transparent flex items-center justify-center w-full h-screen -mt-20">
      <ToastContainer />
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full">
        {loading ? (
          <div className="flex justify-center">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <span className="inline-block bg-gray-200 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Ingrese Datos Cliente
            </h2>
            <p className="text-gray-600 text-center mb-3">
              Ingresa los detalles del cliente.
            </p>
            <form onSubmit={handleConfirmClient} className="w-full">
              <div className="flex mb-3">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="nombre"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Ingrese el nombre"
                    name="nombre"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="apellido"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Ingrese el apellido"
                    name="apellido"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex mb-3">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="telefono"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Telefono *
                  </label>
                  <input
                    type="telefono "
                    id="telefono"
                    name="telefono"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    maxLength={8}
                    placeholder="Telefono"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="documento"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    onChange={handleChange}
                  >
                    DUI *
                  </label>
                  <input
                    type="number"
                    id="documento"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    maxLength={9}
                    placeholder="Ingrese DUI"
                    name="documento"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex mb-3">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="direccion"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Direccion *
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="calle, colonia, ciudad"
                    name="direccion"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="direccion"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Municipio *
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Municipio"
                    name="municipio"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex mb-3">
                <div className="w-1/2 mr-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Departamento *
                  </label>
                  <input
                    type="text"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Departamento"
                    name="departamento"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex mb-3">
                <div className="w-1/2 mr-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Giro *
                  </label>
                  <input
                    type="text"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Giro"
                    name="giro"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="registro_num"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Numero de registro *
                  </label>
                  <input
                    type="text"
                    id="registro_num"
                    className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
                    required
                    placeholder="Registro"
                    name="registro_num"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex m-2">
                <button
                  type="submit"
                  className="w-1/2 mr-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Continuar
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="w-1/2 ml-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectInfoConsumer;
