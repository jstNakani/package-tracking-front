import React, { useState } from 'react';
import '../styles/SharedFormStyles.css';

export default function Tracking() {
  const [tracking, setTracking] = useState('');

  return (
    <div className="form-group">
      <h2>Insert Trk number</h2>
      <p>Introduce tu guía de rastreo para el SAIP</p>
      <input 
        type="text" 
        placeholder="Ej: MX123456789" 
        value={tracking}
        onChange={(e) => setTracking(e.target.value)}
      />
      <button className="btn-primary">Rastrear Paquete</button>
    </div>
  );
}