import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "../style/App.css";
import PropTypes from "prop-types";
import Header from "./../components/Header";
import Login from "../pages/Login";
import MainDashboard from "./../pages/MainDashboard";
import Users from "./../pages/Users";
import Inventory from "./../pages/Inventory";
import SalesRecord from "./../pages/SalesRecord";
import Invoices from "./../pages/Invoices";
import MarketCar from "../pages/MarketCar";
import CollectInfoConsumer from "../pages/CollectInfoConsumer";
import CreateNewProduct from "../components/CreateNewProduct";
import CreateNewUser from "../components/CreateNewUser";
import NotFound from "../pages/NotFound";

function ProtectedComponent({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
}

ProtectedComponent.propTypes = {
  children: PropTypes.node,
};

function RoutesComp() {
  return (
    <Router className="flex flex-col overflow-x-hidden overflow-auto">
      <header className="App-header bg-white">
        <Header />
      </header>
      <div className="App-body bg-slate-700 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} exactpath />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/maindashboard/usuarios" element={<Users />} />
          <Route path="/maindashboard/inventario" element={<Inventory />} />
          <Route path="/maindashboard/registro-ventas" element={<NotFound />}/>
          <Route path="/maindashboard/facturacion" element={<Invoices />} />
          <Route path="/maindashboard/marketcar" element={<MarketCar />} />
          <Route path="/maindashboard/facturacion/generacionfactura" element={<CollectInfoConsumer />} />
          <Route path="/maindashboard/inventario/create-product" element={<CreateNewProduct />}/>
          <Route path="/maindashboard/usuarios/createuser" element={<CreateNewUser />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RoutesComp;
