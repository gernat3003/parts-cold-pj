import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import InvoiceTemplate from "../components/InvoiceTemplate";
import InvoiceViewer from "../components/InvoiceViewer";
import UpdateData from "../components/UpdateData";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Hooks/useAuth";
import InfoClientComp from "../components/InfoClientComp";

const CollectInfoConsumer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { cart } = state || {};
  const { totalAmount } = state || {};
  const [isConfirmed, setIsConfirmed] = useState(false);
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

  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceBlob, setInvoiceBlob] = useState(null);
  const [showForm, setShowForm] = useState(true);

  useAuth();
  const handleBlobGenerated = (blob) => {
    setInvoiceBlob(blob);
    setShowForm(false); // Ocultar el formulario cuando se genera el blob
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedClientData = {
      nombre_cliente: `${formData.nombre} ${formData.apellido}`,
      direccion: `${formData.direccion}, ${formData.municipio}, ${formData.departamento}`,
      numero_telefono: formData.telefono,
      email: formData.email,
      giro: formData.giro,
      documento: formData.documento,
      registro_num: formData.registro_num,
      cart: cart,
      total: totalAmount,
    };

    // Establecer los datos de la factura para que el componente InvoiceTemplate se renderice
    setInvoiceData(updatedClientData);
  };
  /** ----------------------------------------------------------------------------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleCancel = () => {
    navigate("/admin-dashboard/clientes");
  };

  return (
    <div className="bg-transparent flex items-center justify-center w-full h-screen -mt-20">
      <ToastContainer />
      {showForm ? (
        <InfoClientComp
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      ) : (
        invoiceBlob && (
          <div className="w-[50%]">
            <InvoiceViewer blob={invoiceBlob} />
            <div className="flex justify-center mt-2">
              {!isConfirmed ? (
                <button
                  onClick={handleConfirm}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Confirmar Datos
                </button>
              ) : (
                <>
                  <UpdateData cart={cart} />
                  <a
                    href={URL.createObjectURL(invoiceBlob)}
                    download={`${formData.nombre}_${formData.apellido}.pdf`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Descargar PDF
                  </a>
                </>
              )}
            </div>
          </div>
        )
      )}
      {invoiceData && (
        <InvoiceTemplate
          data={invoiceData}
          onBlobGenerated={handleBlobGenerated}
        />
      )}
    </div>
  );
};

export default CollectInfoConsumer;
