import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import "react-toastify/dist/ReactToastify.css";
import RoutesComp from './routes/Routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesComp />
  </React.StrictMode>
);

