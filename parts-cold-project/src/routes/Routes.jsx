import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import '../style/App.css'
import PropTypes from 'prop-types'
import HeaderLogin from './../components/HeaderLogin';
import Header from './../components/Header'
import Login from '../pages/Login';
import MainDashboard from './../pages/MainDashboard';

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

function HeaderSelector() {
  const location = useLocation();

  return location.pathname === "/login" ? <HeaderLogin /> : <Header />;
}

function RoutesComp() {
 return (

    <Router>
      <div className="bg-slate-700 h-screen flex flex-col overflow-hidden">
        <header className="bg-white"  >
          <HeaderSelector />
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} exactpath />
            <Route path='/maindashboard' element={<MainDashboard />} />
            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default RoutesComp;