import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateData({ cart }) {
  const [updatedCart, setUpdatedCart] = useState(cart);

  useEffect(() => {
    if (cart) {
      const newCart = cart.map((item) => ({
        ...item,
        stock: item.stock - item.quantity,
      }));
      setUpdatedCart(newCart);
    }
  }, [cart]);

  useEffect(() => {
    console.log("Updated Cart:", updatedCart);
    // Aquí puedes realizar cualquier acción adicional, como actualizar el estado global o enviar datos al servidor
    toast.success("Carrito actualizado con exito", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [updatedCart]);

  return <ToastContainer />;
}
