import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import PropTypes from 'prop-types'

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

function App() {
  return (

    <Router>
      <div className="bg-slate-700 h-screen flex flex-col overflow-hidden">
        <header className=" bg-white "  >
          <Header />
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} exactpath />
            <Route path="*" element={<h1>Not Found 404</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
