import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <div className="login-box">
        <h2 className="login-title">VETA Portal</h2>
        <p className="subtitle">Chagua Fani ya Kujisomea</p>
        
        <div className="course-list">
          <button className="course-btn">Pipe Fitting</button>
          <button className="course-btn">Electrical Installation</button>
          <button className="course-btn">Motor Vehicle Mechanics</button>
        </div>
      </div>
      
      <div className="powered-footer">Powered by ANDREA</div>
    </div>
  );
}

export default App;
