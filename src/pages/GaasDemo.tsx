// src/pages/GaasDemo.tsx

import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // reuse your existing container/header styles
import CardGrader from "../Components/CardGrader";

export const GaasDemo: React.FC = () => {
  return (
    <div className="container">
      <header className="header" style={{ marginBottom: "0.5rem" }}>
        <h1 className="title">Virtual Commerce Ventures</h1>
        <p className="subtitle">GaaS – Grading as a Service (Live Demo)</p>
        <Link to="/" style={{ fontSize: "0.9rem", color: "#4f46e5" }}>
          ← Back to platform hub
        </Link>
      </header>

      <main style={{ width: "100%" }}>
        <CardGrader />
      </main>

      <footer className="footer">
        <p>&copy; 2025 Virtual Commerce Ventures. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GaasDemo;
