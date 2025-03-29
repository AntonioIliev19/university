import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from "./context/AuthContext";
import "./assets/css/global.css";

const container = document.getElementById("root");

if (!container) throw new Error("Could not find container");

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
  </React.StrictMode>
);
